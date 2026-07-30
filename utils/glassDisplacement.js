/**
 * Liquid Glass 折射位移图生成器。
 *
 * 原理：把元件当成一块有圆角斜面（bevel）的玻璃板。斜面处表面有斜率，
 * 光线穿过时按 Snell 定律偏折，产生横向位移 —— 这就是"背景在边缘被弯曲"
 * 的来源。中心是平的，所以不位移；越靠外边缘斜率越大，位移越强。
 *
 * 输出编码成一张 PNG：R 通道 = X 方向位移，G 通道 = Y 方向位移，
 * 128 为中性值。交给 SVG <feDisplacementMap> 消费。
 *
 * 注意 feDisplacementMap 的公式是 displacement = scale * (C/255 - 0.5)，
 * 我们用 128±127 编码，所以真实 scale 要乘 255/127 才能还原到像素。
 */

/** 圆角矩形的有符号距离场，内部为负 */
function sdRoundRect(px, py, halfW, halfH, r) {
  const qx = Math.abs(px) - halfW + r;
  const qy = Math.abs(py) - halfH + r;
  return (
    Math.min(Math.max(qx, qy), 0) +
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
    r
  );
}

/**
 * @param {number} w 元件宽（CSS px）
 * @param {number} h 元件高（CSS px）
 * @param {object} opt
 * @param {number} opt.radius 圆角半径
 * @param {number} opt.bevel  斜面宽度：从边缘往内多少像素内完成从"竖直"到"平坦"的过渡
 * @param {number} opt.ior    折射率（真玻璃 1.5，水 1.33，调高更夸张）
 * @param {number} opt.thickness 玻璃厚度，线性放大位移量
 * @param {number} opt.spread 折射沿斜面的分布 0~1。
 *   0 = 四分之一圆倒角，物理准确但 88% 的位移挤在最外侧那一丁点里，观感只剩一根发丝线；
 *   1 = 余弦轮廓，位移均匀铺满整条斜面，UI 上好看得多。
 * @param {number} opt.magnify 整体放大 0~0.25。
 *   ★ 这条是"看起来像玻璃"的关键。只做边缘折射时，直边上的位移量沿边是恒定的 ——
 *   竖线在左右边被整体平移仍是竖线、横线在上下边同理，**只有斜线看得出变形**。
 *   真透镜内部是整体放大的，玻璃内外的线条有尺度差，这个信号对横竖线一视同仁。
 * @returns {{ url: string, scale: number }} PNG data URL 与配套的 feDisplacementMap scale
 */
export function makeDisplacementMap(w, h, opt) {
  const {
    radius = 24,
    bevel = 16,
    ior = 1.5,
    thickness = 12,
    spread = 0.75,
    magnify = 0.07,
  } = opt || {};

  // 位移图是平滑的，不需要按 DPR 出图；限个上限省掉大画布的 toDataURL 开销
  const cap = 512;
  const s = Math.min(1, cap / Math.max(w, h));
  const cw = Math.max(4, Math.round(w * s));
  const ch = Math.max(4, Math.round(h * s));

  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const g = canvas.getContext("2d");
  const img = g.createImageData(cw, ch);
  const px = img.data;

  const halfW = (w * s) / 2;
  const halfH = (h * s) / 2;
  const r = Math.min(radius * s, Math.min(halfW, halfH));
  const bw = Math.max(1, bevel * s);
  const th = thickness * s;

  // 第一遍：算出每个像素的位移向量，同时记录最大模长用于归一化
  const dx = new Float32Array(cw * ch);
  const dy = new Float32Array(cw * ch);
  let maxMag = 1e-6;
  const eps = 0.75;

  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const i = y * cw + x;
      const cx = x + 0.5 - cw / 2;
      const cy = y + 0.5 - ch / 2;

      const d = sdRoundRect(cx, cy, halfW, halfH, r);
      if (d > 0) continue; // 元件外部，不位移

      // 整体放大：往中心取样，位移量正比于离中心的距离。
      // 覆盖整个元件（含平坦的中心区），所以横线竖线也能看出尺度差。
      let vx = -magnify * cx;
      let vy = -magnify * cy;

      if (-d <= bw) {
        // u: 0 在外边缘，1 在斜面内边界
        const u = -d / bw;
        const a = 1 - u;
        // 圆弧轮廓：边缘近乎竖直（斜率发散，钳到 8 免得数值爆掉）
        const sCirc = Math.min(8, a / Math.sqrt(Math.max(1e-6, 1 - a * a)));
        // 余弦轮廓：斜率从 π/2 平缓收到 0，位移铺满整条斜面
        const sCos = (Math.PI / 2) * Math.cos((u * Math.PI) / 2);
        const slope = sCirc * (1 - spread) + sCos * spread;

        // Snell：入射角 = 表面斜率的反正切，折射后横向偏移 = 厚度 × tan(θi-θt)
        const thetaI = Math.atan(slope);
        const thetaT = Math.asin(Math.min(1, Math.sin(thetaI) / ior));
        const mag = th * Math.tan(thetaI - thetaT);

        if (mag > 0) {
          // 数值梯度求外法线方向（SDF 梯度指向外部）
          const gx =
            sdRoundRect(cx + eps, cy, halfW, halfH, r) -
            sdRoundRect(cx - eps, cy, halfW, halfH, r);
          const gy =
            sdRoundRect(cx, cy + eps, halfW, halfH, r) -
            sdRoundRect(cx, cy - eps, halfW, halfH, r);
          const gl = Math.hypot(gx, gy) || 1;

          // 沿外法线取样：边缘把外侧的背景"压"进斜面里，这才是透镜该有的样子
          vx += (gx / gl) * mag;
          vy += (gy / gl) * mag;
        }
      }

      dx[i] = vx;
      dy[i] = vy;
      const m = Math.hypot(vx, vy);
      if (m > maxMag) maxMag = m;
    }
  }

  // 第二遍：归一化后编码进 RG 通道
  for (let i = 0; i < cw * ch; i++) {
    const o = i * 4;
    px[o] = 128 + Math.round((dx[i] / maxMag) * 127);
    px[o + 1] = 128 + Math.round((dy[i] / maxMag) * 127);
    px[o + 2] = 128;
    px[o + 3] = 255;
  }
  g.putImageData(img, 0, 0);

  return {
    url: canvas.toDataURL(),
    // 位移图是缩过的，还原到元件坐标系要除回 s
    scale: (maxMag / s) * (255 / 127),
  };
}

/**
 * WebKit（Safari + 所有 iOS 浏览器）和 Firefox 不支持
 * backdrop-filter: url(#svg-filter) —— Safari 会静默丢掉 SVG 部分只留平模糊。
 *
 * 不能用 CSS.supports 探测：Safari 对 url() 返回 true 但实际不生效。
 * 只能按引擎判断。iOS 上所有浏览器都是 WKWebView，Chrome iOS 同样不行。
 */
export function supportsSvgBackdrop() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;

  const isIOS =
    /iP(hone|ad|od)/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isDesktopSafari =
    /Safari/.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Android/.test(ua);
  const isFirefox = /Firefox|FxiOS/.test(ua);

  if (isIOS || isDesktopSafari || isFirefox) return false;
  return CSS.supports("backdrop-filter", "blur(1px)");
}
