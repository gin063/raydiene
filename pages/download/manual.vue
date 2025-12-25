<template>
  <div class="bg-white text-slate-900 min-h-screen pt-24 pb-20 font-sans selection:bg-blue-100">

    <div class="container mx-auto px-6 mb-16 text-center animate-fade-up">
      <h1 class="text-4xl md:text-5xl font-hero font-bold tracking-tight mb-4 text-black">
        产品说明书
      </h1>
      <p class="text-gray-400 text-xs md:text-sm tracking-[0.3em] uppercase font-bold">
        User Manual Download
      </p>
    </div>

    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">

        <div class="lg:col-span-8 order-2 lg:order-1 animate-fade-up delay-100">
          <div class="w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">
            <NuxtImg v-for="i in 5" :key="i" :src="`/images/manual/manual-part-${String(i).padStart(2, '0')}.jpg`"
              :alt="`雷迪恩产品说明书 - Part ${i}`" class="block w-full h-auto" loading="lazy" format="webp"
              :modifiers="{ withoutEnlargement: true }" />
          </div>
        </div>

        <div class="lg:col-span-4 order-1 lg:order-2">
          <div class="sticky top-32 space-y-8 animate-fade-up delay-200">

            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl shadow-gray-100/50 text-center">

              <h3 class="text-xl font-bold mb-2">雷迪恩充电桩使用手册</h3>
              <p class="text-gray-400 text-sm mb-8">V2.0 | 更新于 2025.12</p>

              <a href="/downloads/raydiene-manual.pdf" target="_blank"
                class="group relative flex items-center justify-center w-full bg-black text-white font-bold py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg overflow-hidden cursor-pointer">

                <div
                  class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-shine">
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

              <p class="text-xs text-gray-400 mt-4">文件大小: 10.3 MB</p>
            </div>

            <div class="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
              <p class="text-sm font-bold text-gray-800 mb-4">手机扫码阅读</p>

              <div class="rounded-lg overflow-hidden mx-auto max-w-[280px]">
                <NuxtImg src="/images/qrcode/wechat-banner.png" alt="关注雷迪恩公众号" class="w-full h-auto block" />
              </div>

              <p class="text-xs text-gray-400 mt-4">关注“雷迪恩”官方公众号<br>获取更多服务</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* 简单的进场动画 */
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

/* 按钮流光动画 */
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
</style>