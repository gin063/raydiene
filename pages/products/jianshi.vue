<template>
  <div class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-brand selection:text-white overflow-x-hidden font-sans">

    <div class="relative w-full h-screen">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <NuxtImg src="/images/products/jianshi/scene-bg-mobile.jpg" alt="坚石系列场景-移动端" class="block md:hidden w-full h-full object-cover animate-ken-burns" placeholder />
        <NuxtImg src="/images/products/jianshi/scene-bg.jpg" alt="坚石系列场景-PC端" class="hidden md:block w-full h-full object-cover animate-ken-burns" placeholder />
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      <div class="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end items-center text-center pb-48 md:pb-28">
        <h1 class="text-5xl md:text-7xl font-bold font-hero tracking-tight mb-6 animate-fade-in-up">
          坚石系列
        </h1>
        <p class="text-xl md:text-2xl text-gray-200 font-light tracking-wide mb-6 animate-fade-in-up" style="animation-delay: 0.2s">
          7kW 家用交流充电桩 · 实用至上，大道至简
        </p>
        <div class="flex animate-fade-in-up" style="animation-delay: 0.4s">
          <a href="https://item.jd.com/10193535139932.html" target="_blank" rel="noopener noreferrer" class="px-8 py-3 rounded-full border border-white/10 font-bold bg-brand/80 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors duration-500">
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
              <NuxtImg src="/images/products/jianshi/detail.jpg" alt="坚石产品质感" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 font-hero">全天候 · 硬核防护</h2>
            <p class="text-gray-400 mb-10 leading-relaxed">
              专为户外复杂环境设计。无论是严寒酷暑，还是高原低谷，坚石系列始终如一地提供安全、稳定的充电服务。
            </p>
            
            <ProductHighlightGrid :items="highlightCards" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#050505] relative overflow-hidden">
      <div class="absolute right-0 top-1/4 w-[50vw] h-[50vw] bg-brand/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <div class="relative mx-auto max-w-2xl">
              <NuxtImg src="/images/products/jianshi/app-scene.jpg" alt="手机智能控制" class="w-full h-auto rounded-3xl shadow-2xl border border-white/5" />
            </div>
          </div>
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <h2 class="text-3xl md:text-4xl font-bold mb-6 font-hero">掌控 · 随心所欲</h2>
            <p class="text-gray-400 mb-10 text-lg">
              通过雷迪恩App，您的手机就是充电桩的控制中心。数据可视化，管理更轻松。
            </p>
            
            <ProductAppList :items="appFeatures" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#0a0a0a] border-t border-white/5">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-16 font-hero">详细规格参数</h2>
        <div class="flex flex-col md:flex-row gap-12 items-start mb-12">
          <div class="w-full md:w-1/3 flex justify-center sticky top-24">
            <NuxtImg src="/images/products/jianshi/front.png" alt="坚石系列正视图" class="w-full h-auto drop-shadow-2xl" />
          </div>
          <div class="w-full md:w-2/3">
            <ProductSpecsTable :specs="jianshiSpecs" />
          </div>
        </div>

        <div class="w-full relative aspect-[21/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
          <NuxtImg src="/images/products/jianshi/lifestyle.jpg" alt="坚石系列生活场景" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 hover:grayscale-0" />
          <div class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 z-10 scale-50 origin-bottom-left md:scale-100">
            <span class="text-sm font-bold text-brand">坚石</span>
            <span class="text-xs text-white ml-2">实用至上 · 大道至简</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#050505] border-t border-white/5">
      <div class="container mx-auto px-6">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-16 font-hero tracking-widest text-white uppercase">
          探索更多系列
        </h2>
        <div class="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-4 -mx-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:px-0 md:mx-0 no-scrollbar">
          
          <NuxtLink to="/products/panshi" class="flex-shrink-0 w-[85vw] snap-center md:w-auto group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-cyan-400/50 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] transition-all duration-500">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/30 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute top-8 left-0 w-full z-20 flex flex-col items-center">
              <h3 class="text-3xl font-bold text-white mb-2 font-hero">磐石系列</h3>
              <p class="text-xs text-gray-400 tracking-widest uppercase group-hover:text-cyan-400 transition-colors duration-300">简约时尚 · 品质之选</p>
            </div>
            <div class="absolute inset-0 flex items-center justify-center p-6 z-10">
              <NuxtImg src="/images/products/panshi-cover.png" alt="磐石系列" class="w-[75%] md:w-[85%] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out" />
            </div>
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div class="relative flex items-center justify-center backdrop-blur-md border border-white/10 bg-white/5 rounded-full transition-all duration-500 ease-out w-12 h-12 group-hover:w-32 overflow-hidden group-hover:bg-cyan-900/20 group-hover:border-cyan-500/30 group/btn hover:!bg-white hover:!border-white">
                <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-50 group-hover:-rotate-45">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white/70"><path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
                </div>
                <span class="absolute inset-0 flex items-center justify-center text-sm tracking-widest font-bold text-white whitespace-nowrap opacity-0 scale-50 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover/btn:text-black">了解更多</span>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/products/xingchen" class="flex-shrink-0 w-[85vw] snap-center md:w-auto group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-cyan-400/50 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] transition-all duration-500">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/30 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute top-8 left-0 w-full z-20 flex flex-col items-center">
              <h3 class="text-3xl font-bold text-white mb-2 font-hero">星辰系列</h3>
              <p class="text-xs text-gray-400 tracking-widest uppercase group-hover:text-cyan-400 transition-colors duration-300">智能科技 · 美学之光</p>
            </div>
            <div class="absolute inset-0 flex items-center justify-center p-6 z-10">
              <NuxtImg src="/images/products/xingchen-cover.png" alt="星辰系列" class="w-[75%] md:w-[85%] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out" />
            </div>
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div class="relative flex items-center justify-center backdrop-blur-md border border-white/10 bg-white/5 rounded-full transition-all duration-500 ease-out w-12 h-12 group-hover:w-32 overflow-hidden group-hover:bg-cyan-900/20 group-hover:border-cyan-500/30 group/btn hover:!bg-white hover:!border-white">
                <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-50 group-hover:-rotate-45">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white/70"><path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
                </div>
                <span class="absolute inset-0 flex items-center justify-center text-sm tracking-widest font-bold text-white whitespace-nowrap opacity-0 scale-50 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover/btn:text-black">了解更多</span>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/products/xingyao" class="flex-shrink-0 w-[85vw] snap-center md:w-auto group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-cyan-400/50 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] transition-all duration-500">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/30 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute top-8 left-0 w-full z-20 flex flex-col items-center">
              <h3 class="text-3xl font-bold text-white mb-2 font-hero">星耀系列</h3>
              <p class="text-xs text-gray-400 tracking-widest uppercase group-hover:text-cyan-400 transition-colors duration-300">触控大屏 · 时代之巅</p>
            </div>
            <div class="absolute inset-0 flex items-center justify-center p-6 z-10">
              <NuxtImg src="/images/products/xingyao-cover.png" alt="星耀系列" class="w-[75%] md:w-[85%] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out" />
            </div>
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div class="relative flex items-center justify-center backdrop-blur-md border border-white/10 bg-white/5 rounded-full transition-all duration-500 ease-out w-12 h-12 group-hover:w-32 overflow-hidden group-hover:bg-cyan-900/20 group-hover:border-cyan-500/30 group/btn hover:!bg-white hover:!border-white">
                <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-50 group-hover:-rotate-45">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white/70"><path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
                </div>
                <span class="absolute inset-0 flex items-center justify-center text-sm tracking-widest font-bold text-white whitespace-nowrap opacity-0 scale-50 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover/btn:text-black">了解更多</span>
              </div>
            </div>
          </NuxtLink>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted, defineComponent, h } from 'vue'

// === 1. 通用图标 ===
const IconCheck = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' })]) })
const IconTool = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z' })]) })
const IconClock = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' })]) })
const IconVerified = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z' })]) })
const IconWifi = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z' })]) })

// === 2. 4个特性卡片图标 (从原代码提取) ===
const IconIP = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' })]) })
const IconTemp = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' })]) })
const IconConnect = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z' })]) })
const IconShield = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.243-8.25-3.285z' })]) })

// === 3. APP 功能图标 ===
const IconApp = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z' }), h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z' })]) })
const IconTime = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' })]) })
const IconShare = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' })]) })

// === 4. 数据配置 ===
const features = [
  { text: '适配99%车型', icon: IconCheck },
  { text: '专业上门安装', icon: IconTool },
  { text: '7*15h 响应', icon: IconClock },
  { text: '2年质保只换不修', icon: IconVerified },
  { text: '终身免费流量 & OTA', icon: IconWifi },
]

// 中间 4 张特性卡片
const highlightCards = [
  { title: 'IP67/IP65 防护', desc: '枪头IP67 / 桩体IP65', icon: IconIP },
  { title: '20重安全保护', desc: '过压/过流/漏电/防雷等', icon: IconShield }, // 复用 IconShield
  { title: '-30℃ ~ 50℃', desc: '极端温度稳定运行', icon: IconTemp },
  { title: '智能互联', desc: '蓝牙 / 4G / 充满自停', icon: IconConnect },
]

// APP 功能列表
const appFeatures = [
  { title: 'APP 远程管理', desc: '无论身在何处，一键启动/停止充电，实时查看进度。', icon: IconApp },
  { title: '预约错峰充电', desc: '设置定时任务，利用夜间低谷电价，为您省钱。', icon: IconTime },
  { title: '私桩共享', desc: '闲置时可授权亲友使用，或共享赚取收益。', icon: IconShare },
]

// 规格参数表
const jianshiSpecs = [
  { label: '产品型号', value: 'A1607-GB01-101' },
  { label: '产品名称', value: '坚石系列交流充电桩（家用版）' },
  { label: '最大功率', value: '7 kW', highlight: true },
  { label: '输出电流', value: '32A' },
  { label: '输入/输出电压', value: 'AC 220V ± 20%' },
  { label: '外观尺寸', value: '374.8 * 186.5 * 121 mm' },
  { label: '外壳材质', value: 'PC + ABS（V0级阻燃）' },
  { label: '防护等级', value: 'IP65 (适合室内/室外)' },
  { label: '工作温度', value: '-30°C ~ 50°C' },
  { label: '线缆长度', value: '5 米' },
  { label: '安装方式', value: '壁挂式 / 立柱式' },
  { label: '执行标准', value: 'GB/T 18487.1-2023' },
  { 
    label: '安全设计', 
    value: '漏电保护、防反接保护、接地保护、过温保护、雷电保护、静电保护、防盗充保护、急停保护、浪涌保护、过充保护等20余项主动安全防护。' 
  },
]

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