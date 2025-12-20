// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // 1. 启用 Tailwind
  modules: ['@nuxtjs/tailwindcss'],

  // 2. 这里的 app: { ... } 已经被删除了，
  // 这样 Nuxt 就不会去请求 Google Fonts 了。

  // 3. 关键：一定要引用你的 CSS 文件
  // 如果没有这行，本地字体和全局背景色都不会生效
  css: ['~/assets/css/main.css']
})