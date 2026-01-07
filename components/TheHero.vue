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

    <section class="w-full bg-black pt-20 pb-12 px-6 md:px-12 container mx-auto text-center">
      <h2 class="text-3xl md:text-5xl text-white font-bold tracking-tight animate-fade-in-up">
        即刻探索雷迪恩高端家用充电桩系列
      </h2>
    </section>

    <section id="product-section" class="w-full bg-black text-white pb-32 select-none">
      <div class="container mx-auto px-6 md:px-24 flex flex-col gap-8 max-w-7xl">

        <div v-for="(row, rowIndex) in productRows" :key="rowIndex" 
          class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          <div 
            v-for="product in row" 
            :key="product.id"
            class="relative overflow-hidden group/card rounded-3xl bg-gray-900 border border-white/10 cursor-pointer h-[120vw] md:h-[500px] lg:h-[600px]"
          >
            <div class="absolute inset-0 w-full h-full overflow-hidden">
              <NuxtImg 
                :src="product.image" 
                :alt="product.name" 
                format="webp"
                quality="85"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
              />
              <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
            </div>

            <div class="absolute inset-x-0 top-0 pt-12 md:pt-16 flex flex-col items-center text-center z-20 px-6">
              <h3 class="text-3xl md:text-4xl font-hero font-bold tracking-widest text-white mb-3 drop-shadow-lg">
                {{ product.name }}
              </h3>
              <p class="text-base md:text-lg text-gray-200 font-medium tracking-wide mb-8 drop-shadow-md">
                {{ product.slogan }}
              </p>
              
              <div class="flex gap-4 opacity-0 translate-y-4 transition-all duration-500 group-hover/card:opacity-100 group-hover/card:translate-y-0">
                <button class="px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-bold text-white hover:bg-white hover:text-black transition-colors">
                  了解更多
                </button>
                <button class="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-colors border border-transparent shadow-lg">
                  立即购买
                </button>
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

// === 数据配置 ===
// 移除了 video 字段，因为不再需要自动播放交互
const productRows = [
  [
    {
      id: 'xingchen',
      name: '星辰系列',
      slogan: '智能科技，美学之光',
      image: '/images/products/xingchen-cover.png',
    },
    {
      id: 'xingyao',
      name: '星耀系列',
      slogan: '触控大屏，时代之巅',
      image: '/images/products/xingyao-cover.png', 
    }
  ],
  [
    {
      id: 'jianshi',
      name: '坚石系列',
      slogan: '实用至上，大道至简',
      image: '/images/products/jianshi-cover.png',
    },
    {
      id: 'panshi',
      name: '磐石系列',
      slogan: '简约时尚，品质之选',
      image: '/images/products/panshi-cover.png',
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