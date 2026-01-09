<template>
  <div class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-emerald-500 selection:text-white overflow-hidden font-sans">

    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-10%] right-[20%] w-[60vw] h-[40vw] bg-emerald-900/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-teal-900/10 rounded-full blur-[100px] opacity-20"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 md:px-12 py-32 md:py-40">
      
      <div class="text-center mb-20 animate-fade-in-up">
        <h1 class="text-4xl md:text-6xl font-bold font-hero tracking-tight mb-6">
          专业安装，一步到位
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          我们将原本复杂的充电桩安装工程，转化为标准化的省心服务
          <br>六大服务流程，全链路保障您的充电安全
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

        <div class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-1.jpg" alt="极速响应"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-[#050505] via-[#050505]/90 to-transparent opacity-95"></div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
              <span class="font-hero font-bold text-lg">01</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold font-hero mb-2 text-white">极速响应</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                收到订单后，我们的服务团队将在 <span class="text-emerald-400 font-bold">2小时内</span> 与您取得联系，初步确认安装环境与需求。
              </p>
            </div>
          </div>
        </div>

        <div class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up" style="animation-delay: 0.2s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-2.jpg" alt="专属服务"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-[#050505] via-[#050505]/90 to-transparent opacity-95"></div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
              <span class="font-hero font-bold text-lg">02</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold font-hero mb-2 text-white">专属管家</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                为您配备 <span class="text-emerald-400 font-bold">1对1</span> 项目经理。从勘测、物业协调到施工方案设计，全程专人统筹跟进。
              </p>
            </div>
          </div>
        </div>

        <div class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up" style="animation-delay: 0.3s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-3.jpg" alt="资质齐全"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-[#050505] via-[#050505]/90 to-transparent opacity-95"></div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
              <span class="font-hero font-bold text-lg">03</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold font-hero mb-2 text-white">持证上岗</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                专业团队。所有施工人员均持有 <span class="text-emerald-400 font-bold">专业电工资质</span>，严格遵守国家电力施工标准规范。
              </p>
            </div>
          </div>
        </div>

        <div class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up" style="animation-delay: 0.4s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-4.jpg" alt="上门安装"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-[#050505] via-[#050505]/60 to-transparent opacity-95"></div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
              <span class="font-hero font-bold text-lg">04</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold font-hero mb-2 text-white">精工交付</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                按照预约时间准时上门。坚持 <span class="text-emerald-400 font-bold">标准化施工工艺</span>，布线整洁美观，确保安装环境整洁如初。
              </p>
            </div>
          </div>
        </div>

        <div class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up" style="animation-delay: 0.5s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-5.jpg" alt="安装验收"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-[#050505] via-[#050505]/90 to-transparent opacity-95"></div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
              <span class="font-hero font-bold text-lg">05</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold font-hero mb-2 text-white">严苛验收</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                安装完成后进行 <span class="text-emerald-400 font-bold">严苛安全检测</span>。并现场指导您如何使用充电桩及App功能，直到您满意。
              </p>
            </div>
          </div>
        </div>

        <div class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up" style="animation-delay: 0.6s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-6.jpg" alt="客服回访"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-[#050505] via-[#050505]/90 to-transparent opacity-95"></div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
              <span class="font-hero font-bold text-lg">06</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold font-hero mb-2 text-white">关怀回访</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                服务并未结束。我们会在安装后进行 <span class="text-emerald-400 font-bold">电话回访</span>，确保设备运行正常，并收集您的宝贵建议。
              </p>
            </div>
          </div>
        </div>

      </div>

      <div class="mt-24 text-center animate-fade-in-up" style="animation-delay: 0.7s;">
        <p class="text-gray-400 mb-8">准备好安装了吗？</p>
        <div class="flex flex-col md:flex-row gap-6 justify-center">
          <NuxtLink 
            to="/contact/official" 
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-500 transition-colors group shadow-lg shadow-emerald-900/30"
          >
            <span>预约安装服务</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
          <NuxtLink 
            to="/download/manual" 
            class="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
          >
            <span>下载安装指南</span>
          </NuxtLink>
        </div>
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
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
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