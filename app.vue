<script setup>
// 全局 SEO 配置
useSeoMeta({
  title: '雷迪恩RAYDIENE - 高端家用新能源汽车充电桩 | 7kW/11kW/21kW交流桩',
  description: '雷迪恩RAYDIENE专注高端家用交流充电桩，提供7kW/11kW/21kW多功率选择。坚石/磐石/星辰/星耀系列具备20重安全防护及IP65/IP67级防水，适配特斯拉、比亚迪等99%新能源车型。支持APP智能预约充电，承诺质保期内只换不修，让家庭充电更安全、省心。',
  keywords: '雷迪恩充电桩，家用充电桩，新能源汽车充电桩，7kW充电桩，11kW充电桩，21kW充电桩，特斯拉家用桩，坚石系列，磐石系列，充电桩安装，充电桩价格',
  ogTitle: '雷迪恩RAYDIENE - 20重安全防护的高端家用充电桩',
  ogDescription: '适配99%新能源车型，IP67级防护，质保期内只换不修。点击查看坚石/磐石/星辰/星耀全系产品详情。',
  // 6. 社交分享缩略图 (关键！需要你去设计一张 1200x630 的图放在 public 目录下)
  // 注意：必须写绝对路径或确保域名正确，但在 Nuxt 中写相对路径通常也能被解析，
  // 最稳妥是写完整 URL: 'https://www.raydiene.cn/og-share.png'
  ogImage: 'https://www.raydiene.cn/og-share.png',
  
  // 7. 推特卡片格式 (可选)
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="min-h-screen bg-black text-white font-body">
    <TheHeader />
    <main>
      <NuxtPage /> </main>
    <TheFooter />
  </div>
</template>