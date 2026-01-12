<template>
  <div class="relative min-h-screen w-full bg-[#050505] text-white overflow-x-hidden font-sans transition-colors duration-700">

    <div class="relative w-full h-screen">
      <div class="absolute inset-0 z-0 overflow-hidden grid grid-cols-1 grid-rows-1">
        <Transition name="fade-slow">
          <div v-if="activeModel === 'pro'" class="col-start-1 row-start-1 w-full h-full">
            <NuxtImg 
              src="/images/products/panshi/scene-bg-pro.jpg" 
              alt="磐石Pro场景" 
              class="w-full h-full object-cover animate-ken-burns"
              placeholder
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90"></div>
          </div>
        </Transition>
        <Transition name="fade-slow">
          <div v-if="activeModel === 'max'" class="col-start-1 row-start-1 w-full h-full">
            <NuxtImg 
              src="/images/products/panshi/scene-bg-max.jpg" 
              alt="磐石Max场景" 
              class="w-full h-full object-cover animate-ken-burns"
              placeholder
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90"></div>
          </div>
        </Transition>
      </div>

      <div class="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end items-center text-center pb-32 md:pb-48">
        
        <div class="grid grid-cols-1 grid-rows-1 place-items-center mb-6">
          <Transition name="fade-up-stay">
            <h1 v-if="activeModel === 'pro'" class="text-5xl md:text-7xl font-bold font-hero tracking-tight col-start-1 row-start-1">
              磐石 <span class="text-orange-500">Pro</span>
            </h1>
          </Transition>
          <Transition name="fade-up-stay">
            <h1 v-if="activeModel === 'max'" class="text-5xl md:text-7xl font-bold font-hero tracking-tight col-start-1 row-start-1">
              磐石 <span class="text-amber-400">Max</span>
            </h1>
          </Transition>
        </div>
        
        <div class="grid grid-cols-1 grid-rows-1 place-items-center mb-12 h-8">
          <Transition name="fade-up-stay">
            <p v-if="activeModel === 'pro'" class="text-xl md:text-2xl text-gray-200 font-light tracking-wide col-start-1 row-start-1 whitespace-nowrap">
              7kW 家用交流充电桩 · 简约时尚
            </p>
          </Transition>
          <Transition name="fade-up-stay">
            <p v-if="activeModel === 'max'" class="text-xl md:text-2xl text-gray-200 font-light tracking-wide col-start-1 row-start-1 whitespace-nowrap">
              7kW 家用交流充电桩 · 品质之选
            </p>
          </Transition>
        </div>
        
        <div class="flex gap-4 animate-fade-in-up" style="animation-delay: 0.4s">
          <button 
            class="px-8 py-3 rounded-full text-black font-bold transition-all duration-300 hover:scale-105"
            :class="activeModel === 'pro' ? 'bg-orange-500 hover:bg-orange-400' : 'bg-amber-400 hover:bg-amber-300'"
          >
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
          <div v-for="(item, index) in features" :key="index" class="flex flex-col items-center gap-3 group">
            <div 
              class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center transition-colors duration-700 group-hover:scale-110"
              :class="activeModel === 'pro' ? 'text-orange-500' : 'text-amber-400'"
            >
              <component :is="item.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-300">{{ item.text }}</h3>
          </div>
        </div>
      </div>
    </div>

    <section class="py-24 bg-[#0a0a0a]">
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <div class="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl grid grid-cols-1 grid-rows-1">
              <Transition name="fade-scale">
                <NuxtImg 
                  v-if="activeModel === 'pro'"
                  src="/images/products/panshi/detail-pro.jpg" 
                  alt="磐石Pro金属质感" 
                  class="w-full h-full object-cover col-start-1 row-start-1"
                />
              </Transition>
              <Transition name="fade-scale">
                <NuxtImg 
                  v-if="activeModel === 'max'"
                  src="/images/products/panshi/detail-max.jpg" 
                  alt="磐石Max屏显细节" 
                  class="w-full h-full object-cover col-start-1 row-start-1"
                />
              </Transition>
            </div>
          </div>

          <div class="w-full lg:w-1/2 animate-on-scroll">
            <div class="grid grid-cols-1 grid-rows-1 h-10 mb-4">
              <Transition name="fade-right">
                <h2 v-if="activeModel === 'pro'" class="text-3xl md:text-4xl font-bold font-hero col-start-1 row-start-1">工业美学设计 · 精致金属质感</h2>
              </Transition>
              <Transition name="fade-right">
                <h2 v-if="activeModel === 'max'" class="text-3xl md:text-4xl font-bold font-hero col-start-1 row-start-1">智能高清屏显 · 交互新体验</h2>
              </Transition>
            </div>

            <p class="text-gray-400 mb-10 leading-relaxed min-h-[3rem]">
              工业级美学设计，IP65桩体+IP67枪头超高防护。20重安全保护，无惧极端天气。
              <span :class="activeModel === 'pro' ? 'text-orange-500' : 'text-amber-400'" class="transition-colors duration-500">
                {{ activeModel === 'pro' ? 'Pro版本采用极简呼吸灯设计，简约而不简单。' : 'Max版本配备高清显示屏，充电数据一目了然。' }}
              </span>
            </p>

            <div class="grid grid-cols-2 gap-6">
              <div class="p-6 bg-white/5 rounded-xl border border-white/5 transition-colors duration-500" :class="activeModel === 'pro' ? 'hover:border-orange-500/30' : 'hover:border-amber-500/30'">
                <div class="text-gray-400 mb-2 transition-colors duration-500" :class="activeModel === 'pro' ? 'text-orange-500' : 'text-amber-400'">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"></path></svg>
                </div>
                <h4 class="text-lg font-bold mb-1">IP67 / IP65</h4>
                <p class="text-xs text-gray-400">枪头IP67 / 桩体IP65</p>
              </div>
              
              <div class="p-6 bg-white/5 rounded-xl border border-white/5 transition-colors duration-500" :class="activeModel === 'pro' ? 'hover:border-orange-500/30' : 'hover:border-amber-500/30'">
                <div class="mb-2 transition-colors duration-500" :class="activeModel === 'pro' ? 'text-orange-500' : 'text-amber-400'">
                  <div class="grid grid-cols-1 grid-rows-1">
                    <Transition name="fade">
                      <svg v-if="activeModel === 'pro'" class="w-8 h-8 col-start-1 row-start-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"></path></svg>
                    </Transition>
                    <Transition name="fade">
                      <svg v-if="activeModel === 'max'" class="w-8 h-8 col-start-1 row-start-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3v18h18V3H3zm15 15H6V6h12v12zM8 9h8m-8 3h5"></path></svg>
                    </Transition>
                  </div>
                </div>
                <div class="grid grid-cols-1 grid-rows-1">
                  <Transition name="fade">
                    <h4 v-if="activeModel === 'pro'" class="text-lg font-bold mb-1 col-start-1 row-start-1">智能呼吸灯</h4>
                  </Transition>
                  <Transition name="fade">
                    <h4 v-if="activeModel === 'max'" class="text-lg font-bold mb-1 col-start-1 row-start-1">智能高清屏显</h4>
                  </Transition>
                </div>
                <p class="text-xs text-gray-400">
                  {{ activeModel === 'pro' ? '简约交互 状态直观' : '状态数据 可视化' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-[#050505] relative overflow-hidden">
      <div class="absolute right-0 top-1/4 w-[50vw] h-[50vw] rounded-full blur-[120px] pointer-events-none transition-colors duration-700"
           :class="activeModel === 'pro' ? 'bg-orange-900/10' : 'bg-amber-900/10'">
      </div>
      
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <div class="relative mx-auto max-w-2xl grid grid-cols-1 grid-rows-1">
              <Transition name="fade-scale">
                <NuxtImg 
                  v-if="activeModel === 'pro'"
                  src="/images/products/panshi/app-scene-pro.png" 
                  alt="磐石Pro App界面" 
                  class="w-full h-auto rounded-3xl shadow-2xl border border-white/5 col-start-1 row-start-1"
                />
              </Transition>
              <Transition name="fade-scale">
                <NuxtImg 
                  v-if="activeModel === 'max'"
                  src="/images/products/panshi/app-scene-max.png" 
                  alt="磐石Max App界面" 
                  class="w-full h-auto rounded-3xl shadow-2xl border border-white/5 col-start-1 row-start-1"
                />
              </Transition>
            </div>
          </div>
          <div class="w-full lg:w-1/2 animate-on-scroll">
            <h2 class="text-3xl md:text-4xl font-bold mb-6 font-hero">掌控 · 随心所欲</h2>
            <p class="text-gray-400 mb-10 text-lg">
              通过雷迪恩App，您的手机就是充电桩的控制中心。数据可视化，管理更轻松。
            </p>
            <ul class="space-y-6">
              <li v-for="(item, i) in appFeatures" :key="i" class="flex items-start gap-4">
                <div 
                  class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-500"
                  :class="activeModel === 'pro' ? 'bg-orange-500/10 text-orange-500' : 'bg-amber-500/10 text-amber-400'"
                >
                  <component :is="item.icon" class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="text-xl font-bold text-white">{{ item.title }}</h4>
                  <p class="text-gray-500 text-sm mt-1">{{ item.desc }}</p>
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
          <div class="w-full md:w-1/3 flex flex-col items-center gap-6 sticky top-24">
            <div class="relative w-full aspect-square grid grid-cols-1 grid-rows-1">
              <Transition name="fade-scale">
                <NuxtImg v-if="activeModel === 'pro'" src="/images/products/panshi/pro-front.png" alt="Pro" class="w-full h-auto drop-shadow-2xl col-start-1 row-start-1" />
              </Transition>
              <Transition name="fade-scale">
                <NuxtImg v-if="activeModel === 'max'" src="/images/products/panshi/max-front.png" alt="Max" class="w-full h-auto drop-shadow-2xl col-start-1 row-start-1" />
              </Transition>
            </div>
            <div class="text-center text-sm text-gray-500">
              当前展示：
              <span class="font-bold transition-colors duration-500" :class="activeModel === 'pro' ? 'text-orange-500' : 'text-amber-400'">
                磐石 {{ activeModel === 'pro' ? 'Pro' : 'Max' }}
              </span>
            </div>
          </div>

          <div class="w-full md:w-2/3">
            <div class="overflow-hidden rounded-xl border border-white/10">
              <table class="w-full text-left text-sm md:text-base">
                <tbody class="divide-y divide-white/10">
                  <tr class="bg-white/5">
                    <td class="p-4 font-bold text-gray-300 w-1/3">产品型号</td>
                    <td class="p-4 text-white transition-all duration-300">{{ activeModel === 'pro' ? 'A1607-GB01-001' : '暂无' }}</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-bold text-gray-300">产品名称</td>
                    <td class="p-4 text-white transition-all duration-300">磐石{{ activeModel === 'pro' ? 'Pro' : 'Max' }}系列交流充电桩</td>
                  </tr>
                  <tr class="bg-white/5">
                    <td class="p-4 font-bold text-gray-300">显示配置</td>
                    <td class="p-4 font-bold transition-colors duration-500" :class="activeModel === 'pro' ? 'text-orange-500' : 'text-amber-400'">
                      {{ activeModel === 'pro' ? '智能呼吸灯' : '智能高清屏显' }}
                    </td>
                  </tr>
                  <tr><td class="p-4 font-bold text-gray-300">外观尺寸</td><td class="p-4 text-white">374.8 * 186.5 * 121 (mm)</td></tr>
                  <tr class="bg-white/5"><td class="p-4 font-bold text-gray-300">设备重量</td><td class="p-4 text-white">3.6kg</td></tr>
                  <tr><td class="p-4 font-bold text-gray-300">外壳材质</td><td class="p-4 text-white">PC+ABS（V0级阻燃）</td></tr>
                  <tr class="bg-white/5"><td class="p-4 font-bold text-gray-300">线缆长度</td><td class="p-4 text-white">6m</td></tr>
                  <tr><td class="p-4 font-bold text-gray-300">最大功率</td><td class="p-4 text-white">7 kW</td></tr>
                  <tr class="bg-white/5"><td class="p-4 font-bold text-gray-300">输出电流</td><td class="p-4 text-white">32A</td></tr>
                  <tr><td class="p-4 font-bold text-gray-300">输入/输出电压</td><td class="p-4 text-white">AC 220V ± 20%</td></tr>
                  <tr class="bg-white/5"><td class="p-4 font-bold text-gray-300">防护等级</td><td class="p-4 text-white">IP65 (适合室内/室外)</td></tr>
                  <tr><td class="p-4 font-bold text-gray-300">工作温度</td><td class="p-4 text-white">-30°C ~ 50°C</td></tr>
                  <tr class="bg-white/5"><td class="p-4 font-bold text-gray-300">工作海拔</td><td class="p-4 text-white">&lt; 4000m</td></tr>
                  <tr><td class="p-4 font-bold text-gray-300">执行标准</td><td class="p-4 text-white">GB/T 18487.1-2023</td></tr>
                  <tr class="bg-white/5">
                    <td class="p-4 font-bold text-gray-300 align-top">安全设计</td>
                    <td class="p-4 text-white text-sm leading-relaxed text-gray-400">漏电保护、防反接保护、接地保护、过温保护、雷电保护、静电保护、防盗充保护、急停保护、浪涌保护、过充保护等20余项主动安全防护。</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="w-full relative aspect-[21/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl group grid grid-cols-1 grid-rows-1">
          <Transition name="fade-slow">
            <NuxtImg v-if="activeModel === 'pro'" src="/images/products/panshi/lifestyle-pro.jpg" alt="Pro Life" class="w-full h-full object-cover col-start-1 row-start-1 group-hover:scale-105 transition-transform duration-700" />
          </Transition>
          <Transition name="fade-slow">
            <NuxtImg v-if="activeModel === 'max'" src="/images/products/panshi/lifestyle-max.jpg" alt="Max Life" class="w-full h-full object-cover col-start-1 row-start-1 group-hover:scale-105 transition-transform duration-700" />
          </Transition>
          
          <div class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 z-10">
            <span class="text-sm font-bold tracking-wider transition-colors duration-500" :class="activeModel === 'pro' ? 'text-orange-500' : 'text-amber-400'">
              PANSHI {{ activeModel === 'pro' ? 'PRO' : 'MAX' }}
            </span>
            <span class="text-xs text-white ml-3 border-l border-white/30 pl-3">
              {{ activeModel === 'pro' ? '品质之选' : '旗舰之选' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center p-1.5 bg-black/70 backdrop-blur-xl border border-white/15 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-float-in">
      
      <div 
        class="absolute top-1.5 bottom-1.5 w-[140px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg"
        :class="[
          activeModel === 'pro' ? 'left-1.5 bg-orange-600' : 'left-[146px] bg-amber-500'
        ]"
      ></div>

      <button 
        @click="activeModel = 'pro'"
        class="relative w-[140px] py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors z-10 flex items-center justify-center gap-2"
        :class="activeModel === 'pro' ? 'text-white' : 'text-gray-400 hover:text-white'"
      >
        <span>磐石 Pro</span>
        <span v-if="activeModel === 'pro'" class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
      </button>

      <button 
        @click="activeModel = 'max'"
        class="relative w-[140px] py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors z-10 flex items-center justify-center gap-2"
        :class="activeModel === 'max' ? 'text-black' : 'text-gray-400 hover:text-white'"
      >
        <span>磐石 Max</span>
        <span v-if="activeModel === 'max'" class="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, defineComponent, h } from 'vue'

const activeModel = ref('pro') // 默认 Pro

// Icons
const IconCheck = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' })]) })
const IconTool = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z' })]) })
const IconClock = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' })]) })
const IconShield = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z' })]) })
const IconWifi = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z' })]) })
const IconApp = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z' }), h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z' })]) })
const IconTime = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' })]) })
const IconAlert = defineComponent({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor' }, [h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' })]) })

const features = [
  { text: '适配99%车型', icon: IconCheck },
  { text: '专业上门安装', icon: IconTool },
  { text: '7*15h 响应', icon: IconClock },
  { text: '2年质保只换不修', icon: IconShield },
  { text: '终身免费流量 & OTA', icon: IconWifi },
]

const appFeatures = [
  { title: 'APP 远程管理', desc: '无论身在何处，一键启动/停止充电，实时查看进度。', icon: IconApp },
  { title: '预约错峰充电', desc: '设置定时任务，利用夜间低谷电价，为您省钱。', icon: IconTime },
  { title: '故障监测通知', desc: '异常情况实时推送通知，安心无忧。', icon: IconAlert },
]

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
/* 保持基础动画 */
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

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

/* 核心：无缝 Grid 堆叠动画 */
.fade-slow-enter-active, .fade-slow-leave-active {
  transition: opacity 1.2s ease-in-out;
}
.fade-slow-enter-from, .fade-slow-leave-to {
  opacity: 0;
}

.fade-up-stay-enter-active, .fade-up-stay-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up-stay-enter-from { opacity: 0; transform: translateY(20px); }
.fade-up-stay-leave-to { opacity: 0; transform: translateY(-20px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.fade-scale-enter-active, .fade-scale-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-scale-enter-from { opacity: 0; transform: scale(0.95); }
.fade-scale-leave-to { opacity: 0; transform: scale(1.05); }

.fade-right-enter-active, .fade-right-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-right-enter-from { opacity: 0; transform: translateX(-20px); }
.fade-right-leave-to { opacity: 0; transform: translateX(20px); }

.animate-float-in {
  animation: floatIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform: translate(-50%, 100px);
  opacity: 0;
}
@keyframes floatIn { to { transform: translate(-50%, 0); opacity: 1; } }
</style>