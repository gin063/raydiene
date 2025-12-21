<template>
  <footer class="bg-black text-white pt-16 pb-20 border-t border-white/5 font-sans relative z-10">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">

        <!-- 左侧：联系我们 (不变) -->
        <div class="md:col-span-4 space-y-6">
          <h3 class="text-lg mb-6 text-gray-200">联系我们</h3>
          <div class="flex items-start space-x-3 text-gray-400 text-sm hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mt-0.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <p>电话：400-699-2659</p>
          </div>
          <div class="flex items-start space-x-3 text-gray-400 text-sm hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mt-0.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <p>邮箱：service@raydiene.cn</p>
          </div>
          <div class="flex items-start space-x-3 text-gray-400 text-sm hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mt-0.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <p>总部：上海市自由贸易试验区临港新片区环湖西二路888号C楼</p>
          </div>
        </div>

        <!-- 中间：快速导航 (不变) -->
        <div class="md:col-span-3">
          <h3 class="text-lg mb-6 text-gray-200">快速导航</h3>
          <div class="grid grid-cols-2 gap-y-4 text-sm text-gray-400">
            <a href="#" class="hover:text-white transition-colors">产品服务</a>
            <a href="#" class="hover:text-white transition-colors">APP下载</a>
            <a href="#" class="hover:text-white transition-colors">产品手册</a>
            <a href="#" class="hover:text-white transition-colors">如何购买</a>
          </div>
        </div>

        <!-- 右侧：Logo & 社交图标 -->
        <div class="md:col-span-5 flex flex-col items-start md:items-end text-left md:text-right">
          <img src="/logo-placeholder-white.png" alt="Raydiene White" class="h-6 md:h-8 mb-4 opacity-90" />
          <p class="text-xs tracking-[0.2em] text-gray-500 mb-8 uppercase">Charging For Better World</p>

          <div class="flex items-center space-x-4 mb-8">
            <div v-for="(social, index) in socialLinks" :key="index" class="relative group">
              <a :href="social.url" target="_blank"
                class="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300">
                <!-- 
                  img 样式逻辑：
                  1. 默认使用 social.filterClass (静止时灰色/去背景)。
                  2. 如果没有 filterClass，则使用默认的挖孔滤镜 (grayscale+contrast+invert)。
                  3. group-hover:filter-none 鼠标悬停时还原原始色彩。
                -->
                <img :src="social.icon" :alt="social.name"
                  class="w-full h-full object-contain transition-all duration-300 group-hover:filter-none group-hover:opacity-100"
                  :class="[
                    social.padding || 'p-1',
                    social.offset,
                    social.filterClass || '[filter:grayscale(1)_contrast(10)_invert(1)] opacity-80',
                    social.hoverScale || 'group-hover:scale-110'
                  ]" />
              </a>

              <!-- 弹窗 (不变) -->
              <div
                class="absolute bottom-full mb-4 z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible"
                :class="[index === socialLinks.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2']">
                <div class="bg-white/70 backdrop-blur-2xl p-3 rounded-xl shadow-2xl ring-1 ring-white/40 relative">
                  <div class="w-32 h-32 flex items-center justify-center overflow-hidden rounded-lg">
                    <div class="w-full h-full bg-white flex items-center justify-center">
                      <img :src="social.qr" :alt="social.name" class="w-full h-full object-cover" />
                    </div>
                  </div>
                  <p class="text-slate-800 text-center text-xs mt-2 font-bold">{{ social.name }}</p>
                  <div
                    class="absolute -bottom-1.5 w-3 h-3 bg-white/70 backdrop-blur-2xl rotate-45 ring-1 ring-white/40 border-r border-b border-transparent"
                    :class="[index === socialLinks.length - 1 ? 'right-3' : 'left-1/2 -translate-x-1/2']"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-auto text-xs text-gray-600 font-sans">
            <p>沪ICP备2025109966号-1</p>
            <p class="mt-1">© 2025 Raydiene. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 数据配置
// 现在所有图标都使用了“无背景镂空 SVG”，逻辑完全统一
const socialLinks = [
  {
    name: '京东旗舰店',
    icon: '/images/social/jd-dog.svg',
    url: 'https://mall.jd.com/index-13360593.html',
    qr: '/images/qr-placeholder.png',
    // 滤镜逻辑：强制变白 + 降低透明度(变灰)
    filterClass: 'filter brightness-0 invert opacity-40',
    padding: 'p-0',
    offset: 'translate-y-[1px]'
  },
  {
    name: '天猫旗舰店',
    icon: '/images/social/tmall4.svg', // 更新为 tmall4
    url: 'https://leidienqcyp.tmall.com/',
    qr: '/images/qr-placeholder.png',
    filterClass: 'filter brightness-0 invert opacity-40',
    padding: 'p-1'
  },
  {
    name: '抖音主页',
    icon: '/images/social/douyin.svg', // 更新为 douyin.svg
    url: 'https://www.douyin.com/user/MS4wLjABAAAA4yK9kWqRNXf4xzK-ndbbkjp-IDGzf81JulVHMik8Yyg',
    qr: '/images/qr-douyin.png',
    filterClass: 'filter brightness-0 invert opacity-40',
    padding: 'p-1',
    // 抖音音符可能视觉重心偏右，保留微调
    offset: 'translate-x-[4px] translate-y-[2px]'
  },
  {
    name: '拼多多',
    icon: '/images/social/pdd.svg', // 更新为 pdd.svg
    url: '#',
    qr: '/images/qr-placeholder.png',
    filterClass: 'filter brightness-0 invert opacity-40',
    padding: 'p-1',
    offset: 'translate-y-[2px]'
  },
  {
    name: '小红书',
    icon: '/images/social/xhs.svg',
    url: 'https://www.xiaohongshu.com/user/profile/65a87c94000000000803da00',
    qr: '/images/qr-placeholder.png',
    filterClass: 'filter brightness-0 invert opacity-40',
    
    // ★★★ 关键修改 ★★★
    // 基础大小：scale-125 (1.25倍)
    // 悬停大小：scale-150 (1.5倍) -> 这样视觉上就是放大了
    padding: 'p-0',
    offset: 'translate-y-[1px]'
  },
  {
    name: '微信公众号',
    icon: '/images/social/wechat2.svg', // 更新为 wechat2.svg
    url: '#',
    qr: '/images/qr-placeholder.png',
    filterClass: 'filter brightness-0 invert opacity-40',
    padding: 'p-1',
    offset: 'translate-y-[2px]'
  }
]
</script>