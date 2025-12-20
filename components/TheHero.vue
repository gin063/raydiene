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
      <h1 class="text-5xl md:text-8xl tracking-widest mb-4 drop-shadow-lg uppercase">
        RAYDIENE
      </h1>
      
      <!-- 副标题用 <h2>，自动变成 font-hero + medium -->
      <h2 class="text-lg md:text-2xl tracking-[0.2em] opacity-90 uppercase text-blue-100">
        Charging For Better World
      </h2>
      
      <!-- 按钮用 <button>，自动变成 font-body + medium -->
      <button class="mt-12 px-8 py-3 border border-white/40 rounded-full hover:bg-white hover:text-black transition-all backdrop-blur-sm tracking-wide">
        了解更多
      </button>

    </div>
  </section>
</template>