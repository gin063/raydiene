// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  
  image: {
    quality: 80,
    format: ['webp', 'avif', 'png', 'jpg'],
    screens: {
      xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536,
    }
  },

  app: {
    head: {
      link: [
        { rel: 'preload', href: '/fonts/Michroma-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/Inter-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
      ]
    }
  },

  css: ['./assets/css/main.css']
})