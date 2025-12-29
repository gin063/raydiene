<template>
  <footer class="bg-black text-white border-t border-white/10 font-sans relative z-10 w-full">

    <div class="md:hidden pt-12 pb-20 px-6">
      
      <div class="flex flex-col items-start space-y-4 mb-10">
        <img src="/images/logo-cn.svg" alt="Raydiene Logo" class="w-60 h-auto opacity-90 -ml-4" />
        <p class="text-xl tracking-[0.18em] text-white font-bold opacity-90 leading-none whitespace-nowrap">
          智享充电，悦享安全
        </p>
        <p class="text-[10px] tracking-[0.18em] text-white font-['Michroma'] uppercase opacity-90 leading-none whitespace-nowrap">
          CHARGING FOR BETTER WORLD
        </p>
      </div>

      <div class="grid grid-cols-2 gap-x-4 gap-y-10 mb-12 border-t border-white/5 pt-8">
        <div>
          <h4 class="text-white font-bold mb-4 text-sm tracking-wide">关于我们</h4>
          <ul class="space-y-3 text-xs text-gray-400">
            <li><NuxtLink to="/about/profile">企业简介</NuxtLink></li>
            <li><NuxtLink to="/about/culture">企业文化</NuxtLink></li>
            <li><NuxtLink to="/about/news">企业资讯</NuxtLink></li>
            <li><NuxtLink to="/about/join">加入我们</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-4 text-sm tracking-wide">产品介绍</h4>
          <ul class="space-y-3 text-xs text-gray-400">
            <li><NuxtLink to="/products/jianshi">坚石系列</NuxtLink></li>
            <li><NuxtLink to="/products/panshi">磐石系列</NuxtLink></li>
            <li><NuxtLink to="/products/xingchen">星辰系列</NuxtLink></li>
            <li><NuxtLink to="/products/xingyao">星耀系列</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-4 text-sm tracking-wide">产品服务</h4>
          <ul class="space-y-3 text-xs text-gray-400">
            <li><NuxtLink to="/service/install">安装服务</NuxtLink></li>
            <li><NuxtLink to="/service/aftersales">售后服务</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-4 text-sm tracking-wide">下载中心</h4>
          <ul class="space-y-3 text-xs text-gray-400">
            <li><NuxtLink to="/download/app">App下载</NuxtLink></li>
            <li><NuxtLink to="/download/manual">说明书下载</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="mb-10">
        <h4 class="text-white font-bold mb-6 text-sm tracking-wide">联系我们</h4>
        <div class="space-y-4 flex flex-col items-start">
           <div class="flex items-center gap-3 text-gray-400 text-xs">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-400">
               <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
             </svg>
             <span class="tracking-wide">{{ contactInfo?.phone }}</span>
           </div>
           <div class="flex items-center gap-3 text-gray-400 text-xs">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
             </svg>
             <span class="tracking-wide">{{ contactInfo?.email }}</span>
           </div>
        </div>
      </div>

      <div class="mb-10">
        <h4 class="text-white font-bold mb-6 text-sm tracking-wide">关注我们</h4>
        <div class="flex flex-wrap gap-6">
          <a v-for="(social, index) in socialLinks" :key="index" 
             :href="social.mobileUrl || social.url" target="_blank"
             class="block w-5 h-5 opacity-70">
            <img :src="social.icon" :alt="social.name" class="w-full h-full object-contain filter brightness-0 invert" />
          </a>
        </div>
      </div>

      <div class="border-t border-white/10 pt-3 w-full flex flex-col gap-y-0.5 text-[10px] text-gray-600 items-start whitespace-normal">
        <p class="w-full break-words">© 2025 Raydiene. All rights reserved.</p>
        <div class="flex flex-wrap gap-x-4">
          <span>隐私政策</span>
          <span>沪ICP备2025109966号-1</span>
        </div>
      </div>
    </div>


    <div class="hidden md:block pt-9 pb-2">
      
      <div class="container mx-auto px-6 md:px-12">
        
        <div class="flex flex-row justify-between items-start mb-4">

          <div class="w-auto xl:w-72 flex flex-col flex-shrink-0 items-start pt-1">
            <img src="/images/logo-cn2.svg" alt="Raydiene Logo"
              class="w-60 h-auto opacity-90 object-contain object-left -ml-4 mb-1" />
            <p class="text-xl tracking-[0.18em] text-white font-bold opacity-90 leading-none whitespace-nowrap mb-4">
              智享充电，悦享安全
            </p>
            <p class="text-[10px] tracking-[0.18em] text-white font-['Michroma'] uppercase opacity-90 leading-none whitespace-nowrap">
              CHARGING FOR BETTER WORLD
            </p>
          </div>

          <div class="flex flex-row gap-x-10 lg:gap-x-16 mx-auto pt-1">
            <div class="flex flex-col">
              <h4 class="text-white font-bold mb-5 text-sm tracking-wide">关于我们</h4>
              <ul class="space-y-3 text-xs text-gray-400">
                <li><NuxtLink to="/about/profile" class="hover:text-white transition-colors block">企业简介</NuxtLink></li>
                <li><NuxtLink to="/about/culture" class="hover:text-white transition-colors block">企业文化</NuxtLink></li>
                <li><NuxtLink to="/about/news" class="hover:text-white transition-colors block">企业资讯</NuxtLink></li>
                <li><NuxtLink to="/about/join" class="hover:text-white transition-colors block">加入我们</NuxtLink></li>
              </ul>
            </div>
            <div class="flex flex-col">
              <h4 class="text-white font-bold mb-5 text-sm tracking-wide">产品介绍</h4>
              <ul class="space-y-3 text-xs text-gray-400">
                <li><NuxtLink to="/products/jianshi" class="hover:text-white transition-colors block">坚石系列</NuxtLink></li>
                <li><NuxtLink to="/products/panshi" class="hover:text-white transition-colors block">磐石系列</NuxtLink></li>
                <li><NuxtLink to="/products/xingchen" class="hover:text-white transition-colors block">星辰系列</NuxtLink></li>
                <li><NuxtLink to="/products/xingyao" class="hover:text-white transition-colors block">星耀系列</NuxtLink></li>
              </ul>
            </div>
            <div class="flex flex-col">
              <h4 class="text-white font-bold mb-5 text-sm tracking-wide">产品服务</h4>
              <ul class="space-y-3 text-xs text-gray-400">
                <li><NuxtLink to="/service/install" class="hover:text-white transition-colors block">安装服务</NuxtLink></li>
                <li><NuxtLink to="/service/aftersales" class="hover:text-white transition-colors block">售后服务</NuxtLink></li>
              </ul>
            </div>
            <div class="flex flex-col">
              <h4 class="text-white font-bold mb-5 text-sm tracking-wide">下载中心</h4>
              <ul class="space-y-3 text-xs text-gray-400">
                <li><NuxtLink to="/download/app" class="hover:text-white transition-colors block">App下载</NuxtLink></li>
                <li><NuxtLink to="/download/manual" class="hover:text-white transition-colors block">说明书下载</NuxtLink></li>
              </ul>
            </div>
          </div>

          <div class="w-auto xl:w-72 flex flex-col flex-shrink-0 pt-1 items-start text-left">
            <div class="flex flex-col items-start mb-8"> <h4 class="text-white font-bold mb-5 text-sm tracking-wide leading-none">联系我们</h4>
              <div class="space-y-3 flex flex-col items-start">
                <div class="flex items-center gap-x-3 text-gray-400 text-xs hover:text-white transition-colors group">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 group-hover:stroke-white transition-colors">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span class="font-medium tracking-wide">{{ contactInfo?.phone }}</span>
                </div>
                <div class="flex items-center gap-x-3 text-gray-400 text-xs hover:text-white transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 group-hover:stroke-white transition-colors">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span class="font-medium tracking-wide">{{ contactInfo?.email }}</span>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-start">
              <h4 class="text-white font-bold mb-5 text-sm tracking-wide">关注我们</h4>
              <div class="flex flex-row gap-x-5 items-center">
                <div v-for="(social, index) in socialLinks" :key="index" class="relative group cursor-pointer">
                  <a :href="social.url" target="_blank"
                    class="block w-5 h-5 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110">
                    <img :src="social.icon" :alt="social.name" class="w-full h-full object-contain filter brightness-0 invert" />
                  </a>
                  <div class="absolute bottom-full mb-3 z-50 opacity-0 translate-y-4 invisible group-hover:transition-transform group-hover:duration-500 group-hover:ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible left-1/2 -translate-x-1/2 pointer-events-none">
                    <div class="bg-white p-2 rounded-lg shadow-2xl ring-1 ring-white/20 relative">
                      <div class="w-24 h-24 flex items-center justify-center overflow-hidden rounded">
                        <NuxtImg :src="social.qr" :alt="social.name" class="w-full h-full object-cover" width="96" height="96" loading="lazy" format="webp" />
                      </div>
                      <p class="text-black text-center text-[10px] mt-1 font-bold whitespace-nowrap">{{ social.name }}</p>
                      <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="border-t border-white/10 pt-2 flex flex-row justify-between items-center text-[10px] text-gray-600">
          <p class="font-medium">© 2025 Raydiene. All rights reserved.</p>
          <div class="flex items-center space-x-6">
            <span class="hover:text-gray-400 cursor-pointer transition-colors">隐私政策</span>
            <span class="hover:text-gray-400 cursor-pointer transition-colors">沪ICP备2025109966号-1</span>
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMobile = ref(false)

const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkMobile)
  }
})

const { socialLinks, contactInfo } = useSiteData()
</script>