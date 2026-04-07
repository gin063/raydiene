// nuxt.config.ts

// 1. 判断当前是否为生产环境 (build/generate/preview 模式下为 true)
const isProduction = process.env.NODE_ENV === "production";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-gtag",
    "@nuxtjs/sitemap",
  ],

  site: {
    url: "https://www.raydiene.cn",
    name: "RAYDIENE雷迪恩官方网站",
  },

  sitemap: {
    strictNuxtContentPaths: false,
    urls: [
      { loc: "/", priority: 1.0, changefreq: "weekly" },
      { loc: "/faq", priority: 0.9, changefreq: "monthly" },
      { loc: "/products/jianshi", priority: 0.8, changefreq: "monthly" },
      { loc: "/products/panshi", priority: 0.8, changefreq: "monthly" },
      { loc: "/products/xingchen", priority: 0.8, changefreq: "monthly" },
      { loc: "/products/xingyao", priority: 0.8, changefreq: "monthly" },
      { loc: "/products/purchase", priority: 0.8, changefreq: "monthly" },
      { loc: "/service/install", priority: 0.7, changefreq: "monthly" },
      { loc: "/service/aftersales", priority: 0.7, changefreq: "monthly" },
      { loc: "/about/intro", priority: 0.6, changefreq: "yearly" },
      { loc: "/about/culture", priority: 0.6, changefreq: "yearly" },
      { loc: "/download/apps", priority: 0.6, changefreq: "monthly" },
      { loc: "/download/manual", priority: 0.7, changefreq: "monthly" },
      { loc: "/contact/info", priority: 0.5, changefreq: "yearly" },
      { loc: "/contact/official", priority: 0.5, changefreq: "yearly" },
    ],
  },

  app: {
    head: {
      // ★★★ 核心修改 3：全局语言声明，解决 Bing 爬虫警告 ★★★
      htmlAttrs: {
        lang: "zh-CN",
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { name: "apple-mobile-web-app-title", content: "Raydiene" },
        { name: "baidu-site-verification", content: "codeva-M7DqHGipP4" },
      ],
    },
  },

  // ★★★ 核心修改 1：动态资源路径 ★★★
  runtimeConfig: {
    public: {
      // 生产环境：使用 OSS 绝对路径
      // 开发环境：使用本地 public 目录下的相对路径 (例如 /videos/)
      videoBaseURL: isProduction
        ? "https://assets.raydiene.cn/videos/"
        : "/videos/",
      pdfBaseURL: isProduction
        ? "https://assets.raydiene.cn/downloads/"
        : "/downloads/",
    },
  },

  image: {
    // ★★★ 核心修改 2：动态切换图片引擎 ★★★
    // 生产环境：使用 'aliyun' (触发您的 patch 补丁，生成 x-oss-process)
    // 开发环境：使用 'ipx' (Nuxt 自带本地引擎，处理 public 下的图片)
    provider: isProduction ? "aliyun" : "ipx",

    // 阿里云配置 (仅在 provider 为 aliyun 时生效)
    aliyun: {
      baseURL: "https://assets.raydiene.cn",
    },

    // ★★★ 关于您的疑问：通用图片设置需要保留吗？ ★★★
    // 答：需要保留！原因如下：
    // 1. screens: 无论是本地还是线上，响应式断点必须一致，否则布局会乱。
    // 2. quality/format:
    //    - 在开发环境(ipx)，这些设置告诉 Nuxt 如何压缩本地图片。
    //    - 在生产环境(aliyun)，虽然您的补丁强制了 format,webp，但保留这些设置是规范的写法，不会冲突。
    quality: 80,
    format: ["webp", "avif"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  gtag: {
    id: "G-B7L17SX3XZ", // 替换为您刚才复制的真实 衡量 ID
    config: {
      page_title: "Raydiene 雷迪恩 官方网站", // 可选：设置默认的页面标题
    },
  },

  css: ["./assets/css/main.css"],
});
