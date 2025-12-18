<!-- components/TheHero.vue -->
<template>
  <section class="relative w-full h-screen overflow-hidden bg-black">
    <!-- 背景视频 -->
    <!-- 注意：playsinline 用于防止在 iOS 上自动全屏 -->
    <video 
      class="absolute top-0 left-0 w-full h-full object-cover opacity-90"
      autoplay 
      muted 
      loop 
      playsinline
    >
      <!-- 占位符：请将本地 video.mp4 放入 public 文件夹 -->
      <source src="/video-placeholder.mp4" type="video/mp4" />
      您的浏览器不支持视频标签。
    </video>

    <!-- 遮罩层 (让文字更清晰) -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"></div>

    <!-- 内容区域 (可选，如果视频本身带有文字可移除) -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center z-10 text-white">
      <h1 class="text-5xl md:text-7xl font-light tracking-widest mb-4 drop-shadow-lg">RAYDIENE</h1>
      <p class="text-xl md:text-2xl font-light opacity-90 tracking-wider">CHARGING FOR BETTER WORLD</p>
      
      <!-- 了解更多按钮 -->
      <button class="mt-12 px-8 py-3 border border-white/40 rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
        了解更多
      </button>
    </div>
  </section>
</template>