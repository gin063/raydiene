<template>
  <div class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-purple-500 selection:text-white overflow-x-hidden">

    <div class="relative w-full h-screen">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <NuxtImg 
          src="/images/products/xingchen/scene-bg.jpg" 
          alt="星辰系列场景" 
          class="w-full h-full object-cover animate-ken-burns"
          placeholder
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      </div>

      <div class="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end items-center text-center pb-32 md:pb-48">
        <h1 class="text-5xl md:text-7xl font-bold font-hero tracking-tight mb-6 animate-fade-in-up">
          星辰系列
        </h1>
        <p class="text-xl md:text-2xl text-gray-200 font-light tracking-wide mb-12 animate-fade-in-up" style="animation-delay: 0.2s">
          7kW 家用交流充电桩 · 智能科技，美学之光
        </p>
        
        <div class="flex gap-4 animate-fade-in-up" style="animation-delay: 0.4s">
          <button class="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
            立即订购
          </button>
          <button class="px-8 py-3 rounded-full border border-white/30 backdrop-blur-md hover:bg-white/10 transition-colors">
            预约安装
          </button>
        </div>
      </div>
    </div>

    <div class="bg-[#111] border-y border-white/5 py-12 relative z-20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <div class="flex flex-col items-center gap-3 group">
            <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
            </div>
            <h3 class="text-sm font-bold text-gray-300">适配99%车型</h3>
          </div>
          <div class="flex flex-col items-center gap-3 group">
            <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>
            </div>
            <h3 class="text-sm font-bold text-gray-300">专业上门安装</h3>
          </div>
          <div class="flex flex-col items-center gap-3 group">
            <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 class="text-sm font-bold text-gray-300">7*15h 响应</h3>
          </div>
          <div class="flex flex-col items-center gap-3 group">
            <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
            </div>
            <h3 class="text-sm font-bold text-gray-300">2年质保只换不修</h3>
          </div>
          <div class="flex flex-col items-center gap-3 group">
            <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" /></svg>
            </div>
            <h3 class="text-sm font-bold text-gray-300">终身免费流量 & OTA</h3>
          </div>
        </div>
      </div>
    </div>

    <section class="py-24 bg-[#0a0a0a]">
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <div class="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <NuxtImg 
                src="/images/products/xingchen/detail.jpg" 
                alt="星辰系列曜石黑质感" 
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 font-hero">高级曜石黑 · 科技美学</h2>
            <p class="text-gray-400 mb-10 leading-relaxed">
              采用一体式钢化玻璃面板与高强度合金机身。20重安全保护，无惧户外风雨，诠释科技与美学的完美融合。
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                <div class="text-purple-400 mb-2">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"></path></svg>
                </div>
                <h4 class="text-lg font-bold mb-1">IP67 / IP65</h4>
                <p class="text-xs text-gray-400">枪头IP67 / 桩体IP65</p>
              </div>
              <div class="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                <div class="text-purple-400 mb-2">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m-9-12V15a2.25 2.25 0 002.25 2.25h9.75A2.25 2.25 0 0020.25 15V5.25A2.25 2.25 0 0018 3H6a2.25 2.25 0 00-2.25 2.25z"></path></svg>
                </div>
                <h4 class="text-lg font-bold mb-1">智能高清屏显</h4>
                <p class="text-xs text-gray-400">充电状态 实时可见</p>
              </div>
              <div class="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                <div class="text-purple-400 mb-2">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"></path></svg>
                </div>
                <h4 class="text-lg font-bold mb-1">钢化玻璃+合金</h4>
                <p class="text-xs text-gray-400">高规格用料 曜石黑</p>
              </div>
              <div class="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                <div class="text-purple-400 mb-2">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"></path></svg>
                </div>
                <h4 class="text-lg font-bold mb-1">充满自停</h4>
                <p class="text-xs text-gray-400">蓝牙 / 4G 全支持</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-[#050505] relative overflow-hidden">
      <div class="absolute right-0 top-1/4 w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <div class="relative mx-auto max-w-2xl">
              <NuxtImg 
                src="/images/products/xingchen/app-scene.png" 
                alt="手机智能控制" 
                class="w-full h-auto rounded-3xl shadow-2xl border border-white/5"
              />
            </div>
          </div>
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <h2 class="text-3xl md:text-4xl font-bold mb-6 font-hero">智控 · 随心所欲</h2>
            <p class="text-gray-400 mb-10 text-lg">
              通过雷迪恩App，实时查看充电状态与数据。故障监测实时通知，让充电更安心。
            </p>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"></path></svg>
                </div>
                <div>
                  <h4 class="text-xl font-bold text-white">充电数据可视</h4>
                  <p class="text-gray-500 text-sm mt-1">充电状态实时屏显，APP端数据直观展示。</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 class="text-xl font-bold text-white">预约充电</h4>
                  <p class="text-gray-500 text-sm mt-1">设置定时任务，利用夜间低谷电价，为您省钱。</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path></svg>
                </div>
                <div>
                  <h4 class="text-xl font-bold text-white">故障监测通知</h4>
                  <p class="text-gray-500 text-sm mt-1">异常情况实时推送，全方位守护充电安全。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-16 font-hero">详细规格参数</h2>
        
        <div class="flex flex-col md:flex-row gap-12 items-start mb-12">
          <div class="w-full md:w-1/3 flex justify-center sticky top-24">
            <NuxtImg 
              src="/images/products/xingchen/front.png" 
              alt="星辰系列正视图" 
              class="w-full h-auto drop-shadow-2xl"
            />
          </div>

          <div class="w-full md:w-2/3">
            <div class="overflow-hidden rounded-xl border border-white/10">
              <table class="w-full text-left text-sm md:text-base">
                <tbody class="divide-y divide-white/10">
                  <tr class="bg-white/5">
                    <td class="p-4 font-bold text-gray-300 w-1/3">产品型号</td>
                    <td class="p-4 text-white">A1507-GB01-001</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-bold text-gray-300">产品名称</td>
                    <td class="p-4 text-white">星辰系列交流充电桩</td>
                  </tr>
                  <tr class="bg-white/5">
                    <td class="p-4 font-bold text-gray-300">最大功率</td>
                    <td class="p-4 text-white font-bold text-purple-400">7 kW</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-bold text-gray-300">输出电流</td>
                    <td class="p-4 text-white">32A</td>
                  </tr>
                  <tr class="bg-white/5">
                    <td class="p-4 font-bold text-gray-300">输入/输出电压</td>
                    <td class="p-4 text-white">AC 220V ± 20%</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-bold text-gray-300">外观尺寸</td>
                    <td class="p-4 text-white">365 * 235 * 120 (mm)</td>
                  </tr>
                  <tr class="bg-white/5">
                    <td class="p-4 font-bold text-gray-300">设备重量</td>
                    <td class="p-4 text-white">4.9kg</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-bold text-gray-300">外壳材质</td>
                    <td class="p-4 text-white">钢化玻璃 + 合金 + PC</td>
                  </tr>
                  <tr class="bg-white/5">
                    <td class="p-4 font-bold text-gray-300">防护等级</td>
                    <td class="p-4 text-white">IP65 (适合室内/室外)</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-bold text-gray-300">工作温度</td>
                    <td class="p-4 text-white">-30°C ~ 50°C</td>
                  </tr>
                  <tr class="bg-white/5">
                    <td class="p-4 font-bold text-gray-300">线缆长度</td>
                    <td class="p-4 text-white">6m / 7.5m</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-bold text-gray-300">安装方式</td>
                    <td class="p-4 text-white">壁挂式 / 立柱式</td>
                  </tr>
                  <tr class="bg-white/5">
                    <td class="p-4 font-bold text-gray-300">执行标准</td>
                    <td class="p-4 text-white">GB/T 18487.1-2023</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-bold text-gray-300 align-top">安全设计</td>
                    <td class="p-4 text-white text-sm leading-relaxed text-gray-400">
                      漏电保护、防反接保护、接地保护、过温保护、雷电保护、静电保护、防盗充保护、急停保护、浪涌保护、过充保护等20余项主动安全防护。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="w-full relative aspect-[21/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
          <NuxtImg 
            src="/images/products/xingchen/lifestyle.jpg" 
            alt="星辰系列生活场景" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
          />
          <div class="absolute bottom-6 left-6 bg-black/60 backdrop-blur px-4 py-2 rounded-lg">
            <span class="text-sm font-bold text-purple-400">XINGCHEN</span>
            <span class="text-xs text-white ml-2">高级曜石黑美学</span>
          </div>
        </div>

      </div>
    </section>

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
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes ken-burns {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
.animate-ken-burns {
  animation: ken-burns 20s ease-out forwards;
}
</style>