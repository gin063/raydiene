<template>
  <div class="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
    <div class="marquee flex whitespace-nowrap" :style="{ animationDuration: speed + 's' }">
      <div class="flex shrink-0 items-center">
        <span v-for="(w, i) in words" :key="`a-${i}`"
          class="font-bold font-hero leading-none tracking-tight pr-[8vw]" :class="[sizeClass, opacityClass]">{{ w }}</span>
      </div>
      <div class="flex shrink-0 items-center" aria-hidden="true">
        <span v-for="(w, i) in words" :key="`b-${i}`"
          class="font-bold font-hero leading-none tracking-tight pr-[8vw]" :class="[sizeClass, opacityClass]">{{ w }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可复用的巨型文字横向滚动背景（marquee）。用于 media/news、contact/official 等页顶。
defineProps({
  words: { type: Array, required: true },
  speed: { type: Number, default: 70 }, // 单圈秒数，越大越慢
  sizeClass: { type: String, default: 'text-[14vw] md:text-[12vw]' },
  opacityClass: { type: String, default: 'text-white/[0.06]' },
})
</script>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.marquee {
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
  width: max-content;
}

@media (prefers-reduced-motion: reduce) {
  .marquee {
    animation: none;
  }
}
</style>
