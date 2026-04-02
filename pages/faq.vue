<template>
  <div class="min-h-screen bg-[#050505] text-white selection:bg-brand selection:text-white overflow-x-hidden">

    <!-- Hero 区域 -->
    <div class="relative w-full h-[50vh] min-h-[360px] flex items-end">
      <div class="absolute inset-0 z-0">
        <NuxtImg src="/images/service/faq.jpg" alt="家用充电桩常见问题解答背景" class="w-full h-full object-cover" loading="eager"
          fetchpriority="high" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#050505]"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 pb-16 text-center w-full">
        <p class="text-brand text-4xl font-bold tracking-[0.2em] uppercase mb-3 animate-fade-in-up">FAQ</p>
        <h1 class="text-4xl md:text-6xl font-bold font-hero tracking-tight mb-4 animate-fade-in-up"
          style="animation-delay:0.1s">
          常见问题解答
        </h1>
        <p class="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up" style="animation-delay:0.2s">
          选购 · 安装 · 售后 · 智能功能 · 车型适配，一站解答
        </p>
      </div>
    </div>

    <!-- 分类 Tab 导航：top-20 = 贴在 header 下方；z-10 低于 mega-menu 的 z-40 -->
    <div class="sticky top-20 z-10 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 animate-on-scroll">
      <div class="container mx-auto px-4">
        <!-- 液态 pill 容器 -->
        <div ref="tabsWrapRef" class="relative flex gap-1 overflow-x-auto scrollbar-none py-3">
          <!-- 液态底板 pill：弹簧曲线驱动位移 -->
          <span aria-hidden="true" :style="pillInlineStyle" class="absolute rounded-full pointer-events-none" />
          <!-- Tab 按钮 -->
          <button v-for="(cat, i) in categories" :key="cat.id" :ref="(el) => { tabRefs[i] = el }"
            @click="setActiveCategory(cat.id)" @mouseenter="onTabHover(i)" @mouseleave="onTabLeave()" :class="[
              'relative z-10 shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
              activeCategory === cat.id ? 'text-white' : 'text-gray-400 hover:text-white'
            ]">{{ cat.name }}</button>
        </div>
      </div>
    </div>

    <!-- FAQ 主体内容 -->
    <main class="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <div v-for="cat in categories" :key="cat.id" :id="cat.id" v-show="activeCategory === cat.id" class="space-y-3">
        <h2 class="text-xl font-bold text-white/60 uppercase tracking-wider mb-6 font-hero animate-on-scroll">
          {{ cat.name }}
        </h2>

        <!-- details/summary — 语义化标签，AI 爬虫可直接提取；faq-item 供动画 hook -->
        <details v-for="(item, index) in cat.items" :key="item.id"
          class="faq-item group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 open:border-brand/30 open:bg-white/[0.06]">
          <summary
            class="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-white/5 transition-colors duration-200">
            <span class="text-base md:text-lg font-semibold text-white leading-snug">
              {{ item.question }}
            </span>
            <span
              class="shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-gray-400 group-open:rotate-180 group-open:border-brand group-open:text-brand transition-all duration-300">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>

          <div class="px-6 pb-6 pt-1">
            <div class="faq-answer text-gray-300 leading-relaxed text-sm md:text-base
                prose prose-invert prose-sm max-w-none
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-li:text-gray-300 prose-li:my-1
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-brand prose-a:no-underline hover:prose-a:underline
                prose-ul:my-3 prose-ol:my-3
                prose-ul:pl-5 prose-ol:pl-5" v-html="item.answerHtml"></div>
          </div>
        </details>
      </div>

      <!-- 底部 CTA -->
      <div
        class="mt-16 max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 text-center animate-on-scroll">
        <p class="text-gray-400 text-xs uppercase tracking-wider mb-2">没有找到您想要的答案？</p>
        <h2 class="text-xl md:text-2xl font-bold font-hero mb-4">联系雷迪恩专业顾问</h2>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:400-699-2659"
            class="px-6 py-2.5 rounded-full bg-brand text-white text-sm font-bold hover:bg-brand/80 transition-colors">
            拨打 400-699-2659
          </a>
          <NuxtLink to="/contact/info"
            class="px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-bold hover:border-white/40 hover:bg-white/5 transition-colors">
            查看联系方式
          </NuxtLink>
        </div>
        <p class="text-gray-600 text-xs mt-3">服务时间：09:00 - 24:00 · 7天无休</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
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

// ─── 液态 pill 动效 ────────────────────────────────────────────────────────────
const tabRefs = ref([])
const tabsWrapRef = ref(null)
const pillGeom = ref({ left: 0, width: 0, height: 0 })
const isHovering = ref(false)

// 液态底板样式：弹簧曲线 cubic-bezier(0.34, 1.56, 0.64, 1) 产生超调弹性
const pillInlineStyle = computed(() => ({
  left: pillGeom.value.left + 'px',
  width: pillGeom.value.width + 'px',
  height: pillGeom.value.height + 'px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: isHovering.value ? 'rgba(255,255,255,0.08)' : 'rgb(45,158,208)',
  boxShadow: isHovering.value ? 'none' : '0 4px 20px rgba(45,158,208,0.25)',
  transition: [
    'left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
    'width 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
    'background-color 0.25s ease',
    'box-shadow 0.25s ease',
  ].join(', '),
}))

const movePill = async (idx) => {
  await nextTick()
  const btn = tabRefs.value[idx]
  if (!btn || !tabsWrapRef.value) return
  pillGeom.value = {
    left: btn.offsetLeft,
    width: btn.offsetWidth,
    height: btn.offsetHeight,
  }
}

const onTabHover = (i) => {
  isHovering.value = true
  movePill(i)
}

const onTabLeave = () => {
  isHovering.value = false
  movePill(categories.findIndex(c => c.id === activeCategory.value))
}

// ─── 切换分类：关闭 details + 重播入场动画 ──────────────────────────────────
const setActiveCategory = (id) => {
  // 关闭所有已展开的 details
  document.querySelectorAll('details[open]').forEach(el => el.removeAttribute('open'))
  activeCategory.value = id
}

watch(activeCategory, async (newVal) => {
  // pill 跟随激活 tab
  movePill(categories.findIndex(c => c.id === newVal))

  // 分类切换时，各条目依次渐入
  await nextTick()
  const items = document.querySelectorAll(`#${newVal} .faq-item`)
  items.forEach((el, i) => {
    el.style.animation = 'none'
    void el.offsetHeight // force reflow
    el.style.animation = `fadeSlideIn 0.5s ease both ${i * 0.07}s`
  })
})

// ─── 页面初始化：IntersectionObserver + pill 初始位置 ───────────────────────
onMounted(async () => {
  // 液态 pill 初始位置
  movePill(categories.findIndex(c => c.id === activeCategory.value))

  // IntersectionObserver：触发 animate-on-scroll → is-visible（tab 栏、h2、CTA 卡片）
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

  // 初始分类的 faq-item 入场动画（稍作延迟以配合 hero 动画节奏）
  await nextTick()
  document.querySelectorAll(`#${activeCategory.value} .faq-item`).forEach((el, i) => {
    el.style.animation = `fadeSlideIn 0.5s ease both ${i * 0.07 + 0.35}s`
  })
})
</script>

/* fadeSlideIn 必须在非 scoped 块中定义，否则 Vue 会给 keyframe 名加哈希后缀，
导致 JS 通过 el.style.animation = 'fadeSlideIn ...' 找不到该动画 */
<style>
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style scoped>
/* faq-item 初始状态：不依赖 is-visible，由 JS 统一驱动 */
.faq-item {
  opacity: 0;
}

/* 自定义列表标记样式 — 增强 prose 默认表现 */
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

/* 最后一个段落去除底部间距 */
.faq-answer :deep(> :last-child) {
  margin-bottom: 0;
}
</style>
