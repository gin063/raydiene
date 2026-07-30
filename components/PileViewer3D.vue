<template>
  <div ref="wrapEl" class="relative w-full select-none">
    <div ref="stageEl"
      class="relative w-full aspect-[3/4] overflow-hidden rounded-[1.75rem] sm:aspect-[4/3] xl:aspect-auto xl:h-[clamp(760px,82vh,920px)]"
      :style="{ '--ink': T.ink, '--ink-dim': T.inkDim, '--hair': T.hair,
                 '--knob': T.knob, '--knob-ink': T.knobInk, background: T.wall[1] }">
      <canvas ref="canvasEl" v-show="mode === '3d'" class="block h-full w-full" style="touch-action: pan-y" />

      <template v-if="mode === '3d' && ready">
        <!-- 标题区。无玻璃卡，直接压在影棚背景上 -->
        <div class="pointer-events-none absolute left-6 top-6 xl:left-9 xl:top-9">
          <p class="label-lg mb-2.5 text-brand xl:mb-3">
            ✦ <ScrambleText :text="shown.tier" :trigger="gen" :delay="60" />
          </p>
          <h3 class="display font-hero font-bold text-ink">
            <ScrambleText :text="shown.name" :trigger="gen" :delay="120" />
          </h3>
          <p class="mt-3 label-lg text-ink-dim xl:mt-3.5">
            <ScrambleText :text="shown.tagline" :trigger="gen" :delay="180" />
          </p>
        </div>

        <!--
          桌面左列。底边与底排卡片底边对齐：容器 top/bottom 双向定位，
          三张卡按 flex 比例分配余量 —— 不是只把第三张拉高，三张一起随舞台高度伸缩
        -->
        <div class="absolute bottom-9 left-9 top-[13rem] hidden w-[20rem] flex-col gap-4 xl:flex">
          <div :ref="(el) => (p.role = el)" class="flex flex-[20] flex-col justify-center px-6">
            <p class="label mb-2.5 text-brand">
              <ScrambleText :text="shown.role" :trigger="gen" :delay="220" />
            </p>
            <p class="text-[15px] leading-relaxed text-ink-dim">
              <ScrambleText :text="shown.roleDesc" :trigger="gen" :delay="280" />
            </p>
          </div>

          <!-- 大号轻字重数字配微型标签，取自 rondesignlab 的排版惯例 -->
          <div :ref="(el) => (p.power = el)" class="flex flex-[23] flex-col justify-center px-6">
            <p class="label mb-1.5 text-ink-dim">
              <ScrambleText text="最大功率" :trigger="gen" :delay="240" />
            </p>
            <p class="numeral mb-3.5 text-ink">
              <ScrambleText :text="shown.power" :trigger="gen" :delay="300" />
            </p>
            <div class="hair h-1.5 w-full overflow-hidden rounded-full">
              <div class="h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
                :style="{ width: shown.powerPct * 100 + '%' }" />
            </div>
          </div>

          <div :ref="(el) => (p.specs = el)" class="flex flex-[57] flex-col px-6 py-5">
            <p class="label mb-1 text-ink-dim">
              ◆ <ScrambleText text="核心参数" :trigger="gen" :delay="320" />
            </p>
            <dl class="flex flex-1 flex-col justify-around">
              <div v-for="(s, i) in shown.specs" :key="s.k" class="flex items-baseline justify-between">
                <dt class="text-[15px] text-ink-dim">
                  <ScrambleText :text="s.k" :trigger="gen" :delay="340 + i * 40" />
                </dt>
                <dd class="font-mono text-[15.5px] tabular-nums text-ink">
                  <template v-if="s.num != null">{{ counted(s, i) }}</template>
                  <ScrambleText v-else :text="s.v" :trigger="gen" :delay="360 + i * 40" />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- 平板（md ~ xl）：只保留一张紧凑参数卡 -->
        <div :ref="(el) => (p.specsTablet = el)"
          class="absolute left-6 top-[11.5rem] hidden w-[16.5rem] flex-col px-5 py-4 md:flex xl:hidden">
          <p class="label mb-3 text-ink-dim">
            ◆ <ScrambleText text="核心参数" :trigger="gen" :delay="240" />
          </p>
          <dl class="space-y-2.5">
            <div v-for="(s, i) in shown.specs" :key="s.k" class="flex items-baseline justify-between">
              <dt class="text-[13.5px] text-ink-dim">
                <ScrambleText :text="s.k" :trigger="gen" :delay="260 + i * 40" />
              </dt>
              <dd class="font-mono text-[14px] tabular-nums text-ink">
                <template v-if="s.num != null">{{ counted(s, i) }}</template>
                <ScrambleText v-else :text="s.v" :trigger="gen" :delay="280 + i * 40" />
              </dd>
            </div>
          </dl>
        </div>

        <!-- 右上：产品简介 -->
        <div :ref="(el) => (p.intro = el)"
          class="absolute right-9 top-9 hidden w-[19rem] flex-col justify-center px-6 py-5 2xl:flex">
          <p class="label mb-2.5 text-brand">
            ◆ <ScrambleText text="产品简介" :trigger="gen" :delay="160" />
          </p>
          <p class="text-[14.5px] leading-relaxed text-ink-dim">
            <ScrambleText :text="shown.intro" :trigger="gen" :delay="200" />
          </p>
        </div>

        <!--
          型号滚轮：环形首尾相接、可无限循环。
          只显示上下各一个候选项，且不加模糊 —— 仅靠透明度区分层级
        -->
        <div class="absolute right-[6.5rem] top-1/2 -mt-[7.5rem] hidden h-[15rem] w-[15rem] xl:block">
          <div :ref="(el) => (p.band = el)"
            class="pointer-events-none absolute inset-x-0 top-1/2 -mt-[1.75rem] h-[3.5rem]" />

          <div class="absolute inset-0 overflow-hidden" style="perspective: 380px">
            <div class="absolute inset-0" style="transform-style: preserve-3d">
              <button v-for="(prod, i) in products" :key="prod.key" :ref="(el) => (drumEls[i] = el)"
                type="button"
                class="absolute inset-x-0 top-1/2 -mt-[1.75rem] h-[3.5rem] text-center font-hero text-[1.15rem] leading-[3.5rem] text-ink-dim"
                @pointerdown.prevent="select(prod.key)">
                {{ prod.name }}
              </button>
            </div>
          </div>

          <!-- 选中项另起一层且不带 transform：3D 变换过的文字会被重采样发虚 -->
          <p class="pointer-events-none absolute inset-x-0 top-1/2 -mt-[1.75rem] h-[3.5rem] text-center font-hero text-[1.5rem] font-bold leading-[3.5rem] text-ink">
            <ScrambleText :text="shown.name" :trigger="gen" :delay="0" />
          </p>
        </div>

        <!-- 上下快捷。环形循环，没有端点，不需要禁用态 -->
        <div :ref="(el) => (p.arrows = el)"
          class="absolute right-9 top-1/2 -mt-[3.25rem] hidden h-[6.5rem] flex-col justify-center overflow-hidden xl:flex">
          <button type="button" class="arrow-btn" aria-label="上一个型号" @pointerdown.prevent="step(-1)">▲</button>
          <span class="hair mx-2.5 h-px" />
          <button type="button" class="arrow-btn" aria-label="下一个型号" @pointerdown.prevent="step(1)">▼</button>
        </div>

        <!-- 手机 / 平板：横向型号条。手机居中贴底，平板落到左下 -->
        <div :ref="(el) => (p.strip = el)"
          class="absolute inset-x-0 bottom-[4.75rem] mx-auto flex w-fit items-center gap-0.5 px-2 py-2 md:inset-x-auto md:bottom-6 md:left-6 md:mx-0 xl:hidden">
          <button v-for="prod in products" :key="prod.key" type="button"
            class="whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12.5px] transition-colors"
            :class="prod.key === activeKey ? 'bg-brand text-white' : 'text-ink-dim'"
            @pointerdown.prevent="select(prod.key)">{{ prod.name }}</button>
        </div>

        <!-- 底排：卖点卡右移让开左列；所有底部元素下边缘对齐 -->
        <div class="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-center gap-3.5 md:bottom-6 md:justify-end xl:inset-x-9 xl:bottom-9 xl:left-[24.5rem] xl:justify-between">
          <div class="hidden items-end gap-3.5 2xl:flex">
            <div v-for="(hl, i) in shown.highlights" :key="i" :ref="(el) => (hlEls[i] = el)"
              class="flex h-[6rem] w-[14rem] flex-col items-center justify-center px-4 text-center">
              <p class="label mb-2 text-brand">
                <ScrambleText :text="hl.t" :trigger="gen" :delay="420 + i * 60" />
              </p>
              <p class="text-[14px] leading-snug text-ink-dim">
                <ScrambleText :text="hl.d" :trigger="gen" :delay="460 + i * 60" />
              </p>
            </div>
          </div>

          <div class="flex items-end gap-2.5 xl:gap-3.5">
            <div :ref="(el) => (p.view = el)"
              class="flex h-[2.75rem] items-center gap-0.5 px-2 xl:h-[3.5rem] xl:px-3">
              <button type="button" role="switch" :aria-checked="theme === 'night'"
                class="theme-switch" :title="theme === 'day' ? '切换到夜间影棚' : '切换到白天影棚'"
                aria-label="影棚昼夜切换" @click="toggleTheme">
                <span class="theme-switch__knob">{{ theme === "day" ? "☀" : "☾" }}</span>
              </button>
              <span class="hair mx-0.5 h-4 w-px xl:mx-1" />
              <button type="button" class="console-btn" @click="zoom(-1)" aria-label="放大">＋</button>
              <button type="button" class="console-btn" @click="zoom(1)" aria-label="缩小">－</button>
              <span class="hair mx-0.5 h-4 w-px xl:mx-1" />
              <button type="button" class="console-btn" @click="resetView">
                <ScrambleText text="重置" :trigger="gen" :delay="540" />
              </button>
            </div>

            <a :ref="(el) => (p.cta = el)" :href="shown.buyUrl" target="_blank" rel="noopener noreferrer"
              class="flex h-[2.75rem] items-center gap-1.5 whitespace-nowrap px-4 font-hero text-[14px] font-bold text-ink transition-colors hover:text-brand xl:h-[3.5rem] xl:gap-2 xl:px-6 xl:text-[1.05rem]">
              <ScrambleText text="立即订购" :trigger="gen" :delay="580" />
              <span class="text-brand">»</span>
            </a>
          </div>
        </div>

        <p v-if="debug"
          class="pointer-events-none absolute bottom-2.5 left-4 hidden font-mono text-[10px] text-ink-dim/40 xl:block">
          {{ stats.fps }} fps · {{ stats.calls }} calls · {{ stats.tris }} tris ·
          {{ panelCount }} panels · 玻璃覆盖 {{ stats.coverage }}%
        </p>
      </template>

      <div v-if="mode === '3d' && !ready" class="absolute inset-0 grid place-items-center text-sm text-ink-dim">
        正在装载 3D 视图…
      </div>
      <div v-if="mode === 'fallback'" class="absolute inset-0 grid place-items-center px-6 text-center">
        <p class="text-sm text-ink-dim">当前设备不支持 3D 视图。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";
import { buildChargingPile } from "~/utils/buildChargingPile";
import { loadPileModel } from "~/utils/loadPileModel";
import { createGlassPass } from "~/utils/glassPass";

const props = defineProps({
  products: { type: Array, required: true },
  debug: { type: Boolean, default: false },
});

const wrapEl = ref(null);
const stageEl = ref(null);
const canvasEl = ref(null);
// 玻璃面板 DOM 句柄。普通对象 —— 只在渲染循环里读，不需要响应式
const p = {};
const hlEls = [];
const drumEls = [];

const mode = ref("3d");
const ready = ref(false);
const stats = reactive({ fps: 0, calls: 0, tris: 0, coverage: 0 });
const panelCount = ref(0);
/** 递增即让全部 ScrambleText 重跑一遍，包括内容不变的表头与按钮 */
const gen = ref(0);
const theme = ref("day");
const T = computed(() => THEMES[theme.value]);

/*
 * 两个 key 刻意分开（Apple 的「pointerdown 就给反馈」）：
 *  - activeKey  点击瞬间就变，滚轮立刻跟手
 *  - shownKey   等模型缩到零点才变，文案与模型同步换
 */
const activeKey = ref(props.products[0].key);
const shownKey = ref(props.products[0].key);
const activeIdx = computed(() =>
  Math.max(0, props.products.findIndex((x) => x.key === activeKey.value))
);
const shown = computed(
  () => props.products.find((x) => x.key === shownKey.value) ?? props.products[0]
);

/* ---------- 型号滚轮：环形、首尾相接 ---------- */
const DRUM_STEP = 29;
const DRUM_R = 122;
const drum = { pos: 0 };

/** 从 pos 到第 i 项的最短带符号角距（限在 ±N/2 内）。首尾相接就靠这个 */
function wrapDelta(i, pos) {
  const n = props.products.length;
  let d = (((i - pos) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

function paintDrum() {
  drumEls.forEach((el, i) => {
    if (!el) return;
    const d = wrapDelta(i, drum.pos);
    const a = Math.abs(d);
    el.style.transform = `rotateX(${-d * DRUM_STEP}deg) translateZ(${DRUM_R}px)`;
    // 中心项由上层那条锐利文本承担，鼓面这一项藏起来，否则两层叠出重影。
    // 上下只露一个候选项：超过 1.4 直接归零，不留第二项的残影。
    // 不加 blur —— 只用透明度区分层级
    // 两段平滑：靠近中心淡出（让位给上层锐利文本），超过一格淡到全无。
    // 单边硬截断会在 tween 经过阈值时闪一下
    const near = Math.min(1, Math.max(0, (a - 0.15) / 0.6));
    const far = Math.max(0, 1 - Math.max(0, a - 0.9) / 0.6);
    el.style.opacity = 0.5 * near * far;
    el.style.pointerEvents = a < 0.5 || a > 1.4 ? "none" : "auto";
  });
}

function toggleTheme() {
  theme.value = theme.value === "day" ? "night" : "day";
  // 与 CSS 那侧的 .55s 过渡对齐
  ctx?.applyTheme(THEMES[theme.value], 0.55);
}

function step(dir) {
  const n = props.products.length;
  select(props.products[(((activeIdx.value + dir) % n) + n) % n].key);
}

/* ---------- 规格数值滚动 ---------- */
const counts = reactive({ v: [] });
function counted(s, i) {
  const n = counts.v[i];
  return `${(n == null ? s.num : n).toFixed(s.digits ?? 0)} ${s.unit}`;
}

let ctx = null;
let io = null;
let ro = null;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

/**
 * 昼夜两套影棚配色。
 *
 * 深色那套不是「换个背景」而已 —— 金属的颜色来自反射环境，
 * 环境有多亮它就有多亮。暗底下银灰金属的高光会自然收敛成点缀而非眩光，
 * 这正是产品摄影常用的打光思路。
 */
const THEMES = {
  day: {
    wall: ["#b9c4d0", "#ccd5df", "#dde3ea", "#aeb9c6"],
    pool: "246,249,252", poolAlpha: 0.72,
    vignette: "60,72,88", vignetteAlpha: 0.26,
    envIntensity: 1.1,
    key: { color: 0xfff6e8, intensity: 1.5 },
    fill: { color: 0xcfdcf0, intensity: 0.45 },
    head: { color: 0xffffff, intensity: 0.55 },
    shadowOpacity: 1,
    glass: { tint: 0.26, tintColor: 0xffffff, edge: 0.03, rim: 0.38, shadow: 0.2 },
    ink: "#141a21", inkDim: "#5b6672", hair: "rgba(0,0,0,.10)",
    knob: "#ffffff", knobInk: "#c2831f",
  },
  night: {
    wall: ["#1d2530", "#28323e", "#333f4d", "#19212b"],
    pool: "150,178,212", poolAlpha: 0.34,
    vignette: "6,10,16", vignetteAlpha: 0.42,
    envIntensity: 0.6,
    // 暗底下环境光贡献少，主光要更强才能把形体撑起来
    key: { color: 0xfff2e0, intensity: 2.0 },
    fill: { color: 0x8fb0dc, intensity: 0.55 },
    head: { color: 0xdce9ff, intensity: 0.75 },
    shadowOpacity: 0.4,
    glass: { tint: 0.28, tintColor: 0x1b232e, edge: 0, rim: 0.52, shadow: 0.3 },
    ink: "#eef2f7", inkDim: "#9fadbc", hair: "rgba(255,255,255,.14)",
    knob: "#2b3644", knobInk: "#d6e4f7",
  },
};

/**
 * ⚠️ 分辨率不能低。256×256 拉到 3520px 是 13.75 倍放大，
 * 双线性插值在纹素边界二阶导不连续，会读成一层网格；再叠加 8-bit 渐变色带。
 * 所以：1024 底图 + 逐像素抖动噪声（消色带的标准手段）+ 关 mipmap。
 */
function studioBackground(THREE, t) {
  const N = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = N;
  const g = c.getContext("2d");

  const wall = g.createLinearGradient(0, 0, 0, N);
  wall.addColorStop(0, t.wall[0]);
  wall.addColorStop(0.46, t.wall[1]);
  wall.addColorStop(0.62, t.wall[2]);
  wall.addColorStop(1, t.wall[3]);
  g.fillStyle = wall;
  g.fillRect(0, 0, N, N);

  // 地面亮池：给产品一个立足的亮区
  const pool = g.createRadialGradient(N / 2, N * 0.69, N * 0.02, N / 2, N * 0.69, N * 0.48);
  pool.addColorStop(0, `rgba(${t.pool},${t.poolAlpha})`);
  pool.addColorStop(1, `rgba(${t.pool},0)`);
  g.fillStyle = pool;
  g.fillRect(0, 0, N, N);

  // 暗角：视线收拢到中心，四周的玻璃卡片也更容易读出来
  const vig = g.createRadialGradient(N / 2, N / 2, N * 0.27, N / 2, N / 2, N * 0.73);
  vig.addColorStop(0, `rgba(${t.vignette},0)`);
  vig.addColorStop(1, `rgba(${t.vignette},${t.vignetteAlpha})`);
  g.fillStyle = vig;
  g.fillRect(0, 0, N, N);

  // 抖动：±2/255 的噪声把量化台阶打散，色带消失
  const img = g.getImageData(0, 0, N, N);
  const px = img.data;
  for (let i = 0; i < px.length; i += 4) {
    const n = (Math.random() * 5 - 2) | 0;
    px[i] += n; px[i + 1] += n; px[i + 2] += n;
  }
  g.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

function contactShadow(THREE) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(24,32,42,0.45)");
  grad.addColorStop(0.5, "rgba(24,32,42,0.15)");
  grad.addColorStop(1, "rgba(24,32,42,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.85, 0.85),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

async function init() {
  const canvas = canvasEl.value;
  if (!canvas || ctx) return;

  const [THREE, { RoundedBoxGeometry }, { RoomEnvironment }, { FullScreenQuad },
    { GLTFLoader }, { DRACOLoader }] = await Promise.all([
    import("three"),
    import("three/addons/geometries/RoundedBoxGeometry.js"),
    import("three/addons/environments/RoomEnvironment.js"),
    import("three/addons/postprocessing/Pass.js"),
    import("three/addons/loaders/GLTFLoader.js"),
    import("three/addons/loaders/DRACOLoader.js"),
  ]);

  const isTouch = matchMedia("(pointer: coarse)").matches;
  const lowEnd = (navigator.hardwareConcurrency || 4) <= 4;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowEnd, powerPreference: "high-performance" });
  const dpr = Math.min(devicePixelRatio || 1, isTouch ? 1.5 : 2);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // 一帧跑 4 趟 render()，info 默认每次自动重置 —— 不关掉只能读到最后那个全屏三角形
  renderer.info.autoReset = false;

  const scene = new THREE.Scene();
  // 两套影棚贴图预先生成好（1024² 抖动要遍历百万像素，不能每次切换都重画）
  const bgTex = { day: studioBackground(THREE, THEMES.day), night: studioBackground(THREE, THEMES.night) };

  // 不用 scene.background —— 它只能挂一张贴图，换的瞬间是硬切，做不了交叉淡入。
  // 改成自绘全屏层：两张贴图在着色器里按 uMix 混合，主题切换就能平滑过渡。
  // 输出走 colorspace_fragment，与内置材质保持同一套色彩空间约定
  const bgMat = new THREE.ShaderMaterial({
    uniforms: { tDay: { value: bgTex.day }, tNight: { value: bgTex.night }, uMix: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position.xy, 1.0, 1.0); }
    `,
    fragmentShader: `
      uniform sampler2D tDay;
      uniform sampler2D tNight;
      uniform float uMix;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(mix(texture2D(tDay, vUv).rgb, texture2D(tNight, vUv).rgb, uMix), 1.0);
        #include <colorspace_fragment>
      }
    `,
    depthTest: false,
    depthWrite: false,
  });
  const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat);
  bgMesh.frustumCulled = false;
  bgMesh.renderOrder = -1;
  scene.add(bgMesh);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  // 白影棚配高反射材质会互相放大成刺眼高光，压低环境强度


  // 主光偏侧上方 —— 正打会让圆柱形机身没有明暗过渡，形体读不出来
  const keyLight = new THREE.DirectionalLight(0xffffff, 1);
  keyLight.position.set(1.6, 1.7, 0.9);
  scene.add(keyLight);
  // 补光只负责把暗面从死黑里拉一点出来，不参与塑形
  const fillLight = new THREE.DirectionalLight(0xffffff, 1);
  fillLight.position.set(-1.4, 0.3, -1.0);
  scene.add(fillLight);
  // 跟随相机的柔光。两盏定向光是世界固定的，模型自动旋转到某些角度时
  // 正面会完全背光 —— 黑玻璃面板、logo、枪头就全糊成死黑。
  // 挂在相机上保证「朝向观众的那一面」永远有基础照度
  const headLight = new THREE.DirectionalLight(0xffffff, 1);
  headLight.position.set(0, 0.35, 1);

  // pivot 转/缩（绕视觉中心），holder 把视觉中心搬到原点。
  // 线缆挂在机体下方，重心比几何原点低，直接转 model 会偏
  const pivot = new THREE.Group();
  const holder = new THREE.Group();
  pivot.add(holder);
  scene.add(pivot);

  const shadow = contactShadow(THREE);
  holder.add(shadow);

  // 有 model 字段的走真实 GLB，其余仍用程序化 proxy —— 两者接口一致
  const models = {};

  function layoutFor(key) {
    const m = models[key];
    if (!m) return;
    // 横向按主壳中轴、纵向按整体包围盒（proxy 没有 center，退回只偏 Y）
    if (m.center) holder.position.set(-m.center.x, -m.center.y, -m.center.z);
    else holder.position.set(0, -m.centerY, 0);
    // 阴影挂在 holder 里，会跟着上面的偏移一起移动；把横向偏移抵消掉，
    // 让它始终落在舞台中轴正下方
    shadow.position.set(m.center?.x ?? 0, m.bodyBottom - 0.004, m.center?.z ?? 0);
  }

  /** 把某一款推上屏，并同步 shownKey 与文案重跑 */
  function reveal(key) {
    const m = models[key];
    if (!m) return;
    const prev = models[shownKey.value];
    if (prev && shownKey.value !== key) prev.root.visible = false;
    m.root.visible = true;
    layoutFor(key);
    if (shownKey.value !== key) { shownKey.value = key; gen.value++; }
  }

  async function ensureModel(prod) {
    let m;
    if (prod.model) {
      try {
        m = await loadPileModel(THREE, GLTFLoader, DRACOLoader, prod.model, {
          maxAnisotropy: renderer.capabilities.getMaxAnisotropy(),
          rotateY: prod.rotateY ?? 0,
        });
      } catch (err) {
        console.error(`[PileViewer3D] ${prod.key} 的 GLB 加载失败，回退 proxy`, err);
      }
    }
    if (!m) m = buildChargingPile(THREE, RoundedBoxGeometry, prod.variant, prod.finish);
    m.root.visible = false;
    holder.add(m.root);
    models[prod.key] = m;
    // 用户可能在它加载期间就切了过来 —— 那时 swap() 会因为模型未就绪而跳过，这里补上
    if (prod.key === activeKey.value) reveal(prod.key);
    return m;
  }

  // 只等首屏那一款，其余后台加载。三个 GLB 合计约 4.8MB，
  // 全部 await 完再出画面会有好几秒的「正在装载」
  const firstProd = props.products.find((x) => x.key === shownKey.value) ?? props.products[0];
  await ensureModel(firstProd);
  reveal(firstProd.key);
  for (const prod of props.products) {
    if (prod !== firstProd) ensureModel(prod);
  }

  // 半透明毛玻璃：染色压低、模糊拉高，靠投影而非描边分离层次（rondesignlab 的做法）
  const glass = createGlassPass(THREE, FullScreenQuad, {
    // RenderTarget 的 MSAA —— 低端机太贵，关掉
    samples: lowEnd ? 0 : 4,
    frost: 0.82, env: 0.24, thickness: 12, blend: 16,
    ...THEMES[theme.value].glass,
  });

  /**
   * 换影棚。dur > 0 时全部数值一起补间 —— 背景、布光、环境强度、玻璃染色
   * 必须同步过渡，任何一项硬切都会露馅。
   * DOM 那侧的文字/描边色由 CSS transition 承担，时长对齐即可。
   */
  function applyTheme(t, dur = 0) {
    const u = glass.uniforms;
    const toNight = t === THEMES.night;
    const keyTo = new THREE.Color(t.key.color);
    const fillTo = new THREE.Color(t.fill.color);
    const headTo = new THREE.Color(t.head.color);
    const tintTo = new THREE.Color(t.glass.tintColor);
    const keyFrom = keyLight.color.clone();
    const fillFrom = fillLight.color.clone();
    const headFrom = headLight.color.clone();
    const tintFrom = u.uTintColor.value.clone();

    const st = {
      env: scene.environmentIntensity ?? 1,
      keyI: keyLight.intensity, fillI: fillLight.intensity, headI: headLight.intensity,
      shadowO: shadow.material.opacity,
      tint: u.uTint.value, edge: u.uEdge.value, rim: u.uRim.value, gShadow: u.uShadow.value,
      mix: bgMat.uniforms.uMix.value,
      p: 0,
    };
    const to = {
      env: t.envIntensity,
      keyI: t.key.intensity, fillI: t.fill.intensity, headI: t.head.intensity,
      shadowO: t.shadowOpacity,
      tint: t.glass.tint, edge: t.glass.edge, rim: t.glass.rim, gShadow: t.glass.shadow,
      mix: toNight ? 1 : 0,
      p: 1,
    };
    const write = () => {
      scene.environmentIntensity = st.env;
      keyLight.intensity = st.keyI;
      fillLight.intensity = st.fillI;
      headLight.intensity = st.headI;
      shadow.material.opacity = st.shadowO;
      u.uTint.value = st.tint;
      u.uEdge.value = st.edge;
      u.uRim.value = st.rim;
      u.uShadow.value = st.gShadow;
      bgMat.uniforms.uMix.value = st.mix;
      keyLight.color.copy(keyFrom).lerp(keyTo, st.p);
      fillLight.color.copy(fillFrom).lerp(fillTo, st.p);
      headLight.color.copy(headFrom).lerp(headTo, st.p);
      u.uTintColor.value.copy(tintFrom).lerp(tintTo, st.p);
    };

    if (!dur) { Object.assign(st, to); write(); return; }
    gsap.to(st, { ...to, duration: dur, ease: "power2.inOut", overwrite: true, onUpdate: write });
  }
  applyTheme(THEMES[theme.value]);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 20);
  camera.add(headLight);
  scene.add(camera);
  const target = new THREE.Vector3(0, 0, 0);
  const cam = { az: 0.55, pol: 1.36, r: 1.22 };
  const want = { ...cam };
  const HOME = { ...cam };
  let scrollPol = 0;

  let dragging = false;
  let mx = 0, my = 0;
  let lastInput = performance.now();
  const onDown = (e) => {
    dragging = true; mx = e.clientX; my = e.clientY;
    lastInput = performance.now(); canvas.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging) return;
    want.az -= (e.clientX - mx) * 0.007;
    want.pol = Math.min(2.4, Math.max(0.7, want.pol - (e.clientY - my) * 0.007));
    mx = e.clientX; my = e.clientY; lastInput = performance.now();
  };
  const onUp = (e) => { dragging = false; canvas.releasePointerCapture?.(e.pointerId); };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);

  // 手机竖滑归浏览器滚动，与其抢不如让它也有 3D 上的意义。
  // 只在 scroll 里读 rect，渲染循环读缓存值 —— 读写交替会触发强制重排
  const onScroll = () => {
    const r = stageEl.value?.getBoundingClientRect();
    if (!r) return;
    const t = 1 - r.bottom / (innerHeight + r.height);
    scrollPol = (Math.min(1, Math.max(0, t)) - 0.5) * 0.7;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  let raf = 0, visible = true, frames = 0, acc = 0;
  const clock = new THREE.Clock();
  const panels = [];

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    glass.setSize(w, h, dpr);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  /**
   * 沿 offsetParent 链累加到 stage。
   * ⚠️ offset* 不计 CSS transform —— 被测量元素到 stage 的整条链上都不能用 transform 定位。
   * 用 offset* 而非 getBoundingClientRect：后者在渲染循环里与写 style 交替会触发强制重排；
   * 且 offset* 是整数，元素不会落在半像素上（半像素正是文字发虚的根源）。
   */
  function pushPanel(el, r, g) {
    if (!el || !el.offsetWidth) return;
    let x = 0, y = 0, n = el;
    while (n && n !== stageEl.value) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    panels.push({ x, y, w: el.offsetWidth, h: el.offsetHeight, r, g });
  }

  function frame() {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) return;

    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.elapsedTime;

    if (!reduceMotion && !dragging && performance.now() - lastInput > 3000) {
      want.az += dt * 0.16;
    }

    const k = 1 - Math.pow(0.001, dt);
    cam.az += (want.az - cam.az) * k;
    cam.pol += (want.pol + scrollPol - cam.pol) * k;
    cam.r += (want.r - cam.r) * k;

    const pol = Math.min(2.45, Math.max(0.6, cam.pol));
    camera.position.set(
      cam.r * Math.sin(pol) * Math.sin(cam.az),
      cam.r * Math.cos(pol),
      cam.r * Math.sin(pol) * Math.cos(cam.az)
    );
    camera.lookAt(target);
    // 真实 GLB 没有可呼吸的灯带材质；后台加载期间模型也可能还不存在
    const led = models[shownKey.value]?.ledMat;
    if (led) led.emissiveIntensity = 1.8 + Math.sin(t * 2) * 0.7;

    // 隐藏的响应式分支 offsetWidth 为 0，pushPanel 会自动跳过
    panels.length = 0;
    pushPanel(p.role, 26, 2);
    pushPanel(p.power, 26, 2);
    pushPanel(p.specs, 26, 2);
    pushPanel(p.specsTablet, 26, 2);
    pushPanel(p.intro, 26, 3);
    pushPanel(p.band, 16, 4);
    pushPanel(p.arrows, 999, 5);
    pushPanel(p.strip, 999, 4);
    hlEls.forEach((el, i) => pushPanel(el, 26, 6 + i));
    // 控制台与 CTA 同组：靠近时粘出液态颈部，对应 rondesignlab 那组融合胶囊
    pushPanel(p.view, 999, 10);
    pushPanel(p.cta, 999, 10);
    glass.setPanels(panels);
    panelCount.value = panels.length;

    renderer.info.reset();
    glass.render(renderer, scene, camera);

    if (props.debug) {
      frames++; acc += dt;
      if (acc >= 0.5) {
        stats.fps = Math.round(frames / acc);
        stats.calls = renderer.info.render.calls;
        stats.tris = renderer.info.render.triangles;
        // 玻璃着色器实际跑在多少比例的画面上 —— 全屏跑是 100%
        stats.coverage = Math.round(glass.coverage() * 100);
        frames = 0; acc = 0;
      }
    }
  }

  ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  raf = requestAnimationFrame(frame);
  ready.value = true;
  await nextTick();
  paintDrum();

  ctx = {
    models, pivot, glass, layoutFor, reveal, want, HOME, reduceMotion, applyTheme,
    trans: { v: 0 }, tl: null,
    setVisible: (v) => { visible = v; },
    dispose() {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      Object.values(models).forEach((m) => m.dispose());
      glass.dispose();
      Object.values(bgTex).forEach((t) => t.dispose());
      bgMesh.geometry.dispose();
      bgMat.dispose();
      shadow.geometry.dispose();
      shadow.material.map.dispose();
      shadow.material.dispose();
      scene.environment?.dispose();
      renderer.dispose();
    },
  };
}

/**
 * 切换。两条准则来自 Apple 的交互指南：
 *  1. pointerdown 立刻给反馈 —— 滚轮当场就动，不等模型
 *  2. 转场可打断 —— 中途再点别的型号不会被锁住，从**当前呈现值**接着演，
 *     缩出时长按当前缩放折算，避免跳变
 */
function select(key) {
  const idx = props.products.findIndex((x) => x.key === key);
  if (idx < 0 || key === activeKey.value) return;
  activeKey.value = key;

  // 沿最短带符号路径转，跨越首尾时不会倒着绕一整圈
  const delta = wrapDelta(idx, drum.pos);
  gsap.to(drum, {
    pos: drum.pos + delta, duration: 0.46, ease: "power3.out",
    overwrite: true, onUpdate: paintDrum,
  });

  if (!ctx) { shownKey.value = key; gen.value++; return; }
  const { pivot, models, glass, trans, reduceMotion } = ctx;

  const swap = () => {
    // 后台还没加载完就先跳过 —— ensureModel 完成时会自己补一次 reveal
    if (!models[activeKey.value]) return;
    ctx.reveal(activeKey.value);
  };

  if (reduceMotion) { swap(); return; }

  ctx.tl?.kill();
  const applyTrans = () => { glass.uniforms.uTransition.value = trans.v; };
  // 从当前缩放接着缩，已经很小就几乎立刻换 —— 连点不会出现「弹回再缩」
  const out = 0.46 * Math.max(0.12, pivot.scale.x);

  ctx.tl = gsap.timeline()
    // 一次连续整圈旋转贯穿始终，落点与起点一致
    .to(pivot.rotation, { y: pivot.rotation.y + Math.PI * 2, duration: out + 0.7, ease: "power2.inOut" }, 0)
    // 缩到近乎一点。不用 0 —— 零缩放矩阵会让法线变 NaN
    .to(pivot.scale, { x: 0.001, y: 0.001, z: 0.001, duration: out, ease: "power2.in" }, 0)
    .add(swap, out)
    .to(pivot.scale, { x: 1, y: 1, z: 1, duration: 0.7, ease: "power3.out" }, out)
    .to(trans, { v: 1, duration: out * 0.85, ease: "power2.in", onUpdate: applyTrans }, 0)
    .to(trans, { v: 0, duration: 0.62, ease: "power2.out", onUpdate: applyTrans }, out);
}

// 规格数值滚动。跟着 shownKey 走，与模型同步
watch(shown, (next, prev) => {
  next.specs.forEach((s, i) => {
    if (s.num == null) { counts.v[i] = null; return; }
    const o = { n: prev?.specs[i]?.num ?? s.num };
    gsap.to(o, {
      n: s.num, duration: 0.7, ease: "power2.out",
      onUpdate: () => { counts.v[i] = o.n; },
    });
  });
}, { immediate: true });

function zoom(dir) {
  if (!ctx) return;
  ctx.want.r = Math.min(2.2, Math.max(0.75, ctx.want.r + dir * 0.16));
}

function resetView() {
  if (!ctx) return;
  gsap.to(ctx.want, { ...ctx.HOME, duration: 0.9, ease: "power3.inOut" });
}

function setGlass(name, value) {
  const u = ctx?.glass.uniforms[name];
  if (u) u.value = value;
}

onMounted(() => {
  if (!hasWebGL()) { mode.value = "fallback"; return; }
  io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) { ctx?.setVisible(false); return; }
    if (ctx) ctx.setVisible(true);
    else init().catch((err) => {
      console.error("[PileViewer3D] init failed", err);
      mode.value = "fallback";
    });
  }, { rootMargin: "200px" });
  io.observe(wrapEl.value);
});

onBeforeUnmount(() => {
  io?.disconnect();
  ro?.disconnect();
  ctx?.tl?.kill();
  ctx?.dispose();
  ctx = null;
});

defineExpose({ setGlass, select });
</script>

<style scoped>
/* 主题切换靠 color/background-color 的过渡收尾。
   CSS 自定义属性本身不可补间，但引用它的 color 属性可以 —— 变量瞬时跳变，
   实际渲染值仍然平滑，效果等价且零成本 */
.text-ink { color: var(--ink); transition: color 0.55s ease; }
.text-ink-dim { color: var(--ink-dim); transition: color 0.55s ease; }
.hair { background-color: var(--hair); transition: background-color 0.55s ease; }

/* Apple 风格开关：轨道 + 右移的旋钮。
   曲线用 cubic-bezier(.32,.72,0,1) —— iOS 那条 sheet 缓动，起步快、收尾稳 */
.theme-switch {
  position: relative;
  flex: none;
  width: 3.25rem;
  height: 1.75rem;
  border-radius: 999px;
  background-color: var(--hair);
  transition: background-color 0.55s ease;
}
.theme-switch__knob {
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  display: grid;
  place-items: center;
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 999px;
  font-size: 0.72rem;
  line-height: 1;
  background-color: var(--knob);
  color: var(--knob-ink);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
  transition:
    transform 0.42s cubic-bezier(0.32, 0.72, 0, 1),
    background-color 0.55s ease,
    color 0.55s ease;
}
.theme-switch[aria-checked="true"] .theme-switch__knob { transform: translateX(1.5rem); }

@media (prefers-reduced-motion: reduce) {
  .theme-switch__knob { transition: background-color 0.2s ease, color 0.2s ease; }
}

/* Apple 的字距规则：字号越大越收紧，微型标签反而放开 */
.display {
  font-size: clamp(2rem, 3.4vw, 3.5rem);
  line-height: 1.02;
  letter-spacing: -0.022em;
}

/* rondesignlab 的排版惯例：大号轻字重数字 + 微型标签 */
.numeral {
  font-size: clamp(2rem, 2.6vw, 2.75rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.015em;
}

.label {
  @apply text-[12.5px] font-semibold uppercase leading-none;
  letter-spacing: 0.14em;
}

.label-lg {
  @apply text-[13px] font-semibold uppercase leading-none xl:text-[15px];
  letter-spacing: 0.12em;
}

.console-btn {
  @apply whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] transition-colors xl:px-4 xl:py-2 xl:text-[15px];
  color: var(--ink);
}
.console-btn:hover,
.console-btn.active { color: #2d9ed0; }

.arrow-btn {
  @apply px-3.5 py-2.5 text-[13px] leading-none transition-colors;
  color: var(--ink-dim);
}
.arrow-btn:hover { color: #2d9ed0; }
</style>
