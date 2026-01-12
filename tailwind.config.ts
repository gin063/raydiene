// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        'hero': ['"Michroma"', '"AlibabaPuHuiTi"', 'sans-serif'],
        'body': ['"Inter"', '"AlibabaPuHuiTi"', 'sans-serif'],
        'sans': ['"Inter"', '"AlibabaPuHuiTi"', 'sans-serif'],
      },
      colors: {
        // 定义统一的主题色，命名为 brand (品牌色)
        brand: '#2d9ed0', 
      }
    }
  }
}