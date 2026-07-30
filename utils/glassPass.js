/**
 * WebGL 液态玻璃后处理 pass。
 *
 * 为什么不用 CSS：CSS 只能组合固定的滤镜原语，做不到菲涅尔、环境反射、
 * 光谱色散、厚度相关的变半径模糊，尤其做不到**面板之间的流体融合**。
 * 代价是它只能折射自己场景里的像素，看不见 DOM —— 所以玻璃 UI 必须落在 canvas 内。
 *
 * 流程：场景 → rtScene ──┬─→ 两趟高斯 → rtBlur ─┐
 *                        └──────────────────────┴─→ 玻璃合成 → 屏幕
 *
 * 面板用 SDF 定义，彼此之间用 smooth-min 求并 —— 靠近时自动融合成一滴。
 * 文字仍然走 DOM 叠在上面：canvas 里的文字在高 DPR 下要么糊要么不可选。
 */

const MAX_PANELS = 16;

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const BLUR = /* glsl */ `
uniform sampler2D tSrc;
uniform vec2 uDir;     // 逐趟切换横/纵
varying vec2 vUv;
void main() {
  // 9 抽头高斯，权重合一
  float w[5];
  w[0] = 0.227027; w[1] = 0.194594; w[2] = 0.121621; w[3] = 0.054054; w[4] = 0.016216;
  vec3 c = texture2D(tSrc, vUv).rgb * w[0];
  for (int i = 1; i < 5; i++) {
    vec2 o = uDir * float(i);
    c += texture2D(tSrc, vUv + o).rgb * w[i];
    c += texture2D(tSrc, vUv - o).rgb * w[i];
  }
  gl_FragColor = vec4(c, 1.0);
}
`;

/**
 * 全屏廉价拷贝。
 * 玻璃着色器很贵（每像素多次 SDF 求值 + 多次纹理采样），但只有约 22% 的像素
 * 落在面板上。所以：全屏只做这个 1 次采样的拷贝，玻璃着色器改用 scissor
 * 只在各分组的包围盒内运行。过渡期的全屏运动模糊也在这里做。
 */
const COPY = /* glsl */ `
uniform sampler2D tScene;
uniform sampler2D tBlur;
uniform float uTransition;
varying vec2 vUv;
void main() {
  if (uTransition > 0.001) {
    vec2 z = (vUv - 0.5) * (1.0 - uTransition * 0.07) + 0.5;
    gl_FragColor = vec4(mix(texture2D(tScene, z).rgb, texture2D(tBlur, z).rgb, uTransition), 1.0);
  } else {
    gl_FragColor = vec4(texture2D(tScene, vUv).rgb, 1.0);
  }
}
`;

const GLASS = /* glsl */ `
#define MAX ${MAX_PANELS}
#define PI 3.14159265
// 6 → 3。默认色散只有 0.03，6 次采样的偏移彼此只差 3%（在 12px 厚度下约 0.4px），
// 完全是浪费。若把 uDispersion 调到 0.06 以上，再改回 6
#define SPECTRAL 3

uniform sampler2D tScene;
uniform sampler2D tBlur;
uniform vec2  uRes;
uniform int   uCount;
uniform vec4  uPanel[MAX];   // xy = 中心(px, y 向下), zw = 半宽/半高
uniform float uRound[MAX];
uniform float uGroup[MAX];   // 同组才融合。跨组硬相交 —— 带文字的面板绝不能粘一起
uniform float uBlend;        // smooth-min 融合半径, 决定"多近才会粘成一滴"
uniform float uShadow;       // 卡片投影强度
uniform float uShadowY;      // 投影下移量
uniform float uEdge;         // 亮底上给卡片一条暗色定义边
uniform float uTransition;   // 0~1 产品切换时的全屏运动模糊 + 缩放
uniform float uBevel;
uniform float uDomeLen;
uniform float uDomeAmt;
uniform float uThickness;
uniform float uIor;
uniform float uDispersion;
uniform float uFrost;
uniform float uTint;
uniform vec3  uTintColor;  // 染色目标。亮底往白染，暗底往深色染
uniform float uRim;
uniform float uEnv;
varying vec2 vUv;

float sdRound(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

// 多项式 smooth-min：两个面板靠近时形成液态的颈部而不是硬相交
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// 面板按组号排好序传进来：同组内 smooth-min（会粘成一滴），跨组硬 min（各自独立）。
// 上一版全局融合的后果是两块带文字的面板一粘，文字直接叠在一起没法看。
float field(vec2 p) {
  float d = 1e6;
  float cur = 1e6;
  float curG = -1.0;
  for (int i = 0; i < MAX; i++) {
    if (i >= uCount) break;
    float di = sdRound(p - uPanel[i].xy, uPanel[i].zw, uRound[i]);
    if (uGroup[i] == curG) {
      cur = smin(cur, di, uBlend);
    } else {
      d = min(d, cur);
      cur = di;
      curG = uGroup[i];
    }
  }
  return min(d, cur);
}

// 程序化环境：一道天光梯度 + 一个高光瓣。比贴 HDRI 省一次请求，够用
vec3 envColor(vec3 r) {
  vec3 sky = mix(vec3(0.015, 0.03, 0.055), vec3(0.42, 0.62, 0.85), r.y * 0.5 + 0.5);
  vec3 L = normalize(vec3(-0.45, 0.78, 0.55));
  return sky + vec3(1.0) * pow(max(dot(r, L), 0.0), 56.0) * 2.6;
}

// 波长权重：把 SPECTRAL 次采样摊成连续彩虹边，而不是 RGB 三道硬边
vec3 spectrum(float t) {
  return vec3(
    smoothstep(0.58, 0.0, t),
    exp(-pow((t - 0.5) * 3.1, 2.0)),
    smoothstep(0.42, 1.0, t)
  );
}

void main() {
  // 面板坐标是 DOM 口径（y 从顶部往下），而 vUv.y 是从底部往上 —— 这里翻一次。
  // 后面凡是把 px 空间的偏移换回 uv 空间，y 都要再取反。
  vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uRes;
  float d = field(px);
  // 场景必须是不透明的（scene.background 挂了渐变贴图）——
  // 玻璃要有东西可折射，而它看不见 canvas 背后的页面。
  vec3 base = texture2D(tScene, vUv).rgb;

  // 玻璃外：只画卡片投影。参考里每张卡都有一层很淡的下沉阴影，
  // 是它们在亮底上"浮起来"的关键
  if (d > 1.0) {
    // 切换产品时只糊模型区，UI 卡片保持锐利 —— 参考视频里也是主体动、面板不动
    if (uTransition > 0.001) {
      vec2 z = (vUv - 0.5) * (1.0 - uTransition * 0.07) + 0.5;
      base = mix(texture2D(tScene, z).rgb, texture2D(tBlur, z).rgb, uTransition);
    }
    if (d < 44.0 && uShadow > 0.0) {
      float ds = max(field(px - vec2(0.0, uShadowY)), 0.0);
      base *= 1.0 - exp(-ds / 13.0) * uShadow;
    }
    gl_FragColor = vec4(base, 1.0);
    return;
  }

  // SDF 梯度 = 外法线方向。用**前向差分**复用已算出的中心值 d：
  // 2 次 field() 而非 4 次。SDF 的梯度模长恒为 1，前向差分精度足够
  vec2 grad = normalize(vec2(
    field(px + vec2(1.0, 0.0)) - d,
    field(px + vec2(0.0, 1.0)) - d
  ) + vec2(1e-6));

  // 高度场 = 边缘斜面 + 一层平缓穹顶。
  // 穹顶那项是关键：只做边缘斜面的话，直边上位移量沿边恒定，
  // 横线竖线只会被整体平移看不出变形，只有斜线才吃得到差异化位移。
  float ub = clamp(-d / uBevel, 0.0, 1.0);
  float ud = clamp(-d / uDomeLen, 0.0, 1.0);
  float slope = (PI * 0.5) * cos(ub * PI * 0.5)
              + (PI * 0.5) * cos(ud * PI * 0.5) * uDomeAmt;

  vec3 N = normalize(vec3(grad * slope, 1.0));
  vec3 I = vec3(0.0, 0.0, -1.0);

  // 光谱色散：折射率按波长扫一遍
  vec3 acc = vec3(0.0);
  vec3 wsum = vec3(0.0);
  for (int i = 0; i < SPECTRAL; i++) {
    float t = float(i) / float(SPECTRAL - 1);
    float eta = 1.0 / (uIor * (1.0 + (t - 0.5) * 2.0 * uDispersion));
    vec3 R = refract(I, N, eta);
    vec2 off = R.xy / max(0.08, abs(R.z)) * uThickness;
    vec3 w = spectrum(t);
    // off 在 y 向下的 px 空间，换回 uv 要翻 y
    acc += texture2D(tScene, vUv + vec2(off.x, -off.y) / uRes).rgb * w;
    wsum += w;
  }
  vec3 col = acc / max(wsum, vec3(1e-4));

  // 厚度相关模糊：内部更厚 → 更磨砂；边缘保持锐利，折射细节都在那儿
  vec3 frosted = texture2D(tBlur, vUv).rgb;
  col = mix(col, frosted, uFrost * (0.3 + 0.7 * ub));

  // 菲涅尔：掠射角反射率飙升，玻璃边缘更"镜面"
  float fres = pow(1.0 - clamp(N.z, 0.0, 1.0), 4.0);
  col = mix(col, envColor(reflect(I, N)), fres * uEnv);

  // 高光边缘。y 轴向下，所以 (-0.6,-0.8) 是左上方光源
  float rimBand = 1.0 - smoothstep(0.0, 2.5, -d);
  float lit = clamp(dot(grad, normalize(vec2(-0.6, -0.8))), 0.0, 1.0);
  col += vec3(1.0) * rimBand * (0.2 + 0.8 * lit) * uRim;

  col = mix(col, uTintColor, uTint);

  // 亮底上光靠白色高光边分不出卡片轮廓，补一条极淡的暗色定义边
  col *= 1.0 - (1.0 - smoothstep(0.0, 1.6, -d)) * uEdge;

  // 注意不能写成 smoothstep(1.0, -1.0, d) —— GLSL 规定 edge0 >= edge1 时结果未定义
  gl_FragColor = vec4(mix(base, col, 1.0 - smoothstep(-1.0, 1.0, d)), 1.0);
}
`;

export function createGlassPass(THREE, FullScreenQuad, options = {}) {
  // ⚠️ WebGLRenderer 的 antialias 只作用于默认帧缓冲，**对 RenderTarget 无效**。
  // 场景先渲进 rtScene 再合成，所以必须在这里开多重采样，否则整个画面没有抗锯齿 ——
  // 高光密集的产品表面会糊成一团，这正是「在线预览器清晰、我们这儿模糊」的原因。
  // 用 UnsignedByte 而非 HalfFloat：场景 pass 已经做完 ACES 色调映射、输出就是 LDR，
  // 浮点精度用不上。配 4× MSAA 时这是 8 vs 32 字节/像素的带宽差别。
  // 而且 SRGBColorSpace 本就要求 SRGB8_ALPHA8 内部格式，浮点目标根本承载不了，
  // 原来那个组合是不成立的。
  const rtScene = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.UnsignedByteType,
    depthBuffer: true,
    samples: options.samples ?? 4,
  });
  // 场景 pass 直接写 sRGB，采样时 GPU 自动解码回线性，最终 pass 再编码一次 —— 往返正确
  rtScene.texture.colorSpace = THREE.SRGBColorSpace;
  const rtA = new THREE.WebGLRenderTarget(1, 1, { type: THREE.UnsignedByteType, depthBuffer: false });
  const rtB = new THREE.WebGLRenderTarget(1, 1, { type: THREE.UnsignedByteType, depthBuffer: false });
  rtA.texture.colorSpace = THREE.SRGBColorSpace;
  rtB.texture.colorSpace = THREE.SRGBColorSpace;

  const blurMat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: BLUR,
    uniforms: { tSrc: { value: null }, uDir: { value: new THREE.Vector2() } },
    depthTest: false,
    depthWrite: false,
  });

  const glassMat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: GLASS,
    uniforms: {
      tScene: { value: rtScene.texture },
      tBlur: { value: rtB.texture },
      uRes: { value: new THREE.Vector2(1, 1) },
      uCount: { value: 0 },
      uPanel: { value: Array.from({ length: MAX_PANELS }, () => new THREE.Vector4()) },
      uRound: { value: new Array(MAX_PANELS).fill(20) },
      uGroup: { value: new Array(MAX_PANELS).fill(-1) },
      uBlend: { value: options.blend ?? 14 },
      uShadow: { value: options.shadow ?? 0.16 },
      uShadowY: { value: options.shadowY ?? 10 },
      uEdge: { value: options.edge ?? 0.07 },
      uTransition: { value: 0 },
      uBevel: { value: options.bevel ?? 22 },
      uDomeLen: { value: options.domeLen ?? 90 },
      uDomeAmt: { value: options.domeAmt ?? 0.16 },
      uThickness: { value: options.thickness ?? 18 },
      uIor: { value: options.ior ?? 1.45 },
      uDispersion: { value: options.dispersion ?? 0.03 },
      uFrost: { value: options.frost ?? 0.4 },
      uTint: { value: options.tint ?? 0.05 },
      uTintColor: { value: new THREE.Color(options.tintColor ?? 0xffffff) },
      uRim: { value: options.rim ?? 0.45 },
      uEnv: { value: options.env ?? 0.55 },
    },
    depthTest: false,
    depthWrite: false,
  });

  const copyMat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: COPY,
    uniforms: {
      tScene: { value: rtScene.texture },
      tBlur: { value: rtB.texture },
      uTransition: glassMat.uniforms.uTransition, // 与玻璃 pass 共享同一个 uniform 对象
    },
    depthTest: false,
    depthWrite: false,
  });

  const quad = new FullScreenQuad(glassMat);
  let W = 1;
  let H = 1;
  let cssW = 1;
  let cssH = 1;
  /** 各分组的屏幕包围盒（CSS px, y 从顶部），供 scissor 裁剪 */
  let boxes = [];
  // 投影最远延伸到面板外 uShadowY + 44px，scissor 必须把它包进来
  const MARGIN = 60;

  return {
    uniforms: glassMat.uniforms,

    setSize(w, h, dpr) {
      W = Math.max(1, Math.round(w * dpr));
      H = Math.max(1, Math.round(h * dpr));
      rtScene.setSize(W, H);
      // 模糊链 1/4 分辨率（原 1/2）。磨砂本来就是重模糊，降采样看不出差别，
      // 两趟高斯的像素量少 4 倍
      rtA.setSize(Math.max(1, W >> 2), Math.max(1, H >> 2));
      rtB.setSize(Math.max(1, W >> 2), Math.max(1, H >> 2));
      cssW = w; cssH = h;
      // 面板坐标用 CSS px 传入，所以 uRes 也用 CSS px，DPR 在这里被吃掉
      glassMat.uniforms.uRes.value.set(w, h);
    },

    /**
     * @param {{x,y,w,h,r,g}[]} rects CSS px，相对 canvas 左上角；g = 组号
     * 会按组号排序 —— 着色器靠相邻性判断同组，不排序就会漏融合
     */
    setPanels(rects) {
      const sorted = rects.slice(0, MAX_PANELS).sort((a, b) => (a.g ?? 0) - (b.g ?? 0));
      glassMat.uniforms.uCount.value = sorted.length;
      for (let i = 0; i < sorted.length; i++) {
        const p = sorted[i];
        glassMat.uniforms.uPanel.value[i].set(
          p.x + p.w / 2,
          p.y + p.h / 2,
          p.w / 2,
          p.h / 2
        );
        glassMat.uniforms.uRound.value[i] = Math.min(p.r, p.w / 2, p.h / 2);
        glassMat.uniforms.uGroup.value[i] = p.g ?? i;
      }

      // 按组聚合包围盒 —— 同组会 smooth-min 融合，必须整组一起渲染
      boxes = [];
      let cur = null;
      let curG = null;
      for (const p of sorted) {
        const gid = p.g ?? -1;
        if (gid !== curG) {
          if (cur) boxes.push(cur);
          cur = { x0: p.x, y0: p.y, x1: p.x + p.w, y1: p.y + p.h };
          curG = gid;
        } else {
          cur.x0 = Math.min(cur.x0, p.x); cur.y0 = Math.min(cur.y0, p.y);
          cur.x1 = Math.max(cur.x1, p.x + p.w); cur.y1 = Math.max(cur.y1, p.y + p.h);
        }
      }
      if (cur) boxes.push(cur);
    },

    render(renderer, scene, camera) {
      const prevTarget = renderer.getRenderTarget();
      const transitioning = glassMat.uniforms.uTransition.value > 0.001;

      renderer.setRenderTarget(rtScene);
      renderer.clear();
      renderer.render(scene, camera);

      // 没有面板且不在过渡中时跳过模糊链
      if (glassMat.uniforms.uCount.value > 0 || transitioning) {
        const bw = Math.max(1, W >> 2);
        const bh = Math.max(1, H >> 2);
        quad.material = blurMat;
        blurMat.uniforms.tSrc.value = rtScene.texture;
        blurMat.uniforms.uDir.value.set(1.0 / bw, 0);
        renderer.setRenderTarget(rtA);
        quad.render(renderer);

        blurMat.uniforms.tSrc.value = rtA.texture;
        blurMat.uniforms.uDir.value.set(0, 1.0 / bh);
        renderer.setRenderTarget(rtB);
        quad.render(renderer);
      }

      renderer.setRenderTarget(prevTarget);

      // ① 全屏廉价拷贝：每像素 1 次采样（过渡时 2 次）
      quad.material = copyMat;
      quad.render(renderer);

      // ② 玻璃着色器只在各分组的包围盒内跑。
      //    每像素要多次 SDF 求值 + SPECTRAL 次纹理采样，而面板只覆盖约 22% 的画面，
      //    全屏跑等于把 78% 的算力扔掉。scissor 直接剔掉框外的片元。
      if (!boxes.length) return;
      quad.material = glassMat;
      renderer.setScissorTest(true);
      for (const b of boxes) {
        const x = Math.max(0, Math.floor(b.x0 - MARGIN));
        const y1 = Math.min(cssH, Math.ceil(b.y1 + MARGIN));
        const x1 = Math.min(cssW, Math.ceil(b.x1 + MARGIN));
        const y0 = Math.max(0, Math.floor(b.y0 - MARGIN));
        if (x1 <= x || y1 <= y0) continue;
        // scissor 原点在左下，而面板坐标 y 从顶部起算 —— 翻一次
        renderer.setScissor(x, cssH - y1, x1 - x, y1 - y0);
        quad.render(renderer);
      }
      // ⚠️ 必须关掉：scissor 是 renderer 的持久状态，
      // 留着会把下一帧的场景 pass 也裁掉
      renderer.setScissorTest(false);
    },

    /** 供 HUD 显示：玻璃着色器实际覆盖的画面占比 */
    coverage() {
      if (!boxes.length) return 0;
      let a = 0;
      for (const b of boxes) {
        a += (Math.min(cssW, b.x1 + MARGIN) - Math.max(0, b.x0 - MARGIN))
           * (Math.min(cssH, b.y1 + MARGIN) - Math.max(0, b.y0 - MARGIN));
      }
      return a / (cssW * cssH);
    },

    dispose() {
      rtScene.dispose();
      rtA.dispose();
      rtB.dispose();
      blurMat.dispose();
      glassMat.dispose();
      copyMat.dispose();
      quad.dispose();
    },
  };
}
