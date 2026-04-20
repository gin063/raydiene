<template>
  <div
    class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-blue-500 selection:text-white font-sans">

    <!-- Hero -->
    <section class="relative z-10 overflow-hidden border-b border-white/5">
      <Vortex :particle-count="350" :base-hue="210" :range-hue="20" :saturation="100" :lightness="60"
        :white-ratio="0.35" :range-speed="1.2" :base-radius="1" :range-radius="2" :range-y="80"
        background-color="#000000" class="w-full pt-24 pb-14 md:pt-28 md:pb-16">
        <div class="absolute inset-0 pointer-events-none mix-blend-screen" aria-hidden="true">
          <div
            class="absolute top-1/2 left-[15%] -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-[140px]">
          </div>
          <div class="absolute top-1/3 right-[10%] w-[40vw] h-[40vw] rounded-full bg-sky-500/15 blur-[160px]"></div>
        </div>
        <div class="container mx-auto px-6 md:px-12">
          <div class="max-w-4xl animate-slide-in-left">
            <p class="text-sm md:text-base text-cyan-200/70 tracking-[0.2em] uppercase mb-5 font-hero">NEWS & PRESS</p>
            <h1 class="text-5xl md:text-7xl font-bold font-hero tracking-tight mb-6 leading-tight">
              新闻资讯<br>
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-500 pb-2 inline-block">品牌前沿</span>
            </h1>
            <p class="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              品牌动态、行业洞察与合作报道，一手掌握。
            </p>
            <p class="text-sm text-gray-400">
              共 <span class="text-white font-bold">{{ articles.length }}</span> 篇文章
            </p>
          </div>
        </div>
      </Vortex>
    </section>

    <!-- 置顶精选 Hero -->
    <section v-if="featuredArticle" class="relative z-10 py-12 md:py-16 border-b border-white/5">
      <div class="container mx-auto px-6 md:px-12">
        <NuxtLink :to="`/media/news/${featuredArticle.slug}`"
          class="group block relative aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-colors">
          <NuxtImg :src="featuredArticle.cover" :alt="plainTitle(featuredArticle.title)" width="1400" loading="lazy"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none">
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12 pointer-events-none">
            <div class="flex items-center gap-3 mb-4">
              <span
                class="inline-block px-3 py-1 rounded-full bg-brand/20 border border-brand/40 text-[11px] font-bold tracking-wider text-brand uppercase">
                {{ featuredArticle.source }}
              </span>
              <span class="text-gray-400 text-xs">{{ formatDate(featuredArticle.date) }}</span>
            </div>
            <h2 class="text-2xl md:text-4xl font-bold font-hero mb-3 leading-snug max-w-3xl">
              {{ plainTitle(featuredArticle.title) }}
            </h2>
            <p class="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-2">{{ featuredArticle.summary }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- 文章列表 -->
    <section class="relative z-10 py-12 md:py-16">
      <div class="container mx-auto px-6 md:px-12">
        <div v-if="allSortedByDate.length" class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <NuxtLink v-for="article in allSortedByDate" :key="article.slug" :to="`/media/news/${article.slug}`"
            class="group block rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors">
            <div class="relative aspect-video overflow-hidden">
              <NuxtImg :src="article.cover" :alt="plainTitle(article.title)" width="800" loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none">
              </div>
            </div>
            <div class="p-5 md:p-6">
              <div class="flex items-center gap-3 mb-3">
                <span
                  class="inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider text-gray-300 uppercase">
                  {{ article.source }}
                </span>
                <span class="text-gray-500 text-xs">{{ formatDate(article.date) }}</span>
              </div>
              <h3
                class="text-white font-bold text-lg md:text-xl mb-2 leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors">
                {{ plainTitle(article.title) }}
              </h3>
              <p class="text-gray-400 text-sm line-clamp-2">{{ article.summary }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useNewsArticleListSchema } from '~/composables/useJsonLd'
import { plainTitle } from '~/composables/useNewsData'

const { articles, allSortedByDate, featuredArticle } = useNewsData()

const formatDate = (iso: string) => {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

// SEO
useSeoMeta({
  title: '新闻资讯 - 雷迪恩(Raydiene)品牌动态与行业洞察',
  description: '雷迪恩新闻资讯中心，发布品牌动态、新品资讯、行业洞察与合作报道，掌握智能充电领域最新前沿。',
  keywords: '雷迪恩新闻, 雷迪恩资讯, 充电桩行业动态, 雷迪恩品牌动态, RAYDIENE新闻',
  ogTitle: '新闻资讯 - 雷迪恩品牌前沿',
  ogDescription: '品牌动态、行业洞察与合作报道，一手掌握。',
  ogImage: 'https://assets.raydiene.cn/images/og-share.png',
})

// JSON-LD
useNewsArticleListSchema(articles)
</script>
