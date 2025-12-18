<!-- components/TheFooter.vue -->
<template>
  <footer class="bg-raydiene-dark text-white pt-16 pb-8 border-t border-white/5">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">

        <!-- 左侧：联系我们 (占 5 列) -->
        <div class="md:col-span-5 space-y-6">
          <h3 class="text-lg font-bold mb-6">联系我们</h3>
          <div class="flex items-start space-x-3 text-gray-400 text-sm">
            <!-- 电话 SVG 图标 -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mt-0.5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <p>电话：400-699-2659</p>
          </div>
          <div class="flex items-start space-x-3 text-gray-400 text-sm">
            <!-- 邮箱 SVG 图标 -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mt-0.5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <p>邮箱：service@raydiene.cn</p>
          </div>
          <div class="flex items-start space-x-3 text-gray-400 text-sm">
            <!-- 地址 SVG 图标 -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mt-0.5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <p>总部：上海市自由贸易试验区临港新片区环湖西二路888号C楼</p>
          </div>
        </div>

        <!-- 中间：快速导航 (占 3 列) -->
        <div class="md:col-span-3">
          <h3 class="text-lg font-bold mb-6">快速导航</h3>
          <div class="grid grid-cols-2 gap-y-4 text-sm text-gray-400">
            <a href="#" class="hover:text-white transition-colors">产品服务</a>
            <a href="#" class="hover:text-white transition-colors">APP下载</a>
            <a href="#" class="hover:text-white transition-colors">产品手册</a>
            <a href="#" class="hover:text-white transition-colors">如何购买</a>
          </div>
        </div>

        <!-- 右侧：Logo与备案信息 (占 4 列) -->
        <div class="md:col-span-4 flex flex-col items-end text-right">
          <!-- Logo 占位符 -->
          <img src="/logo-placeholder-white.png" alt="Raydiene White" class="h-8 mb-4 opacity-90" />
          <p class="text-xs tracking-[0.2em] text-gray-400 mb-8 uppercase">Charging For Better World</p>

          <div class="mt-auto text-xs text-gray-600">
            <p>沪ICP备2025109966号-1</p>
            <p class="mt-1">© 2025 Raydiene. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>