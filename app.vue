<template>
  <!-- 这里的 bg-black 可能会导致页面全黑， -->
  <!-- 但因为我们在 Header 和 Text 里设置了白色，所以应该能看到文字 -->
  <div class="min-h-screen bg-black text-white">
    
    <!-- 1. 放置导航栏 -->
    <TheHeader />
    
    <main>
      <!-- 2. 放置主页视频区 -->
      <TheHero />
    </main>
    
    <!-- 3. 放置页脚 -->
    <TheFooter />
    
  </div>
</template>

<script setup>
// --- 强制手动引入测试 ---
// -----------------------
</script>