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
        'hero': ['"Michroma"', '"Resource Han Rounded"', 'sans-serif'],
        'body': ['"Inter"', '"Resource Han Rounded"', 'sans-serif'],
        'sans': ['"Inter"', '"Resource Han Rounded"', 'sans-serif'],
      }
    }
  }
}