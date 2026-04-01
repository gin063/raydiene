<template>
  <nav
    v-if="showBreadcrumbs"
    aria-label="面包屑导航"
    class="w-full bg-transparent border-b border-white/5"
  >
    <div class="container mx-auto px-6 py-2.5">
      <ol class="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
        <li v-for="(crumb, index) in breadcrumbs" :key="crumb.url" class="flex items-center gap-1.5">
          <NuxtLink
            v-if="!crumb.isLast"
            :to="crumb.url.replace('https://www.raydiene.cn', '')"
            class="hover:text-brand transition-colors duration-200"
          >
            {{ crumb.name }}
          </NuxtLink>
          <span v-else class="text-gray-300" :aria-current="'page'">
            {{ crumb.name }}
          </span>

          <!-- 分隔符 -->
          <svg
            v-if="index < breadcrumbs.length - 1"
            class="w-3 h-3 shrink-0 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useBreadcrumbSchema } from '~/composables/useJsonLd'

const { breadcrumbs, showBreadcrumbs } = useBreadcrumbs()

// 注入 BreadcrumbList JSON-LD Schema
watch(
  breadcrumbs,
  (items) => {
    if (items.length > 1) {
      useBreadcrumbSchema(items.map((b) => ({ name: b.name, url: b.url })))
    }
  },
  { immediate: true }
)
</script>
