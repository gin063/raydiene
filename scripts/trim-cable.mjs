/**
 * 裁短星辰 / 星耀的线缆，并把枪线末端的灰色断面改成线缆黑。
 *
 *   node scripts/trim-cable.mjs <输入.glb> <输出.glb>
 *
 * 跑在 KeyShot 原始导出上（E:\Code\demo\星辰.glb / 星耀.glb），
 * 之后再走 optimize-glb.mjs 生成 public/models 里的成品。
 *
 * ## 三件事
 * 1. **底部两根进线太长**：原始模型里从机身下方垂 178mm，坐石是 20mm、磐石是 42mm。
 *    用户定按磐石的 42mm（2026-09-20）。
 *    实现：这两根是**竖直的闭合圆管**，所以不做真正的切割 ——
 *    把切面以下的顶点 Y 全部夹到切面上。底面那块封盖整体上移，侧壁塌成零面积的退化三角形
 *    （不可见，weld 时会被合并）。这样天然保留封盖，不用自己补断面。
 * 2. **星耀枪线比星辰长**：星耀的枪线是「灰色短截 brep_15 + 黑色线缆 brep_19」两段，
 *    星辰只有前半截。所以直接删掉 brep_19 即与星辰一致，不用切割。
 * 3. **断面像「露骨头」**：两款剩下的那截 brep_15 材质是 0.5 灰、粗糙度 1 的塑料，
 *    接在黑色线缆上非常割裂。改挂线缆自己的黑色材质（brep_14），断面就成了线缆的黑色切口。
 *
 * ⚠️ 零件本身两端都是闭合的（实测边界边 0 条），所以不存在破洞，不需要重建断面。
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import draco3d from "draco3dgltf";

const CABLE_NODES = /^M25X1_5_body2(_Instance)?$/;   // 底部两根进线
const GUN_EXTRA = "brep_19";                          // 星耀多出来的那段枪线
const GUN_STUB = "brep_15";                           // 两款共有的枪线末段（材质是灰的）
const CABLE_MATERIAL = "brep_14";                     // 线缆黑：0,0,0 / 粗糙 0.11
const HANG_BELOW = 0.042;                             // 线缆露在外面的长度（米），= 磐石

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error("用法：node scripts/trim-cable.mjs <输入.glb> <输出.glb>");
  process.exit(1);
}

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  "draco3d.decoder": await draco3d.createDecoderModule(),
  "draco3d.encoder": await draco3d.createEncoderModule(),
});
const doc = await io.read(inPath);
const root = doc.getRoot();

/** 局部坐标 → 世界坐标 Y（矩阵列主序） */
const worldY = (m, p) => m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13];

// 1) 星耀多出来的那段枪线：整个零件删掉
for (const node of root.listNodes()) {
  if (node.getName() !== GUN_EXTRA || !node.getMesh()) continue;
  console.log(`  删除多余枪线零件 ${GUN_EXTRA}`);
  node.getMesh()?.dispose();
  node.dispose();
}

const cableNodes = [];
let coverBottom = Infinity;   // 除线缆外最低的零件 —— 线缆就是从它下面露出来的
for (const node of root.listNodes()) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const isCable = CABLE_NODES.test(node.getName());
  if (isCable) cableNodes.push(node);
  const wm = node.getWorldMatrix();
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute("POSITION");
    if (!pos) continue;
    const mn = pos.getMin([]);
    const mx = pos.getMax([]);
    let lo = Infinity;
    for (const x of [mn[0], mx[0]]) for (const y of [mn[1], mx[1]]) for (const z of [mn[2], mx[2]]) {
      lo = Math.min(lo, worldY(wm, [x, y, z]));
    }
    // 枪线也是线缆，不能当成「机身最低处」的参照
    if (!isCable && node.getName() !== GUN_STUB) coverBottom = Math.min(coverBottom, lo);
  }
}
if (!cableNodes.length) {
  console.error("没找到底部线缆零件，检查节点名");
  process.exit(1);
}

// 2) 底部进线：把切面以下的顶点夹到切面
const targetBottom = coverBottom - HANG_BELOW;
const done = new Set();
for (const node of cableNodes) {
  const wm = node.getWorldMatrix();
  // ⚠️ 别按局部 Y 直接夹：这两根线缆的节点是翻转的（局部 +Y 对应世界向下），
  // 按局部坐标砍会砍掉插进机身里的那一头，线缆变成悬空的一截（踩过）。
  // 逐顶点算世界高度，低于切面的再沿局部 Y 轴移上来，节点翻不翻转都对。
  for (const prim of node.getMesh().listPrimitives()) {
    const pos = prim.getAttribute("POSITION");
    // _Instance 与本体共用同一份网格，改一次就够，别改两遍
    if (!pos || done.has(pos)) continue;
    done.add(pos);
    const arr = pos.getArray().slice();
    let moved = 0;
    for (let i = 0; i < arr.length; i += 3) {
      const wy = worldY(wm, [arr[i], arr[i + 1], arr[i + 2]]);
      if (wy < targetBottom) { arr[i + 1] += (targetBottom - wy) / wm[5]; moved++; }
    }
    pos.setArray(arr);
    console.log(`  底部线缆 ${node.getName()}：上移顶点 ${moved} / ${arr.length / 3}`);
  }
}
console.log(`  线缆露出长度 ${(HANG_BELOW * 1000).toFixed(0)}mm（最低非线缆零件在世界 Y=${coverBottom.toFixed(3)}）`);

// 3) 枪线末段改挂线缆黑
const cableMat = root.listMaterials().find((m) => m.getName() === CABLE_MATERIAL);
if (!cableMat) {
  console.error(`没找到线缆材质 ${CABLE_MATERIAL}`);
  process.exit(1);
}
for (const node of root.listNodes()) {
  // 同名的还有不带网格的组节点，跳过
  if (node.getName() !== GUN_STUB || !node.getMesh()) continue;
  for (const prim of node.getMesh().listPrimitives()) {
    console.log(`  ${GUN_STUB} 材质 ${prim.getMaterial()?.getName()} → ${CABLE_MATERIAL}`);
    prim.setMaterial(cableMat);
  }
}

await io.write(outPath, doc);
console.log(`已写出 ${outPath}`);
