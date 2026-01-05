<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
    
    <div class="fixed inset-0 z-0 h-full w-full pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/30 mix-blend-screen blur-[150px] animate-mesh-blob filter"></div>
      <div class="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-blue-500/30 mix-blend-screen blur-[150px] animate-mesh-blob animation-delay-2000 filter"></div>
      <div class="absolute bottom-[-20%] left-[20%] w-[80vw] h-[60vw] rounded-full bg-teal-500/20 mix-blend-screen blur-[180px] animate-mesh-blob animation-delay-4000 filter"></div>
      <div class="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 md:px-12 py-24">
      
      <div class="text-center mt-12 mb-24 animate-fade-in-up">
        <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white/80">
          未来视界 · 产品路线图
        </h1>
        <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          探索雷迪恩的创新之旅<br>
          我们将持续突破技术边界，为您定义未来的家庭能源中心
        </p>
      </div>

      <div class="max-w-7xl mx-auto">
        
        <div class="relative md:grid md:grid-cols-12 gap-8 items-center group mb-20 animate-fade-in-up" style="animation-delay: 0.1s">
          <div class="md:col-span-3 md:text-right">
            <h2 class="text-3xl font-bold text-white font-hero tracking-wider">磐石系列</h2>
          </div>
          
          <div class="hidden md:flex md:col-span-1 justify-center items-center relative h-full min-h-[12rem]">
            <div class="absolute top-0 bottom-0 w-px bg-white/10 group-hover:bg-cyan-500/50 transition-colors duration-500"></div>
            <div class="relative z-10 w-4 h-4 rounded-full bg-gray-600 transition-all duration-300 group-hover:bg-cyan-400 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
          </div>

          <div class="md:col-span-8 flex flex-col md:flex-row gap-8 items-center">
            <div class="w-full md:w-[26rem] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-10 py-8 hover:bg-white/10 transition-all duration-300 group-hover:border-cyan-500/30 flex justify-center items-center text-center">
              <h3 class="text-xl font-bold text-white tracking-wide">简约时尚，品质之选</h3>
            </div>

            <div class="w-48 h-48 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden group-hover:border-cyan-500/30 transition-colors duration-300 relative">
              <NuxtImg src="/images/products/rock-series.png" alt="磐石系列" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
        </div>

        <div class="relative md:grid md:grid-cols-12 gap-8 items-center group mb-20 animate-fade-in-up" style="animation-delay: 0.2s">
          <div class="md:col-span-3 md:text-right">
            <h2 class="text-3xl font-bold text-white font-hero tracking-wider">星辰系列</h2>
          </div>
          
          <div class="hidden md:flex md:col-span-1 justify-center items-center relative h-full min-h-[12rem]">
            <div class="absolute top-0 bottom-0 w-px bg-white/10 group-hover:bg-cyan-500/50 transition-colors duration-500"></div>
            <div class="relative z-10 w-4 h-4 rounded-full bg-gray-600 transition-all duration-300 group-hover:bg-cyan-400 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
          </div>

          <div class="md:col-span-8 flex flex-col md:flex-row gap-8 items-center">
            <div class="w-full md:w-[26rem] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-10 py-8 hover:bg-white/10 transition-all duration-300 group-hover:border-cyan-500/30 flex justify-center items-center text-center">
              <h3 class="text-xl font-bold text-white tracking-wide">智能科技，美学之光</h3>
            </div>
            <div class="w-48 h-48 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden group-hover:border-cyan-500/30 transition-colors duration-300 relative">
               <NuxtImg src="/images/products/star-series.png" alt="星辰系列" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
        </div>

        <div class="relative md:grid md:grid-cols-12 gap-8 items-center group mb-20 animate-fade-in-up" style="animation-delay: 0.3s">
          <div class="md:col-span-3 md:text-right">
            <h2 class="text-3xl font-bold text-white font-hero tracking-wider">星耀系列</h2>
          </div>
          
          <div class="hidden md:flex md:col-span-1 justify-center items-center relative h-full min-h-[12rem]">
            <div class="absolute top-0 bottom-0 w-px bg-white/10 group-hover:bg-cyan-500/50 transition-colors duration-500"></div>
            <div class="relative z-10 w-4 h-4 rounded-full bg-gray-600 transition-all duration-300 group-hover:bg-cyan-400 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
          </div>

          <div class="md:col-span-8 flex flex-col md:flex-row gap-8 items-center">
            <div class="w-full md:w-[26rem] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-10 py-8 hover:bg-white/10 transition-all duration-300 group-hover:border-cyan-500/30 flex justify-center items-center text-center">
              <h3 class="text-xl font-bold text-white tracking-wide">触控大屏，时代之巅</h3>
            </div>
            <div class="w-48 h-48 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden group-hover:border-cyan-500/30 transition-colors duration-300 relative">
               <NuxtImg src="/images/products/shining-series.png" alt="星耀系列" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
        </div>

        <div class="relative md:grid md:grid-cols-12 gap-8 items-center group mb-20 animate-fade-in-up" style="animation-delay: 0.4s">
          <div class="md:col-span-3 md:text-right">
            <h2 class="text-3xl font-bold text-white font-hero tracking-wider">坚石系列</h2>
          </div>
          
          <div class="hidden md:flex md:col-span-1 justify-center items-center relative h-full min-h-[12rem]">
            <div class="absolute top-0 bottom-0 w-px bg-white/10 group-hover:bg-cyan-500/50 transition-colors duration-500"></div>
            <div class="relative z-10 w-4 h-4 rounded-full bg-gray-600 transition-all duration-300 group-hover:bg-cyan-400 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
          </div>

          <div class="md:col-span-8 flex flex-col md:flex-row gap-8 items-center">
            <div class="w-full md:w-[26rem] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-10 py-8 hover:bg-white/10 transition-all duration-300 group-hover:border-cyan-500/30 flex justify-center items-center text-center">
              <h3 class="text-xl font-bold text-white tracking-wide">实用至上，大道至简</h3>
            </div>
            <div class="w-48 h-48 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden group-hover:border-cyan-500/30 transition-colors duration-300 relative">
               <NuxtImg src="/images/products/solid-series.png" alt="坚石系列" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
        </div>

        <div class="relative md:grid md:grid-cols-12 gap-8 items-start group animate-fade-in-up" style="animation-delay: 0.5s">
          <div class="md:col-span-3 md:text-right">
            <h2 class="text-3xl font-bold text-gray-500 font-hero tracking-wider">敬请期待</h2>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// 静态展示页面
</script>

<style scoped>
/* 保持样式不变 */
@keyframes mesh-blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1) rotate(5deg); }
  66% { transform: translate(-20px, 20px) scale(0.9) rotate(-5deg); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-mesh-blob {
  animation: mesh-blob 20s infinite alternate linear;
}

.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>