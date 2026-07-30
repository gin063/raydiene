<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-[#050505] font-sans text-white">
    <!-- 高频背景：折射只有在背景有细线条和硬色边时才看得出来。
         纯渐变背景下真折射和毛玻璃看起来一模一样，会得出错误结论。 -->
    <div class="pointer-events-none absolute inset-0 z-0">
      <div class="blob blob--a" />
      <div class="blob blob--b" />
      <div class="blob blob--c" />
      <div class="grid-lines" />
      <!-- 斜向网格：正交网格在直边上只会被整体平移、看不出弯，
           斜线才吃得到差异化位移。两种一起放，才能公平判断折射强度 -->
      <div class="grid-diag" />
      <div class="drift absolute inset-x-0 top-0 select-none whitespace-nowrap font-hero text-[7rem] leading-[1.1] tracking-tight text-white/[0.13]">
        <div v-for="n in 8" :key="n">RAYDIENE 雷迪恩 7kW 11kW 21kW&nbsp;</div>
      </div>
    </div>

    <div class="relative z-10">
      <section class="container mx-auto max-w-6xl px-6 pb-10 pt-16">
        <p class="mb-3 font-mono text-xs tracking-widest text-brand">LAB · LIQUID GLASS 材质评估</p>
        <h1 class="mb-4 font-hero text-4xl font-bold md:text-5xl">玻璃 UI 材质台</h1>
        <p class="max-w-2xl leading-relaxed text-white/70">
          不含任何布局承诺，只评估材质本身。背景刻意做成高频（细网格 + 大字 + 硬色块），
          因为折射只在这种背景下才分辨得出来。
        </p>
        <p class="mt-4 font-mono text-xs" :class="engineOk ? 'text-brand' : 'text-amber-400'">
          当前引擎：{{ engineOk ? "支持 SVG 折射（Chromium 系）" : "不支持 SVG 折射（WebKit / Firefox）→ 全部降级" }}
        </p>
      </section>

      <!-- A/B 对照：这是决策依据 -->
      <section class="container mx-auto max-w-6xl px-6 pb-16">
        <h2 class="mb-6 font-hero text-xl">A/B 对照 · 真折射 vs 降级</h2>
        <div class="grid gap-6 lg:grid-cols-2">
          <div v-for="v in [false, true]" :key="String(v)">
            <p class="mb-3 font-mono text-xs text-white/50">
              {{ v ? "降级：blur + 染色（WebKit / Firefox 看到的）" : "真折射：feDisplacementMap（Chromium 看到的）" }}
            </p>
            <LiquidGlass v-bind="glassProps" :force-fallback="v" sheen class="p-7">
              <p class="mb-2 font-hero text-lg">磐石 Pro</p>
              <p class="mb-5 text-sm leading-relaxed text-white/75">
                21kW 三相交流充电桩。注意卡片边缘——真折射会把背后的网格线和文字向内压弯，
                降级版只是把它糊掉。
              </p>
              <div class="flex gap-2.5">
                <LiquidGlass v-bind="chipProps" :force-fallback="v" as="button" class="px-5 py-2 text-sm">
                  查看详情
                </LiquidGlass>
                <LiquidGlass v-bind="chipProps" :force-fallback="v" as="button" class="px-5 py-2 text-sm">
                  对比参数
                </LiquidGlass>
              </div>
            </LiquidGlass>
          </div>
        </div>
      </section>

      <!-- 元件族 -->
      <section class="container mx-auto max-w-6xl px-6 pb-16">
        <h2 class="mb-6 font-hero text-xl">元件族</h2>
        <div class="flex flex-wrap items-start gap-5">
          <LiquidGlass v-bind="glassProps" :radius="999" class="flex items-center gap-2 px-3 py-2">
            <button v-for="(c, i) in ['曜石黑', '月光银', '雷迪恩蓝']" :key="c"
              class="rounded-full px-4 py-1.5 text-sm transition-colors"
              :class="i === activeFinish ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'"
              @click="activeFinish = i">
              {{ c }}
            </button>
          </LiquidGlass>

          <LiquidGlass v-bind="chipProps" :radius="999" class="px-4 py-2 text-sm">
            <span class="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" />
            <span class="align-middle">4.3 英寸智能显示屏</span>
          </LiquidGlass>

          <LiquidGlass v-bind="glassProps" :radius="20" class="px-6 py-4">
            <p class="font-mono text-3xl">7.0<span class="ml-1 text-base text-white/60">kW</span></p>
          </LiquidGlass>
        </div>
      </section>

      <!-- 参数台 -->
      <section class="container mx-auto max-w-6xl px-6 pb-24">
        <h2 class="mb-6 font-hero text-xl">参数</h2>
        <LiquidGlass :radius="20" :bevel="20" :tint="0.06" class="p-6">
          <div class="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <label v-for="c in controls" :key="c.key" class="block">
              <span class="mb-1 flex justify-between font-mono text-xs text-white/60">
                <span>{{ c.label }}</span>
                <span class="text-white/90">{{ p[c.key] }}</span>
              </span>
              <input v-model.number="p[c.key]" type="range" :min="c.min" :max="c.max" :step="c.step"
                class="w-full accent-brand" />
              <span class="mt-1 block text-[11px] leading-snug text-white/40">{{ c.hint }}</span>
            </label>
          </div>
        </LiquidGlass>
      </section>
    </div>
  </div>
</template>

<script setup>
import { supportsSvgBackdrop } from "~/utils/glassDisplacement";

useHead({
  title: "Liquid Glass 材质台 · Lab",
  meta: [{ name: "robots", content: "noindex,nofollow" }],
});

const engineOk = ref(false);
onMounted(() => (engineOk.value = supportsSvgBackdrop()));

const activeFinish = ref(0);

const p = reactive({
  radius: 28,
  bevel: 26,
  ior: 1.5,
  thickness: 16,
  spread: 0.75,
  magnify: 0.07,
  blur: 2,
  dispersion: 0.04,
  tint: 0.08,
  rim: 0.55,
});

const controls = [
  { key: "magnify", label: "整体放大 ★", min: 0, max: 0.25, step: 0.005, hint: "拖到 0 试试：只剩斜线看得出变形，横竖线全无感" },
  { key: "spread", label: "折射分布 ★", min: 0, max: 1, step: 0.05, hint: "0=挤在最外缘只剩发丝线，1=铺满整条斜面" },
  { key: "bevel", label: "斜面宽度", min: 4, max: 60, step: 1, hint: "折射带子的宽度，越宽越厚重" },
  { key: "thickness", label: "厚度", min: 2, max: 40, step: 1, hint: "线性放大边缘位移量" },
  { key: "ior", label: "折射率", min: 1.05, max: 2.4, step: 0.05, hint: "真玻璃 1.5，调高更夸张" },
  { key: "radius", label: "圆角", min: 0, max: 60, step: 1, hint: "px" },
  { key: "blur", label: "背景模糊", min: 0, max: 20, step: 0.5, hint: "调大会盖住折射感，别超过 6" },
  { key: "dispersion", label: "色散", min: 0, max: 0.12, step: 0.005, hint: "边缘红蓝分离" },
  { key: "tint", label: "白色染色", min: 0, max: 0.35, step: 0.01, hint: "保证文字可读的底" },
  { key: "rim", label: "高光边缘", min: 0, max: 1, step: 0.05, hint: "镜面反光强度" },
];

const glassProps = computed(() => ({ ...p }));
const chipProps = computed(() => ({
  ...p,
  radius: Math.min(p.radius, 16),
  bevel: Math.min(p.bevel, 12),
  thickness: Math.min(p.thickness, 9),
}));
</script>

<style scoped>
.blob {
  position: absolute;
  width: 46vw;
  height: 46vw;
  border-radius: 9999px;
  filter: blur(70px);
  opacity: 0.55;
}
.blob--a { background: #2d9ed0; top: -8%; left: -6%; animation: mesh-blob 22s infinite alternate linear; }
.blob--b { background: #7c3aed; bottom: -14%; right: -6%; animation: mesh-blob 28s infinite alternate-reverse linear; }
.blob--c { background: #db2777; top: 38%; left: 42%; animation: mesh-blob 34s infinite alternate linear; }

/* 细网格是折射最好的试纸：线条被弯曲一眼就能看见 */
.grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px);
  background-size: 26px 26px;
}

.grid-diag {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.11) 0 1px, transparent 1px 34px),
    repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.11) 0 1px, transparent 1px 34px);
}

.drift { animation: drift 40s linear infinite; }
@keyframes drift {
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .blob, .drift { animation: none; }
}
</style>
