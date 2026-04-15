<template>
  <div
    class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-blue-500 selection:text-white font-sans">

    <!-- Hero（电流蓝+白 Vortex 背景，带氛围辉光） -->
    <section class="relative z-10 overflow-hidden border-b border-white/5">
      <Vortex
        :particle-count="450"
        :base-hue="210"
        :range-hue="15"
        :saturation="100"
        :lightness="60"
        :white-ratio="0.4"
        :range-speed="1.5"
        :base-radius="1"
        :range-radius="2"
        :range-y="90"
        background-color="#000000"
        class="w-full pt-24 pb-14 md:pt-28 md:pb-16"
      >
        <!-- 氛围辉光（mix-blend-screen 与 canvas 粒子相加叠色，纯黑区域被轻微"照亮"） -->
        <div class="absolute inset-0 pointer-events-none mix-blend-screen" aria-hidden="true">
          <div class="absolute top-1/2 left-[15%] -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-blue-600/25 blur-[140px]"></div>
          <div class="absolute top-1/3 right-[10%] w-[40vw] h-[40vw] rounded-full bg-sky-500/20 blur-[160px]"></div>
          <div class="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[55vw] h-[25vw] rounded-full bg-indigo-500/18 blur-[120px]"></div>
        </div>
        <div class="container mx-auto px-6 md:px-12">
          <div class="max-w-4xl animate-slide-in-left">
            <p class="text-sm md:text-base text-cyan-200/70 tracking-[0.2em] uppercase mb-5 font-hero">MEDIA CENTER</p>
            <h1 class="text-5xl md:text-7xl font-bold font-hero tracking-tight mb-6 leading-tight">
              媒体中心<br>
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-500 pb-2 inline-block">视觉世界</span>
            </h1>
            <p class="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              走进雷迪恩的视觉宇宙——产品美图、品牌影片、安装实景与生活方式，尽收眼底。
            </p>
            <p class="text-sm text-gray-400">
              共 <span class="text-white font-bold">{{ images.length }}</span> 张图片
              <span class="mx-2">·</span>
              <span class="text-white font-bold">{{ videos.length }}</span> 支视频
            </p>
          </div>
        </div>
      </Vortex>
    </section>

    <!-- 精选轮播 -->
    <section v-if="featured.length" class="relative z-10 py-14 md:py-20 border-b border-white/5 overflow-hidden">
      <div class="container mx-auto px-6 md:px-12 mb-8 flex items-end justify-between">
        <div>
          <p class="text-xs md:text-sm text-gray-500 tracking-[0.2em] uppercase mb-2 font-hero">FEATURED</p>
          <h2 class="text-3xl md:text-5xl font-bold font-hero">精选推荐</h2>
        </div>
        <div class="hidden md:flex gap-3">
          <button @click="scrollFeatured(-1)"
            class="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button @click="scrollFeatured(1)"
            class="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
      <div ref="featuredScrollRef"
        class="hide-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-4 scroll-smooth">
        <div v-for="item in featured" :key="item.id" @click="openMedia(item)"
          class="relative snap-center shrink-0 w-[88vw] md:w-[72vw] lg:w-[62vw] aspect-[16/9] rounded-3xl overflow-hidden cursor-pointer group/featured border border-white/10 hover:border-white/30 transition-colors">
          <!-- 背景媒体 -->
          <NuxtImg v-if="item.kind === 'image'" :src="item.thumb || item.src" :alt="item.title"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover/featured:scale-[1.04]" />
          <video v-else :poster="item.poster" :src="item.src" muted loop playsinline preload="metadata"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover/featured:scale-[1.04]"
            @mouseenter="hoverPlay" @mouseleave="hoverStop" />

          <!-- 渐变遮罩 -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none"></div>

          <!-- 视频播放标志 -->
          <div v-if="item.kind === 'video'"
            class="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center group-hover/featured:bg-white group-hover/featured:text-black transition-all pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <!-- 文案 -->
          <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12 pointer-events-none">
            <span
              class="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[11px] font-bold tracking-wider mb-4 uppercase">
              {{ categoryName(item.category) }}
            </span>
            <h3 class="text-2xl md:text-4xl font-bold font-hero mb-2 leading-tight">{{ item.title }}</h3>
            <p class="text-gray-300 text-sm md:text-base max-w-xl line-clamp-2">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 筛选栏（sticky） -->
    <section class="sticky top-20 z-30 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5">
      <div class="container mx-auto px-6 md:px-12 py-4">
        <div class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">

          <!-- 类型切换 -->
          <div class="inline-flex rounded-full bg-white/5 border border-white/10 p-1 self-start shrink-0">
            <button @click="setType('image')"
              :class="['px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap',
                activeType === 'image' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white']">
              图片 · {{ images.length }}
            </button>
            <button @click="setType('video')"
              :class="['px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap',
                activeType === 'video' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white']">
              视频 · {{ videos.length }}
            </button>
          </div>

          <!-- 分类 -->
          <div class="hide-scrollbar flex gap-2 overflow-x-auto flex-1 min-w-0">
            <button v-for="cat in categories" :key="cat.id" @click="activeCategory = cat.id"
              :class="['shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border',
                activeCategory === cat.id ? 'bg-brand border-brand text-white' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white']">
              {{ cat.name }}
            </button>
          </div>

          <!-- 搜索 -->
          <div class="relative lg:w-64 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input v-model="searchQuery" type="text" placeholder="搜索素材..."
              class="w-full pl-11 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors" />
          </div>
        </div>
      </div>
    </section>

    <!-- 网格 -->
    <section class="relative z-10 py-12 md:py-16 min-h-[50vh]">
      <div class="container mx-auto px-6 md:px-12">

        <!-- 图片瀑布流 -->
        <div v-if="activeType === 'image'">
          <div v-if="filteredResults.length"
            class="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 [column-fill:balance]">
            <div v-for="img in filteredResults" :key="img.id" @click="openMedia(img)"
              class="break-inside-avoid mb-4 md:mb-6 cursor-pointer group/img relative overflow-hidden rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
              <NuxtImg :src="img.thumb || img.src" :alt="img.title" loading="lazy"
                class="w-full h-auto object-cover transition-transform duration-700 group-hover/img:scale-[1.03]" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity">
              </div>
              <div
                class="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-3 group-hover/img:translate-y-0 transition-transform duration-500 opacity-0 group-hover/img:opacity-100">
                <h3 class="text-white font-bold text-sm md:text-base mb-1 leading-snug line-clamp-2">{{ img.title }}</h3>
                <p class="text-gray-300 text-xs line-clamp-1">{{ img.desc }}</p>
              </div>
            </div>
          </div>
          <EmptyState v-else :query="searchQuery" type="image" />
        </div>

        <!-- 视频网格 -->
        <div v-else>
          <div v-if="filteredResults.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <div v-for="vid in filteredResults" :key="vid.id" @click="openMedia(vid)"
              class="group/vid relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-colors">
              <video :poster="vid.poster" :src="vid.src" muted loop playsinline preload="metadata"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-[1.03]"
                @mouseenter="hoverPlay" @mouseleave="hoverStop" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none"></div>
              <div
                class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center group-hover/vid:bg-white group-hover/vid:text-black transition-all pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 translate-x-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-4 md:p-5 pointer-events-none">
                <h3 class="text-white font-bold text-base md:text-lg mb-1 leading-snug">{{ vid.title }}</h3>
                <p class="text-gray-300 text-xs md:text-sm line-clamp-1">{{ vid.desc }}</p>
              </div>
            </div>
          </div>
          <EmptyState v-else :query="searchQuery" type="video" />
        </div>

      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="activeMedia" class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
          @click.self="closeMedia">

          <!-- 关闭按钮 -->
          <button @click="closeMedia" aria-label="关闭"
            class="absolute top-5 right-5 md:top-8 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-black transition-all flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- 左右切换按钮（桌面） -->
          <button v-if="filteredResults.length > 1" @click.stop="navigate(-1)" aria-label="上一个"
            class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-black transition-all items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button v-if="filteredResults.length > 1" @click.stop="navigate(1)" aria-label="下一个"
            class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-black transition-all items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <!-- 内容区 -->
          <div class="relative w-full h-full flex flex-col items-center justify-center gap-6" @click.stop>

            <!-- 图片 -->
            <img v-if="activeMedia.kind === 'image'" :src="activeMedia.src" :alt="activeMedia.title"
              class="max-w-full max-h-[72vh] md:max-h-[78vh] object-contain rounded-2xl shadow-2xl" />

            <!-- 视频：Vidstack Web Component -->
            <ClientOnly>
              <media-player v-if="activeMedia.kind === 'video'"
                :title="activeMedia.title"
                :src="activeMedia.src"
                :poster="activeMedia.poster"
                autoplay
                playsinline
                crossorigin
                class="w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl">
                <media-provider></media-provider>
                <media-video-layout></media-video-layout>
              </media-player>
            </ClientOnly>

            <!-- 文案 -->
            <div class="max-w-3xl text-center px-2">
              <div class="flex flex-wrap items-center justify-center gap-2 mb-3">
                <span class="px-3 py-1 rounded-full bg-brand/20 border border-brand/40 text-[11px] font-bold tracking-wider text-brand uppercase">
                  {{ categoryName(activeMedia.category) }}
                </span>
                <span v-for="tag in activeMedia.tags" :key="tag"
                  class="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-medium text-gray-300">
                  {{ tag }}
                </span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold font-hero mb-2">{{ activeMedia.title }}</h3>
              <p class="text-gray-400 text-sm md:text-base leading-relaxed">{{ activeMedia.desc }}</p>
            </div>
          </div>

        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, h } from 'vue'
import { useMediaLibrary } from '~/composables/useMediaLibrary'

const { images, videos, featured } = useMediaLibrary()

// --- 分类 ---
const categories = [
  { id: 'all', name: '全部' },
  { id: 'product', name: '产品精选' },
  { id: 'install', name: '安装场景' },
  { id: 'lifestyle', name: '生活方式' },
  { id: 'brand', name: '品牌活动' },
]
const categoryName = (id) => categories.find(c => c.id === id)?.name ?? id

// --- 筛选状态 ---
const activeType = ref('image')
const activeCategory = ref('all')
const searchQuery = ref('')

const setType = (t) => {
  activeType.value = t
  // 切换类型时重置分类到"全部"，避免空态
  activeCategory.value = 'all'
}

const filteredResults = computed(() => {
  const source = activeType.value === 'image' ? images : videos
  const q = searchQuery.value.trim().toLowerCase()
  return source.filter((item) => {
    const matchCat = activeCategory.value === 'all' || item.category === activeCategory.value
    if (!matchCat) return false
    if (!q) return true
    return (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    )
  })
})

// --- 精选轮播 ---
const featuredScrollRef = ref(null)
const scrollFeatured = (dir) => {
  const el = featuredScrollRef.value
  if (!el) return
  el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: 'smooth' })
}

// --- 视频悬停预览 ---
const hoverPlay = (e) => {
  const v = e.currentTarget
  if (v?.play) v.play().catch(() => {})
}
const hoverStop = (e) => {
  const v = e.currentTarget
  if (!v?.pause) return
  v.pause()
  // 仅 currentTime=0 会停在视频首帧而非 poster；必须调 load() 才会重新显示 poster 图
  v.load()
}

// --- Lightbox ---
const activeMedia = ref(null)

const openMedia = (item) => {
  activeMedia.value = item
  if (import.meta.client) document.body.style.overflow = 'hidden'
}

const closeMedia = () => {
  activeMedia.value = null
  if (import.meta.client) document.body.style.overflow = ''
}

const navigate = (delta) => {
  // 从当前筛选结果中寻找；若当前媒体不在筛选列表中（如来自精选），退回全量
  let list = filteredResults.value
  let idx = list.findIndex((i) => i.id === activeMedia.value?.id)
  if (idx === -1) {
    list = activeMedia.value?.kind === 'image' ? images : videos
    idx = list.findIndex((i) => i.id === activeMedia.value?.id)
  }
  if (idx === -1) return
  const next = (idx + delta + list.length) % list.length
  activeMedia.value = list[next]
}

// --- 键盘导航 ---
const handleKey = (e) => {
  if (!activeMedia.value) return
  if (e.key === 'Escape') closeMedia()
  else if (e.key === 'ArrowLeft') navigate(-1)
  else if (e.key === 'ArrowRight') navigate(1)
}

onMounted(() => {
  if (import.meta.client) window.addEventListener('keydown', handleKey)
})
onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleKey)
    document.body.style.overflow = ''
  }
})

// 清理：页面卸载时恢复 body 滚动
watch(activeMedia, (v) => {
  if (!v && import.meta.client) document.body.style.overflow = ''
})

// --- 空态组件（内联） ---
const EmptyState = (props) =>
  h('div', { class: 'py-32 md:py-40 text-center' }, [
    h('p', { class: 'text-gray-500 text-base md:text-lg mb-2' },
      props.query
        ? `未找到包含 "${props.query}" 的${props.type === 'image' ? '图片' : '视频'}`
        : `该分类下暂无${props.type === 'image' ? '图片' : '视频'}`
    ),
    h('p', { class: 'text-gray-600 text-sm' }, '尝试调整分类或搜索关键词'),
  ])
EmptyState.props = ['query', 'type']

// --- SEO ---
useSeoMeta({
  title: '媒体中心 - 雷迪恩(Raydiene)高清产品写真与品牌影片',
  description:
    '探索雷迪恩媒体中心，浏览高清产品美图、品牌宣传片、安装实景与生活方式影像合集。',
  keywords: '雷迪恩媒体中心, 雷迪恩产品图, 雷迪恩品牌视频, 充电桩产品图片, 雷迪恩视觉素材',
  ogTitle: '媒体中心 - 雷迪恩品牌视觉世界',
  ogDescription: '高清产品美图与品牌影片，沉浸雷迪恩视觉宇宙。',
  ogImage: 'https://assets.raydiene.cn/images/og-share.png',
})

// --- 结构化数据：ImageGallery + VideoObject ---
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: '雷迪恩媒体中心',
        description: '雷迪恩高清产品图片、品牌视频、安装场景与生活方式影像合集。',
        url: 'https://www.raydiene.cn/download/media',
        publisher: { '@id': 'https://www.raydiene.cn/#organization' },
        image: images.map((img) => ({
          '@type': 'ImageObject',
          contentUrl: img.src,
          name: img.title,
          description: img.desc,
        })),
        video: videos.map((vid) => ({
          '@type': 'VideoObject',
          contentUrl: vid.src,
          thumbnailUrl: vid.poster,
          name: vid.title,
          description: vid.desc,
          uploadDate: '2026-01-01',
          duration: vid.duration,
        })),
      }),
      key: 'schema-media-gallery',
    },
  ],
})
</script>

<style scoped>
/* 隐藏滚动条 */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Lightbox 过渡 */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active > div,
.lightbox-leave-active > div {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.lightbox-enter-from > div {
  transform: scale(0.95);
}

.lightbox-leave-to > div {
  transform: scale(0.97);
}

/* 左侧滑入（Hero） */
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* 光晕缓慢呼吸 */
@keyframes pulse-slow {

  0%,
  100% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.35;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
</style>

<style>
/* Vidstack 主题定制 — 非 scoped，让 CSS 变量穿透到 Web Component 内部 */
media-player {
  --media-brand: #2d9ed0;
  --media-focus-ring-color: rgba(45, 158, 208, 0.6);
  --media-control-color: rgba(255, 255, 255, 0.95);
  --media-control-hover-bg: rgba(255, 255, 255, 0.1);
  --media-menu-bg: rgba(5, 5, 5, 0.95);
  --media-menu-border-radius: 12px;
  border-radius: 1rem;
  overflow: hidden;
}

media-player[data-layout="video"] {
  aspect-ratio: 16 / 9;
  background: #000;
}
</style>
