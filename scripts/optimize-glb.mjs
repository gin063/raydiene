/**
 * KeyShot 导出的 GLB → 网页可用资产。
 *
 *   node scripts/optimize-glb.mjs <输入.glb> <输出.glb>
 *
 * 针对 KeyShot「Smart Export → GLB」的实测产物做了这些事（磐石 Pro：22.2MB → 1.03MB）：
 *
 *  1. weld —— KeyShot 导出的网格**完全不共享顶点**（顶点数正好是三角面数 ×3），
 *     合并后顶点少 71%，这是体积的大头
 *  2. 剥离 occlusion 贴图 —— KeyShot 烘的 AO 极重（R 通道均值仅 44~80/255），
 *     glTF 只读 R 通道，等于把环境光削掉 80%，模型会渲成死板的黑。
 *     我们用实时 IBL，不需要烘死的 AO
 *  3. 绕序逐三角形对齐到厂家法线（不再整块翻转，见 alignWindingToNormals 注释）
 *  4. **保留 doubleSided** —— KeyShot 按图层切分实体，大量网格是开放面，
 *     强制单面会露出破洞。在线预览器是 doubleSided 的，观感干净就是这个原因
 *  4. 修 roughness —— KeyShot 大量材质导出成 rough=0 & metal=0（完美镜面绝缘体），
 *     会渲成「湿塑料」，给个下限
 *  5. 剥掉"只有 JPEG 噪声、没有真实凹凸"的法线图（见 stripFlatNormalMaps）
 *  6. 去相机 / dedup / prune / Draco
 *
 * ⚠️ 若对方将来重导时已经关掉 AO 烘焙、勾了 Draco，本脚本仍可安全重复执行。
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { weld, dedup, prune, draco } from "@gltf-transform/functions";
import draco3d from "draco3dgltf";
import sharp from "sharp";

/**
 * 让绕序与厂家的法线逐三角形对齐。
 *
 * ⚠️ 曾经用「有符号体积 < 0 就整块翻转」，这是**错的**，已造成实际损坏：
 * KeyShot 按材质/图层切分实体，导出的网格大量是**开放面**
 * （坚石 mesh#15 有 188,912 面、8,150 条边界边），
 * 开放面的有符号体积毫无意义，那一版误翻了坚石 4 个、磐石 Pro 1 个、磐石 Max 3 个网格，
 * 表现为破洞与暗块。
 *
 * 实测三款「绕序与存储法线一致率」为 99.55% / 99.82% / 99.73%
 * —— 厂家的绕序和法线本来就是一致的，没有系统性翻转。
 *
 * 所以判据只能是**逐三角形**、且以存储法线为准（法线来自 NURBS 曲面定义，是权威）：
 * 若 cross(e1,e2) 与该三角形的存储法线反向，就交换两个索引。
 * 这样绕序处处与法线一致，且不依赖任何「闭合/朝向」的全局猜测。
 */
function alignWindingToNormals(doc) {
  // 只修**真正反向**的。夹角接近 90° 的薄三角形，cross·normal 趋近 0，
  // 符号纯粹是数值噪声（Draco 量化后尤其明显），翻它没有意义还会破坏幂等性
  const EPS = 0.05;
  let flipped = 0;
  let total = 0;
  let sliver = 0;
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      const posA = prim.getAttribute("POSITION");
      const nrmA = prim.getAttribute("NORMAL");
      if (!posA || !nrmA) continue;
      const P = posA.getArray();
      const N = nrmA.getArray();
      const idxA = prim.getIndices();
      const I = idxA ? idxA.getArray() : null;
      const triCount = I ? I.length / 3 : P.length / 9;
      let touched = false;

      for (let t = 0; t < triCount; t++) {
        const ia = I ? I[t * 3] : t * 3;
        const ib = I ? I[t * 3 + 1] : t * 3 + 1;
        const ic = I ? I[t * 3 + 2] : t * 3 + 2;
        const a = ia * 3, b = ib * 3, c = ic * 3;
        const e1x = P[b] - P[a], e1y = P[b + 1] - P[a + 1], e1z = P[b + 2] - P[a + 2];
        const e2x = P[c] - P[a], e2y = P[c + 1] - P[a + 1], e2z = P[c + 2] - P[a + 2];
        const gx = e1y * e2z - e1z * e2y;
        const gy = e1z * e2x - e1x * e2z;
        const gz = e1x * e2y - e1y * e2x;
        const sx = (N[a] + N[b] + N[c]) / 3;
        const sy = (N[a + 1] + N[b + 1] + N[c + 1]) / 3;
        const sz = (N[a + 2] + N[b + 2] + N[c + 2]) / 3;
        total++;
        const gl = Math.hypot(gx, gy, gz);
        const sl = Math.hypot(sx, sy, sz);
        if (gl < 1e-20 || sl < 1e-9) { sliver++; continue; }
        const cos = (gx * sx + gy * sy + gz * sz) / (gl * sl);
        if (cos > -EPS) { if (cos < EPS) sliver++; continue; }

        if (I) {
          I[t * 3 + 1] = ic;
          I[t * 3 + 2] = ib;
        } else {
          for (let k = 0; k < 3; k++) {
            const tp = P[b + k]; P[b + k] = P[c + k]; P[c + k] = tp;
            const tn = N[b + k]; N[b + k] = N[c + k]; N[c + k] = tn;
          }
        }
        flipped++;
        touched = true;
      }

      if (touched) {
        if (I) idxA.setArray(I);
        else { posA.setArray(P); nrmA.setArray(N); }
      }
    }
  }
  return { flipped, total, sliver };
}

/**
 * 剥掉「只有噪声、没有细节」的法线贴图。
 *
 * KeyShot 会为每个材质都烘一张法线图，但坚石实测那些图**几乎完全平坦**
 * （通道均值 127.7 / 126.8 / 254.1，理论平坦值是 128 / 128 / 255，
 * 88% 的像素偏离 ≤3 个单位）—— 不携带任何真实凹凸信息。
 *
 * 问题在于它们存成 **JPEG**：色度子采样与 8×8 块效应把「平坦」变成了
 * ±几个单位的噪声。这点扰动落在 metalness 0.89~0.97 的近镜面金属上，
 * 会被镜面反射放大几十倍 → 表面出现水雾 / 油污 / 氧化般的斑块。
 *
 * 所以按**平坦度**判定后再剥，而不是无条件删除 —— 将来对方若真烘了
 * 细节法线（如拉丝、磨砂纹理），这里会自动保留。
 */
async function stripFlatNormalMaps(doc, threshold = 0.35) {
  const seen = new Map();
  let stripped = 0, kept = 0;
  for (const m of doc.getRoot().listMaterials()) {
    const tex = m.getNormalTexture();
    if (!tex) continue;
    const key = tex;
    if (!seen.has(key)) {
      let flat = false;
      try {
        const { data, info } = await sharp(Buffer.from(tex.getImage()))
          .raw().toBuffer({ resolveWithObject: true });
        const ch = info.channels;
        let off = 0;
        const n = data.length / ch;
        for (let i = 0; i < data.length; i += ch) {
          // 与"完全平坦"(128,128,255) 的最大通道偏差
          const d = Math.max(
            Math.abs(data[i] - 128),
            Math.abs(data[i + 1] - 128),
            Math.abs(data[i + 2] - 255)
          );
          if (d > 5) off++;
        }
        flat = off / n < threshold;
      } catch {
        flat = false; // 解不开就保守保留
      }
      seen.set(key, flat);
    }
    if (seen.get(key)) { m.setNormalTexture(null); stripped++; }
    else kept++;
  }
  return { stripped, kept };
}

const [src, dst] = process.argv.slice(2);
if (!src || !dst) {
  console.error("用法: node scripts/optimize-glb.mjs <输入.glb> <输出.glb>");
  process.exit(1);
}

/** rough/metal 同时为 0 时的兜底粗糙度 */
const MIN_ROUGHNESS = 0.25;

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  "draco3d.encoder": await draco3d.createEncoderModule(),
  "draco3d.decoder": await draco3d.createDecoderModule(),
});

const doc = await io.read(src);
const root = doc.getRoot();

const before = {
  materials: root.listMaterials().length,
  textures: root.listTextures().length,
};

const wind = alignWindingToNormals(doc);
const nrm = await stripFlatNormalMaps(doc);

let ao = 0, mirror = 0;
for (const m of root.listMaterials()) {
  if (m.getOcclusionTexture()) { m.setOcclusionTexture(null); ao++; }
  if (m.getRoughnessFactor() < 0.08 && m.getMetallicFactor() < 0.02) {
    m.setRoughnessFactor(MIN_ROUGHNESS);
    mirror++;
  }
}
const cams = root.listCameras().length;
for (const c of root.listCameras()) c.dispose();

/*
 * Draco 量化位数。**默认值对产品级光滑曲面不够用**：
 *   位置 14 位 → 0.025mm 网格；法线 10 位 → **5.63° 精度**
 * 5.63° 的法线在大面积光滑壳体上会snap 成可见的刻面条纹（用户报的"划痕"）。
 * 提到 位置 16 / 法线 14 → 0.006mm / 1.41°，坚石体积 2.31 → 2.91 MB，值。
 * 若仍有带状条纹，下一步换 EXT_meshopt_compression（默认 16 位且解码更快，
 * 但需在前端额外加载 meshopt 解码器）。
 */
await doc.transform(weld(), dedup(), prune(),
  draco({ quantizePosition: 16, quantizeNormal: 14 }));
await io.write(dst, doc);

const { statSync } = await import("node:fs");
const mb = (n) => (n / 1048576).toFixed(2) + " MB";
console.log(`${src}  →  ${dst}`);
console.log(`  体积    ${mb(statSync(src).size)} → ${mb(statSync(dst).size)}`);
console.log(`  材质    ${before.materials} → ${root.listMaterials().length}`);
console.log(`  贴图    ${before.textures} → ${root.listTextures().length}`);
console.log(`  剥 AO ${ao} · 修镜面材质 ${mirror} · 去相机 ${cams}`);
console.log(`  剥平坦法线图 ${nrm.stripped}` +
  (nrm.kept ? ` · 保留含细节的 ${nrm.kept}` : "") +
  (nrm.stripped ? "  ← 修复金属表面的水雾/油污斑块" : ""));
console.log(`  绕序对齐 ${wind.flipped} / ${wind.total} 个三角面 ` +
  `(${(wind.flipped / wind.total * 100).toFixed(2)}%)` +
  (wind.sliver ? `　跳过夹角≈90° 的薄面 ${wind.sliver}` : ""));
