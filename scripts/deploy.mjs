// scripts/deploy.mjs —— 官网一键发布：构建 → 同步 OSS 媒体 → 增量部署服务器 → 刷新 CDN
//
// 用法（在项目根目录）：
//   npm run deploy                      全流程
//   npm run deploy -- --dry-run         只预览会传/会删哪些文件，不改动线上任何东西
//   npm run deploy -- --only=oss        只同步 OSS 媒体（不构建、不动服务器）
//   npm run deploy -- --only=site       只部署服务器（构建 + 上传 + 重启）
//   npm run deploy -- --skip-build      用现有的 .output，不重新构建
//   npm run deploy -- --clean           构建前先 npx nuxi cleanup（清 .nuxt/.output 与 Vite 缓存）
//   npm run deploy -- --rollback        服务器切回上一版（.output-prev）并重启
//
// ## 线上架构（2026-09-18 核实）
// - www.raydiene.cn   → CDN → 服务器 106.15.103.118，pm2 跑 /var/www/raydiene/.output
//                       页面、_nuxt、字体、3D 模型都从这里加载
// - assets.raydiene.cn → CDN → OSS raydiene-assets-zrs
//                       线上**只从这里读 images/ videos/ downloads/**（NuxtImg 的 aliyun provider
//                       与 runtimeConfig 的 videoBaseURL/pdfBaseURL）
//   OSS 里的 _nuxt/ about/ faq/ 等目录线上没有引用，本脚本不再上传。
//
// ## 为什么用 rclone
// 两边都要「只传内容变了的文件」。nuxt build 每次都会重写所有文件，修改时间全是新的，
// 按修改时间比对等于全量上传。rclone --checksum 按 MD5 比对（OSS 用 ETag，服务器用 md5sum），
// 内容没变就跳过。ossutil 从本地往 OSS 同步不支持按内容比对，所以不用它。
//
// ## 凭据
// - OSS 与 CDN：Windows 用户环境变量 RAYDIENE_OSS_AK / RAYDIENE_OSS_SK（RAM 子账号 deploy-site）
//   不写进 rclone 配置、不进仓库、不出现在命令行参数里（通过环境变量传给 rclone）。
// - 服务器：~/.ssh/id_ed25519 免密登录。

import { spawn, spawnSync } from "node:child_process";
import { createHmac, randomUUID } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";

// ---------------------------------------------------------------- 配置
const ROOT = resolve(import.meta.dirname, "..");
const OSS = {
  bucket: "raydiene-assets-zrs",
  endpoint: "oss-cn-shanghai.aliyuncs.com",
  dirs: ["images", "videos", "downloads"],
  // 视频母带只留本地，不上 OSS
  exclude: ["videos/_original-hevc/**"],
  cdnHost: "https://assets.raydiene.cn",
};
const SERVER = {
  host: "106.15.103.118",
  user: "root",
  dir: "/var/www/raydiene",
  keyFile: join(homedir(), ".ssh", "id_ed25519"),
  cdnHost: "https://www.raydiene.cn",
};

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const ONLY = (args.find((a) => a.startsWith("--only=")) || "").split("=")[1] || "";
const SKIP_BUILD = args.includes("--skip-build") || ONLY === "oss";
const ROLLBACK = args.includes("--rollback");
const CLEAN = args.includes("--clean");

// ---------------------------------------------------------------- 小工具
const log = (...m) => console.log(...m);
const title = (t) => log(`\n━━━ ${t} ${"━".repeat(Math.max(0, 50 - t.length))}`);
function die(msg) {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
}

function run(cmd, argv, { env, quiet } = {}) {
  return new Promise((ok, fail) => {
    const p = spawn(cmd, argv, {
      cwd: ROOT,
      env: { ...process.env, ...env },
      stdio: quiet ? ["ignore", "pipe", "pipe"] : "inherit",
      shell: process.platform === "win32" && (cmd === "npm" || cmd === "npx"),
    });
    let out = "";
    if (quiet) {
      p.stdout.on("data", (d) => (out += d));
      p.stderr.on("data", (d) => (out += d));
    }
    p.on("close", (code) => (code === 0 ? ok(out) : fail(new Error(`${cmd} 退出码 ${code}\n${out}`))));
    p.on("error", fail);
  });
}

const sshTarget = `${SERVER.user}@${SERVER.host}`;
const sshBase = ["-i", SERVER.keyFile, "-o", "BatchMode=yes", "-o", "ConnectTimeout=10", sshTarget];
function ssh(script, opts) {
  return run("ssh", [...sshBase, script], opts);
}

// rclone 的连接串 + 环境变量传凭据：不需要 rclone.conf，密钥也不会出现在进程参数里
const ossRemote = (path) =>
  `:s3,provider=Alibaba,endpoint=${OSS.endpoint},no_check_bucket=true:${OSS.bucket}/${path}`;
const ossEnv = () => ({
  RCLONE_S3_ACCESS_KEY_ID: process.env.RAYDIENE_OSS_AK,
  RCLONE_S3_SECRET_ACCESS_KEY: process.env.RAYDIENE_OSS_SK,
});
// Windows 路径里有「C:」，连接串里的值带冒号必须加引号
const fwd = (p) => p.replaceAll("\\", "/");
const sftpRemote = (path) =>
  `:sftp,host=${SERVER.host},user=${SERVER.user},key_file='${fwd(SERVER.keyFile)}',` +
  `known_hosts_file='${fwd(join(homedir(), ".ssh", "known_hosts"))}',shell_type=unix,` +
  // 写明校验命令，省掉 rclone 每次连上去探测（探测结果也存不进临时连接串，会刷提示）
  `md5sum_command=md5sum,sha1sum_command=sha1sum:${path}`;

// rclone --combined 的输出：「= 未变  + 新增  * 修改  - 删除  ! 出错」
function readCombined(file) {
  const res = { added: [], changed: [], deleted: [], errors: [] };
  if (!existsSync(file)) return res;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const [flag, ...rest] = line.split(" ");
    const p = rest.join(" ");
    if (flag === "+") res.added.push(p);
    else if (flag === "*") res.changed.push(p);
    else if (flag === "-") res.deleted.push(p);
    else if (flag === "!") res.errors.push(p);
  }
  return res;
}

function rclone(src, dst, { env, exclude = [], combined }) {
  const argv = ["sync", src, dst, "--checksum", "--combined", combined, "--transfers", "8"];
  for (const e of exclude) argv.push("--exclude", e);
  // 变更明细由 --combined 汇总后打印；预览时 rclone 会逐个报「跳过」，几百行没必要，关掉
  if (DRY) argv.push("--dry-run", "-q");
  else argv.push("--stats", "10s", "--stats-one-line");
  return run("rclone", argv, { env });
}

// ---------------------------------------------------------------- CDN 刷新
// 直接调 CDN OpenAPI（RPC 签名，HMAC-SHA1），省掉一个阿里云命令行工具。
const pct = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
async function cdnRefresh(paths, type) {
  if (!paths.length) return;
  if (DRY) {
    log(`  [预览] 会刷新 CDN（${type}）：\n    ${paths.join("\n    ")}`);
    return;
  }
  const q = {
    Action: "RefreshObjectCaches", Version: "2018-05-10", Format: "JSON",
    ObjectPath: paths.join("\n"), ObjectType: type,
    AccessKeyId: process.env.RAYDIENE_OSS_AK, SignatureMethod: "HMAC-SHA1",
    SignatureVersion: "1.0", SignatureNonce: randomUUID(),
    Timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
  };
  const canon = Object.keys(q).sort().map((k) => `${pct(k)}=${pct(q[k])}`).join("&");
  const sign = createHmac("sha1", `${process.env.RAYDIENE_OSS_SK}&`)
    .update(`GET&${pct("/")}&${pct(canon)}`).digest("base64");
  const r = await fetch(`https://cdn.aliyuncs.com/?${canon}&Signature=${pct(sign)}`);
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`CDN 刷新失败：${body.Code || r.status} ${body.Message || ""}`);
  log(`  CDN 刷新已提交（${type}，${paths.length} 条），任务 ${body.RefreshTaskId}`);
}

// 变了的文件 → 要刷新的 CDN 目录。
// 用「目录刷新」而不是逐个文件：图片经 x-oss-process 处理后，同一张图在 CDN 上有多个带参数的缓存版本，
// 按文件刷新只清掉不带参数的那一个。目录刷新每天额度约 100 条，按目录去重后够用。
function dirsOf(files, prefix = "") {
  const set = new Set();
  for (const f of files) {
    const i = f.lastIndexOf("/");
    set.add(prefix + (i >= 0 ? f.slice(0, i + 1) : ""));
  }
  return [...set].sort();
}

// 终端（尤其是 VS Code 里的）继承的是它启动那一刻的环境变量：先开着 VS Code、后设变量，
// 新开的终端也读不到，要把 VS Code 整个退出重开。这里直接去注册表里的用户变量补读，免掉这一步。
function loadUserEnv(names) {
  if (process.platform !== "win32") return;
  for (const n of names) {
    if (process.env[n]) continue;
    const r = spawnSync("reg", ["query", "HKCU\\Environment", "/v", n], { encoding: "utf8" });
    const m = /REG_(?:EXPAND_)?SZ\s+(.+?)\s*$/m.exec(r.stdout || "");
    if (m) process.env[n] = m[1];
  }
}

// ---------------------------------------------------------------- 步骤
function preflight() {
  loadUserEnv(["RAYDIENE_OSS_AK", "RAYDIENE_OSS_SK"]);
  title(`检查环境${DRY ? "（预览模式，不改动线上）" : ""}`);
  const rc = spawnSync("rclone", ["version"], { encoding: "utf8" });
  if (rc.error) die("没找到 rclone。先运行：winget install Rclone.Rclone，然后重开终端");
  log(`  ${rc.stdout.split("\n")[0]}`);
  // 部署服务器之后也要刷新 www 的 CDN，所以除了回滚都需要这对密钥
  if (!ROLLBACK) {
    if (!process.env.RAYDIENE_OSS_AK || !process.env.RAYDIENE_OSS_SK)
      die("缺少环境变量 RAYDIENE_OSS_AK / RAYDIENE_OSS_SK（RAM 子账号 deploy-site 的 AccessKey）。设好后重开终端");
    log("  OSS / CDN 凭据：已读到环境变量");
  }
  if (ONLY !== "oss") {
    if (!existsSync(SERVER.keyFile)) die(`没找到 SSH 私钥 ${SERVER.keyFile}`);
    const s = spawnSync("ssh", [...sshBase, "echo ok"], { encoding: "utf8" });
    if (s.stdout.trim() !== "ok")
      die(`SSH 免密登录 ${sshTarget} 失败：${(s.stderr || "").trim()}\n  先把 ${SERVER.keyFile}.pub 加到服务器 ~/.ssh/authorized_keys`);
    log(`  SSH：${sshTarget} 免密登录正常`);
    const t = spawnSync("ssh", [...sshBase, "command -v pm2 >/dev/null && command -v node >/dev/null && echo ok"],
                        { encoding: "utf8" });
    if (t.stdout.trim() !== "ok")
      die("服务器上通过 SSH 执行命令时找不到 pm2 或 node（多半是用 nvm 装的，非交互登录没加载 PATH）。" +
          "把 nvm 的 bin 目录加进 /etc/environment，或告诉我服务器上 node 的安装方式");
  }
}

async function syncOss() {
  title("同步 OSS 媒体（images / videos / downloads）");
  const tmp = mkdtempSync(join(tmpdir(), "deploy-oss-"));
  const refresh = [];
  try {
    for (const d of OSS.dirs) {
      const local = join(ROOT, "public", d);
      if (!existsSync(local)) die(`本地没有 public/${d}，为防止把 OSS 上的整个目录清空，已停止`);
      const combined = join(tmp, `${d}.txt`);
      log(`\n  · ${d}/`);
      const exclude = OSS.exclude.filter((e) => e.startsWith(`${d}/`)).map((e) => e.slice(d.length + 1));
      await rclone(local, ossRemote(d), { env: ossEnv(), exclude, combined });
      const c = readCombined(combined);
      if (c.errors.length) die(`${d}/ 有 ${c.errors.length} 个文件出错：\n    ${c.errors.slice(0, 10).join("\n    ")}`);
      log(`    新增 ${c.added.length}　修改 ${c.changed.length}　删除 ${c.deleted.length}`);
      for (const [k, list] of [["修改", c.changed], ["删除", c.deleted]])
        if (list.length) log(`    ${k}：${list.slice(0, 20).join("、")}${list.length > 20 ? ` 等 ${list.length} 个` : ""}`);
      // 新增的文件 CDN 上本来就没有缓存，不用刷新
      refresh.push(...dirsOf([...c.changed, ...c.deleted], `${OSS.cdnHost}/${d}/`));
    }
    await cdnRefresh(refresh, "Directory");
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

async function build() {
  // 默认不清：nuxt build 每次都会重新生成 .nuxt 和 .output，产物不会残留旧文件；
  // cleanup 多清掉的是 Vite 缓存，只在升级依赖、改 nuxt.config 或打补丁后构建结果不对时才需要
  if (CLEAN) {
    title("清理缓存（npx nuxi cleanup）");
    await run("npx", ["nuxi", "cleanup"]);
  }
  title("构建（npm run build）");
  await run("npm", ["run", "build"]);
  if (!existsSync(join(ROOT, ".output", "server", "index.mjs"))) die("构建产物不完整：缺 .output/server/index.mjs");
}

// 服务器上：先同步到 .output-staging（跨次保留，所以每次只传差异），
// 再整份复制成新版本、与线上 .output 对调、重启 pm2。上一版留在 .output-prev，可一键回滚。
const SWAP = (restartOnly) => `
set -e
cd ${SERVER.dir}
APP=$(pm2 jlist | node -e '
  let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
    const hit=JSON.parse(s).filter(p=>(p.pm2_env.pm_exec_path||"").startsWith("${SERVER.dir}/.output/"));
    if(hit.length!==1){console.error("pm2 里找到 "+hit.length+" 个跑在 ${SERVER.dir}/.output 下的进程，需要恰好 1 个");process.exit(1)}
    console.log(hit[0].name)})')
echo "pm2 进程：$APP"
${restartOnly}
pm2 restart "$APP" --update-env >/dev/null
sleep 2
pm2 jlist | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const p=JSON.parse(s).find(x=>x.name===process.argv[1]);console.log("状态："+p.pm2_env.status);if(p.pm2_env.status!=="online")process.exit(1)})' "$APP"
`;

async function deploySite() {
  title("增量上传到服务器");
  // 第一次用：拿线上现有的 .output 做底，之后只传差异，不用整份 892MB 上传。
  // 预览模式不改服务器：暂存目录还没有的话，直接拿线上 .output 来比对。
  const hasStaging = spawnSync("ssh", [...sshBase, `[ -d ${SERVER.dir}/.output-staging ] && echo yes`],
                               { encoding: "utf8" }).stdout.trim() === "yes";
  let target = `${SERVER.dir}/.output-staging`;
  if (!hasStaging) {
    if (DRY) target = `${SERVER.dir}/.output`;
    else await ssh(`cd ${SERVER.dir} && echo "首次运行：用线上 .output 初始化 .output-staging" && cp -a .output .output-staging`);
  }
  const tmp = mkdtempSync(join(tmpdir(), "deploy-site-"));
  let pagesChanged = false;
  try {
    const combined = join(tmp, "site.txt");
    await rclone(join(ROOT, ".output"), sftpRemote(target), { combined });
    const c = readCombined(combined);
    if (c.errors.length) die(`有 ${c.errors.length} 个文件上传出错：\n    ${c.errors.slice(0, 10).join("\n    ")}`);
    log(`  新增 ${c.added.length}　修改 ${c.changed.length}　删除 ${c.deleted.length}`);
    const touched = [...c.added, ...c.changed, ...c.deleted];
    if (!touched.length) {
      log("  服务器上的版本和本地一致，不用重启");
      return;
    }
    // 只有 _nuxt（文件名带指纹）变了的话，CDN 不用刷；页面/其他公共文件变了才刷 www
    pagesChanged = touched.some((f) => f.startsWith("public/") && !f.startsWith("public/_nuxt/"));
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  if (DRY) {
    log("  [预览] 会把新版本切换上线并重启 pm2");
    if (pagesChanged) await cdnRefresh([`${SERVER.cdnHost}/`], "Directory");
    return;
  }

  title("切换上线并重启");
  await ssh(SWAP(`rm -rf .output-prev .output-new
cp -a .output-staging .output-new
mv .output .output-prev
mv .output-new .output
echo "已切换：新版本 → .output，上一版 → .output-prev"`));
  if (pagesChanged) await cdnRefresh([`${SERVER.cdnHost}/`], "Directory");
}

async function rollback() {
  title("回滚到上一版");
  await ssh(SWAP(`[ -d .output-prev ] || { echo "没有 .output-prev，无法回滚"; exit 1; }
mv .output .output-bad
mv .output-prev .output
mv .output-bad .output-prev
echo "已回滚：上一版 → .output（刚才的版本移到 .output-prev，再回滚一次可以切回来）"`));
  log("\n  提醒：CDN 上可能还缓存着刚才的页面，需要的话到 CDN 控制台刷新 https://www.raydiene.cn/ 目录");
}

// ---------------------------------------------------------------- 主流程
const t0 = Date.now();
try {
  preflight();
  if (ROLLBACK) {
    if (DRY) die("--rollback 不支持预览");
    await rollback();
  } else {
    if (ONLY !== "site") await syncOss();
    if (ONLY !== "oss") {
      if (!SKIP_BUILD) await build();
      await deploySite();
    }
  }
  log(`\n✔ ${DRY ? "预览" : "完成"}，用时 ${Math.round((Date.now() - t0) / 1000)} 秒${DRY ? "（线上未做任何改动）" : ""}`);
} catch (e) {
  die(e.message);
}
