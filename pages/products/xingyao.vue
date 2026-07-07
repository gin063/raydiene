<template>
  <div
    class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-brand selection:text-white overflow-x-hidden font-sans">

    <div class="relative w-full h-screen">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <picture class="block w-full h-full">
          <source media="(max-width: 767px)" :srcset="heroMobile.srcset" :sizes="heroMobile.sizes" />
          <img :src="heroDesktop.src" :srcset="heroDesktop.srcset" :sizes="heroDesktop.sizes"
            alt="雷迪恩星耀系列家用充电桩安装场景"
            class="w-full h-full object-cover animate-ken-burns" loading="eager" fetchpriority="high" />
        </picture>
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      <div
        class="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end items-center text-center pb-48 md:pb-28">
        <h1 class="text-5xl md:text-7xl font-bold font-hero tracking-tight mb-6 animate-fade-in-up">
          星耀系列
        </h1>
        <p class="text-xl md:text-2xl text-gray-200 font-light tracking-wide mb-6 animate-fade-in-up"
          style="animation-delay: 0.2s">
          7kW / 21kW 家用交流充电桩 · 触控大屏，时代之巅
        </p>
        <div class="flex animate-fade-in-up" style="animation-delay: 0.4s">
          <a href="https://item.jd.com/10195071831710.html" target="_blank" rel="noopener noreferrer"
            class="px-8 py-3 rounded-full border border-white/10 font-bold bg-brand/80 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors">
            立即订购
          </a>
        </div>
      </div>
    </div>

    <div class="bg-[#111] border-y border-white/5 py-16 relative z-20">
      <div class="container mx-auto px-6">
        <ProductFeatureBar :features="features" />
      </div>
    </div>

    <section class="py-16 bg-[#0a0a0a]">
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <div class="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <NuxtImg src="/images/products/xingyao/detail.jpg" alt="雷迪恩星耀系列家用充电桩旗舰质感细节"
                sizes="md:100vw lg:50vw" loading="lazy"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 font-hero">旗舰机型 · 面面俱到</h2>
            <p class="text-gray-400 mb-10 leading-relaxed">
              被誉为”六边形战士”的顶奢智能配置。7寸智能触控大屏，28重安全防护，重新定义家用充电桩的体验天花板。
            </p>

            <ProductHighlightGrid :items="highlightCards" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#050505] relative overflow-hidden">
      <div class="absolute right-0 top-1/4 w-[50vw] h-[50vw] bg-brand/10 rounded-full blur-[120px] pointer-events-none">
      </div>
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <div class="relative mx-auto max-w-2xl">
              <NuxtImg src="/images/products/xingyao/app-scene.jpg" alt="雷迪恩星耀系列家用充电桩7寸触控屏智能交互"
                sizes="md:100vw lg:40vw" loading="lazy"
                class="w-full h-auto rounded-3xl shadow-2xl border border-white/5" />
            </div>
          </div>
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <h2 class="text-3xl md:text-4xl font-bold mb-6 font-hero">智控 · 个性定义</h2>
            <p class="text-gray-400 mb-10 text-lg">
              不仅仅是充电。自定义屏保、个性化氛围灯，让充电桩成为您车库中的艺术品。
            </p>

            <ProductAppList :items="appFeatures" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#0a0a0a] border-t border-white/5 pb-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-16 font-hero">详细规格参数</h2>
        <div class="flex flex-col md:flex-row gap-12 items-start mb-16">
          <div class="w-full md:w-1/3 flex justify-center sticky top-24">
            <NuxtImg src="/images/products/xingyao/front.png" alt="雷迪恩星耀系列家用充电桩正视图"
              sizes="90vw md:360px" loading="lazy" class="w-full h-auto drop-shadow-2xl" />
          </div>
          <div class="w-full md:w-2/3">
            <ProductSpecsTable :specs="xingyaoSpecs" />
            <NuxtLink to="/products/certificates"
              class="group mt-6 inline-flex items-center gap-2 text-sm text-brand hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 shrink-0">
                <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              本产品已通过国家强制性3C认证 · 查看证书
              <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </NuxtLink>
          </div>
        </div>

        <div class="w-full relative aspect-[21/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
          <NuxtImg src="/images/products/xingyao/lifestyle.jpg" alt="雷迪恩星耀系列家用充电桩旗舰生活场景"
            sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw" loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 hover:grayscale-0" />
          <div
            class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 z-10 scale-50 origin-bottom-left md:scale-100">
            <span class="text-sm font-bold text-brand">星耀</span>
            <span class="text-xs text-white ml-2">触控大屏 · 时代之巅</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#050505] border-t border-white/5">
      <div class="container mx-auto px-6">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-16 font-hero tracking-widest text-white uppercase">
          探索更多系列</h2>
        <div
          class="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-4 -mx-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:px-0 md:mx-0 no-scrollbar">

          <NuxtLink to="/products/jianshi"
            class="flex-shrink-0 w-[85vw] snap-center md:w-auto group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-cyan-400/50 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] transition-all duration-500">
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/30 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            </div>
            <div class="absolute top-8 left-0 w-full z-20 flex flex-col items-center">
              <h3 class="text-3xl font-bold text-white mb-2 font-hero">坚石系列</h3>
              <p
                class="text-xs text-gray-400 tracking-widest uppercase group-hover:text-cyan-400 transition-colors duration-300">
                实用至上 · 大道至简</p>
            </div>
            <div class="absolute inset-0 flex items-center justify-center p-6 z-10">
              <NuxtImg src="/images/products/jianshi-cover.png" alt="雷迪恩坚石系列家用充电桩"
                sizes="85vw md:30vw" loading="lazy"
                class="w-[75%] md:w-[85%] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out" />
            </div>
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div
                class="relative flex items-center justify-center backdrop-blur-md border border-white/10 bg-white/5 rounded-full transition-all duration-500 ease-out w-12 h-12 group-hover:w-32 overflow-hidden group-hover:bg-cyan-900/20 group-hover:border-cyan-500/30 group/btn hover:!bg-white hover:!border-white">
                <div
                  class="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-50 group-hover:-rotate-45">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 text-white/70">
                    <path fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <span
                  class="absolute inset-0 flex items-center justify-center text-sm tracking-widest font-bold text-white whitespace-nowrap opacity-0 scale-50 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover/btn:text-black">了解更多</span>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/products/panshi"
            class="flex-shrink-0 w-[85vw] snap-center md:w-auto group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-cyan-400/50 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] transition-all duration-500">
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/30 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            </div>
            <div class="absolute top-8 left-0 w-full z-20 flex flex-col items-center">
              <h3 class="text-3xl font-bold text-white mb-2 font-hero">磐石系列</h3>
              <p
                class="text-xs text-gray-400 tracking-widest uppercase group-hover:text-cyan-400 transition-colors duration-300">
                简约时尚 · 品质之选</p>
            </div>
            <div class="absolute inset-0 flex items-center justify-center p-6 z-10">
              <NuxtImg src="/images/products/panshi-cover.png" alt="雷迪恩磐石系列家用充电桩"
                sizes="85vw md:30vw" loading="lazy"
                class="w-[75%] md:w-[85%] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out" />
            </div>
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div
                class="relative flex items-center justify-center backdrop-blur-md border border-white/10 bg-white/5 rounded-full transition-all duration-500 ease-out w-12 h-12 group-hover:w-32 overflow-hidden group-hover:bg-cyan-900/20 group-hover:border-cyan-500/30 group/btn hover:!bg-white hover:!border-white">
                <div
                  class="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-50 group-hover:-rotate-45">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 text-white/70">
                    <path fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <span
                  class="absolute inset-0 flex items-center justify-center text-sm tracking-widest font-bold text-white whitespace-nowrap opacity-0 scale-50 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover/btn:text-black">了解更多</span>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/products/xingchen"
            class="flex-shrink-0 w-[85vw] snap-center md:w-auto group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-cyan-400/50 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] transition-all duration-500">
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/30 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            </div>
            <div class="absolute top-8 left-0 w-full z-20 flex flex-col items-center">
              <h3 class="text-3xl font-bold text-white mb-2 font-hero">星辰系列</h3>
              <p
                class="text-xs text-gray-400 tracking-widest uppercase group-hover:text-cyan-400 transition-colors duration-300">
                智能科技 · 美学之光</p>
            </div>
            <div class="absolute inset-0 flex items-center justify-center p-6 z-10">
              <NuxtImg src="/images/products/xingchen-cover.png" alt="雷迪恩星辰系列家用充电桩"
                sizes="85vw md:30vw" loading="lazy"
                class="w-[75%] md:w-[85%] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out" />
            </div>
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div
                class="relative flex items-center justify-center backdrop-blur-md border border-white/10 bg-white/5 rounded-full transition-all duration-500 ease-out w-12 h-12 group-hover:w-32 overflow-hidden group-hover:bg-cyan-900/20 group-hover:border-cyan-500/30 group/btn hover:!bg-white hover:!border-white">
                <div
                  class="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-50 group-hover:-rotate-45">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-5 h-5 text-white/70">
                    <path fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <span
                  class="absolute inset-0 flex items-center justify-center text-sm tracking-widest font-bold text-white whitespace-nowrap opacity-0 scale-50 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover/btn:text-black">了解更多</span>
              </div>
            </div>
          </NuxtLink>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductSchema } from '~/composables/useJsonLd'

// --- Product JSON-LD Schema ---
useProductSchema({
  name: '雷迪恩星耀系列 7kW/21kW旗舰触控家用充电桩',
  description: '雷迪恩星耀系列旗舰级家用充电桩，搭载7寸高清触控大屏与智能语音交互，支持7kW及21kW超快充，28重安全防护，4年全程只换不修，特斯拉版支持一键开盖功能。已通过中国强制性3C认证，适配99%国标新能源车型。',
  price: 1999,
  url: 'https://www.raydiene.cn/products/xingyao',
  image: 'https://assets.raydiene.cn/images/products/xingyao.png',
  sku: 'A1507-GB01-101',
  warranty: '4年质保只换不修',
  hasCertification: true,
})

// --- SEO 配置 ---
useSeoMeta({
  title: '星耀系列 - 7kW/21kW旗舰触控家用充电桩 | 时代之巅 | Raydiene 雷迪恩',
  description: '雷迪恩(Raydiene)星耀系列，行业旗舰级家用充电桩。搭载7寸高清触控大屏与智能语音交互系统，支持7kW及21kW超快充。标配特斯拉一键开盖功能、28重安全防护及4年超长质保只换不修，支持自定义屏保与流光氛围灯，定义未来充电体验。',
  keywords: '雷迪恩星耀系列, 21kW充电桩, 触控屏充电桩, 特斯拉一键开盖, 语音控制充电桩, 高端家用充电桩, 智能充电桩旗舰, Raydiene',
  // 社交分享优化
  ogTitle: '雷迪恩星耀系列：触控大屏，时代之巅',
  ogDescription: '行业旗舰之作。7寸大屏交互，21kW极速补能，标配特斯拉一键开盖。',
  // 使用极具视觉冲击力的场景图
  ogImage: 'https://assets.raydiene.cn/images/products/xingyao/scene-bg.jpg',
})

// === 首屏 Hero：art-direction，按视口只下载一张（移动竖图 / 桌面横图）===
const $img = useImage()
const heroSizes = (src) => $img.getSizes(src, { sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw', modifiers: { format: 'webp', quality: 80 } })
const heroMobile = heroSizes('/images/products/xingyao/scene-bg-mobile.jpg')
const heroDesktop = heroSizes('/images/products/xingyao/scene-bg.jpg')

// 产品结构化数据（图标 + 特性 + 规格）统一自 composables/useProducts
const { features, highlightCards, appFeatures, specs: xingyaoSpecs } = useProducts('xingyao')

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ken-burns {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}

.animate-ken-burns {
  animation: ken-burns 20s ease-out forwards;
}
</style>