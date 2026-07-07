<template>
  <div class="min-h-screen w-full bg-[#050505] text-white selection:bg-cyan-500/30 font-sans pt-24 pb-20">

    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-amber-500/80 opacity-[0.12] rounded-full blur-[120px] animate-pulse-slow">
      </div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/90 opacity-20 rounded-full blur-[120px] animate-pulse-slow"
        style="animation-delay: 2s;"></div>
      <div class="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20 mix-blend-overlay"></div>
    </div>

    <!-- Hero -->
    <div class="relative z-10 container mx-auto px-6 mb-16 text-center animate-fade-up">
      <h1 class="text-4xl md:text-5xl font-hero font-bold tracking-tight mb-4 mt-12 text-white">认证证书</h1>
      <p class="text-gray-500 text-xs md:text-sm tracking-[0.3em] uppercase font-bold">Certifications</p>
    </div>

    <div class="relative z-10 container mx-auto px-6 space-y-16">

      <!-- 新规说明 -->
      <section class="animate-fade-up delay-100">
        <div
          class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 md:p-10 overflow-hidden">
          <div class="text-center max-w-3xl mx-auto">
            <span
              class="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider mb-4">国家强制性产品认证</span>
            <h2 class="text-2xl md:text-3xl font-bold font-hero mb-4 text-white">选好桩 · 认准 3C 认证</h2>
            <p class="text-gray-400 text-sm md:text-base leading-relaxed">
              根据国家新规，自 <span class="text-white font-bold">2026 年 8 月 1 日</span>
              起，未取得 3C 认证的充电桩产品将全面禁止销售。雷迪恩全系产品不仅符合标准，更已提前拿证，让您买得放心。
            </p>
          </div>
        </div>
      </section>

      <!-- 单张证书网格 -->
      <section class="animate-fade-up delay-200">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-bold font-hero text-white mb-2">全系产品认证证书</h2>
          <p class="text-gray-500 text-sm">点击证书可放大查看</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="cert in certificates" :key="cert.no"
            class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden flex flex-col hover:border-amber-400/40 hover:shadow-[0_0_40px_-12px_rgba(251,191,36,0.35)] transition-all duration-500">
            <button type="button" @click="openZoom(cert.src, cert.title)"
              class="relative block w-full bg-white/[0.03] p-4 cursor-zoom-in group">
              <NuxtImg :src="cert.src" :alt="`${cert.title} 3C认证证书`" sizes="100vw md:50vw lg:33vw"
                class="block w-full h-auto rounded-lg border border-white/10 group-hover:scale-[1.02] transition-transform duration-500"
                format="webp" :modifiers="{ withoutEnlargement: true }" loading="lazy" />
              <span
                class="absolute top-6 right-6 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                  <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                    transform="rotate(45 10 10)" />
                </svg>
                点击放大
              </span>
            </button>

            <div class="p-6 border-t border-white/10 flex flex-col flex-1">
              <h3 class="text-lg font-bold text-white mb-3">{{ cert.title }}</h3>
              <dl class="space-y-2 text-sm text-gray-400 flex-1">
                <div class="flex gap-2">
                  <dt class="shrink-0 text-gray-500">覆盖型号</dt>
                  <dd class="text-gray-300">{{ cert.models }}</dd>
                </div>
                <div class="flex gap-2">
                  <dt class="shrink-0 text-gray-500">证书编号</dt>
                  <dd class="text-gray-300 font-mono tracking-tight">{{ cert.no }}</dd>
                </div>
                <div class="flex gap-2">
                  <dt class="shrink-0 text-gray-500">有效期至</dt>
                  <dd class="text-gray-300">{{ cert.validUntil }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <!-- 查验 CTA -->
      <section class="animate-fade-up delay-200">
        <div class="max-w-2xl mx-auto bg-black/40 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-md">
          <h3 class="text-xl font-bold mb-2 text-white">证书真伪查验</h3>
          <p class="text-gray-500 text-sm mb-6">
            所有证书均可在中国质量认证中心（CQC）官网查验。
          </p>
          <a href="https://webdata.cqccms.com.cn/webdata/query/CCCCerti.do" target="_blank" rel="noopener noreferrer"
            class="group relative inline-flex items-center justify-center bg-white text-black font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/20 overflow-hidden">
            <div
              class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-[100%] group-hover:animate-shine">
            </div>
            <span class="relative z-10 flex items-center">
              前往官方查验平台
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-4 h-4 ml-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </span>
          </a>
        </div>
      </section>

    </div>

    <!-- 灯箱 -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="zoomSrc" @click="closeZoom"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl cursor-zoom-out">
          <button type="button" @click.stop="closeZoom"
            class="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <NuxtImg :src="zoomSrc" :alt="zoomAlt" @click.stop sizes="xs:100vw sm:100vw md:90vw lg:80vw xl:80vw xxl:80vw"
            class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" format="webp" />
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

useSeoMeta({
  title: '3C认证证书 - 国家强制性产品认证 | Raydiene 雷迪恩',
  description: '雷迪恩充电桩全系产品已通过国家强制性产品认证（CCC/3C认证），符合GB 39752-2024、GB 44263-2024新国标。坚石/磐石Pro/磐石Max/星辰/星耀系列证书可在中国质量认证中心官网在线查验，正品可查，买得放心。',
  keywords: '充电桩3C认证, CCC认证, 充电桩强制认证, 雷迪恩3C证书, GB 39752-2024, 充电桩国标, 认证证书查验',
  ogTitle: '雷迪恩充电桩 · 全系已通过国家3C认证',
  ogDescription: '选好桩，认准3C认证。全系产品证书可在CQC官网在线查验，正品可查。',
  ogImage: 'https://assets.raydiene.cn/images/certificates/cert-panshi.jpg',
})

// 单张证书数据（映射以实际扫描件为准，图片放入 public/images/certificates/）
const certificates = [
  {
    title: '磐石Pro / 磐石Max / 坚石（7kW）',
    models: 'A1607-GB01-001、A1607-GB01-002、A1607-GB01-101',
    no: '2026012501860428',
    validUntil: '2031-02-27',
    src: '/images/certificates/cert-panshi.jpg',
  },
  {
    title: '星辰 / 星耀（7kW）',
    models: 'A1507-GB01-101、A1507-GB01-001',
    no: '2026012501877107',
    validUntil: '2031-04-29',
    src: '/images/certificates/cert-xingchen.jpg',
  },
  {
    title: '星耀（21kW）',
    models: 'A1521-GB03-101',
    no: '2026012501877106',
    validUntil: '2031-04-23',
    src: '/images/certificates/cert-xingyao21.jpg',
  },
]

// 灯箱
const zoomSrc = ref('')
const zoomAlt = ref('')
const openZoom = (src, alt) => {
  zoomSrc.value = src
  zoomAlt.value = alt
}
const closeZoom = () => {
  zoomSrc.value = ''
}
const onKey = (e) => {
  if (e.key === 'Escape') closeZoom()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-fade-up {
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.group-hover\:animate-shine:hover {
  animation: shine 0.7s ease-in-out;
}

.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }

  50% {
    opacity: 0.4;
    transform: scale(1.05);
  }
}
</style>
