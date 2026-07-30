/**
 * 加载真实 GLB 模型，对外暴露与 buildChargingPile 相同的接口，
 * 这样 PileViewer3D 不需要区分「程序化 proxy」和「工厂数模」。
 *
 * 资产先经 scripts/optimize-glb.mjs 处理过（合并顶点 / 剥 AO / 单面 / Draco）。
 */

/**
 * 哑光化。
 *
 * KeyShot 的材质翻译到 glTF 后偏差很大：黑色面板导出成近乎完美的镜面，
 * 在高亮白影棚里会炸成刺眼高光。
 *
 * ⚠️ 关键：**哑光靠 roughness，不靠压 metalness**。
 * PBR 里金属没有漫反射项，颜色完全来自「反射环境 × baseColor」。
 * 压低 metalness 会把中灰金属变成用 baseColor 做漫反射的亮塑料 —— 直接糊成白色。
 * 同理金属件的 envMapIntensity 不能压太狠，压狠了金属会发黑（没有漫反射兜底）。
 *
 * 所以按金属/非金属分两支处理。
 */
const MATTE = {
  metalThreshold: 0.5,
  // 金属：粗糙度拉高做哑光，环境强度保住让它还有金属感
  metalRoughness: 0.55,
  metalEnv: 0.95,
  // 非金属（黑玻璃面板、线缆、枪头）：这些是最容易糊成死黑的部分，
  // 环境强度必须给够，否则正面、侧面、logo 全看不清
  dielectricRoughness: 0.4,
  dielectricEnv: 0.75,
  // 带 baseColor 贴图的材质在这批模型里就是屏幕与灯带 —— 真机是自发光的，
  // 只靠环境光照永远是一块死黑，中央那块 HUD 尤其明显
  emissive: 0.9,
};

export async function loadPileModel(
  THREE, GLTFLoader, DRACOLoader, url,
  { dracoPath = "/draco/", maxAnisotropy = 8, matte = MATTE, rotateY = 0 } = {}
) {
  const draco = new DRACOLoader().setDecoderPath(dracoPath);
  const loader = new GLTFLoader().setDRACOLoader(draco);

  const gltf = await loader.loadAsync(url);
  const root = gltf.scene;
  draco.dispose();

  // 各家 KeyShot 场景的朝向不统一（星辰的正面朝 +X 而非 +Z）。
  // 判据：机体背面是贴墙面，那一侧主壳外的突出量为 0；有充电枪突出的一侧才是正面。
  // 统一转正到「正面朝 +Z」，相机机位与自动旋转才能对全系通用
  if (rotateY) root.rotation.y = (rotateY * Math.PI) / 180;

  // 必须在旋转之后量
  const bbox = new THREE.Box3().setFromObject(root);

  /*
   * 居中基准分两轴处理：
   *  - 横向(X/Z) 按**主壳**居中。星辰/星耀的枪向右伸出 167mm，
   *    用整体包围盒中心会把机体推离舞台中轴，旋转时看着不对称
   *  - 纵向(Y) 仍按整体包围盒，否则下垂的线缆会出画
   * 主壳 = 包围盒体积最大的那个网格，不依赖命名（KeyShot 导出的名字没有语义）
   */
  let body = null;
  let bodyVol = 0;
  const b = new THREE.Box3();
  root.updateWorldMatrix(true, true);
  root.traverse((o) => {
    if (!o.isMesh) return;
    b.setFromObject(o);
    const s2 = b.getSize(new THREE.Vector3());
    const vol = s2.x * s2.y * s2.z;
    if (vol > bodyVol) { bodyVol = vol; body = b.clone(); }
  });
  const hub = (body ?? bbox).getCenter(new THREE.Vector3());
  const center = new THREE.Vector3(hub.x, (bbox.min.y + bbox.max.y) / 2, hub.z);
  const centerY = center.y;

  const materials = new Set();
  root.traverse((o) => {
    if (!o.isMesh) return;
    o.castShadow = false;
    o.receiveShadow = false;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => materials.add(m));
  });

  for (const m of materials) {
    const isMetal = (m.metalness ?? 0) >= matte.metalThreshold;
    // metalness 保持厂家原值不动 —— 它决定的是材质类别，不是反光强度
    if (m.roughness != null) {
      m.roughness = Math.max(m.roughness, isMetal ? matte.metalRoughness : matte.dielectricRoughness);
    }
    m.envMapIntensity = isMetal ? matte.metalEnv : matte.dielectricEnv;
    // 屏幕/灯带自发光
    if (m.map && matte.emissive > 0) {
      m.emissiveMap = m.map;
      m.emissive = new THREE.Color(0xffffff);
      m.emissiveIntensity = matte.emissive;
    }
    // 各向异性过滤：斜视角下的贴图不再糊成一片
    for (const v of Object.values(m)) {
      if (v?.isTexture) { v.anisotropy = maxAnisotropy; v.needsUpdate = true; }
    }
    m.needsUpdate = true;
  }

  return {
    root,
    // GLB 里没有可呼吸的灯带材质；viewer 侧对 null 做了保护
    ledMat: null,
    center,
    centerY,
    bodyBottom: (body ?? bbox).min.y,
    isGLB: true,

    /** 真实数模用厂家自己的材质，不做配色覆写 —— 覆写等于毁掉实拍还原度 */
    setFinish() {},

    dispose() {
      root.traverse((o) => o.geometry?.dispose());
      materials.forEach((m) => {
        Object.values(m).forEach((v) => v?.isTexture && v.dispose());
        m.dispose();
      });
    },
  };
}
