<template>
  <div class="min-h-screen w-full bg-[#050505] text-white selection:bg-cyan-500/30 font-sans pt-24 pb-20">

    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/90 opacity-20 rounded-full blur-[120px] animate-pulse-slow">
      </div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/90 opacity-20 rounded-full blur-[120px] animate-pulse-slow"
        style="animation-delay: 2s;"></div>
      <div class="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20 mix-blend-overlay"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 mb-16 text-center animate-fade-up">
      <h1 class="text-4xl md:text-5xl font-hero font-bold tracking-tight mb-4 mt-12 text-white">用户手册</h1>
      <p class="text-gray-500 text-xs md:text-sm tracking-[0.3em] uppercase font-bold">User Manual</p>
    </div>

    <div class="relative z-10 container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">

        <div class="lg:col-span-8 order-2 lg:order-1 animate-fade-up delay-100">
          <div
            class="w-full bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col min-h-[500px]">
            <Transition name="fade" mode="out-in">
              <div :key="currentProduct" class="w-full">
                <NuxtImg v-for="i in currentProductPages" :key="i"
                  :src="`/images/download/manual/${currentProduct}/manual-part-${String(i).padStart(2, '0')}.jpg`"
                  :alt="`${currentProductText}说明书 - Part ${i}`"
                  class="block w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-500"
                  loading="lazy" format="webp" :modifiers="{ withoutEnlargement: true }" />
              </div>
            </Transition>
          </div>
        </div>

        <div class="lg:col-span-4 order-1 lg:order-2">
          <div class="sticky top-28 space-y-4 animate-fade-up delay-200">

            <div class="bg-black/40 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md">
              <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-1">选择产品系列</h3>
              <div class="space-y-2">
                <button v-for="item in products" :key="item.id" @click="currentProduct = item.id"
                  class="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group"
                  :class="currentProduct === item.id
                    ? 'bg-white text-black font-bold scale-[1.02]'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'">
                  <span>{{ item.name }}</span>
                  <svg v-if="currentProduct === item.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4 opacity-30 group-hover:opacity-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="bg-black/40 border border-white/10 rounded-2xl p-6 shadow-xl text-center backdrop-blur-md">
              <h3 class="text-xl font-bold mb-2 text-white">{{ currentProductText }}使用手册</h3>
              <p class="text-gray-500 text-sm mb-8">V2.0 | 更新于 2025.12</p>

              <a :href="currentDownloadLink" target="_blank"
                class="group relative flex items-center justify-center w-full bg-white text-black font-bold py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/20 overflow-hidden cursor-pointer">
                <div
                  class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-[100%] group-hover:animate-shine">
                </div>
                <span class="relative z-10 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  下载 PDF 文件
                </span>
              </a>
              <p class="text-xs text-gray-500 mt-4 transition-all duration-300">文件大小: {{ currentFileSize }}</p>
            </div>

            <div class="bg-black/40 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md">
              <p class="text-sm font-bold text-gray-300 mb-4">手机扫码阅读</p>
              <div class="rounded-lg overflow-hidden mx-auto max-w-[280px] border border-white/5 p-2 bg-white/5">
                <div class="bg-white rounded overflow-hidden">
                  <NuxtImg src="/images/qrcode/wechat-banner.png" alt="关注雷迪恩公众号" class="w-full h-auto block"
                    format="webp" sizes="500px" />
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-4">关注“雷迪恩”官方公众号<br>获取更多服务</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 确保您的 link 路径正确对应了准备好的 PDF 文件
const products = [
  { id: 'jianshi', name: '坚石系列', link: '/downloads/jianshi-manual.pdf', pages: 14, size: '1.20 MB' },
  { id: 'panshi', name: '磐石系列', link: '/downloads/panshi-manual.pdf', pages: 15, size: '1.67 MB' },
  { id: 'xingchen', name: '星辰系列', link: '/downloads/xingchen-manual.pdf', pages: 15, size: '1.39 MB' },
  { id: 'xingyao', name: '星耀系列', link: '/downloads/xingyao-manual.pdf', pages: 15, size: '1.65 MB' },
]

const currentProduct = ref('jianshi')

// 自动计算当前选中的产品信息
const currentProductObj = computed(() => products.find(p => p.id === currentProduct.value))
const currentProductText = computed(() => currentProductObj.value?.name || '雷迪恩产品')
const currentDownloadLink = computed(() => currentProductObj.value?.link || '#')
const currentProductPages = computed(() => currentProductObj.value?.pages || 15)

const currentFileSize = computed(() => currentProductObj.value?.size || '10.0 MB')

</script>

<style scoped>
/* 保留定制版呼吸动画 (6s 版本) */
.animate-pulse-slow {
  animation: pulse-custom 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse-custom {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.05); }
}
</style>