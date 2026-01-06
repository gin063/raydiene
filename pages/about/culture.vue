<template>
  <div class="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden selection:bg-teal-500 selection:text-white">

    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-blue-900/20 rounded-full blur-[120px] opacity-60"></div>
      
      <div class="absolute bottom-[-10%] left-0 w-full h-[60vh] bg-gradient-to-t from-teal-900/20 via-transparent to-transparent opacity-50"></div>

      <div class="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 md:px-12 py-24 md:py-32">

      <div class="text-center mb-24 animate-fade-in-up">
        <h1 class="text-4xl md:text-6xl font-bold font-hero tracking-tight mb-6">
          雷迪恩的<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">精神内核</span>
        </h1>
        <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          驱动我们不断前行的信仰与准则
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        
        <div class="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" style="animation-delay: 0.1s">
          <div class="absolute inset-0 bg-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 flex flex-col h-full items-center text-center">
            <div class="w-16 h-16 mb-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h2 class="text-gray-400 text-sm font-bold tracking-widest uppercase mb-4">企业使命</h2>
            <p class="text-2xl md:text-3xl font-bold text-white font-hero leading-tight">
              让充电更安全<br>更便捷
            </p>
          </div>
        </div>

        <div class="group relative p-8 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" style="animation-delay: 0.2s">
          <div class="absolute inset-0 bg-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 flex flex-col h-full items-center text-center">
            <div class="w-16 h-16 mb-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <h2 class="text-gray-400 text-sm font-bold tracking-widest uppercase mb-4">企业愿景</h2>
            <p class="text-2xl md:text-3xl font-bold text-white font-hero leading-tight">
              成为全球第一的<br>充电桩科技品牌
            </p>
          </div>
        </div>

        <div class="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" style="animation-delay: 0.3s">
          <div class="absolute inset-0 bg-teal-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 flex flex-col h-full items-center text-center">
            <div class="w-16 h-16 mb-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 group-hover:scale-110 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h2 class="text-gray-400 text-sm font-bold tracking-widest uppercase mb-4">企业价值观</h2>
            <p class="text-2xl md:text-3xl font-bold text-white font-hero leading-tight">
              用户第一<br>正道成功
            </p>
          </div>
        </div>

      </div>

      <section class="relative max-w-5xl mx-auto text-center animate-on-scroll">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-teal-500/50 to-transparent"></div>

        <div class="pt-24 pb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 font-hero">
            社会责任
          </h2>
          
          <div class="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div class="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>

            <h3 class="relative text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
              选择雷迪恩，<br class="md:hidden">不止是选一台充电桩
            </h3>

            <div class="relative space-y-8 text-gray-300 text-lg leading-relaxed">
              <p>
                是省心的居家充电服务，<br>
                更是以 <span class="text-teal-400 font-bold">科技兑现的低碳承诺</span>。
              </p>
              
              <div class="grid md:grid-cols-2 gap-6 my-10">
                <div class="p-6 rounded-2xl bg-black/20 border border-white/5">
                  <p>用安全智能的产品，<br>让每一次充电都成为减碳实践</p>
                </div>
                <div class="p-6 rounded-2xl bg-black/20 border border-white/5">
                  <p>以可靠的服务，<br>让绿色出行轻松融入日常</p>
                </div>
              </div>

              <p class="text-xl md:text-2xl font-bold text-white font-hero pt-4">
                “我们以微小的充电环节，<br>共筑可持续的出行未来。”
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

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
/* 纹理背景 */
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* 呼吸动画 */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

/* 进场动画 */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

/* 滚动触发 */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>