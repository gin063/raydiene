<template>
  <div class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-cyan-500/30 font-sans">

    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/15 rounded-full blur-[130px] animate-pulse-slow mix-blend-screen" style="animation-delay: 1s;"></div>
      <div class="absolute top-[30%] left-[60%] w-[40vw] h-[40vw] bg-cyan-500/10 rounded-full blur-[100px] opacity-30"></div>
      
      <div class="absolute inset-0 opacity-[0.03]" 
           style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%221%22/%3E%3C/svg%3E');">
      </div>
    </div>

    <div class="relative z-10 pt-24 pb-20">
      
      <div class="container mx-auto px-6 mb-16 text-center animate-fade-up">
        <h1 class="text-4xl md:text-5xl font-hero font-bold tracking-tight mb-4 mt-8 text-white drop-shadow-2xl">
          产品说明书
        </h1>
        <p class="text-gray-400 text-xs md:text-sm tracking-[0.3em] uppercase font-bold font-hero">
          User Manual Download
        </p>
      </div>

      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">

          <div class="lg:hidden col-span-1 mb-8 animate-fade-up delay-100 overflow-x-auto custom-scrollbar pb-2">
            <div class="flex gap-3 min-w-max px-1">
               <button v-for="item in products" :key="item.id"
                @click="currentProduct = item.id"
                class="px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-md"
                :class="currentProduct === item.id 
                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                  : 'bg-[#111] text-gray-400 border-white/10 hover:bg-[#222] hover:text-white'"
              >
                {{ item.name }}
              </button>
            </div>
          </div>

          <div class="lg:col-span-8 order-2 lg:order-1 animate-fade-up delay-100 min-h-[50vh]">
            <Transition name="fade" mode="out-in">
              <div :key="currentProduct" class="w-full bg-[#111]/80 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col relative ring-1 ring-white/5">
                
                <div class="relative">
                  <NuxtImg v-for="i in 5" :key="`${currentProduct}-${i}`" 
                    :src="`/images/download/manual/manual-part-${String(i).padStart(2, '0')}.jpg`"
                    :alt="`${currentProductText} 说明书 - Part ${i}`" 
                    class="block w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-500" 
                    loading="lazy" 
                    format="webp"
                    :modifiers="{ withoutEnlargement: true }" />
                </div>
                  
                <div class="p-8 text-center bg-[#0a0a0a] border-t border-white/5">
                  <p class="text-gray-600 text-xs tracking-[0.2em] uppercase font-bold">End of Document</p>
                </div>
              </div>
            </Transition>
          </div>

          <div class="lg:col-span-4 order-1 lg:order-2">
            <div class="sticky top-32 space-y-8 animate-fade-up delay-200">

              <div class="hidden lg:block bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">选择产品系列</h3>
                <div class="space-y-2">
                  <button v-for="item in products" :key="item.id"
                    @click="currentProduct = item.id"
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
                    :class="currentProduct === item.id 
                      ? 'bg-white text-black shadow-lg scale-[1.02]' 
                      : 'hover:bg-white/5 text-gray-300 hover:text-white'"
                  >
                    <span class="relative z-10 font-bold tracking-wide">{{ item.name }}</span>
                    <svg v-if="currentProduct === item.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 relative z-10">
                      <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                    </svg>
                    <div v-if="currentProduct !== item.id" class="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>

              <div class="bg-[#111] border border-white/10 rounded-[2rem] p-8 shadow-2xl text-center backdrop-blur-md relative overflow-hidden group">
                 <div class="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none transition-colors duration-500"></div>

                <h3 class="text-xl font-bold mb-2 text-white">{{ currentProductText }}使用手册</h3>
                <p class="text-gray-500 text-sm mb-8 font-mono">V2.0 | 更新于 2025.12</p>

                <a :href="currentDownloadLink" target="_blank"
                  class="group/btn relative flex items-center justify-center w-full bg-white text-black font-bold py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/20 overflow-hidden cursor-pointer">
                  
                  <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-[100%] group-hover/btn:animate-shine"></div>
                  
                  <span class="relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    下载 PDF 文件
                  </span>
                </a>
                <p class="text-xs text-gray-500 mt-4 font-mono">文件大小: 10.3 MB</p>
              </div>

              <div class="bg-[#111] border border-white/10 rounded-[2rem] p-8 text-center backdrop-blur-md">
                <p class="text-sm font-bold text-gray-300 mb-4">手机扫码阅读</p>
                <div class="rounded-xl overflow-hidden mx-auto max-w-[200px] border border-white/5 p-2 bg-white/5">
                  <div class="bg-white rounded-lg overflow-hidden">
                    <NuxtImg src="/images/qrcode/wechat-banner.png" alt="关注雷迪恩公众号" class="w-full h-auto block opacity-95 hover:opacity-100 transition-opacity" format="webp" sizes="300px" />
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-4 leading-relaxed">关注“雷迪恩”官方公众号<br>获取更多服务</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 产品数据
const products = [
  { id: 'jianshi', name: '坚石系列', link: '/downloads/jianshi-manual.pdf' },
  { id: 'panshi', name: '磐石系列', link: '/downloads/panshi-manual.pdf' },
  { id: 'xingchen', name: '星辰系列', link: '/downloads/xingchen-manual.pdf' },
  { id: 'xingyao', name: '星耀系列', link: '/downloads/xingyao-manual.pdf' },
]

// 当前选中的产品
const currentProduct = ref('jianshi')

// 计算属性
const currentProductObj = computed(() => products.find(p => p.id === currentProduct.value))
const currentProductText = computed(() => currentProductObj.value?.name || '雷迪恩产品')
const currentDownloadLink = computed(() => currentProductObj.value?.link || '#')

</script>

<style scoped>
/* 隐藏移动端滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  height: 0px; 
}

/* 进场动画 */
.animate-fade-up {
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 呼吸动画：增强了可见度 */
.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.05); }
}

/* 按钮流光 */
@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.group-hover\/btn\:animate-shine:hover {
  animation: shine 0.7s ease-in-out;
}

/* Vue 列表过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>