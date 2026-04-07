<template>
  <div
    class="relative min-h-screen w-full bg-[#050505] text-white overflow-x-hidden font-sans transition-colors duration-700 selection:bg-brand selection:text-white">

    <div class="relative w-full h-screen">
      <div class="absolute inset-0 z-0 overflow-hidden grid grid-cols-1 grid-rows-1">
        <Transition name="fade-slow">
          <div v-if="activeModel === 'pro'" class="col-start-1 row-start-1 w-full h-full">
            <NuxtImg src="/images/products/panshi/scene-bg-pro-mobile.jpg" alt="雷迪恩磐石Pro家用充电桩安装场景-移动端"
              class="block md:hidden w-full h-full object-cover animate-ken-burns" loading="eager" fetchpriority="high"
              preload :placeholder="false" />
            <NuxtImg src="/images/products/panshi/scene-bg-pro.jpg" alt="雷迪恩磐石Pro家用充电桩安装场景"
              class="hidden md:block w-full h-full object-cover animate-ken-burns" loading="eager"
              :placeholder="false" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90"></div>
          </div>
        </Transition>
        <Transition name="fade-slow">
          <div v-if="activeModel === 'max'" class="col-start-1 row-start-1 w-full h-full">
            <NuxtImg src="/images/products/panshi/scene-bg-max-mobile.jpg" alt="雷迪恩磐石Max家用充电桩安装场景-移动端"
              class="block md:hidden w-full h-full object-cover animate-ken-burns" loading="eager" fetchpriority="high"
              preload :placeholder="false" />
            <NuxtImg src="/images/products/panshi/scene-bg-max.jpg" alt="雷迪恩磐石Max家用充电桩安装场景"
              class="hidden md:block w-full h-full object-cover animate-ken-burns" loading="eager"
              :placeholder="false" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90"></div>
          </div>
        </Transition>
      </div>

      <div
        class="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end items-center text-center pb-48 md:pb-28">
        <div class="grid grid-cols-1 grid-rows-1 place-items-center mb-6">
          <Transition name="fade-up-stay">
            <h1 :key="activeModel"
              class="text-5xl md:text-7xl font-bold font-hero tracking-tight col-start-1 row-start-1">
              磐石 <span class="text-brand">{{ activeModel === 'pro' ? 'Pro' : 'Max' }}</span>
            </h1>
          </Transition>
        </div>
        <div class="grid grid-cols-1 grid-rows-1 place-items-center mb-6 h-8">
          <Transition name="fade-up-stay">
            <p :key="activeModel"
              class="text-xl md:text-2xl text-gray-200 font-light tracking-wide col-start-1 row-start-1 whitespace-nowrap">
              7kW 家用交流充电桩 · {{ activeModel === 'pro' ? '简约时尚' : '品质之选' }}
            </p>
          </Transition>
        </div>
        <div class="flex animate-fade-in-up" style="animation-delay: 0.4s">
          <a href="https://item.jd.com/10138575243363.html" target="_blank" rel="noopener noreferrer"
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
            <div
              class="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl grid grid-cols-1 grid-rows-1">
              <Transition name="fade-scale">
                <NuxtImg :key="activeModel"
                  :src="activeModel === 'pro' ? '/images/products/panshi/detail-pro.jpg' : '/images/products/panshi/detail-max.jpg'"
                  :alt="activeModel === 'pro' ? '磐石Pro充电桩细节图' : '磐石Max充电桩细节图'"
                  class="w-full h-full object-cover col-start-1 row-start-1" />
              </Transition>
            </div>
          </div>

          <div class="w-full lg:w-1/2 animate-on-scroll">
            <div class="grid grid-cols-1 grid-rows-1 h-10 mb-4">
              <Transition name="fade-right">
                <h2 :key="activeModel" class="text-3xl md:text-4xl font-bold font-hero col-start-1 row-start-1">
                  {{ activeModel === 'pro' ? '工业美学设计 · 精致金属质感' : '智能高清屏显 · 交互新体验' }}
                </h2>
              </Transition>
            </div>
            <p class="text-gray-400 mb-10 leading-relaxed min-h-[3rem]">
              工业级美学设计，IP65桩体+IP67枪头超高防护。{{ activeModel === 'pro' ? '26' : '28' }}重安全防护，无惧极端天气。
              <span class="transition-colors duration-500 text-brand">
                {{ activeModel === 'pro' ? 'Pro版本采用极简呼吸灯设计，简约而不简单。' : 'Max版本配备高清显示屏，充电数据一目了然。' }}
              </span>
            </p>

            <ProductHighlightGrid :items="highlightCards" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#050505] relative overflow-hidden">
      <div
        class="absolute right-0 top-1/4 w-[50vw] h-[50vw] rounded-full blur-[120px] pointer-events-none transition-colors duration-700 bg-brand/10">
      </div>
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <div class="relative mx-auto max-w-2xl grid grid-cols-1 grid-rows-1">
              <Transition name="fade-scale">
                <NuxtImg :key="activeModel"
                  :src="activeModel === 'pro' ? '/images/products/panshi/app-scene-pro.jpg' : '/images/products/panshi/app-scene-max.jpg'"
                  :alt="activeModel === 'pro' ? '磐石Pro雷迪恩App界面展示' : '磐石Max雷迪恩App界面展示'"
                  class="w-full h-auto rounded-3xl shadow-2xl border border-white/5 col-start-1 row-start-1" />
              </Transition>
            </div>
          </div>
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <h2 class="text-3xl md:text-4xl font-bold mb-6 font-hero">掌控 · 随心所欲</h2>
            <p class="text-gray-400 mb-10 text-lg">通过雷迪恩App，您的手机就是充电桩的控制中心。数据可视化，管理更轻松。</p>
            <ProductAppList :items="appFeatures" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#0a0a0a] border-t border-white/5 pb-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-16 font-hero">详细规格参数</h2>
        <div class="flex flex-col md:flex-row gap-12 items-start mb-16">
          <div class="w-full md:w-1/3 flex flex-col items-center gap-6 md:sticky md:top-24">
            <div class="relative w-full aspect-auto md:aspect-square grid grid-cols-1 grid-rows-1">
              <Transition name="fade-scale">
                <NuxtImg :key="activeModel"
                  :src="activeModel === 'pro' ? '/images/products/panshi/pro-front.png' : '/images/products/panshi/max-front.png'"
                  :alt="activeModel === 'pro' ? '磐石Pro充电桩正面图' : '磐石Max充电桩正面图'"
                  class="w-full h-auto drop-shadow-2xl col-start-1 row-start-1" />
              </Transition>
            </div>
            <div class="text-center text-sm text-gray-500">
              当前展示：<span class="font-bold transition-colors duration-500 text-brand">磐石 {{ activeModel === 'pro' ? 'Pro'
                : 'Max' }}</span>
            </div>
          </div>
          <div class="w-full md:w-2/3">
            <ProductSpecsTable :specs="currentSpecs" />
          </div>
        </div>

        <div
          class="w-full relative aspect-[21/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl group grid grid-cols-1 grid-rows-1">
          <Transition name="fade-slow">
            <NuxtImg :key="activeModel"
              :src="activeModel === 'pro' ? '/images/products/panshi/lifestyle-pro.jpg' : '/images/products/panshi/lifestyle-max.jpg'"
              :alt="activeModel === 'pro' ? '磐石Pro充电桩家居场景图' : '磐石Max充电桩家居场景图'"
              class="w-full h-full object-cover col-start-1 row-start-1 group-hover:scale-105 transition-transform duration-700" />
          </Transition>
          <div
            class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 z-10 scale-50 origin-bottom-left md:scale-100">
            <span class="text-sm font-bold tracking-wider transition-colors duration-500 text-brand">磐石 {{ activeModel
              === 'pro' ? 'PRO' : 'MAX' }}</span>
            <span class="text-xs text-white ml-3 border-l border-white/30 pl-3">{{ activeModel === 'pro' ? '简约时尚' :
              '品质之选' }}</span>
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

          <NuxtLink to="/products/xingyao"
            class="flex-shrink-0 w-[85vw] snap-center md:w-auto group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-cyan-400/50 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] transition-all duration-500">
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/30 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            </div>
            <div class="absolute top-8 left-0 w-full z-20 flex flex-col items-center">
              <h3 class="text-3xl font-bold text-white mb-2 font-hero">星耀系列</h3>
              <p
                class="text-xs text-gray-400 tracking-widest uppercase group-hover:text-cyan-400 transition-colors duration-300">
                触控大屏 · 时代之巅</p>
            </div>
            <div class="absolute inset-0 flex items-center justify-center p-6 z-10">
              <NuxtImg src="/images/products/xingyao-cover.png" alt="雷迪恩星耀系列家用充电桩"
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

    <div
      class="fixed bottom-10 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center p-1.5 bg-black/70 backdrop-blur-xl border border-white/15 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-float-in">
      <div
        class="absolute top-1.5 bottom-1.5 w-[140px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg bg-brand"
        :class="[activeModel === 'pro' ? 'left-1.5' : 'left-[146px]']"></div>
      <button @click="activeModel = 'pro'"
        class="relative w-[140px] py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors z-10 flex items-center justify-center gap-2"
        :class="activeModel === 'pro' ? 'text-white' : 'text-gray-400 hover:text-white'">
        <span>磐石 Pro</span>
        <span v-if="activeModel === 'pro'" class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
      </button>
      <button @click="activeModel = 'max'"
        class="relative w-[140px] py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors z-10 flex items-center justify-center gap-2"
        :class="activeModel === 'max' ? 'text-white' : 'text-gray-400 hover:text-white'">
        <span>磐石 Max</span>
        <span v-if="activeModel === 'max'" class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, defineComponent, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductSchema } from '~/composables/useJsonLd'

const route = useRoute()
const router = useRouter()
const activeModel = ref(route.query.model === 'max' ? 'max' : 'pro')

// --- 动态 Product JSON-LD Schema（根据 Pro/Max 切换）---
const panshiProSchema = {
  name: '雷迪恩磐石Pro 7kW家用交流充电桩',
  description: '雷迪恩磐石Pro7kW家用充电桩，极简呼吸灯设计，IP65/IP67级防护，26重安全防护，支持App远程管理与峰谷定时充电。已通过中国强制性3C认证，适配99%新能源车型。',
  price: 999,
  url: 'https://www.raydiene.cn/products/panshi?model=pro',
  image: 'https://assets.raydiene.cn/images/products/panshi-pro.png',
  sku: 'A1507-GB01-002-PRO',
  warranty: '2年质保只换不修',
  hasCertification: true,
}
const panshiMaxSchema = {
  name: '雷迪恩磐石Max 7kW智能屏显家用交流充电桩',
  description: '雷迪恩磐石Max7kW家用充电桩，配备4.3寸高清液晶显示屏，IP65/IP67级防护，28重安全防护，支持App远程管理与峰谷定时充电。已通过中国强制性3C认证，适配99%新能源车型。',
  price: 1199,
  url: 'https://www.raydiene.cn/products/panshi?model=max',
  image: 'https://assets.raydiene.cn/images/products/panshi-max.png',
  sku: 'A1507-GB01-002-MAX',
  warranty: '2年质保只换不修',
  hasCertification: true,
}
useProductSchema(activeModel.value === 'max' ? panshiMaxSchema : panshiProSchema)

// --- SEO 配置 ---
useSeoMeta({
  title: '磐石系列 Pro/Max - 7kW智能家用交流充电桩 | Raydiene 雷迪恩',
  description: '雷迪恩(Raydiene)磐石系列提供Pro与Max双版本选择。Pro版采用极简呼吸灯设计，Max版配备高清显示屏。全系标配7kW功率、IP65/IP67级防护、28重安全防护及App智能互联，适配99%新能源车型。',
  keywords: '雷迪恩磐石系列, 磐石Pro, 磐石Max, 7kW充电桩, 家用充电桩, 带屏幕充电桩, 智能充电桩, 汽车充电桩安装',
  // 社交分享优化
  ogTitle: '雷迪恩磐石系列：智能屏显与极简美学的双重选择',
  ogDescription: '7kW家用交流充电桩，Pro版呼吸灯交互，Max版高清屏显。安全防护与智能互联的完美结合。',
  // 使用 Max 版本的场景图作为分享封面，视觉更丰富
  ogImage: 'https://assets.raydiene.cn/images/products/panshi/scene-bg-max.jpg',
})

watch(activeModel, (newVal) => {
  router.replace({ query: { ...route.query, model: newVal } })
})
watch(() => route.query.model, (newVal) => {
  if (newVal === 'max' || newVal === 'pro') activeModel.value = newVal
})

// === 图标定义 ===
const IconCheck = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' })]) })
const IconTool = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z' })]) })
const IconClock = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' })]) })
const IconVerified = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z' })]) })
const IconWifi = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z' })]) })
const IconApp = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z' }), h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z' })]) })
const IconTime = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' })]) })
const IconAlert = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' })]) })
const IconIP = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' })]) })
const IconLight = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18' })]) })
const IconScreen = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M3 3v18h18V3H3zm15 15H6V6h12v12zM8 9h8m-8 3h5' })]) })
const IconShield = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.243-8.25-3.285z' })]) })
const IconConnect = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z' })]) })

// === 数据配置 ===
const features = [
  { text: '适配99%车型', icon: IconCheck },
  { text: '专业上门安装', icon: IconTool },
  { text: '7*15h 响应', icon: IconClock },
  { text: '2年质保只换不修', icon: IconVerified },
  { text: '终身免费流量 & OTA', icon: IconWifi },
]

// 4张特性卡片 (修正：补全了您手动添加的后两张)
const highlightCards = computed(() => [
  {
    title: 'IP67 / IP65',
    desc: '枪头IP67 / 桩体IP65',
    icon: IconIP
  },
  {
    title: activeModel.value === 'pro' ? '智能呼吸灯' : '智能高清屏显',
    desc: activeModel.value === 'pro' ? '简约交互 状态直观' : '状态数据 可视化',
    icon: activeModel.value === 'pro' ? IconLight : IconScreen
  },
  {
    title: activeModel.value === 'pro' ? '26重安全防护' : '28重安全防护',
    desc: '过压/过流/漏电/防雷等',
    icon: IconShield
  },
  {
    title: '智能互联',
    desc: '蓝牙 / 4G / 充满自停',
    icon: IconConnect
  }
])

const appFeatures = [
  { title: 'APP 远程管理', desc: '无论身在何处，一键启动/停止充电，实时查看进度。', icon: IconApp },
  { title: '预约错峰充电', desc: '设置定时任务，利用夜间低谷电价，为您省钱。', icon: IconTime },
  { title: '故障监测通知', desc: '异常情况实时推送通知，安心无忧。', icon: IconAlert },
]

const currentSpecs = computed(() => [
  { label: '产品型号', value: activeModel.value === 'pro' ? 'A1607-GB01-001' : 'A1607-GB01-002' },
  { label: '产品名称', value: `磐石${activeModel.value === 'pro' ? 'Pro' : 'Max'}交流充电桩` },
  { label: '显示配置', value: activeModel.value === 'pro' ? '智能呼吸灯' : '智能高清屏显', highlight: true },
  { label: '外观尺寸', value: '374.8 * 186.5 * 121 (mm)' },
  { label: '设备重量', value: '3.6kg' },
  { label: '外壳材质', value: 'PC+ABS（V0级阻燃）' },
  { label: '线缆长度', value: '6m' },
  { label: '最大功率', value: '7 kW' },
  { label: '输出电流', value: '32A' },
  { label: '输入/输出电压', value: 'AC 220V ± 20%' },
  { label: '防护等级', value: 'IP65 (适合室内/室外)' },
  { label: '工作温度', value: '-30°C ~ 50°C' },
  { label: '工作海拔', value: '&lt; 4000m' },
  { label: '执行标准', value: 'GB 39752-2024 / GB 44263-2024' },
  { label: '安全设计', value: '漏电保护、防反接保护、接地保护、过温保护、雷电保护、静电保护、防盗充保护、急停保护、浪涌保护、过充保护等20余项主动安全防护。' },
])

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
/* 保持所有基础动画类不变 */
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

.animate-float-in {
  animation: floatIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform: translate(-50%, 100px);
  opacity: 0;
}

@keyframes floatIn {
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}
</style>