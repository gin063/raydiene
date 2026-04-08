<script setup>
// --- 首页 SEO 配置 (重中之重) ---
useSeoMeta({
  // 1. 标题：品牌名 + 核心定位 + 行业大词
  title: '雷迪恩(RAYDIENE)官方网站 - 高端智能家用充电桩',

  // 2. 描述：一句话讲清楚“我们是谁”、“卖什么”、“有什么优势”
  description: '欢迎访问雷迪恩(RAYDIENE)官方网站，我们专注为新能源车主提供安全、智能、高颜值的家用充电桩。旗下坚石、磐石、星辰、星耀系列涵盖7kW至21kW功率，支持App远程控制与OTA升级。以“只换不修”的品质承诺，为您打造极致的居家充电体验。',

  // 3. 关键词：覆盖品牌词、产品词、竞品词
  keywords: '雷迪恩, Raydiene, 家用充电桩, 7kW充电桩, 21kW充电桩, 充电桩安装, 智能充电桩, 特斯拉充电桩, 新能源汽车充电, 充电桩品牌推荐',

  // 4. 社交分享 (微信/朋友圈/卡片显示)
  ogTitle: 'Raydiene 雷迪恩：智享充电，一手掌控',
  ogDescription: '探索坚石、磐石、星辰、星耀四大系列，发现懂你所需的家用充电桩。',
  ogImage: 'https://assets.raydiene.cn/images/og-share.png', // 建议专门做一张 1200x630 的包含 Logo 和主产品的图片
  ogType: 'website',
})
</script>

<template>
  <main>
    <h1 class="sr-only">雷迪恩(RAYDIENE)官方网站 - 高端智能家用充电桩</h1>

    <TheHero />

  </main>
</template>