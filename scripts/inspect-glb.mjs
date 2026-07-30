/**
 * GLB 体检工具。
 *
 *   node scripts/inspect-glb.mjs <文件.glb> [标称宽 标称高 标称深(mm)]
 *
 * 专门针对「工厂 KeyShot 导出 → 网页可用」这条链路上反复出现的问题：
 *
 *  - 顶点是否共享（KeyShot 导出的一律不共享，顶点数正好是三角面数 ×3）
 *  - **绕序 / 法线是否朝内** —— 表现为「破面 + 黑黢黢」。KeyShot 全量导出
 *    doubleSided 会把它掩盖掉，只有改单面后才暴露
 *  - 世界尺寸与朝向（各家 KeyShot 场景朝向不统一，星辰/星耀正面朝 −X）
 *  - AO 是否被烘死（R 通道均值过低会把环境光削掉大半）
 *
 * 只读，不修改任何文件。修复走 scripts/optimize-glb.mjs。
 */
import fs from "node:fs";

const CT = {
  5120: [Int8Array, 1], 5121: [Uint8Array, 1], 5122: [Int16Array, 2],
  5123: [Uint16Array, 2], 5125: [Uint32Array, 4], 5126: [Float32Array, 4],
};
const NC = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };

const [file, sw, sh, sd] = process.argv.slice(2);
if (!file) {
  console.error("用法: node scripts/inspect-glb.mjs <文件.glb> [标称宽 高 深(mm)]");
  process.exit(1);
}

/* ---------- 容器 ---------- */
const buf = fs.readFileSync(file);
const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
let off = 12, g = null, bin = null;
while (off < buf.byteLength) {
  const len = dv.getUint32(off, true), type = dv.getUint32(off + 4, true);
  const data = buf.subarray(off + 8, off + 8 + len);
  if (type === 0x4e4f534a) g = JSON.parse(new TextDecoder().decode(data));
  if (type === 0x004e4942) bin = data;
  off += 8 + len + ((4 - ((off + 8 + len) % 4)) % 4);
}
const draco = (g.extensionsRequired || []).includes("KHR_draco_mesh_compression");
const mb = (n) => (n / 1048576).toFixed(2) + " MB";

console.log(`\n════ ${file} ════`);
console.log(`  体积 ${mb(buf.byteLength)}   生成器 ${g.asset?.generator ?? "未标注"}`);
console.log(`  扩展 ${(g.extensionsUsed || []).join(", ") || "无"}`);
console.log(`  nodes ${g.nodes?.length ?? 0} · meshes ${g.meshes?.length ?? 0} · ` +
  `materials ${g.materials?.length ?? 0} · images ${g.images?.length ?? 0} · ` +
  `cameras ${g.cameras?.length ?? 0}`);

/* ---------- 矩阵 ---------- */
const mul = (a, b) => {
  const o = new Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
    o[c * 4 + r] = s;
  }
  return o;
};
const I4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
function nodeMatrix(n) {
  if (n.matrix) return n.matrix;
  const t = n.translation || [0, 0, 0], q = n.rotation || [0, 0, 0, 1], s = n.scale || [1, 1, 1];
  const [x, y, z, w] = q, x2 = x + x, y2 = y + y, z2 = z + z;
  const xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2;
  const wx = w * x2, wy = w * y2, wz = w * z2;
  return [
    (1 - (yy + zz)) * s[0], (xy + wz) * s[0], (xz - wy) * s[0], 0,
    (xy - wz) * s[1], (1 - (xx + zz)) * s[1], (yz + wx) * s[1], 0,
    (xz + wy) * s[2], (yz - wx) * s[2], (1 - (xx + yy)) * s[2], 0,
    t[0], t[1], t[2], 1,
  ];
}
const apply = (m, p) => [
  m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12],
  m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
  m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14],
];

function readAccessor(idx) {
  const a = g.accessors[idx], bv = g.bufferViews[a.bufferView];
  const [Arr, sz] = CT[a.componentType], n = NC[a.type];
  const base = (bv.byteOffset || 0) + (a.byteOffset || 0);
  const stride = bv.byteStride || sz * n;
  const out = new Float64Array(a.count * n);
  for (let i = 0; i < a.count; i++) {
    const o = bin.byteOffset + base + i * stride;
    const v = new Arr(bin.buffer.slice(o, o + sz * n));
    for (let c = 0; c < n; c++) out[i * n + c] = v[c];
  }
  return out;
}

/* ---------- 几何统计 ---------- */
let verts = 0, tris = 0;
for (const m of g.meshes || []) for (const pr of m.primitives || []) {
  const pos = g.accessors[pr.attributes.POSITION];
  verts += pos.count;
  tris += pr.indices != null ? g.accessors[pr.indices].count / 3 : pos.count / 3;
}
const attrs = new Set();
for (const m of g.meshes || []) for (const pr of m.primitives || []) {
  Object.keys(pr.attributes).forEach((a) => attrs.add(a));
}
const share = tris ? verts / tris : 0;
console.log(`\n── 几何 ──`);
console.log(`  顶点 ${verts.toLocaleString()} · 三角面 ${Math.round(tris).toLocaleString()}`);
console.log(`  顶点属性 ${[...attrs].join(", ")}`);
console.log(`  顶点/三角面 = ${share.toFixed(2)}   ` +
  (share > 2.9 ? "⚠ 顶点完全不共享（KeyShot 原始导出的典型特征，weld 可省 ~70% 体积）" : "✓ 已合并"));

/* ---------- 世界尺寸 ---------- */
let mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9], body = null, bodyVol = 0;
(function () {
  const walk = (i, par) => {
    const n = g.nodes[i], m = mul(par, nodeMatrix(n));
    if (n.mesh != null) for (const pr of g.meshes[n.mesh].primitives) {
      const a = g.accessors[pr.attributes.POSITION];
      if (!a.min) continue;
      let lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
      for (let c = 0; c < 8; c++) {
        const p = apply(m, [c & 1 ? a.max[0] : a.min[0], c & 2 ? a.max[1] : a.min[1], c & 4 ? a.max[2] : a.min[2]]);
        for (let j = 0; j < 3; j++) {
          lo[j] = Math.min(lo[j], p[j]); hi[j] = Math.max(hi[j], p[j]);
          mn[j] = Math.min(mn[j], p[j]); mx[j] = Math.max(mx[j], p[j]);
        }
      }
      const vol = (hi[0] - lo[0]) * (hi[1] - lo[1]) * (hi[2] - lo[2]);
      if (vol > bodyVol) { bodyVol = vol; body = [lo, hi]; }
    }
    (n.children || []).forEach((c) => walk(c, m));
  };
  (g.scenes[g.scene ?? 0].nodes).forEach((n) => walk(n, I4));
})();
const size = mx.map((v, i) => (v - mn[i]) * 1000);
const bSize = body ? body[1].map((v, i) => (v - body[0][i]) * 1000) : null;
const f = (v) => v.toFixed(0).padStart(5);
console.log(`\n── 世界尺寸（mm，已应用全部节点变换）──`);
console.log(`  整体 ${size.map(f).join("")}      Y 范围 ${(mn[1] * 1000).toFixed(0)} ~ ${(mx[1] * 1000).toFixed(0)}`);
if (bSize) console.log(`  主壳 ${bSize.map(f).join("")}      ← 包围盒体积最大的网格`);
console.log(`  单位 ${size[0] < 1000 ? "米 ✓" : "❌ 非米，需缩放"}`);
if (sw && bSize) {
  const spec = [+sw, +sh, +sd];
  const near = (a, b) => Math.abs(a - b) < 30;
  const same = near(bSize[0], spec[0]) && near(bSize[2], spec[2]);
  const swapped = near(bSize[2], spec[0]) && near(bSize[0], spec[2]);
  console.log(`  标称 ${spec.map(f).join("")}`);
  console.log(`  朝向 ${same ? "X=宽 Z=深  ✓ 无需旋转"
    : swapped ? "X=深 Z=宽  ⚠ 绕 Y 转了 90°，需 rotateY"
    : "? 无法判定，请人工核对"}`);
  // 背面贴墙 → 那一侧主壳外突出量应为 0
  for (const [ax, L] of [[0, "X"], [2, "Z"]]) {
    const op = (mx[ax] - body[1][ax]) * 1000, om = (body[0][ax] - mn[ax]) * 1000;
    if (op > 20 || om > 20) {
      console.log(`  ${L} 轴主壳外突出  +${L} ${op.toFixed(0)}mm / −${L} ${om.toFixed(0)}mm` +
        `   → 伸出的一侧有枪或线缆，突出为 0 的那侧是贴墙背面`);
    }
  }
}

/* ---------- 绕序 / 法线 ---------- */
console.log(`\n── 绕序与法线 ──`);
if (draco) {
  console.log("  ⚠ 已 Draco 压缩，无法在此解码逐顶点数据。请对**原始导出文件**运行本工具。");
} else {
  let badLen = 0, nan = 0, totalN = 0, degen = 0, totalT = 0, outMesh = 0, inMesh = 0;
  const suspects = [];
  g.meshes.forEach((mesh, mi) => {
    for (const pr of mesh.primitives) {
      if (pr.attributes.NORMAL == null) { console.log(`  ❌ mesh#${mi} 缺 NORMAL`); continue; }
      const P = readAccessor(pr.attributes.POSITION);
      const N = readAccessor(pr.attributes.NORMAL);
      const Ix = pr.indices != null ? readAccessor(pr.indices) : null;
      const nv = P.length / 3;
      for (let i = 0; i < nv; i++) {
        const x = N[i * 3], y = N[i * 3 + 1], z = N[i * 3 + 2];
        totalN++;
        if (!Number.isFinite(x + y + z)) { nan++; continue; }
        if (Math.abs(Math.hypot(x, y, z) - 1) > 0.05) badLen++;
      }
      let lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
      for (let i = 0; i < nv; i++) for (let c = 0; c < 3; c++) {
        lo[c] = Math.min(lo[c], P[i * 3 + c]); hi[c] = Math.max(hi[c], P[i * 3 + c]);
      }
      const ctr = lo.map((v, c) => (v + hi[c]) / 2);
      const tri = Ix ? Ix.length / 3 : nv / 3;
      let vol = 0, outward = 0;
      for (let t = 0; t < tri; t++) {
        const a = (Ix ? Ix[t * 3] : t * 3) * 3;
        const b = (Ix ? Ix[t * 3 + 1] : t * 3 + 1) * 3;
        const c = (Ix ? Ix[t * 3 + 2] : t * 3 + 2) * 3;
        const e1 = [P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]];
        const e2 = [P[c] - P[a], P[c + 1] - P[a + 1], P[c + 2] - P[a + 2]];
        const cr = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
        totalT++;
        if (Math.hypot(...cr) / 2 < 1e-12) { degen++; continue; }
        vol += (P[a] * (P[b + 1] * P[c + 2] - P[b + 2] * P[c + 1])
              - P[a + 1] * (P[b] * P[c + 2] - P[b + 2] * P[c])
              + P[a + 2] * (P[b] * P[c + 1] - P[b + 1] * P[c])) / 6;
        const fx = (P[a] + P[b] + P[c]) / 3 - ctr[0];
        const fy = (P[a + 1] + P[b + 1] + P[c + 1]) / 3 - ctr[1];
        const fz = (P[a + 2] + P[b + 2] + P[c + 2]) / 3 - ctr[2];
        const sx = (N[a] + N[b] + N[c]) / 3, sy = (N[a + 1] + N[b + 1] + N[c + 1]) / 3, sz = (N[a + 2] + N[b + 2] + N[c + 2]) / 3;
        if (fx * sx + fy * sy + fz * sz >= 0) outward++;
      }
      const ratio = tri ? outward / tri : 1;
      if (vol < 0 && ratio < 0.5) { inMesh++; suspects.push({ mi, tri: Math.round(tri), ratio }); }
      else outMesh++;
    }
  });
  const pct = (a, b) => (b ? (a / b * 100).toFixed(2) + "%" : "—");
  console.log(`  法线非单位长度 ${badLen} / ${totalN} (${pct(badLen, totalN)})   NaN ${nan}`);
  console.log(`  退化三角形     ${degen} / ${totalT} (${pct(degen, totalT)})`);
  console.log(`  朝向正常的网格 ${outMesh} / ${outMesh + inMesh}`);
  if (inMesh) {
    console.log(`  ❌ 朝内的网格 ${inMesh} 个 —— 单面渲染下会「破面 + 黑黢黢」：`);
    suspects.sort((a, b) => b.tri - a.tri).forEach((s) =>
      console.log(`       mesh#${String(s.mi).padStart(3)}  ${s.tri.toLocaleString().padStart(8)} 面   法线朝外仅 ${(s.ratio * 100).toFixed(0)}%`));
    console.log(`     → optimize-glb.mjs 的 fixInvertedMeshes() 会自动翻正`);
  } else {
    console.log(`  ✓ 无朝内网格`);
  }
}

/* ---------- 材质与贴图 ---------- */
const dbl = (g.materials || []).filter((m) => m.doubleSided).length;
const ao = (g.materials || []).filter((m) => m.occlusionTexture).length;
const mirror = (g.materials || []).filter((m) => {
  const p = m.pbrMetallicRoughness || {};
  return (p.roughnessFactor ?? 1) < 0.08 && (p.metallicFactor ?? 1) < 0.02;
}).length;
console.log(`\n── 材质 ──`);
console.log(`  doubleSided ${dbl} / ${g.materials?.length ?? 0}` +
  (dbl ? "   ← 刻意保留：KeyShot 按图层切分，大量网格是开放面，强制单面会露破洞" : ""));
console.log(`  含 occlusion 贴图 ${ao}` + (ao ? "   ⚠ 烘死的 AO，会削掉环境光" : "   ✓"));
console.log(`  rough=0 且 metal=0 ${mirror}` + (mirror ? "   ⚠ 完美镜面，会渲成湿塑料" : "   ✓"));
if (g.images?.length && bin && !draco) {
  const bytes = g.images.reduce((s, im) => s + (im.bufferView != null ? g.bufferViews[im.bufferView].byteLength : 0), 0);
  console.log(`  贴图合计 ${mb(bytes)}   几何 ${mb(bin.byteLength - bytes)}`);
}
console.log();
