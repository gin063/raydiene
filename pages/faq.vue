<template>
  <div class="min-h-screen bg-[#050505] text-white selection:bg-brand selection:text-white overflow-x-hidden">

    <!-- Hero 区域 -->
    <div class="relative w-full h-[50vh] min-h-[360px] flex items-end">
      <div class="absolute inset-0 z-0">
        <NuxtImg
          src="/images/service/service-bg.jpg"
          alt="家用充电桩常见问题解答背景"
          class="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#050505]"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 pb-16 text-center w-full">
        <p class="text-brand text-sm font-semibold tracking-[0.2em] uppercase mb-3 animate-fade-in-up">FAQ</p>
        <h1 class="text-4xl md:text-6xl font-bold font-hero tracking-tight mb-4 animate-fade-in-up" style="animation-delay:0.1s">
          常见问题解答
        </h1>
        <p class="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up" style="animation-delay:0.2s">
          选购 · 安装 · 售后 · 智能功能 · 车型适配，一站解答
        </p>
      </div>
    </div>

    <!-- 分类 Tab 导航 -->
    <div class="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
      <div class="container mx-auto px-4">
        <div class="flex gap-1 overflow-x-auto scrollbar-none py-3">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            :class="[
              'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeCategory === cat.id
                ? 'bg-brand text-white shadow-lg shadow-brand/30'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            ]"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- FAQ 主体内容 -->
    <main class="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <div
        v-for="cat in categories"
        :key="cat.id"
        :id="cat.id"
        v-show="activeCategory === cat.id"
        class="space-y-3"
      >
        <h2 class="text-xl font-bold text-white/60 uppercase tracking-wider mb-6 font-hero">
          {{ cat.name }}
        </h2>

        <!-- 使用 details/summary 语义化标签，确保 AI 爬虫可直接提取 -->
        <details
          v-for="item in cat.items"
          :key="item.id"
          class="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 open:border-brand/30 open:bg-white/[0.06]"
        >
          <summary
            class="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-white/5 transition-colors duration-200"
          >
            <span class="text-base md:text-lg font-semibold text-white leading-snug">
              {{ item.question }}
            </span>
            <span
              class="shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-gray-400 group-open:rotate-180 group-open:border-brand group-open:text-brand transition-all duration-300"
            >
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>

          <div class="px-6 pb-6 pt-1">
            <div
              class="text-gray-300 leading-relaxed text-sm md:text-base prose prose-invert prose-sm max-w-none
                prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white
                prose-a:text-brand prose-a:no-underline hover:prose-a:underline"
              v-html="item.answerHtml"
            ></div>
          </div>
        </details>
      </div>

      <!-- 底部 CTA -->
      <div class="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12 text-center">
        <p class="text-gray-400 text-sm uppercase tracking-wider mb-3">没有找到您想要的答案？</p>
        <h2 class="text-2xl md:text-3xl font-bold font-hero mb-6">联系雷迪恩专业顾问</h2>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:400-699-2659"
            class="px-8 py-3 rounded-full bg-brand text-white font-bold hover:bg-brand/80 transition-colors"
          >
            拨打 400-699-2659
          </a>
          <NuxtLink
            to="/contact/info"
            class="px-8 py-3 rounded-full border border-white/20 text-white font-bold hover:border-white/40 hover:bg-white/5 transition-colors"
          >
            查看联系方式
          </NuxtLink>
        </div>
        <p class="text-gray-600 text-xs mt-4">服务时间：09:00 - 24:00 · 7天无休</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useFaqPageSchema } from '~/composables/useJsonLd'

// SEO Meta
useSeoMeta({
  title: '家用充电桩常见问题解答 - 选购·安装·售后全指南 | 雷迪恩',
  description:
    '雷迪恩充电桩常见问题权威解答：7kW还是11kW如何选、老小区能不能装、安装费用有没有隐形收费、"只换不修"质保是什么。专业家用充电桩品牌，28重安全防护，GB 39752-2024新国标，覆盖特斯拉/比亚迪/理想等99%国标车型。',
  keywords:
    '充电桩常见问题,家用充电桩怎么选,充电桩安装流程,充电桩质保,只换不修,28重安全防护,7kW充电桩,11kW充电桩,老小区装充电桩,充电桩物业申请,雷迪恩FAQ',
  ogTitle: '家用充电桩常见问题解答 | 雷迪恩RAYDIENE',
  ogDescription:
    '选购·安装·售后·智能功能·车型适配，一站解答。雷迪恩充电桩专业团队权威回复。',
  ogImage: 'https://assets.raydiene.cn/images/og-share.png',
})

const { categories, allItems } = useFaqData()

// 注入 FAQPage JSON-LD Schema（AI 爬虫直接提取）
useFaqPageSchema(allItems.value)

const activeCategory = ref(categories[0]?.id ?? '')
</script>
