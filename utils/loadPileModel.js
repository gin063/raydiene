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
  // 深色非金属（黑玻璃面板、枪头、黑色塑料件）：基色近黑，几乎没有漫反射，
  // 看起来「亮」全靠映出环境的倒影 —— 真实黑玻璃就是这样。
  // 早先统一把非金属粗糙度抬到 ≥0.4，把它们的倒影糊没了，夜间就黑得像碳（2026-09-18 用户反馈）。
  // 所以单列一支：保留厂家原本的光滑度（原值 0.11~0.32），只把近乎镜面的抬到 0.15 避免锐利亮斑；
  // 倒影强度由 viewer 按昼夜设置（darkMats），夜间加强、日间正常
  darkLum: 0.04,
  darkRoughMin: 0.15,
  // 纯黑（线性 0）的面板正对着看只反射约 4% 的环境光（菲涅尔 F0），倒影再强也拉不起来，
  // 灯光打上去也毫无反应 —— 磐石中央面板就是这样变成「黑洞」的。基色抬到深炭灰，灯光能勾出形体
  // 0.012 → 0.025 仍太黑。用户 2026-09-20 要「靠本身亮度而不是环境反射」再提一档：
  // 基色决定灯光照上去有多亮（漫反射），环境倒影另算，所以抬基色不会让反光变多
  darkFloor: 0.06,
  // 带贴图的非金属 = 液晶屏 / 印了图案的玻璃面板（星辰/星耀左侧那块黑玻璃，logo 与小屏幕都在贴图里）。
  // 按玻璃处理：保持光滑、倒影随昼夜（darkMats）、贴图自发光让 logo 和界面显出来
  glassRoughMin: 0.12,
  // 金属 + 贴图有两种：彩色的是指示灯带（磐石的青色灯），要自发光；
  // 灰色的是拉丝铝纹理（星辰/星耀右侧面板）—— 以前一律自发光，拉丝铝自己发白光，所以「太白」
  emissiveSatMin: 0.3,
};

/** 贴图的平均颜色（缩到 8×8 取平均），用来区分彩色灯带与灰色金属纹理。失败返回 null */
function texAvg(tex) {
  try {
    const img = tex?.image;
    if (!img) return null;
    const c = document.createElement("canvas");
    c.width = c.height = 8;
    const g = c.getContext("2d", { willReadFrequently: true });
    g.drawImage(img, 0, 0, 8, 8);
    const d = g.getImageData(0, 0, 8, 8).data;
    let r = 0, gg = 0, b = 0;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; b += d[i + 2]; }
    const n = d.length / 4;
    return { r: r / n / 255, g: gg / n / 255, b: b / n / 255 };
  } catch {
    return null;
  }
}
const saturation = (c) => {
  const mx = Math.max(c.r, c.g, c.b), mn = Math.min(c.r, c.g, c.b);
  return mx > 0 ? (mx - mn) / mx : 0;
};

export async function loadPileModel(
  THREE, GLTFLoader, DRACOLoader, url,
  { dracoPath = "/draco/", maxAnisotropy = 8, matte = {}, rotateY = 0, colorFix = {}, partColorFix = [] } = {}
) {
  // 按产品覆盖部分哑光参数（如星辰/星耀的玻璃与合金反光更强，要单独压），其余沿用默认
  const mt = { ...MATTE, ...matte };
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

  // 按零件改色：同一材质被不同零件共用、只想改其中一部分时用。
  // 规则 { material: 材质名, maxSize: 零件包围盒最长边上限（模型原始单位）, color: sRGB 十六进制 }，
  // 命中的零件换成一份克隆材质再改色，共用这个材质的其他零件不受影响。
  // 例：磐石 Max 的无线图标与机身上两个 32mm 高的圆柱件共用「Color:156:168:171」，只改图标
  if (partColorFix.length) {
    const clones = new Map();
    const sz = new THREE.Vector3();
    root.traverse((o) => {
      if (!o.isMesh || Array.isArray(o.material)) return;
      for (const [i, rule] of partColorFix.entries()) {
        if (o.material.name !== rule.material) continue;
        if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
        o.geometry.boundingBox.getSize(sz);
        if (Math.max(sz.x, sz.y, sz.z) > rule.maxSize) continue;
        if (!clones.has(i)) {
          const cm = o.material.clone();
          cm.name = `${rule.material} · 局部改色`;
          cm.color.set(rule.color);
          clones.set(i, cm);
        }
        o.material = clones.get(i);
      }
    });
  }
  const materials = new Set();
  root.traverse((o) => {
    if (!o.isMesh) return;
    o.castShadow = false;
    o.receiveShadow = false;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => materials.add(m));
  });

  // 按材质名改回设计色（sRGB 十六进制）。KeyShot → glTF 时部分颜色丢了：
  // 磐石 Max 的 logo 字母材质名叫「Color:223:223:223」，导出后却是线性 0.052 的深灰，在黑面板上几乎看不见。
  // 必须在分类之前改，否则按错误的颜色会被归进「深色件」
  for (const m of materials) {
    if (colorFix[m.name] && m.color) m.color.set(colorFix[m.name]);
  }
  const darkMats = [];
  for (const m of materials) {
    const isMetal = (m.metalness ?? 0) >= mt.metalThreshold;
    const c = m.color;
    const lum = c ? 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b : 1;
    const isDark = !isMetal && !m.map && lum < mt.darkLum;
    const isPanel = !isMetal && !!m.map;
    // metalness 保持厂家原值不动 —— 它决定的是材质类别，不是反光强度
    if (isDark || isPanel) {
      if (m.roughness != null) {
        m.roughness = Math.max(m.roughness, isPanel ? mt.glassRoughMin : mt.darkRoughMin);
      }
      if (isDark && c && lum < mt.darkFloor) c.setRGB(mt.darkFloor, mt.darkFloor, mt.darkFloor);
      m.envMapIntensity = 1; // 实际值由 viewer 按主题写入
      darkMats.push(m);
    } else {
      if (m.roughness != null) {
        m.roughness = Math.max(m.roughness, isMetal ? mt.metalRoughness : mt.dielectricRoughness);
      }
      m.envMapIntensity = isMetal ? mt.metalEnv : mt.dielectricEnv;
    }
    // 自发光：屏幕与印刷面板（非金属 + 贴图）一律发光；金属 + 贴图只有彩色的灯带才发光，
    // 灰色的拉丝铝纹理不发光
    const glow = m.map && mt.emissive > 0 &&
      (!isMetal || saturation(texAvg(m.map) ?? { r: 0, g: 0, b: 0 }) >= mt.emissiveSatMin);
    if (glow) {
      m.emissiveMap = m.map;
      m.emissive = new THREE.Color(0xffffff);
      m.emissiveIntensity = mt.emissive;
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
    /** 深色非金属材质，倒影强度由 viewer 按昼夜统一设置 */
    darkMats,
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
