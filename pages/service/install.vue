<template>
  <div
    class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-emerald-500 selection:text-white overflow-hidden font-sans">

    <div class="fixed inset-0 z-0 pointer-events-none">
      <div
        class="absolute top-[-10%] right-[20%] w-[60vw] h-[40vw] bg-emerald-900/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow">
      </div>
      <div
        class="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-teal-900/10 rounded-full blur-[100px] opacity-20">
      </div>
    </div>

    <div class="relative z-10 container mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-16">

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

        <div
          class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up"
          style="animation-delay: 0.1s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-1.jpg" alt="极速响应"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu"
              loading="eager" fetchpriority="high" preload :placeholder="false" />
          </div>
          <div
            class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent to-[80%] opacity-90">
          </div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div
              class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
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

        <div
          class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up"
          style="animation-delay: 0.2s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-2.jpg" alt="专属服务"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div
            class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent to-[80%] opacity-90">
          </div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div
              class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
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

        <div
          class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up"
          style="animation-delay: 0.3s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-3.jpg" alt="资质齐全"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div
            class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent to-[80%] opacity-90">
          </div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div
              class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
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

        <div
          class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up"
          style="animation-delay: 0.4s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-4.jpg" alt="上门安装"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div
            class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent to-[80%] opacity-90">
          </div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div
              class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
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

        <div
          class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up"
          style="animation-delay: 0.5s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-5.jpg" alt="安装验收"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div
            class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent to-[80%] opacity-90">
          </div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div
              class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
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

        <div
          class="group relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-500 h-[280px] animate-fade-in-up"
          style="animation-delay: 0.6s;">
          <div class="absolute inset-0 z-0">
            <NuxtImg src="/images/service/install-6.jpg" alt="客服回访"
              class="w-full h-full object-cover object-center brightness-100 contrast-110 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out transform-gpu" />
          </div>
          <div
            class="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent to-[80%] opacity-90">
          </div>
          <div class="relative z-10 flex flex-col h-full justify-between p-8">
            <div
              class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 backdrop-blur-md">
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

    </div>
  </div>
</template>

<script setup>
import { useHowToSchema } from '~/composables/useJsonLd'

// --- HowTo JSON-LD Schema（安装六步流程）---
useHowToSchema([
  {
    name: '极速响应：确认需求',
    text: '下单后48小时内，专属客服主动联系您，确认安装地址、车型信息和预约时间，制定个性化服务方案。',
  },
  {
    name: '专属管家：免费上门勘测',
    text: '持证工程师上门免费勘测现场，测量配电箱到车位距离，评估施工可行性，出具详细安装方案和透明报价单。',
  },
  {
    name: '持证电工：专业施工',
    text: '国家持证电工上门施工，完成电缆铺设、穿管保护、充电桩安装固定等全部作业，严格按国标施工规范执行。',
  },
  {
    name: '精工交付：通电调试',
    text: '安装完成后通电测试，连接雷迪恩App，验证充电、预约、峰谷定时等全部功能正常，确保设备开箱即用。',
  },
  {
    name: '安全验收：签署验收单',
    text: '工程师现场演示App使用方法，与用户共同验收安装质量，签署标准验收单，验收通过后方视为服务完成。',
  },
  {
    name: '售后回访：全程守护',
    text: '安装完成后48小时内客服主动回访，确认设备运行状态。质保期内任何非人为质量问题，第一时间上门处理。',
  },
])

// --- SEO 配置 ---
useSeoMeta({
  title: '安装服务 - 6大标准化流程 | 专业上门安装 | Raydiene 雷迪恩',
  description: '雷迪恩家用充电桩安装服务全流程：免费上门勘测→透明报价→国家持证电工施工→当天完工。符合GB 39752-2024新国标，支持物业申请协助、国网增容指导。覆盖全国，48小时响应，安装费用无隐形收费。',
  keywords: '家用充电桩安装流程, 充电桩安装费用, 充电桩物业申请, 国网申请充电桩, 充电桩安装多少钱, 充电桩上门安装, GB 39752-2024, Raydiene安装',
  // 社交分享优化
  ogTitle: '雷迪恩专业安装：6大流程，一步到位',
  ogDescription: '从勘测到交付，全程标准化服务。持证上岗，安全无忧。',
  ogImage: '/images/service/install-4.jpg', // 使用页面中代表“精工交付”的图片作为分享封面
})
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.4;
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