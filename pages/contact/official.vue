<template>
  <div class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-hidden font-sans">

    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-20%] left-[20%] w-[70vw] h-[70vw] bg-blue-900/10 rounded-full blur-[120px] opacity-30 animate-pulse-slow"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[100px] opacity-20"></div>
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 md:px-12 py-32 md:py-40">
      
      <div class="text-center mb-24 animate-fade-in-up">
        <h1 class="text-4xl md:text-6xl font-bold font-hero tracking-tight mb-6">
          官方渠道
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          关注雷迪恩官方账号，获取最新资讯
          <br>
          或访问官方旗舰店，选购正品保障的充电产品
        </p>
      </div>

      <div class="mb-32">
        <div class="flex items-center gap-4 mb-12 animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="h-8 w-1 bg-blue-500 rounded-full"></div>
          <h2 class="text-2xl md:text-3xl font-bold font-hero tracking-wide">立即购买</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div class="group relative h-[420px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-500 animate-fade-in-up" style="animation-delay: 0.2s;">
            <div class="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0 p-8">
              <div class="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6">
                 <img src="/images/social/jd.svg" alt="JD" class="w-14 h-14 object-contain" />
              </div>
              <h3 class="text-2xl font-bold font-hero mb-2">京东</h3>
              <p class="text-gray-400 text-sm">JD.com</p>
              <div class="mt-8 px-4 py-2 bg-white/10 rounded-full text-xs text-gray-300">
                双店可选
              </div>
            </div>

            <div class="absolute inset-0 bg-[#E1251B]/10 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6">
              <div class="w-full flex justify-center gap-2 mb-6 bg-black/40 p-1 rounded-xl">
                <button 
                  @click.stop="jdTab = 'official'" 
                  @mouseenter="jdTab = 'official'"
                  class="flex-1 py-2 text-sm font-bold rounded-lg transition-colors"
                  :class="jdTab === 'official' ? 'bg-white text-red-600' : 'text-gray-400 hover:text-white'"
                >
                  官方旗舰店
                </button>
                <button 
                  @click.stop="jdTab = 'self'" 
                  @mouseenter="jdTab = 'self'"
                  class="flex-1 py-2 text-sm font-bold rounded-lg transition-colors"
                  :class="jdTab === 'self' ? 'bg-white text-red-600' : 'text-gray-400 hover:text-white'"
                >
                  自营旗舰店
                </button>
              </div>

              <div class="relative w-40 h-40 bg-white p-2 rounded-xl">
                <Transition name="fade" mode="out-in">
                  <NuxtImg 
                    v-if="jdTab === 'official'"
                    key="official"
                    src="/images/qr/jd-official.jpg" 
                    alt="京东官方旗舰店" 
                    class="w-full h-full object-contain"
                  />
                  <NuxtImg 
                    v-else
                    key="self"
                    src="/images/qr/jd-self.jpg" 
                    alt="京东自营旗舰店" 
                    class="w-full h-full object-contain"
                  />
                </Transition>
              </div>
              <p class="mt-4 text-sm font-bold text-white">
                {{ jdTab === 'official' ? '扫码访问官方旗舰店' : '扫码访问自营旗舰店' }}
              </p>
            </div>
          </div>

          <template v-for="(shop, index) in salesChannels" :key="shop.name">
            <div 
              class="group relative h-[420px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 animate-fade-in-up" 
              :style="{ animationDelay: (0.3 + index * 0.1) + 's' }"
              :class="shop.hoverBorder"
            >
              <div class="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-90 p-8">
                <div class="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 transition-colors">
                   <img :src="shop.iconPath" :alt="shop.name" class="w-14 h-14 object-contain" />
                </div>
                <h3 class="text-2xl font-bold font-hero mb-2">{{ shop.name }}</h3>
                <p class="text-gray-400 text-sm">{{ shop.subName }}</p>
              </div>

              <div 
                class="absolute inset-0 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6"
                :class="shop.hoverBg"
              >
                <div class="w-48 h-48 bg-white p-2 rounded-xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <NuxtImg 
                    :src="shop.qr" 
                    :alt="shop.name" 
                    class="w-full h-full object-contain"
                  />
                </div>
                <div class="mt-6 text-center">
                  <p class="text-white font-bold text-lg mb-1">扫码进店</p>
                  <p class="text-white/60 text-xs">或搜索: {{ shop.searchWord }}</p>
                </div>
              </div>
            </div>
          </template>

        </div>
      </div>

      <div>
        <div class="flex items-center gap-4 mb-12 animate-fade-in-up">
          <div class="h-8 w-1 bg-purple-500 rounded-full"></div>
          <h2 class="text-2xl md:text-3xl font-bold font-hero tracking-wide">关注我们</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(social, index) in socialChannels" :key="social.name"
            class="group relative h-[360px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 animate-fade-in-up"
            :style="{ animationDelay: (0.1 + index * 0.1) + 's' }"
            :class="social.hoverBorder"
          >
             <div class="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-90 p-8">
                <div class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 transition-colors">
                   <img :src="social.iconPath" :alt="social.name" class="w-10 h-10 object-contain" />
                </div>
                <h3 class="text-xl font-bold font-hero mb-1">{{ social.name }}</h3>
                <p class="text-gray-400 text-sm">{{ social.sub }}</p>
              </div>

              <div 
                class="absolute inset-0 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6"
                :class="social.hoverBg"
              >
                <div class="w-40 h-40 bg-white p-2 rounded-xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <NuxtImg 
                    :src="social.qr" 
                    :alt="social.name" 
                    class="w-full h-full object-contain"
                  />
                </div>
                <div class="mt-6 text-center">
                  <p class="text-white font-bold text-base mb-1">扫码关注</p>
                  <p class="text-white/60 text-xs">ID: {{ social.id }}</p>
                </div>
              </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// --- Logic ---
const jdTab = ref('official') // 'official' | 'self'

// ✅ 销售渠道数据 (删除了 iconComponent，改为 iconPath)
const salesChannels = [
  { 
    name: '天猫旗舰店', 
    subName: 'Tmall.com',
    iconPath: '/images/social/tmall.svg', // 本地 SVG 路径
    qr: '/images/qr/tmall.jpg',
    searchWord: '雷迪恩汽车用品旗舰店',
    hoverBorder: 'hover:border-red-500/50',
    hoverBg: 'bg-[#FF0036]/10'
  },
  { 
    name: '拼多多', 
    subName: 'Pinduoduo',
    iconPath: '/images/social/pdd.svg', // 本地 SVG 路径
    qr: '/images/qr/pdd.jpg',
    searchWord: '雷迪恩汽车用品旗舰店',
    hoverBorder: 'hover:border-orange-500/50',
    hoverBg: 'bg-[#E02E24]/10'
  },
  { 
    name: '抖音商城', 
    subName: 'Douyin Shop',
    iconPath: '/images/social/douyin.svg', // 本地 SVG 路径
    qr: '/images/qr/douyin-shop.jpg',
    searchWord: '雷迪恩官方旗舰店',
    hoverBorder: 'hover:border-white/50',
    hoverBg: 'bg-black/80'
  }
]

// ✅ 社交渠道数据 (删除了 iconComponent，改为 iconPath)
const socialChannels = [
  {
    name: '抖音主页',
    sub: 'Douyin',
    iconPath: '/images/social/douyin.svg', // 本地 SVG 路径
    qr: '/images/qr/douyin-social.jpg',
    id: '雷迪恩官方旗舰店',
    hoverBorder: 'hover:border-white/50',
    hoverBg: 'bg-black/80'
  },
  {
    name: '小红书',
    sub: 'Xiaohongshu',
    iconPath: '/images/social/xhs.svg', // 本地 SVG 路径
    qr: '/images/qr/xhs.jpg',
    id: '雷迪恩充电桩',
    hoverBorder: 'hover:border-pink-500/50',
    hoverBg: 'bg-[#FF2442]/10'
  },
  {
    name: '微信服务号',
    sub: 'WeChat Service',
    iconPath: '/images/social/wechat.svg', // 本地 SVG 路径
    qr: '/images/qr/wechat.jpg',
    id: '雷迪恩',
    hoverBorder: 'hover:border-green-500/50',
    hoverBg: 'bg-[#07C160]/10'
  }
]
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>