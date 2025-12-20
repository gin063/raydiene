// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  app: {
    head: {
      link: [
        // ★ 新增：预加载英文标题字体 (Michroma)
        // 它的体积很小，预加载可以让大标题 RAYDIENE 瞬间出来
        { 
          rel: 'preload', 
          href: '/fonts/Michroma-Regular.woff2', 
          as: 'font', 
          type: 'font/woff2', 
          crossorigin: 'anonymous' 
        }
      ]
    }
  },

  css: ['./assets/css/main.css']
})