<template>
  <div class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-blue-500 selection:text-white font-sans">

    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px] opacity-50 animate-pulse-slow"></div>
      <div class="absolute bottom-0 right-0 w-[70vw] h-[70vw] bg-purple-900/15 rounded-full blur-[120px] opacity-60"></div>
      <div class="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20"></div>
    </div>

    <section class="relative z-10 pt-32 pb-20 md:pt-48 md:pb-24 container mx-auto px-6 md:px-12 border-b border-white/5 overflow-x-clip">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div class="space-y-12 animate-slide-in-left">
          <div>
            <h1 class="text-5xl md:text-7xl font-bold font-hero tracking-tight mb-6">
              智享充电<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">一手掌控</span>
            </h1>
            <p class="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
              下载雷迪恩App，随时随地监控充电状态<br>远程控制，预约充电<br>让每一次补能都尽在掌握
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <div class="relative group w-full sm:w-auto">
              <a href="https://apps.apple.com/cn/app/%E9%9B%B7%E8%BF%AA%E6%81%A9/id6746684577" target="_blank" 
                 class="w-full h-full flex items-center gap-4 bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white px-8 py-4 rounded-2xl transition-all duration-300 min-w-[200px]">
                <img src="/images/social/apple.svg" alt="Apple" class="w-8 h-8 object-contain group-hover:invert transition-all" />
                <div class="text-left">
                  <p class="text-[10px] uppercase tracking-wider opacity-60 group-hover:opacity-100">Download on the</p>
                  <p class="text-lg font-bold font-hero leading-none">App Store</p>
                </div>
              </a>
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-40 p-2 bg-white rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <NuxtImg src="/images/qr/apple-app.jpg" alt="App Store QR" class="w-full h-auto rounded-lg" />
                <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
              </div>
            </div>

            <div class="relative group w-full sm:w-auto">
              <a href="https://sj.qq.com/appdetail/uni.UNICBA3BB2" target="_blank" 
                 class="w-full h-full flex items-center gap-4 bg-white/5 border border-white/10 hover:bg-[#3DDC84] hover:text-black hover:border-[#3DDC84] px-8 py-4 rounded-2xl transition-all duration-300 min-w-[200px]">
                <div class="w-8 h-8 flex items-center justify-center">
                   <img src="/images/social/android.svg" alt="Android" class="w-full h-full scale-[2] object-contain group-hover:brightness-0 transition-all origin-center" />
                </div>
                <div class="text-left">
                  <p class="text-[10px] uppercase tracking-wider opacity-60 group-hover:opacity-100">Get it on</p>
                  <p class="text-lg font-bold font-hero leading-none">Android</p>
                </div>
              </a>
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-40 p-2 bg-white rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <NuxtImg src="/images/qr/android-app.jpg" alt="Android QR" class="w-full h-auto rounded-lg" />
                <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
              </div>
            </div>

            <div class="relative group w-full sm:w-auto">
              <button class="w-full h-full flex items-center gap-4 bg-white/5 border border-white/10 hover:bg-[#07C160] hover:text-white hover:border-[#07C160] px-8 py-4 rounded-2xl transition-all duration-300 min-w-[200px]">
                <img src="/images/social/wechat-miniprogram.svg" alt="Mini Program" class="w-8 h-8 object-contain brightness-0 invert" />
                <div class="text-left">
                  <p class="text-[10px] uppercase tracking-wider opacity-60">Scan to Use</p>
                  <p class="text-lg font-bold font-hero leading-none">微信小程序</p>
                </div>
              </button>
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-40 p-2 bg-white rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <NuxtImg src="/images/qr/wechat-miniprogram.jpg" alt="小程序码" class="w-full h-auto rounded-lg" />
                <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="relative h-[600px] flex items-center justify-center animate-slide-in-right perspective-1000">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/30 rounded-full blur-[100px] animate-pulse-slow"></div>
          
          <div class="relative w-[300px] h-[600px] group cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            
            <div class="absolute inset-0 translate-x-6 translate-y-6 bg-black/40 border border-white/5 rounded-[3rem] blur-sm transform rotate-[-6deg] group-hover:rotate-0 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-700 ease-out z-0"></div>

            <div class="absolute inset-0 rounded-[3rem] bg-[#00ff99] opacity-0 blur-[40px] group-hover:opacity-40 transition-all duration-1000 delay-100 z-0 transform scale-90 group-hover:scale-110"></div>

            <div class="relative w-full h-full bg-black border-4 border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden transform rotate-[-6deg] group-hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 group-hover:shadow-[0_0_50px_rgba(0,255,153,0.3)]">
               <div class="absolute inset-0 bg-gray-900 overflow-hidden">
                  <NuxtImg 
                    src="/images/download/app-preview.png" 
                    alt="Raydiene App UI"
                    class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                    placeholder
                  />
                  <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
               </div>
               <div class="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 flex items-center justify-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#00ff99] opacity-0 group-hover:opacity-100 transition-opacity delay-300 shadow-[0_0_10px_#00ff99]"></div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="relative z-10 py-20 md:py-32">
      <div class="container mx-auto px-6 mb-16 text-center animate-fade-up">
        <h2 class="text-3xl md:text-5xl font-hero font-bold tracking-tight mb-4 text-white">
          产品说明书
        </h2>
        <p class="text-gray-500 text-xs md:text-sm tracking-[0.3em] uppercase font-bold">
          User Manual Download
        </p>
      </div>

      <div class="container mx-auto px-6 md:px-12">
        <div class="flex flex-col lg:flex-row gap-12 items-start relative">

          <div class="w-full lg:flex-1 animate-fade-up delay-100 min-w-0">
            <div class="w-full bg-white/5 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
              <NuxtImg v-for="i in 5" :key="i" 
                :src="`/images/download/manual/manual-part-${String(i).padStart(2, '0')}.jpg`"
                :alt="`雷迪恩产品说明书 - Part ${i}`" 
                class="block w-full h-auto brightness-90 hover:brightness-100 transition-all duration-300" 
                loading="lazy" format="webp"
                :modifiers="{ withoutEnlargement: true }" />
            </div>
          </div>

          <div class="w-full lg:w-[380px] flex-shrink-0 sticky top-32 z-20 animate-fade-up delay-200">
            <div class="space-y-8">
              
              <div class="bg-[#111] border border-white/10 rounded-[2rem] p-8 shadow-2xl text-center backdrop-blur-md">
                <h3 class="text-xl font-bold mb-2 text-white">雷迪恩充电桩使用手册</h3>
                <p class="text-gray-500 text-sm mb-8">V2.0 | 更新于 2025.12</p>

                <a href="/downloads/raydiene-manual.pdf" target="_blank"
                  class="group relative flex items-center justify-center w-full bg-white text-black font-bold py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/20 overflow-hidden cursor-pointer">
                  <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-[100%] group-hover:animate-shine"></div>
                  <span class="relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    下载 PDF 文件
                  </span>
                </a>
                <p class="text-xs text-gray-500 mt-4">文件大小: 10.3 MB</p>
              </div>

              <div class="bg-[#111] border border-white/10 rounded-[2rem] p-8 text-center backdrop-blur-md">
                <p class="text-sm font-bold text-gray-300 mb-4">手机扫码阅读</p>
                <div class="rounded-xl overflow-hidden mx-auto max-w-[280px] border border-white/5">
                  <NuxtImg src="/images/qrcode/wechat-banner.png" alt="关注雷迪恩公众号" class="w-full h-auto block opacity-90 hover:opacity-100 transition-opacity" format="webp" sizes="500px" />
                </div>
                <p class="text-xs text-gray-500 mt-4">关注“雷迪恩”官方公众号<br>获取更多服务</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* 保持原有动画 */
.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-out forwards;
  opacity: 0;
  transform: translateX(-30px);
}

.animate-slide-in-right {
  animation: slideInRight 1s ease-out forwards;
  opacity: 0;
  transform: translateX(30px);
}

@keyframes slideInLeft {
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-up {
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.group-hover\:animate-shine:hover {
  animation: shine 0.7s ease-in-out;
}
</style>