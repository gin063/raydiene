<template>
  <div class="w-full bg-black">
    
    <section class="relative w-full h-screen overflow-hidden bg-black group/hero">
      <video 
        ref="heroVideoRef"
        class="absolute top-0 left-0 w-full h-full object-cover opacity-90 transition-opacity duration-500"
        autoplay muted loop playsinline
        :class="{ 'opacity-60': !isHeroPlaying }"
      >
        <source src="/video-placeholder.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none"></div>
      <div class="absolute inset-0 z-10 w-full h-full">
        <div class="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center">
           <button class="px-10 py-3 border border-white/60 rounded-full text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-md bg-white/5 tracking-widest font-bold text-lg">
            了解更多
          </button>
        </div>
        <div 
          class="absolute bottom-12 right-6 md:right-12 cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="toggleHeroVideo"
        >
          <div class="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 bg-black/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors group-hover/hero:border-white/60">
            <svg v-if="!isHeroPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ml-1">
              <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full bg-black pt-20 pb-20 px-6 md:px-12 container mx-auto">
      <h2 class="text-3xl md:text-5xl text-white font-bold tracking-tight animate-fade-in-up">
        即刻探索雷迪恩家用充电桩系列
      </h2>
    </section>

    <section id="product-section" class="w-full bg-black text-white pb-32 select-none"> <div class="container mx-auto px-6 md:px-12 flex flex-col gap-6">

        <div v-for="(row, rowIndex) in productRows" :key="rowIndex" 
          class="flex flex-col md:flex-row w-full gap-6 h-auto"
        >
          <div 
            v-for="(product, index) in row" 
            :key="product.id"
            class="relative flex-shrink-0 overflow-hidden cursor-pointer group/card rounded-3xl border border-white/10 transition-[flex-basis,border-width,padding] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] min-w-0"
            :class="[
              'w-full h-[100vw] md:h-[500px] lg:h-[600px] xl:h-[700px]',
              activeRowIndex !== rowIndex ? 'md:basis-1/2' : '',
              activeRowIndex === rowIndex && activeCardId === product.id ? 'md:basis-full' : '',
              activeRowIndex === rowIndex && activeCardId !== product.id ? 'md:basis-0 md:border-0 md:p-0' : ''
            ]"
            @mouseenter="handleMouseEnter(rowIndex, product.id)"
            @mouseleave="handleMouseLeave"
            @touchstart="handleTouchStart(product.id)"
            @touchend="handleTouchEnd"
            @contextmenu.prevent 
          >
            <div 
              class="absolute top-0 h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              :class="[
                (activeRowIndex === rowIndex && activeCardId !== product.id) ? 'w-[50vw]' : 'w-full',
                (index === 0) ? 'left-0' : 'right-0'
              ]"
            >
              <div class="absolute inset-0 w-full h-full bg-gray-900">
                <NuxtImg 
                  :src="product.image" 
                  :alt="product.name" 
                  format="webp"
                  quality="80"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105"
                />
                
                <video 
                  :ref="el => setVideoRef(el, product.id)"
                  :src="product.video"
                  class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700"
                  :class="{ 'opacity-100': activeCardId === product.id }"
                  muted loop playsinline
                ></video>
                <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none opacity-80"></div>
                <div class="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
              </div>

              <div class="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12 transition-opacity duration-300"
                :class="(activeRowIndex === rowIndex && activeCardId !== product.id) ? 'opacity-0' : 'opacity-100'"
              >
                <div class="w-full flex justify-center pt-2">
                  <h3 class="text-3xl md:text-4xl font-hero font-bold uppercase tracking-widest drop-shadow-lg text-white group-hover/card:text-white/90 whitespace-nowrap">
                    {{ product.name }}
                  </h3>
                </div>
                <div class="w-full flex justify-between items-end px-4 md:px-12">
                  <div class="flex flex-col items-start transform transition-transform duration-500 group-hover/card:translate-x-2">
                    <p class="text-xl md:text-2xl font-bold text-white tracking-wide whitespace-nowrap drop-shadow-md">
                      {{ product.slogan }}
                    </p>
                  </div>
                  <div class="relative flex items-center justify-end h-12 min-w-[140px] pointer-events-auto">
                    <div class="absolute right-0 transition-all duration-300 transform group-hover/card:opacity-0 group-hover/card:translate-x-4">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-10 h-10 text-white drop-shadow-md">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                    <div class="absolute right-0 opacity-0 translate-x-4 transition-all duration-500 delay-75 group-hover/card:opacity-100 group-hover/card:translate-x-0">
                      <div class="flex items-center gap-2 px-6 py-2.5 border border-white/40 rounded-full backdrop-blur-md bg-white/10 hover:bg-white hover:text-black hover:border-white transition-all shadow-lg">
                        <span class="text-sm font-bold tracking-wide whitespace-nowrap">探索 {{ product.name }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full bg-black text-white pb-32">
      <div class="container mx-auto px-6 md:px-12 flex flex-col gap-10 items-center">

        <div class="w-full max-w-6xl aspect-[4/5] md:aspect-[3/1] rounded-3xl overflow-hidden border border-white/10 group cursor-pointer relative bg-gray-900 flex flex-col md:flex-row">
          <div class="w-full md:w-[40%] h-full bg-black p-8 md:p-12 flex flex-col justify-center items-start z-10 relative">
             <h3 class="text-3xl md:text-5xl font-bold mb-6 text-white group-hover:text-blue-100 transition-colors">
               安装服务
             </h3>
             <p class="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-sm">
               每一款雷迪恩充电桩都包含专业的一站式安装服务。我们将为您提供全方位的勘测与施工支持。
             </p>
             <button class="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 text-lg">
               预约安装
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
               </svg>
             </button>
          </div>
          <div class="w-full md:w-[60%] h-full relative overflow-hidden">
             <NuxtImg 
               src="/images/service-install.jpg" 
               alt="安装服务" 
               format="webp"
               quality="80"
               class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div class="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
          </div>
        </div>

        <div class="w-full max-w-6xl aspect-[4/5] md:aspect-[3/1] rounded-3xl overflow-hidden border border-white/10 group cursor-pointer relative bg-gray-900 flex flex-col md:flex-row">
          <div class="w-full md:w-[60%] h-full relative overflow-hidden">
             <NuxtImg 
               src="/images/service-aftersales.jpg" 
               alt="售后服务" 
               format="webp"
               quality="80"
               class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div class="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black via-black/50 to-transparent"></div>
          </div>
          <div class="w-full md:w-[40%] h-full bg-black p-8 md:p-12 flex flex-col justify-center items-start z-10 relative">
             <h3 class="text-3xl md:text-5xl font-bold mb-6 text-white group-hover:text-blue-100 transition-colors">
               售后服务
             </h3>
             <p class="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-sm">
               雷迪恩授权服务商和专业的客服团队随时待命。查看我们的服务网络，找到您身边的技术支持。
             </p>
             <button class="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 text-lg">
               联系我们
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
               </svg>
             </button>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// === 顶部视频控制 ===
const heroVideoRef = ref(null)
const isHeroPlaying = ref(true)

const toggleHeroVideo = () => {
  if (heroVideoRef.value) {
    if (heroVideoRef.value.paused) {
      heroVideoRef.value.play()
      isHeroPlaying.value = true
    } else {
      heroVideoRef.value.pause()
      isHeroPlaying.value = false
    }
  }
}

// === 产品卡片交互逻辑 ===
const activeRowIndex = ref(null)
const activeCardId = ref(null)
const productVideoMap = new Map()
const longPressTimer = ref(null) // 新增：用于存储长按定时器

const setVideoRef = (el, id) => {
  if (el) {
    productVideoMap.set(id, el)
  }
}

// 1. PC 端悬停逻辑 (保持原样)
const handleMouseEnter = (rowIndex, productId) => {
  if (window.innerWidth >= 768) { // 仅在 PC 端触发
    activeRowIndex.value = rowIndex
    activeCardId.value = productId
    const videoEl = productVideoMap.get(productId)
    if (videoEl) {
      videoEl.currentTime = 0
      videoEl.play().catch(() => {})
    }
  }
}

const handleMouseLeave = () => {
  // 清除状态
  activeRowIndex.value = null
  activeCardId.value = null
  productVideoMap.forEach((videoEl) => {
    videoEl.pause()
  })
}

// 2. 移动端长按逻辑 (新增)
const handleTouchStart = (productId) => {
  // 如果是 PC 端，忽略触摸事件
  if (window.innerWidth >= 768) return

  // 设置定时器：500毫秒后视为长按
  longPressTimer.value = setTimeout(() => {
    // 激活视频
    activeCardId.value = productId 
    const videoEl = productVideoMap.get(productId)
    if (videoEl) {
      videoEl.currentTime = 0
      videoEl.play().catch(() => {})
    }
  }, 500) // 长按阈值
}

const handleTouchEnd = () => {
  // 如果是 PC 端，忽略
  if (window.innerWidth >= 768) return

  // 手指离开，清除定时器
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }
  
  // 停止视频并重置状态
  activeCardId.value = null
  productVideoMap.forEach((videoEl) => {
    videoEl.pause()
  })
}

// === 数据配置 ===
const productRows = [
  [
    {
      id: 'xingchen',
      name: '星辰系列',
      slogan: '智能科技，美学之光',
      image: '/images/products/xingchen-cover.jpg',
      video: '/videos/products/xingchen-demo.mp4',
    },
    {
      id: 'xingyao',
      name: '星耀系列',
      slogan: '触控大屏，时代之巅',
      image: '/images/products/xingyao-cover.jpg', 
      video: '/videos/products/xingyao-demo.mp4',
    }
  ],
  [
    {
      id: 'jianshi',
      name: '坚石系列',
      slogan: '实用至上，大道至简',
      image: '/images/products/jianshi-cover.jpg',
      video: '/videos/products/jianshi-demo.mp4',
    },
    {
      id: 'panshi',
      name: '磐石系列',
      slogan: '简约时尚，品质之选',
      image: '/images/products/panshi-cover.jpg',
      video: '/videos/products/panshi-demo.mp4',
    }
  ]
]
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>