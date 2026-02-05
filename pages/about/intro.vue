<template>
  <div
    class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div
        class="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow">
      </div>
      <div
        class="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] bg-conic-gradient from-blue-900/10 via-cyan-900/10 to-transparent blur-[80px] opacity-60 animate-spin-slow">
      </div>
      <div class="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20"></div>
    </div>

    <div class="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-0">
      <section class="max-w-4xl mx-auto mb-16 md:mb-24 text-center animate-fade-in-up">
        <span
          class="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-gray-400 mb-8 uppercase">
          Our Story
        </span>
        <h1 class="text-4xl md:text-6xl font-bold font-hero tracking-tight mb-12 leading-tight">
          一群「非典型创业者」的<br /><br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">科创热望</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-400 leading-relaxed font-light text-justify md:text-center">
          2023年，在上海的科创浪潮里，<br />一群不再年轻但心怀热望的「非典型创业者」，因一个共同的念头聚在了一起。
        </p>
      </section>

      <section class="max-w-6xl mx-auto mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="order-2 md:order-1 animate-on-scroll flex flex-col justify-center">
          <div class="space-y-6 max-w-xl mx-auto md:mx-0">
            <div class="space-y-4">
              <p class="text-gray-300 text-lg leading-relaxed">
                在他们眼里，充电桩不该只是 “呆笨” 的功能性设备 ——
                <span class="text-white font-bold block mt-2">它应该是能融入生活的智能消费电子，<br />是兼具安全与美感的出行伙伴。</span>
              </p>
            </div>

            <div class="pl-6 border-l-2 border-blue-500/50">
              <p class="text-xl md:text-2xl font-bold italic text-white/90 font-hero leading-relaxed">
                “为什么充电桩<br />不能更好看、更好用？”
              </p>
            </div>
            <p class="text-gray-400 text-base">
              带着这个问号，雷迪恩充电桩，由此而生。
            </p>
          </div>
        </div>

        <div class="order-1 md:order-2 flex justify-center animate-on-scroll">
          <div class="relative w-full aspect-square max-w-sm group">
            <div
              class="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-[2rem] blur-2xl animate-blob opacity-70 group-hover:opacity-100 transition-opacity duration-500">
            </div>
            <div
              class="relative h-full rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between shadow-2xl overflow-hidden hover:border-white/30 transition-all duration-500 z-10">
              <div class="absolute inset-0 z-0">
                <NuxtImg src="/images/about/about-charger-square.jpg" alt="雷迪恩充电桩特效"
                  class="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div
                  class="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/30 mix-blend-multiply">
                </div>
              </div>
              <div class="relative z-10 h-full flex flex-col justify-between">
                <div
                  class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 mix-blend-overlay">
                </div>
                <div class="text-6xl text-white/20 font-black font-hero drop-shadow-lg select-none">
                  WHY?
                </div>
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

      <section class="w-full mx-auto mb-16 md:mb-24 animate-on-scroll relative z-10 px-4 md:px-0">
        <div
          class="relative bg-gradient-to-b from-white/5 to-[#0a0a0a] border-t border-x border-white/10 rounded-3xl text-center backdrop-blur-sm overflow-hidden">
          <div
            class="relative w-full overflow-hidden min-h-[600px] lg:min-h-[80vh] flex flex-col items-center justify-center bg-[#050505] group py-20 md:py-24">
            <div class="absolute inset-0 z-0 select-none pointer-events-none">
              <div
                class="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/10 to-black/80 pointer-events-none">
              </div>
              <NuxtImg src="/images/about/why-radiant-bg.jpg" alt="雷迪恩产品艺术图"
                class="w-full h-full object-cover object-center animate-float-slow brightness-125 transform scale-105 md:scale-100"
                loading="lazy" />
            </div>

            <div
              class="relative z-20 container mx-auto px-4 md:px-6 text-center flex flex-col items-center justify-center h-full gap-10 md:gap-12 lg:gap-16">
              <h2 class="text-4xl md:text-6xl lg:text-7xl font-bold font-hero tracking-tight leading-tight">
                <span class="drop-shadow-2xl text-white block md:inline mb-2 md:mb-0">为什么叫</span>
                <span class="relative inline-block mx-2 align-bottom px-2">
                  <span class="text-cyan-500/80 font-black relative z-0">雷迪恩</span>
                  <span
                    class="absolute inset-0 z-10 font-black bg-gradient-to-r from-cyan-300/0 via-white to-cyan-300/0 bg-[length:50%_100%] bg-no-repeat animate-shimmer-slide bg-clip-text text-transparent brightness-150 contrast-125 drop-shadow-[0_4px_10px_rgba(0,0,0,1)] drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                    雷迪恩
                  </span>
                </span>
                <span
                  class="text-4xl md:text-7xl align-top text-white font-light drop-shadow-xl hidden md:inline">?</span>
                <span class="text-4xl align-middle text-white font-light drop-shadow-xl md:hidden">?</span>
              </h2>

              <div class="hidden md:block h-8 md:h-[12vh] min-h-[40px]"></div>

              <div
                class="w-full max-w-3xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:py-8 md:px-12 shadow-2xl transform transition-all hover:scale-[1.01] duration-500">
                <div class="space-y-6 md:space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                  <p class="animate-fade-in-up" style="animation-delay: 0.1s">
                    因为
                    <strong class="text-white font-bold text-2xl mx-1">雷迪恩</strong>
                    <br class="md:hidden" />同时也是宝石切割界的顶级工艺
                  </p>

                  <div class="w-16 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>

                  <p class="animate-fade-in-up" style="animation-delay: 0.3s">
                    <span class="block mb-2 text-white font-medium">以精准切面，折射极致璀璨</span>
                    <span class="text-gray-400 text-base md:text-lg block">
                      正如我们想让充电桩，跳出工业感的刻板<br class="hidden md:block" />
                      <span
                        class="text-cyan-500 font-medium drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] mt-1 inline-block">
                        绽放出设计的光芒
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-4xl mx-auto text-center animate-on-scroll mb-16 md:mb-24">
        <div class="grid md:grid-cols-2 gap-12">
          <div class="text-left space-y-4">
            <h3 class="text-xl font-bold text-white flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              我们的底色
            </h3>
            <p class="text-gray-400 leading-relaxed">
              这份「把 “工具” 做成 “作品”」的执念，成了雷迪恩的底色<br /><span class="text-gray-200">以顶配工艺与原料打磨每一台产品，以赤诚真心服务每一位信任我们的用户。</span>
            </p>
          </div>
          <div class="text-left space-y-4">
            <h3 class="text-xl font-bold text-white flex items-center gap-2">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              未来的愿景
            </h3>
            <p class="text-gray-400 leading-relaxed">
              我们想走得更远：成为全球第一的家用充电桩品牌<br /><span class="text-gray-200">让安全、智能、充满设计感的产品，为每一段绿色出行，充上满格的能量与愉悦。</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

// --- SEO 配置 ---
useSeoMeta({
  title: "品牌故事 - 雷迪恩(Raydiene)起源与理念 | Raydiene",
  description:
    "了解雷迪恩(Raydiene)的诞生故事。一群在上海科创浪潮中的“非典型创业者”，致力于打破工业刻板印象，打造兼具安全与美感的智能家用充电桩。",
  keywords:
    "雷迪恩品牌故事, Raydiene起源, 充电桩设计理念, 智能充电设备, 充电桩美学, 上海科创品牌",
  // 社交分享优化
  ogTitle: "雷迪恩品牌故事：一群“非典型创业者”的科创热望",
  ogDescription: "为什么充电桩不能更好看、更好用？这就是雷迪恩诞生的起点。",
  ogImage: "/images/about/why-radiant-bg.jpg", // 复用页面中那张核心的“宝石切割”背景图
});

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
});
</script>

<style scoped>
/* 保持样式不变 */
.bg-conic-gradient {
  background: conic-gradient(from 0deg at 50% 50%, rgba(15, 23, 42, 0), rgba(56, 189, 248, 0.1), rgba(168, 85, 247, 0.1), rgba(15, 23, 42, 0));
}

@keyframes pulse-slow {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes shimmer-slide {
  0% {
    background-position: -100% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

.animate-shimmer-slide {
  animation: shimmer-slide 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes float-slow {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}
</style>