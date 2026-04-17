<template>
  <div class="relative min-h-screen w-full bg-[#050505] text-white font-sans">

    <!-- Hero 封面：满屏背景图 + 底部阴影 + 居中标题 -->
    <section class="relative z-10 overflow-hidden">
      <div class="relative h-[60vh] md:h-[68vh] min-h-[460px] flex items-end">
        <NuxtImg :src="article.cover" :alt="article.title" width="2400"
          class="absolute inset-0 w-full h-full object-cover" />
        <!-- 底部 ~55% 区域阴影渐变，凸显标题（从 #050505 平滑过渡到透明，与正文区无缝衔接） -->
        <div
          class="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent pointer-events-none">
        </div>

        <!-- 居中标题块 -->
        <div class="relative z-10 w-full container mx-auto px-6 md:px-12 pb-14 md:pb-20">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold font-hero tracking-tight leading-tight mb-6">
              {{ article.title }}
            </h1>
            <div class="flex items-center justify-start gap-3">
              <span
                class="inline-block px-3 py-1 rounded-full bg-brand/20 border border-brand/40 text-[11px] font-bold tracking-wider text-brand uppercase">
                {{ article.source }}
              </span>
              <span class="text-gray-400 text-sm">{{ formatDate(article.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 正文：结构化块渲染。文本列 max-w-3xl 保障可读性（~40 中文字符/行），图片块 max-w-5xl 宽展示形成视觉节奏 -->
    <section class="relative z-10 pt-14 md:pt-20 pb-16 md:pb-24">
      <div class="container mx-auto px-6 md:px-12">
        <article class="max-w-5xl mx-auto">
          <template v-for="(block, i) in article.body" :key="i">
            <p v-if="block.type === 'p'" class="text-gray-300 text-base md:text-lg leading-[1.9] mb-6">
              {{ block.text }}
            </p>
            <h2 v-else-if="block.type === 'h2'"
              class="text-2xl md:text-3xl font-bold font-hero tracking-tight mt-14 mb-6 text-brand">
              {{ block.text }}
            </h2>
            <figure v-else-if="block.type === 'img'" class="my-10 md:my-14">
              <NuxtImg :src="block.src" :alt="block.alt" width="1600" loading="lazy"
                class="w-full h-auto rounded-2xl border border-white/10 shadow-2xl" />
              <figcaption v-if="block.caption" class="mt-4 text-sm text-gray-500 text-center">
                {{ block.caption }}
              </figcaption>
            </figure>
          </template>

          <!-- 文章标签 -->
          <div v-if="article.tags.length" class="mt-14 pt-8 border-t border-white/10 flex flex-wrap gap-2">
            <span v-for="tag in article.tags" :key="tag"
              class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
              {{ tag }}
            </span>
          </div>

          <!-- 外链按钮 -->
          <div v-if="article.externalUrl" :class="article.tags.length ? 'mt-8' : 'mt-14 pt-8 border-t border-white/10'">
            <a :href="article.externalUrl" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/15 hover:bg-white hover:text-black transition-all group">
              <span class="text-sm font-medium">阅读原文</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-4 h-4 transition-transform group-hover:translate-x-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- 推荐阅读 -->
    <section v-if="related.length" class="relative z-10 py-14 md:py-20 border-t border-white/5">
      <div class="container mx-auto px-6 md:px-12">
        <div class="mb-8">
          <p class="text-xs md:text-sm text-gray-500 tracking-[0.2em] uppercase mb-2 font-hero">RELATED</p>
          <h2 class="text-2xl md:text-4xl font-bold font-hero">推荐阅读</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink v-for="rec in related" :key="rec.slug" :to="`/media/news/${rec.slug}`"
            class="group block rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors">
            <div class="relative aspect-video overflow-hidden">
              <NuxtImg :src="rec.cover" :alt="rec.title" width="600" loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div class="p-4 md:p-5">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{{ rec.source }}</span>
                <span class="text-gray-600 text-[10px]">{{ formatDate(rec.date) }}</span>
              </div>
              <h3
                class="text-white font-bold text-sm md:text-base leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors">
                {{ rec.title }}
              </h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 返回列表 -->
    <div class="relative z-10 pb-16 md:pb-20">
      <div class="container mx-auto px-6 md:px-12">
        <NuxtLink to="/media/news"
          class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          返回新闻资讯
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewsArticleSchema } from '~/composables/useJsonLd'

const route = useRoute()
const { findBySlug, getRelated } = useNewsData()

const article = findBySlug(route.params.slug as string)
if (!article) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在' })
}

const related = getRelated(article, 3)

const formatDate = (iso: string) => {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

// SEO
useSeoMeta({
  title: `${article.title} - 新闻资讯 - 雷迪恩`,
  description: article.summary,
  keywords: article.tags.join(', '),
  ogTitle: article.title,
  ogDescription: article.summary,
  ogImage: `https://assets.raydiene.cn/${article.cover}`,
  articlePublishedTime: article.date,
})

// JSON-LD
useNewsArticleSchema(article)
</script>
