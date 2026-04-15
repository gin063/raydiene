<script setup lang="ts">
// components/Vortex.vue
// 改编自 Inspira UI 的 Vortex Background。
// 调整：
// - 移除 @inspira-ui/plugins 的 cn（直接拼 class）
// - 移除 motion-v 的 <Motion>（用 CSS 过渡实现 opacity fade-in）
// - 内联 debounce，避免强依赖 @vueuse/core
import { createNoise3D } from "simplex-noise";
import { onMounted, onUnmounted, ref, shallowRef, useTemplateRef } from "vue";

interface VortexProps {
  class?: string;
  containerClass?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  rangeHue?: number;       // 色相变化范围（越小颜色越纯）
  saturation?: number;     // 0-100 基础饱和度
  lightness?: number;      // 0-100 基础亮度（越高越接近白）
  whiteRatio?: number;     // 0-1 随机白色粒子的比例（白 = 饱和度 0 + 亮度 90）
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

const props = withDefaults(defineProps<VortexProps>(), {
  particleCount: 700,
  rangeY: 100,
  baseSpeed: 0.0,
  rangeSpeed: 1.5,
  baseRadius: 1,
  rangeRadius: 2,
  baseHue: 220,
  rangeHue: 100,
  saturation: 100,
  lightness: 60,
  whiteRatio: 0,
  backgroundColor: "#000000",
});

const TAU = 2 * Math.PI;
const BASE_TTL = 50;
const RANGE_TTL = 150;
const PARTICLE_PROP_COUNT = 10;
const NOISE_STEPS = 3;
const X_OFF = 0.00125;
const Y_OFF = 0.00125;
const Z_OFF = 0.0005;

const tick = ref<number>(0);
const animationFrame = ref<number | null>(null);
const particleProps = shallowRef<Float32Array | null>(null);
const center = ref<[number, number]>([0, 0]);
const ctx = shallowRef<CanvasRenderingContext2D | null>(null);
const mounted = ref(false);

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

const particleCache = {
  x: 0, y: 0, vx: 0, vy: 0,
  life: 0, ttl: 0, speed: 0, radius: 0, hue: 0, isWhite: 0,
};

const noise3D = createNoise3D();

const rand = (n: number) => n * Math.random();
const randRange = (n: number) => n - rand(2 * n);
const fadeInOut = (t: number, m: number) => {
  const hm = 0.5 * m;
  return Math.abs(((t + hm) % m) - hm) / hm;
};
const lerp = (n1: number, n2: number, speed: number) => (1 - speed) * n1 + speed * n2;

function initParticle(i: number) {
  if (!particleProps.value || !canvasRef.value) return;
  const canvas = canvasRef.value;
  particleCache.x = rand(canvas.width);
  particleCache.y = center.value[1] + randRange(props.rangeY);
  particleCache.vx = 0;
  particleCache.vy = 0;
  particleCache.life = 0;
  particleCache.ttl = BASE_TTL + rand(RANGE_TTL);
  particleCache.speed = props.baseSpeed + rand(props.rangeSpeed);
  particleCache.radius = props.baseRadius + rand(props.rangeRadius);
  particleCache.hue = props.baseHue + rand(props.rangeHue);
  particleCache.isWhite = Math.random() < props.whiteRatio ? 1 : 0;

  particleProps.value.set(
    [
      particleCache.x, particleCache.y,
      particleCache.vx, particleCache.vy,
      particleCache.life, particleCache.ttl,
      particleCache.speed, particleCache.radius, particleCache.hue,
      particleCache.isWhite,
    ],
    i,
  );
}

function updateParticle(i: number) {
  if (!particleProps.value || !canvasRef.value || !ctx.value) return;
  const canvas = canvasRef.value;
  const p = particleProps.value;
  const context = ctx.value;

  particleCache.x = p[i]!;
  particleCache.y = p[i + 1]!;
  particleCache.vx = p[i + 2]!;
  particleCache.vy = p[i + 3]!;
  particleCache.life = p[i + 4]!;
  particleCache.ttl = p[i + 5]!;
  particleCache.speed = p[i + 6]!;
  particleCache.radius = p[i + 7]!;
  particleCache.hue = p[i + 8]!;
  particleCache.isWhite = p[i + 9]!;

  const n =
    noise3D(particleCache.x * X_OFF, particleCache.y * Y_OFF, tick.value * Z_OFF) *
    NOISE_STEPS *
    TAU;

  const nextVx = lerp(particleCache.vx, Math.cos(n), 0.5);
  const nextVy = lerp(particleCache.vy, Math.sin(n), 0.5);
  const nextX = particleCache.x + nextVx * particleCache.speed;
  const nextY = particleCache.y + nextVy * particleCache.speed;

  context.save();
  context.lineCap = "round";
  context.lineWidth = particleCache.radius;
  const sat = particleCache.isWhite ? 0 : props.saturation;
  const light = particleCache.isWhite ? 90 : props.lightness;
  context.strokeStyle = `hsla(${particleCache.hue},${sat}%,${light}%,${fadeInOut(
    particleCache.life,
    particleCache.ttl,
  )})`;
  context.beginPath();
  context.moveTo(particleCache.x, particleCache.y);
  context.lineTo(nextX, nextY);
  context.stroke();
  context.restore();

  p[i] = nextX;
  p[i + 1] = nextY;
  p[i + 2] = nextVx;
  p[i + 3] = nextVy;
  p[i + 4] = particleCache.life + 1;

  if (
    nextX > canvas.width ||
    nextX < 0 ||
    nextY > canvas.height ||
    nextY < 0 ||
    particleCache.life > particleCache.ttl
  ) {
    initParticle(i);
  }
}

function draw() {
  if (!canvasRef.value || !ctx.value || !particleProps.value) return;
  const canvas = canvasRef.value;
  const context = ctx.value;

  tick.value++;
  context.fillStyle = props.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleProps.value.length; i += PARTICLE_PROP_COUNT) {
    updateParticle(i);
  }

  context.save();
  context.filter = "blur(8px) brightness(200%)";
  context.globalCompositeOperation = "lighter";
  context.drawImage(canvas, 0, 0);
  context.restore();

  context.save();
  context.filter = "blur(4px) brightness(200%)";
  context.globalCompositeOperation = "lighter";
  context.drawImage(canvas, 0, 0);
  context.restore();

  animationFrame.value = requestAnimationFrame(draw);
}

function resizeCanvas() {
  if (!canvasRef.value) return;
  const canvas = canvasRef.value;
  const rect = canvas.parentElement?.getBoundingClientRect();
  const w = rect?.width ?? window.innerWidth;
  const h = rect?.height ?? window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  center.value = [0.5 * w, 0.5 * h];
}

let resizeTimer: ReturnType<typeof setTimeout> | null = null;
function handleResize() {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => resizeCanvas(), 150);
}

// 视觉无损节流：视口外 / tab 隐藏时暂停；prefers-reduced-motion 下不启动动画
let reducedMotion = false;
let io: IntersectionObserver | null = null;
let isInViewport = true;

function pause() {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
    animationFrame.value = null;
  }
}
function resume() {
  if (animationFrame.value || reducedMotion) return;
  if (!isInViewport || document.visibilityState === "hidden") return;
  draw();
}
function onVisibilityChange() {
  if (document.visibilityState === "hidden") pause();
  else resume();
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  ctx.value = canvas.getContext("2d");
  if (!ctx.value) return;

  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  resizeCanvas();

  const particlePropsLength = props.particleCount * PARTICLE_PROP_COUNT;
  particleProps.value = new Float32Array(particlePropsLength);
  for (let i = 0; i < particlePropsLength; i += PARTICLE_PROP_COUNT) {
    initParticle(i);
  }

  if (reducedMotion) {
    // 静态首帧：绘制一帧后不再启动 rAF，保留视觉形态 + 零 CPU 占用
    draw();
    pause();
  } else {
    draw();
  }

  window.addEventListener("resize", handleResize);
  document.addEventListener("visibilitychange", onVisibilityChange);

  // 视口可见性监测：容器离开视口即暂停
  const host = canvas.parentElement?.parentElement; // Vortex 外层 wrapper
  if (host && "IntersectionObserver" in window) {
    io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        isInViewport = entry.isIntersecting;
        if (isInViewport) resume();
        else pause();
      },
      { threshold: 0 },
    );
    io.observe(host);
  }

  requestAnimationFrame(() => (mounted.value = true));
});

onUnmounted(() => {
  pause();
  if (resizeTimer) clearTimeout(resizeTimer);
  window.removeEventListener("resize", handleResize);
  document.removeEventListener("visibilitychange", onVisibilityChange);
  if (io) {
    io.disconnect();
    io = null;
  }
  ctx.value = null;
  particleProps.value = null;
});
</script>

<template>
  <div :class="['relative h-full w-full', props.containerClass]">
    <div
      class="absolute inset-0 z-0 flex size-full items-center justify-center bg-transparent transition-opacity duration-700"
      :class="mounted ? 'opacity-100' : 'opacity-0'"
    >
      <canvas ref="canvasRef" class="block" />
    </div>

    <div :class="['relative z-10', props.class]">
      <slot />
    </div>
  </div>
</template>
