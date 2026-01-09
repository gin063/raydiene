<template>
  <div class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">

    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div class="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] bg-conic-gradient from-blue-900/10 via-cyan-900/10 to-transparent blur-[80px] opacity-60 animate-spin-slow"></div>
      <div class="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 md:px-12 py-24 md:py-32">
      
      <section class="max-w-4xl mx-auto mb-32 md:mb-48 text-center animate-fade-in-up">
        <span class="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-gray-400 mb-8 uppercase">
          Our Story
        </span>
        <h1 class="text-4xl md:text-6xl font-bold font-hero tracking-tight mb-12 leading-tight">
          一群「非典型创业者」的<br><br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">科创热望</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-400 leading-relaxed font-light text-justify md:text-center">
          2023年，在上海的科创浪潮里，一群不再年轻但心怀热望的「非典型创业者」，因一个共同的念头聚在了一起。
        </p>
      </section>

      <section class="max-w-6xl mx-auto mb-32 md:mb-48 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1 space-y-8 animate-on-scroll">
          <div class="space-y-6">
            <p class="text-gray-300 text-lg leading-relaxed">
              在他们眼里，充电桩不该只是 “呆笨” 的功能性设备 —— 
              <span class="text-white font-bold">它应该是能融入生活的智能消费电子，是兼具安全与美感的出行伙伴。</span>
            </p>
            <div class="pl-6 border-l-2 border-blue-500/50">
              <p class="text-2xl md:text-3xl font-bold italic text-white/90 font-hero">
                “为什么充电桩<br>不能更好看、更好用？”
              </p>
            </div>
            <p class="text-gray-400">
              带着这个问号，雷迪恩充电桩，由此而生。
            </p>
          </div>
        </div>
        
        <div class="order-1 md:order-2 flex justify-center animate-on-scroll">
          <div class="relative w-full aspect-square max-w-sm group">
            <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-[2rem] blur-2xl animate-blob opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative h-full rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between shadow-2xl overflow-hidden hover:border-white/30 transition-all duration-500 z-10">
              <div class="absolute inset-0 z-0">
                <NuxtImg 
                  src="/images/about/about-charger-square.jpg" 
                  alt="雷迪恩充电桩特效"
                  class="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                <div class="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/30 mix-blend-multiply"></div>
              </div>
              <div class="relative z-10 h-full flex flex-col justify-between">
                <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 mix-blend-overlay"></div>
                <div class="text-6xl text-white/20 font-black font-hero drop-shadow-lg select-none">WHY?</div>
                <div class="space-y-2 drop-shadow-md">
                  <div class="h-1 w-12 bg-blue-500 rounded-full"></div>
                  <h3 class="text-xl font-bold text-white">打破工业刻板印象</h3>
                  <p class="text-sm text-gray-300">从功能设备到生活美学</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-5xl mx-auto mb-32 md:mb-48 animate-on-scroll relative z-10">
        <div class="relative bg-gradient-to-b from-white/5 to-[#0a0a0a] border-t border-x border-white/10 rounded-3xl text-center backdrop-blur-sm overflow-hidden">
          
          <div class="p-10 md:p-20 md:pb-10 relative z-20">
            <h2 class="text-3xl md:text-5xl font-bold mb-8 font-hero">
              为什么叫 <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300">雷迪恩</span> ?
            </h2>
            <div class="max-w-2xl mx-auto space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                因为 <span class="text-white font-bold">Raydiene</span> 同时也是宝石切割界的顶级工艺。
              </p>
              <p>
                <span class="text-white border-b border-white/20 pb-1">以精准切面折射极致璀璨，正如我们想让充电桩，跳出工业感的刻板，绽放出设计的光芒。</span>
              </p>
            </div>
          </div>

          <div class="relative w-full h-[300px] md:h-[400px] mt-8 z-10 group">
            
            <NuxtImg 
              src="/images/about/about-craft-banner.jpg" 
              alt="Raydiene 宝石切割工艺"
              class="w-full h-full object-cover object-center mix-blend-multiply opacity-90 transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            <div class="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none"></div>
            
            <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/20 to-transparent mix-blend-overlay pointer-events-none"></div>
          </div>

        </div>
      </section>

      <section class="max-w-4xl mx-auto text-center animate-on-scroll pb-20">
        <div class="grid md:grid-cols-2 gap-12 mb-24">
          <div class="text-left space-y-4">
            <h3 class="text-xl font-bold text-white flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              我们的底色
            </h3>
            <p class="text-gray-400 leading-relaxed">
              这份「把 “工具” 做成 “作品”」的执念，成了雷迪恩的底色：<span class="text-gray-200">以顶配工艺与原料打磨每一台产品，以赤诚真心服务每一位信任我们的用户。</span>
            </p>
          </div>
          <div class="text-left space-y-4">
            <h3 class="text-xl font-bold text-white flex items-center gap-2">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              未来的愿景
            </h3>
            <p class="text-gray-400 leading-relaxed">
              我们想走得更远：成为全球领先的专业充电桩品牌，让安全、智能、充满设计感的产品，<span class="text-gray-200">为每一段绿色出行，充上满格的能量与愉悦。</span>
            </p>
          </div>
        </div>

        <div class="relative py-16">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full"></div>
          <h2 class="relative text-2xl md:text-4xl font-bold text-white tracking-widest font-hero">
            RAYDIENE
          </h2>
          <p class="relative text-sm text-gray-500 mt-4 tracking-widest uppercase">CHARGING FOR BETTER WORLD</p>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// 简单的滚动显现动画逻辑 (Intersection Observer)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, { threshold: 0.15 }) // 15% 可见时触发

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* 锥形渐变背景 (模拟光芒) */
.bg-conic-gradient {
  background: conic-gradient(from 0deg at 50% 50%, rgba(15, 23, 42, 0), rgba(56, 189, 248, 0.1), rgba(168, 85, 247, 0.1), rgba(15, 23, 42, 0));
}

/* 动画定义 */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}

/* 进场动画类 */
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 滚动触发动画 */
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