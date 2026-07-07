<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">

    <div class="fixed inset-0 z-0 h-full w-full pointer-events-none">
      <div
        class="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/30 mix-blend-screen blur-[150px] animate-mesh-blob filter">
      </div>
      <div
        class="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-blue-500/30 mix-blend-screen blur-[150px] animate-mesh-blob animation-delay-2000 filter">
      </div>
      <div
        class="absolute bottom-[-20%] left-[20%] w-[80vw] h-[60vw] rounded-full bg-teal-500/20 mix-blend-screen blur-[180px] animate-mesh-blob animation-delay-4000 filter">
      </div>
      <div class="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 md:px-12 pt-24 pb-16">

      <div class="text-center mt-12 mb-20 animate-fade-in-up">
        <h1
          class="text-4xl md:text-6xl font-bold tracking-tight mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white/80">
          选购指南 · 找到您的专属家用充电桩
        </h1>
        <p class="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          从极致性价比到行业旗舰，我们为您提供多样化的家庭能源解决方案。<br>
          对比四大系列，发现最懂您的那一款。
        </p>
      </div>

      <div class="max-w-6xl mx-auto flex flex-col gap-12">

        <div
          class="group main-card relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 animate-fade-in-up"
          style="animation-delay: 0.1s">
          <div class="flex flex-col md:flex-row h-full">
            <div
              class="w-full md:w-2/5 relative min-h-[300px] md:min-h-full bg-gradient-to-b from-cyan-900/20 to-transparent flex items-center justify-center p-8 group/image">
              <NuxtImg src="/images/products/solid-series.png" alt="雷迪恩坚石系列家用充电桩 金属银极简风格"
                class="w-full max-w-[280px] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                sizes="280px" loading="eager" fetchpriority="high" preload :placeholder="false" />
              <div class="absolute top-6 left-6">
                <span
                  class="px-4 py-1.5 rounded-full bg-cyan-600/80 border border-white/20 text-xs font-bold tracking-wider text-white">入门首选</span>
              </div>

              <NuxtLink to="/products/jianshi" class="absolute bottom-6 right-6 z-20 group/btn">
                <div
                  class="relative flex items-center justify-center w-10 h-10 overflow-hidden text-white transition-all duration-500 ease-out border rounded-full backdrop-blur-md border-white/20 group-hover/btn:w-[88px] hover:bg-white hover:border-white hover:text-black">

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="absolute w-5 h-5 transition-all duration-500 ease-out group-hover/btn:opacity-0 group-hover/btn:scale-50 group-hover/btn:-rotate-45">
                    <path fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd" />
                  </svg>

                  <span
                    class="absolute text-sm font-bold whitespace-nowrap transition-all duration-500 ease-out opacity-0 translate-y-4 scale-50 group-hover/btn:opacity-100 group-hover/btn:scale-100 group-hover/btn:translate-y-0">
                    了解更多
                  </span>

                </div>
              </NuxtLink>
            </div>

            <div class="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h2 class="text-3xl md:text-4xl font-bold font-hero mb-2 text-white">坚石系列</h2>
              <p class="text-cyan-400 text-sm mb-6">极致简约</p>

              <div class="space-y-4 text-gray-300 leading-relaxed mb-8">
                <p><strong class="text-white">主打定位：</strong>基础充电，外观为金属银，极致简约风格。</p>
                <p><strong class="text-white">硬件配置：</strong>枪线5米，满足90%以上的充电场景需求。除枪线长度外，与其它产品在功能上基本无区别。</p>
                <p><strong class="text-white">质保服务：</strong>质保为两年只换不修。（参加活动，限时升级4年质保）</p>
              </div>

              <div class="mt-auto p-4 rounded-xl bg-cyan-900/20 border border-cyan-500/20">
                <p class="text-lg font-bold text-white">
                  全系里面，最经济实惠的选择！
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group main-card relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 animate-fade-in-up"
          style="animation-delay: 0.2s">
          <div class="flex flex-col md:flex-row h-full">
            <div
              class="w-full md:w-2/5 relative min-h-[300px] md:min-h-full bg-gradient-to-b from-cyan-900/20 to-transparent flex items-center justify-center p-8 group/image">
              <NuxtImg src="/images/products/rock-series.png" alt="雷迪恩磐石系列家用充电桩 简约时尚品质之选"
                sizes="280px" loading="lazy"
                class="w-full max-w-[280px] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute top-6 left-6">
                <span
                  class="px-4 py-1.5 rounded-full bg-cyan-600/80 border border-white/20 text-xs font-bold tracking-wider text-white">销量冠军</span>
              </div>

              <NuxtLink to="/products/panshi" class="absolute bottom-6 right-6 z-20 group/btn">
                <div
                  class="relative flex items-center justify-center w-10 h-10 overflow-hidden text-white transition-all duration-500 ease-out border rounded-full backdrop-blur-md border-white/20 group-hover/btn:w-[88px] hover:bg-white hover:border-white hover:text-black">

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="absolute w-5 h-5 transition-all duration-500 ease-out group-hover/btn:opacity-0 group-hover/btn:scale-50 group-hover/btn:-rotate-45">
                    <path fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd" />
                  </svg>

                  <span
                    class="absolute text-sm font-bold whitespace-nowrap transition-all duration-500 ease-out opacity-0 translate-y-4 scale-50 group-hover/btn:opacity-100 group-hover/btn:scale-100 group-hover/btn:translate-y-0">
                    了解更多
                  </span>

                </div>
              </NuxtLink>
            </div>
            <div class="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h2 class="text-3xl md:text-4xl font-bold font-hero mb-2 text-white">磐石系列</h2>
              <p class="text-cyan-400 text-sm mb-6">全能担当</p>

              <div class="space-y-4 text-gray-300 leading-relaxed mb-8">
                <p><strong class="text-white">主打定位：</strong>全能充电，全网销售冠军。外观为黑色高光面板搭配经典银，主流充电桩中的颜值担当。</p>
                <p><strong class="text-white">硬件配置：</strong>枪线升级为6米，功能配置拉满，使用场景更丰富。</p>
                <p><strong class="text-white">质保服务：</strong>质保为两年只换不修。（参加活动，限时升级4年质保）</p>
              </div>

              <div class="mt-auto p-4 rounded-xl bg-cyan-900/20 border border-cyan-500/20">
                <p class="text-lg font-bold text-white">
                  全系里面，兼顾全能和性价比的选择！
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group main-card relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 animate-fade-in-up"
          style="animation-delay: 0.3s">
          <div class="flex flex-col md:flex-row h-full">
            <div
              class="w-full md:w-2/5 relative min-h-[300px] md:min-h-full bg-gradient-to-b from-cyan-900/20 to-transparent flex items-center justify-center p-8 group/image">
              <NuxtImg src="/images/products/star-series.png" alt="雷迪恩星辰系列家用充电桩 钢化玻璃面板"
                sizes="280px" loading="lazy"
                class="w-full max-w-[280px] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute top-6 left-6">
                <span
                  class="px-4 py-1.5 rounded-full bg-cyan-600/80 border border-white/20 text-xs font-bold tracking-wider text-white">科技美学</span>
              </div>

              <NuxtLink to="/products/xingchen" class="absolute bottom-6 right-6 z-20 group/btn">
                <div
                  class="relative flex items-center justify-center w-10 h-10 overflow-hidden text-white transition-all duration-500 ease-out border rounded-full backdrop-blur-md border-white/20 group-hover/btn:w-[88px] hover:bg-white hover:border-white hover:text-black">

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="absolute w-5 h-5 transition-all duration-500 ease-out group-hover/btn:opacity-0 group-hover/btn:scale-50 group-hover/btn:-rotate-45">
                    <path fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd" />
                  </svg>

                  <span
                    class="absolute text-sm font-bold whitespace-nowrap transition-all duration-500 ease-out opacity-0 translate-y-4 scale-50 group-hover/btn:opacity-100 group-hover/btn:scale-100 group-hover/btn:translate-y-0">
                    了解更多
                  </span>

                </div>
              </NuxtLink>
            </div>
            <div class="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h2 class="text-3xl md:text-4xl font-bold font-hero mb-2 text-white">星辰系列</h2>
              <p class="text-cyan-400 text-sm mb-6">极致稳定</p>

              <div class="space-y-4 text-gray-300 leading-relaxed mb-8">
                <p><strong class="text-white">主打定位：</strong>功能上与磐石一致，区别主要是外观和用料。</p>
                <p><strong class="text-white">硬件配置：</strong>玻璃金属面板更富科技感，核心元件用料整体有提升（更极致的稳定性），加上4.3寸屏幕（科技感拉满）。</p>
                <p><strong class="text-white">质保服务：</strong>质保为两年只换不修。（参加活动，限时升级4年质保）</p>
              </div>

              <div class="mt-auto p-4 rounded-xl bg-cyan-900/20 border border-cyan-500/20">
                <p class="text-lg font-bold text-white">
                  全系里面，兼顾颜值和极致性能的选择！
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group main-card relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 animate-fade-in-up"
          style="animation-delay: 0.4s">
          <div class="flex flex-col md:flex-row h-full">
            <div
              class="w-full md:w-2/5 relative min-h-[300px] md:min-h-full bg-gradient-to-b from-cyan-900/20 to-transparent flex items-center justify-center p-8 group/image">
              <NuxtImg src="/images/products/shining-series.png" alt="雷迪恩星耀系列家用充电桩 7寸触控大屏"
                sizes="280px" loading="lazy"
                class="w-full max-w-[280px] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute top-6 left-6">
                <span
                  class="px-4 py-1.5 rounded-full bg-cyan-600/80 border border-white/20 text-xs font-bold tracking-wider text-white">行业旗舰</span>
              </div>

              <NuxtLink to="/products/xingyao" class="absolute bottom-6 right-6 z-20 group/btn">
                <div
                  class="relative flex items-center justify-center w-10 h-10 overflow-hidden text-white transition-all duration-500 ease-out border rounded-full backdrop-blur-md border-white/20 group-hover/btn:w-[88px] hover:bg-white hover:border-white hover:text-black">

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="absolute w-5 h-5 transition-all duration-500 ease-out group-hover/btn:opacity-0 group-hover/btn:scale-50 group-hover/btn:-rotate-45">
                    <path fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd" />
                  </svg>

                  <span
                    class="absolute text-sm font-bold whitespace-nowrap transition-all duration-500 ease-out opacity-0 translate-y-4 scale-50 group-hover/btn:opacity-100 group-hover/btn:scale-100 group-hover/btn:translate-y-0">
                    了解更多
                  </span>

                </div>
              </NuxtLink>
            </div>
            <div class="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h2 class="text-3xl md:text-4xl font-bold font-hero mb-2 text-white">星耀系列</h2>
              <p class="text-cyan-400 text-sm mb-6">遥遥领先</p>

              <div class="space-y-4 text-gray-300 leading-relaxed mb-8">
                <p><strong class="text-white">主打定位：</strong>行业旗舰，业内首个7寸触控大屏充电桩，把“Pad”搬上了充电桩，真正的全面智能。</p>
                <p><strong class="text-white">硬件配置：</strong>各项参数规格到顶，全系标配 7.5米 菲尼克斯充电枪。</p>
                <p><strong class="text-white">质保服务：</strong>额外赠送两年质保，四年只换不修。</p>
              </div>

              <div class="mt-auto p-4 rounded-xl bg-cyan-900/20 border border-cyan-500/20">
                <p class="text-lg font-bold text-white">
                  全系里面，追求极致完美的选择！
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 3C 认证信任条 -->
      <div class="max-w-6xl mx-auto mt-12 animate-fade-in-up" style="animation-delay: 0.5s">
        <NuxtLink to="/products/certificates"
          class="group flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl px-8 py-6 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500">
          <div class="flex items-center gap-4 text-center md:text-left">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-10 h-10 shrink-0 text-cyan-400">
              <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            <div>
              <p class="text-lg font-bold text-white">全系产品已通过国家强制性 3C 认证</p>
              <p class="text-sm text-gray-400">符合 GB 39752-2024 新国标，证书可在中国质量认证中心（CQC）官网在线查验。</p>
            </div>
          </div>
          <span
            class="shrink-0 inline-flex items-center gap-2 font-bold text-cyan-400 group-hover:text-white transition-colors">
            查看认证证书
            <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// --- SEO 配置 (替换原有的 useHead) ---
useSeoMeta({
  title: '选购指南 - 家用充电桩产品对比与推荐 | Raydiene',
  description: '家用充电桩怎么选？7kW还是21kW？雷迪恩选购指南对比坚石/磐石/星辰/星耀全系：价格799元起，最高28重安全防护、全系3C认证、最高4年质保。覆盖特斯拉/比亚迪/理想等99%国标车型，找到您的专属家用充电方案。',
  keywords: '家用充电桩怎么选, 7kW和11kW充电桩区别, 充电桩选购指南, 雷迪恩产品对比, 坚石vs磐石, 家用充电桩推荐2026, 充电桩多少钱',
  // 社交分享优化
  ogTitle: '雷迪恩选购指南：一图看懂四大系列区别',
  ogDescription: '从极致性价比到行业旗舰，我们为您提供多样化的家庭能源解决方案。',
  ogImage: 'https://assets.raydiene.cn/images/products/rock-series.png', // 使用销量冠军“磐石”的图片作为封面
})
</script>

<style scoped>
/* 动效保持不变 */
@keyframes mesh-blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1) rotate(5deg);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9) rotate(-5deg);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-mesh-blob {
  animation: mesh-blob 20s infinite alternate linear;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
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

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>