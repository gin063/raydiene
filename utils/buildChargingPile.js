/**
 * 程序化充电桩 proxy 模型 —— 等工厂 3D 数模到手后整组替换成 GLTFLoader。
 *
 * 尺寸取自 composables/useProducts.js 的真实规格（单位换算成米）。
 * 四款其实是两种形态：坚石/磐石 186.5W×374.8H×121D，星辰/星耀 235W×365H×120D。
 * 差异体现在屏幕占比与前面板材质（钢化玻璃 vs PC+ABS）。
 *
 * three 是运行时动态 import 的（SSR 安全），所以从参数传入而非顶层 import。
 */

export const FINISHES = {
  obsidian: { label: "曜石黑", color: 0x1a1c1f, metalness: 0.35, roughness: 0.5 },
  moonlight: { label: "月光银", color: 0xc9ced6, metalness: 0.85, roughness: 0.26 },
  brand: { label: "雷迪恩蓝", color: 0x1f6d94, metalness: 0.55, roughness: 0.34 },
};

export const BRAND_COLOR = 0x2d9ed0;

/** w/h/d 单位米；screen = 屏幕占前面板高度的比例；glass = 钢化玻璃前面板 */
export const PILE_VARIANTS = {
  jianshi: { w: 0.1865, h: 0.3748, d: 0.121, screen: 0.28, glass: false },
  // 磐石 Pro 的「显示配置」是智能呼吸灯，没有屏幕 —— screen: 0 走无屏分支
  panshi: { w: 0.1865, h: 0.3748, d: 0.121, screen: 0, glass: false },
  panshiMax: { w: 0.1865, h: 0.3748, d: 0.121, screen: 0.34, glass: false },
  xingchen: { w: 0.235, h: 0.365, d: 0.12, screen: 0.5, glass: true },
  xingyao: { w: 0.235, h: 0.365, d: 0.12, screen: 0.76, glass: true },
};

function screenTexture(THREE, variant) {
  const big = variant.screen > 0.5;
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = Math.round(512 * (variant.h * variant.screen) / (variant.w * 0.82));
  const g = c.getContext("2d");
  const H = c.height;
  const brand = "#2d9ed0";

  g.fillStyle = "#05070a";
  g.fillRect(0, 0, 512, H);

  const cx = 256;
  const cy = big ? H * 0.38 : H * 0.44;
  const rad = Math.min(150, H * 0.3);

  g.lineCap = "round";
  g.lineWidth = rad * 0.17;
  g.strokeStyle = "rgba(45,158,208,0.22)";
  g.beginPath();
  g.arc(cx, cy, rad, Math.PI * 0.75, Math.PI * 2.25);
  g.stroke();
  g.strokeStyle = brand;
  g.beginPath();
  g.arc(cx, cy, rad, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * 0.62);
  g.stroke();

  g.fillStyle = "#ffffff";
  g.textAlign = "center";
  g.font = `600 ${rad * 0.72}px Inter, sans-serif`;
  g.fillText("62%", cx, cy + rad * 0.25);
  g.fillStyle = brand;
  g.font = `500 ${rad * 0.3}px Inter, sans-serif`;
  g.fillText("7.0 kW  充电中", cx, cy + rad * 1.5);

  // 大屏机型（星辰/星耀）多画一排功能图标，视觉上区分开
  if (big) {
    const y = H * 0.82;
    for (let i = 0; i < 4; i++) {
      const x = 100 + i * 104;
      g.strokeStyle = "rgba(255,255,255,0.34)";
      g.lineWidth = 4;
      g.strokeRect(x - 30, y - 30, 60, 60);
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * @param finish {{color:number, metalness:number, roughness:number}}
 *   五款各用一种机身色，切换时一眼能分辨。传对象而非 FINISHES 的 key ——
 *   机身色现在是产品属性，不是全局配色档位
 */
export function buildChargingPile(THREE, RoundedBoxGeometry, variantKey, finish = FINISHES.obsidian) {
  const V = PILE_VARIANTS[variantKey] ?? PILE_VARIANTS.panshi;
  const root = new THREE.Group();
  const parts = {};

  const hw = V.w / 2;
  const hh = V.h / 2;
  const hd = V.d / 2;

  const shellMat = new THREE.MeshPhysicalMaterial({
    color: finish.color,
    metalness: finish.metalness,
    roughness: finish.roughness,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25,
  });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x101317, metalness: 0.4, roughness: 0.6 });
  const faceMat = new THREE.MeshPhysicalMaterial({
    color: 0x080a0d,
    metalness: 0,
    // 钢化玻璃面板（星辰/星耀）比 PC+ABS 亮得多
    roughness: V.glass ? 0.03 : 0.18,
    clearcoat: 1,
    clearcoatRoughness: V.glass ? 0.02 : 0.12,
  });
  const ledMat = new THREE.MeshStandardMaterial({
    color: BRAND_COLOR, emissive: BRAND_COLOR, emissiveIntensity: 2.4, toneMapped: false,
  });

  const hasScreen = V.screen > 0;
  const screenMap = hasScreen ? screenTexture(THREE, V) : null;
  const screenMat = hasScreen
    ? new THREE.MeshBasicMaterial({ map: screenMap, toneMapped: false })
    : null;

  parts.backPlate = new THREE.Mesh(
    new RoundedBoxGeometry(V.w * 0.86, V.h * 0.9, 0.022, 3, 0.008), darkMat
  );
  parts.backPlate.position.set(0, 0, -hd - 0.012);

  parts.body = new THREE.Mesh(
    new RoundedBoxGeometry(V.w, V.h, V.d, 5, Math.min(0.024, V.w * 0.13)), shellMat
  );

  const faceW = V.w * 0.86;
  const faceH = V.h * 0.78;
  parts.faceplate = new THREE.Mesh(
    new RoundedBoxGeometry(faceW, faceH, 0.014, 4, 0.012), faceMat
  );
  parts.faceplate.position.set(0, V.h * 0.06, hd + 0.002);

  if (hasScreen) {
    parts.screen = new THREE.Mesh(
      new THREE.PlaneGeometry(V.w * 0.82, V.h * V.screen), screenMat
    );
    parts.screen.position.set(0, V.h * 0.1, hd + 0.0105);
  }

  // 无屏机型（磐石 Pro）把呼吸灯做成贯穿式长条，作为唯一的状态交互
  parts.ledStrip = new THREE.Mesh(
    new RoundedBoxGeometry(V.w * (hasScreen ? 0.55 : 0.72), hasScreen ? 0.014 : 0.02, 0.008, 2, 0.005),
    ledMat
  );
  parts.ledStrip.position.set(0, hasScreen ? -hh * 0.62 : V.h * 0.08, hd + 0.004);

  const vents = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const v = new THREE.Mesh(new THREE.BoxGeometry(0.004, V.h * 0.13, V.d * 0.55), darkMat);
    v.position.set(-hw - 0.0005, -hh * 0.34, -V.d * 0.27 + i * (V.d * 0.11));
    vents.add(v);
  }
  parts.vents = vents;

  // 枪 + 枪座 + 线缆：作为一个装配体一起爆炸
  const gunAssembly = new THREE.Group();
  const gx = hw + 0.045;

  const holster = new THREE.Mesh(
    new RoundedBoxGeometry(0.076, V.h * 0.3, 0.076, 3, 0.014), shellMat
  );
  holster.position.set(gx, V.h * 0.06, 0);
  gunAssembly.add(holster);

  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.055, 24), darkMat);
  nozzle.rotation.x = Math.PI / 2;
  nozzle.position.set(gx, V.h * 0.14, 0.042);
  gunAssembly.add(nozzle);

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.004, 12, 32), ledMat);
  collar.position.set(gx, V.h * 0.14, 0.068);
  gunAssembly.add(collar);

  const handle = new THREE.Mesh(new RoundedBoxGeometry(0.048, 0.1, 0.045, 3, 0.014), darkMat);
  handle.position.set(gx, V.h * 0.0, 0.035);
  handle.rotation.x = -0.18;
  gunAssembly.add(handle);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -hh, 0.0),
    new THREE.Vector3(0.02, -hh - 0.09, 0.06),
    new THREE.Vector3(gx * 0.7, -hh - 0.1, 0.085),
    new THREE.Vector3(gx + 0.008, -hh + 0.02, 0.06),
    new THREE.Vector3(gx, -hh + 0.1, 0.035),
  ]);
  gunAssembly.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.011, 12, false), darkMat));
  parts.gunAssembly = gunAssembly;

  Object.values(parts).forEach((p) => root.add(p));

  const materials = [shellMat, darkMat, faceMat, ledMat, screenMat].filter(Boolean);

  // 视觉中心（含线缆，线缆挂在机体下方所以重心偏下）。
  // 舞台里靠它把模型垂直居中 —— 用机体几何中心会导致下半截被切掉
  const bbox = new THREE.Box3().setFromObject(root);
  const centerY = (bbox.min.y + bbox.max.y) / 2;

  return {
    root,
    parts,
    ledMat,
    variant: V,
    centerY,
    bodyBottom: -hh,

    setFinish(f) {
      shellMat.color.setHex(f.color);
      shellMat.metalness = f.metalness;
      shellMat.roughness = f.roughness;
    },

    dispose() {
      root.traverse((o) => o.geometry?.dispose());
      materials.forEach((m) => m.dispose());
      screenMap?.dispose();
    },
  };
}
