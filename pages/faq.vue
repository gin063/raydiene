<template>
  <div class="min-h-screen bg-[#050505] text-white selection:bg-brand selection:text-white">

    <div class="relative w-full h-[50vh] min-h-[480px] md:min-h-[540px] flex items-end">
      <div class="absolute inset-0 z-0">
        <NuxtImg src="/images/service/faq.jpg" alt="雷迪恩(Raydiene)家用充电桩常见问题解答" class="w-full h-full object-cover"
          sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw" loading="eager" fetchpriority="high" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/25 to-transparent h-full"></div>
        <div class="absolute inset-0 bg-black/20"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 pb-16 md:pb-24 w-full">
        <h1
          class="-ml-1 md:-ml-[5px] text-5xl md:text-7xl lg:text-7xl font-bold font-hero tracking-tight mb-4 max-w-3xl animate-fade-in-up">
          常见问题解答
        </h1>
        <p class="text-gray-300 text-sm md:text-lg max-w-xl animate-fade-in-up" style="animation-delay:0.2s">
          选购 · 安装 · 售后 · 智能功能 · 车型适配，一站解答
        </p>
      </div>
    </div>

    <!-- 移动端分类导航（sticky，提取到 grid 外确保 sticky 生效） -->
    <div class="md:hidden sticky top-20 z-20 bg-[#050505]/95 backdrop-blur-md border-b border-white/5">
      <div class="hide-scrollbar px-4 flex gap-2 py-3 overflow-x-auto">
        <button v-for="cat in categories" :key="cat.id" @click="setActiveCategory(cat.id)" :class="[
          'shrink-0 px-3 py-2 rounded-full text-xl font-bold transition-all duration-300 border whitespace-nowrap',
          activeCategory === cat.id
            ? 'bg-brand border-brand text-white'
            : 'bg-transparent border-white/20 text-gray-400'
        ]">
          {{ cat.name }}
        </button>
      </div>
    </div>

    <div
      class="container mx-auto max-w-7xl px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">

      <aside class="hidden md:flex flex-col md:col-span-4 lg:col-span-3 sticky top-32 gap-10 z-10">
        <nav class="flex flex-col gap-2">
          <button v-for="cat in categories" :key="cat.id" @click="setActiveCategory(cat.id)" :class="[
            'text-left px-5 py-3 rounded-r-xl text-xl md:text-2xl font-bold transition-all duration-300 border-l-2',
            activeCategory === cat.id
              ? 'border-brand text-white bg-gradient-to-r from-brand/40 to-transparent'
              : 'border-white/5 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/[0.03]'
          ]">
            {{ cat.name }}
          </button>
        </nav>

        <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl">
          <h3 class="text-base font-bold font-hero mb-4 text-white text-center">联系雷迪恩专业顾问</h3>
          <div class="space-y-3">
            <a href="tel:400-699-2659"
              class="block w-full px-4 py-3 rounded-xl bg-brand text-white text-sm font-bold text-center hover:bg-brand/90 hover:shadow-[0_0_20px_rgba(45,158,208,0.3)] transition-all">
              拨打 400-699-2659
            </a>
            <NuxtLink to="/contact/info"
              class="block w-full px-4 py-3 rounded-xl border border-white/10 text-gray-300 text-sm font-bold text-center hover:border-white/30 hover:text-white hover:bg-white/5 transition-all">
              查看联系方式
            </NuxtLink>
          </div>
        </div>
      </aside>

      <main class="md:col-span-8 lg:col-span-9 w-full">
        <div class="w-full">
          <div v-for="cat in categories" :key="cat.id" :id="cat.id" v-show="activeCategory === cat.id"
            class="space-y-4">

            <details v-for="item in cat.items" :key="item.id"
              class="faq-item group rounded-2xl border border-white/5 bg-[#0a0a0a] overflow-hidden transition-all duration-300 hover:border-white/10 open:border-white/15 open:bg-[#111111]">
              <summary
                class="flex items-center justify-between gap-6 px-5 md:px-6 py-5 md:py-6 cursor-pointer list-none select-none transition-colors duration-200">
                <span
                  class="text-[15px] md:text-[17px] font-medium text-gray-100 leading-snug group-hover:text-brand transition-colors pr-4">
                  {{ item.question }}
                </span>
                <span
                  class="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-open:rotate-45 group-open:border-brand/30 group-open:bg-brand/10 group-open:text-brand transition-all duration-300">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </summary>

              <div class="px-5 md:px-6 pb-6 md:pb-8 pt-2">
                <div class="faq-answer text-gray-400 leading-relaxed text-[14px] md:text-[15px]
                  prose prose-invert max-w-none
                  prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-gray-400 prose-li:my-1.5
                  prose-strong:text-gray-200 prose-strong:font-semibold
                  prose-a:text-brand prose-a:no-underline hover:prose-a:underline
                  prose-ul:my-4 prose-ol:my-4
                  prose-ul:pl-5 prose-ol:pl-5" v-html="item.answerHtml"></div>
              </div>
            </details>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// [你的 Script 逻辑保持原样，一字不改，此处省略以保持回答简洁]
import { ref, watch, nextTick, onMounted } from 'vue'
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

useFaqPageSchema(allItems.value)

const activeCategory = ref(categories[0]?.id ?? '')

const setActiveCategory = (id) => {
  document.querySelectorAll('details[open]').forEach(el => el.removeAttribute('open'))
  activeCategory.value = id
}

watch(activeCategory, async (newVal) => {
  await nextTick()
  const items = document.querySelectorAll(`#${newVal} .faq-item`)
  items.forEach((el, i) => {
    el.style.animation = 'none'
    void el.offsetHeight // force reflow
    el.style.animation = `fadeSlideIn 0.5s ease both ${i * 0.05}s`
  })
})

onMounted(async () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 }
  )
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))

  await nextTick()
  document.querySelectorAll(`#${activeCategory.value} .faq-item`).forEach((el, i) => {
    el.style.animation = `fadeSlideIn 0.5s ease both ${i * 0.05 + 0.25}s`
  })
})
</script>

<style>
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style scoped>
/* 隐藏移动端横向滑动的滚动条，保持美观 */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 其他样式保持不变 */
.faq-item {
  opacity: 0;
}

.faq-answer :deep(ul > li) {
  list-style-type: disc;
}

.faq-answer :deep(ol > li) {
  list-style-type: decimal;
}

.faq-answer :deep(ul > li::marker),
.faq-answer :deep(ol > li::marker) {
  color: #2d9ed0;
  font-weight: 600;
}

.faq-answer :deep(> :last-child) {
  margin-bottom: 0;
}
</style>