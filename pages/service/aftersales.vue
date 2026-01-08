<template>
  <div
    class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-hidden font-sans">

    <div class="fixed inset-0 z-0 pointer-events-none">
      <div
        class="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-blue-900/10 rounded-full blur-[120px] opacity-30 animate-pulse-slow">
      </div>
      <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/10 to-transparent opacity-20">
      </div>
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 md:px-12 py-32 md:py-40">

      <div class="text-center mb-20 animate-fade-in-up">
        <h1 class="text-4xl md:text-6xl font-bold font-hero tracking-tight mb-6">
          无忧售后，全程守护
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          雷迪恩不仅提供卓越的充电产品，更致力于为您打造全生命周期的无忧用车体验
          <br>
          从咨询到维护，我们始终在线
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">

        <div
          class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 h-[320px] md:h-[360px]">

          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/support-bg.jpg" alt="全时响应背景" class="w-full h-full object-cover object-center
               brightness-100 contrast-110  group-hover:scale-105 group-hover:brightness-110
               transition-all duration-700 ease-out transform-gpu" />
          </div>

          <div
            class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-[#050505] via-[#050505]/60 to-transparent opacity-90">
          </div>

          <div class="relative z-10 flex flex-col h-full justify-between p-8 md:p-10">
            <div
              class="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 backdrop-blur-md shadow-lg shadow-blue-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
              </svg>
            </div>

            <div class="drop-shadow-lg">
              <h3 class="text-2xl md:text-3xl font-bold font-hero mb-3 text-white">全时响应</h3>
              <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-xs font-medium">
                提供专业技术支持。<br>
                <span class="text-blue-400 font-bold">7×15小时</span> 客服在线，您的疑问即刻解答。
              </p>
            </div>
          </div>
        </div>

        <div
          class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-teal-500/50 transition-all duration-500 h-[320px] md:h-[360px]">

          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/ota-bg.jpg" alt="OTA升级背景" class="w-full h-full object-cover object-center
               brightness-100 contrast-110
               group-hover:scale-105 group-hover:brightness-110
               transition-all duration-700 ease-out transform-gpu" />
          </div>

          <div
            class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-[#050505] via-[#050505]/90 to-transparent opacity-90">
          </div>

          <div class="relative z-10 flex flex-col h-full justify-between p-8 md:p-10">
            <div
              class="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-6 backdrop-blur-md shadow-lg shadow-teal-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.58 3.82c-1.03 0-1.99-.26-2.82-.72m0 0A7.003 7.003 0 015.02 9.5a7 7 0 015.82-7.24 7.003 7.003 0 0111.39 6.22 7.002 7.002 0 01-6.64 5.89z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-9" />
              </svg>
            </div>

            <div class="drop-shadow-lg">
              <h3 class="text-2xl md:text-3xl font-bold font-hero mb-3 text-white">云端进化 OTA</h3>
              <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-xs font-medium">
                支持 <span class="text-teal-400 font-bold">免费云端升级</span>。无需更换硬件，持续优化体验，享受最新科技。
              </p>
            </div>
          </div>
        </div>

        <div
          class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-purple-500/50 transition-all duration-500 h-[320px] md:h-[360px]">

          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/4g-bg.jpg" alt="4G网络背景" class="w-full h-full object-cover object-center
               brightness-100 contrast-110
               group-hover:scale-105 group-hover:brightness-110
               transition-all duration-700 ease-out transform-gpu" />
          </div>

          <div
            class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-[#050505] via-[#050505]/90 to-transparent opacity-90">
          </div>

          <div class="relative z-10 flex flex-col h-full justify-between p-8 md:p-10">
            <div
              class="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 backdrop-blur-md shadow-lg shadow-purple-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </svg>
            </div>

            <div class="drop-shadow-lg">
              <h3 class="text-2xl md:text-3xl font-bold font-hero mb-3 text-white">4G 终身免费</h3>
              <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-xs font-medium">
                告别连接焦虑。每台设备提供 <span class="text-purple-400 font-bold">终身免费流量</span>，保持即时在线，0额外付费。
              </p>
            </div>
          </div>
        </div>

        <div
          class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-amber-500/50 transition-all duration-500 h-[320px] md:h-[360px]">

          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/warranty-bg.jpg" alt="质保服务背景" class="w-full h-full object-cover object-center
               brightness-100 contrast-110
               group-hover:scale-105 group-hover:brightness-110
               transition-all duration-700 ease-out transform-gpu" />
          </div>

          <div
            class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-[#050505] via-[#050505]/90 to-transparent opacity-90">
          </div>

          <div class="relative z-10 flex flex-col h-full justify-between p-8 md:p-10">
            <div
              class="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-6 backdrop-blur-md shadow-lg shadow-amber-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>

            <div class="drop-shadow-lg">
              <h3 class="text-2xl md:text-3xl font-bold font-hero mb-3 text-white">只换不修</h3>
              <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-xs font-medium">
                品质承诺。质保期内非人为质量问题，提供 <span class="text-amber-400 font-bold">免费上门换新</span>，彻底免去等待。
              </p>
            </div>
          </div>
        </div>

      </div>

      <div class="mt-24 text-center animate-fade-in-up" style="animation-delay: 0.4s;">
        <p class="text-gray-400 mb-8">遇到问题？请立即联系我们</p>
        <NuxtLink to="/contact/info"
          class="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-colors group">
          <span>联系客服</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-5 h-5 group-hover:translate-x-1 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>