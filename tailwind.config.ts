// tailwind.config.ts
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

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
        sans: [
          '"Inter"',                // 1. 英文数字强制用 Inter (Web Font)
          '"Helvetica Neue"',       // 2. iOS/Mac 标准
          'Helvetica',
          '"PingFang SC"',          // 3. Mac 中文
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',      // 4. Win 中文
          '"HarmonyOS Sans"',       // 5. 鸿蒙系统
          '"Roboto"',               // 6. 安卓标准英文
          '"Noto Sans SC"',         // 7. 安卓标准中文 (尝试拉回正常审美)
          '"Droid Sans"',           // 8. 老安卓
          'sans-serif'              // 9. 最后的兜底
        ]
      }
    }
  }
}