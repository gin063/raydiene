<template>
  <component :is="as" ref="rootEl" class="lg" :class="{ 'lg--fallback': !useRefraction }" :style="rootStyle">
    <!-- 折射滤镜。只在 Chromium 系生效，其余引擎走 lg--fallback 分支 -->
    <svg v-if="useRefraction && map" class="lg__defs" aria-hidden="true">
      <defs>
        <filter :id="filterId" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x="0" y="0"
          :width="size.w" :height="size.h" color-interpolation-filters="sRGB">
          <feImage :href="map.url" x="0" y="0" :width="size.w" :height="size.h" preserveAspectRatio="none"
            result="dmap" />

          <!-- 三次位移取不同强度再按通道重组 = 色散（边缘的红蓝分离） -->
          <feDisplacementMap in="SourceGraphic" in2="dmap" :scale="map.scale * (1 + dispersion)"
            xChannelSelector="R" yChannelSelector="G" result="dr" />
          <feColorMatrix in="dr" type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="cr" />

          <feDisplacementMap in="SourceGraphic" in2="dmap" :scale="map.scale" xChannelSelector="R"
            yChannelSelector="G" result="dg" />
          <feColorMatrix in="dg" type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="cg" />

          <feDisplacementMap in="SourceGraphic" in2="dmap" :scale="map.scale * (1 - dispersion)"
            xChannelSelector="R" yChannelSelector="G" result="db" />
          <feColorMatrix in="db" type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cb" />

          <feBlend in="cr" in2="cg" mode="screen" result="crg" />
          <feBlend in="crg" in2="cb" mode="screen" />
        </filter>
      </defs>
    </svg>

    <span class="lg__rim" aria-hidden="true" />
    <span v-if="sheen" class="lg__sheen" aria-hidden="true" />
    <span class="lg__content"><slot /></span>
  </component>
</template>

<script setup>
import { makeDisplacementMap, supportsSvgBackdrop } from "~/utils/glassDisplacement";

const props = defineProps({
  as: { type: String, default: "div" },
  /** 圆角半径 px */
  radius: { type: Number, default: 24 },
  /** 斜面宽度 px —— 折射只发生在这条带子里，越宽越"厚重" */
  bevel: { type: Number, default: 16 },
  /** 折射率，真玻璃 1.5 */
  ior: { type: Number, default: 1.5 },
  /** 玻璃厚度，线性放大位移 */
  thickness: { type: Number, default: 12 },
  /** 折射沿斜面的分布 0~1。0=挤在最外缘（只剩发丝线），1=铺满整条斜面 */
  spread: { type: Number, default: 0.75 },
  /** 整体放大 0~0.25。没有它的话只有斜线看得出变形，横竖线无感 */
  magnify: { type: Number, default: 0.07 },
  /** 背景模糊。调大会盖住折射感，liquid glass 该保持低模糊 */
  blur: { type: Number, default: 3 },
  saturate: { type: Number, default: 1.6 },
  brightness: { type: Number, default: 1.05 },
  /** 色散强度 0~0.12，边缘红蓝分离 */
  dispersion: { type: Number, default: 0.035 },
  /** 白色染色不透明度，保证内容可读 */
  tint: { type: Number, default: 0.08 },
  /** 高光边缘强度 */
  rim: { type: Number, default: 0.55 },
  /** 缓慢扫过的镜面高光 */
  sheen: { type: Boolean, default: false },
  /** 强制走降级分支，用于 A/B 对比 */
  forceFallback: { type: Boolean, default: false },
});

const rootEl = ref(null);
const size = reactive({ w: 0, h: 0 });
const map = ref(null);
const supported = ref(false);
const uid = Math.random().toString(36).slice(2, 8);
const rev = ref(0);

// Safari 按 ID 缓存滤镜输出，重算后不换 ID 会拿到上一帧。
// 这里 Safari 走不到折射分支，但换 ID 成本为零，留着当保险。
const filterId = computed(() => `lg-${uid}-${rev.value}`);

const useRefraction = computed(() => supported.value && !props.forceFallback);

const rootStyle = computed(() => {
  const f = useRefraction.value && map.value
    ? `url(#${filterId.value}) blur(${props.blur}px) saturate(${props.saturate}) brightness(${props.brightness})`
    // 降级：拿不到折射，只能靠更重的模糊和染色把质感撑住
    : `blur(${props.blur * 4 + 6}px) saturate(${props.saturate + 0.2}) brightness(${props.brightness})`;

  return {
    "--lg-radius": `${props.radius}px`,
    "--lg-tint": props.tint,
    "--lg-rim": props.rim,
    "--lg-bevel": `${props.bevel}px`,
    backdropFilter: f,
    WebkitBackdropFilter: f,
  };
});

let ro = null;
let timer = null;

function regenerate() {
  const el = rootEl.value?.$el ?? rootEl.value;
  if (!el || !supported.value) return;
  const r = el.getBoundingClientRect();
  if (!r.width || !r.height) return;

  size.w = Math.round(r.width);
  size.h = Math.round(r.height);
  map.value = makeDisplacementMap(size.w, size.h, {
    radius: props.radius,
    bevel: props.bevel,
    ior: props.ior,
    thickness: props.thickness,
    spread: props.spread,
    magnify: props.magnify,
  });
  rev.value++;
}

// 位移图重算要遍历整个元件的像素，尺寸/参数一变就得重来 —— 必须防抖
function scheduleRegenerate() {
  clearTimeout(timer);
  timer = setTimeout(regenerate, 90);
}

watch(
  () => [props.radius, props.bevel, props.ior, props.thickness, props.spread, props.magnify],
  scheduleRegenerate
);

onMounted(() => {
  supported.value = supportsSvgBackdrop();
  if (!supported.value) return;
  const el = rootEl.value?.$el ?? rootEl.value;
  ro = new ResizeObserver(scheduleRegenerate);
  ro.observe(el);
  regenerate();
});

onBeforeUnmount(() => {
  clearTimeout(timer);
  ro?.disconnect();
});

defineExpose({ useRefraction });
</script>

<style scoped>
.lg {
  position: relative;
  border-radius: var(--lg-radius);
  background: rgba(255, 255, 255, var(--lg-tint));
  /* 不能加 isolation: isolate —— 它会建立 Backdrop Root，
     导致嵌套在里面的玻璃按钮只能采样到外层卡片自己的像素，
     而不是页面背景。backdrop-filter 本身已经建立层叠上下文了。 */
  contain: paint;
  box-shadow:
    /* 斜面内侧的暗部，制造厚度 */
    inset 0 0 var(--lg-bevel) calc(var(--lg-bevel) * -0.55) rgba(0, 0, 0, 0.28),
    /* 接触阴影，让它浮起来 */
    0 12px 40px -10px rgba(0, 0, 0, 0.55);
}

.lg__defs {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}

/* 高光边缘：渐变描边环。上缘最亮、下缘留一道弱反光，模拟单一光源 */
.lg__rim {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  pointer-events: none;
  background: linear-gradient(150deg,
      rgba(255, 255, 255, var(--lg-rim)) 0%,
      rgba(255, 255, 255, calc(var(--lg-rim) * 0.12)) 38%,
      rgba(255, 255, 255, calc(var(--lg-rim) * 0.05)) 60%,
      rgba(255, 255, 255, calc(var(--lg-rim) * 0.38)) 100%);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

/* 降级分支拿不到折射，把斜面明暗做重一点，靠光影暗示厚度 */
.lg--fallback {
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, calc(var(--lg-rim) * 0.5)),
    inset 0 0 var(--lg-bevel) calc(var(--lg-bevel) * -0.4) rgba(255, 255, 255, 0.16),
    inset 0 0 var(--lg-bevel) calc(var(--lg-bevel) * -0.5) rgba(0, 0, 0, 0.34),
    0 12px 40px -10px rgba(0, 0, 0, 0.55);
}

.lg__sheen {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}

.lg__sheen::before {
  content: "";
  position: absolute;
  inset: -50%;
  background: linear-gradient(105deg,
      transparent 40%,
      rgba(255, 255, 255, 0.14) 48%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.14) 52%,
      transparent 60%);
  animation: lg-sweep 6s ease-in-out infinite;
}

@keyframes lg-sweep {
  0%, 100% { transform: translateX(-60%); }
  50% { transform: translateX(60%); }
}

@media (prefers-reduced-motion: reduce) {
  .lg__sheen::before { animation: none; }
}

.lg__content {
  position: relative;
  z-index: 1;
  display: block;
}
</style>
