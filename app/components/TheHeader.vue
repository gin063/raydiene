<!-- components/TheHeader.vue -->
<template>
  <div>
    <!-- Header 结构保持不变，仅优化了逻辑 -->
    <header 
      class="fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/5"
      :class="[
        isMobileMenuOpen ? 'bg-transparent border-none' : (isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg' : 'bg-black/20 backdrop-blur-lg')
      ]"
    >
      <div class="container mx-auto px-6 h-20 flex items-center justify-between relative z-50">
        
        <div class="flex-shrink-0 cursor-pointer transition-all duration-300" :class="{'invert': isMobileMenuOpen}">
          <img src="/logo-placeholder.png" alt="Raydiene Logo" class="h-8 md:h-10 w-auto" />
        </div>

        <nav class="hidden md:flex space-x-8 h-full items-center">
          <div 
            v-for="(item, index) in menuItems" 
            :key="index"
            class="relative group h-full flex items-center"
            @mouseenter="onEnter(index)"
            @mouseleave="onLeave(index)"
          >
            <a href="#" class="text-white text-base font-bold tracking-wide hover:text-blue-400 transition-colors py-2 drop-shadow-sm font-sans">
              {{ item.name }}
            </a>

            <!-- 下拉菜单：增加了 pointer-events-none 防止鼠标在间隙处闪烁 -->
            <div 
              v-if="item.children"
              :ref="el => setDropdownRef(el, index)"
              class="absolute top-full left-1/2 transform -translate-x-1/2 w-40 bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-b-lg overflow-hidden opacity-0 invisible pointer-events-none"
            >
              <div class="py-2">
                <a 
                  v-for="sub in item.children" 
                  :key="sub" 
                  href="#" 
                  class="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors text-center"
                >
                  {{ sub }}
                </a>
              </div>
            </div>
          </div>
        </nav>

        <!-- 移动端按钮保持不变 -->
        <button 
          class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 group"
          @click="toggleMobileMenu"
        >
          <span class="block w-6 h-0.5 transition-all duration-300 ease-out origin-center shadow-sm" :class="[isMobileMenuOpen ? 'bg-black rotate-45 translate-y-2' : 'bg-white']"></span>
          <span class="block w-6 h-0.5 transition-all duration-300 ease-out shadow-sm" :class="[isMobileMenuOpen ? 'bg-black opacity-0' : 'bg-white']"></span>
          <span class="block w-6 h-0.5 transition-all duration-300 ease-out origin-center shadow-sm" :class="[isMobileMenuOpen ? 'bg-black -rotate-45 -translate-y-2' : 'bg-white']"></span>
        </button>
      </div>
    </header>

    <!-- 移动端全屏菜单层保持不变 -->
    <div ref="mobileMenuRef" class="fixed inset-0 bg-white z-40 md:hidden flex flex-col pt-28 px-8 invisible h-screen w-screen overflow-y-auto" style="clip-path: circle(0% at 100% 0);">
      <div class="flex flex-col space-y-2">
        <div v-for="(item, index) in menuItems" :key="index" class="mobile-menu-item opacity-0 translate-y-4">
          <div class="flex justify-between items-center py-4 border-b border-gray-100 cursor-pointer" @click="toggleAccordion(index)">
            <span class="text-slate-900 text-2xl font-bold tracking-tight">{{ item.name }}</span>
            <span v-if="item.children" class="text-slate-400 text-sm transition-transform duration-300" :class="{'rotate-180': activeAccordion === index}">▼</span>
          </div>
          <div v-if="item.children" class="overflow-hidden transition-all duration-500 ease-in-out" :style="{ maxHeight: activeAccordion === index ? '300px' : '0px' }">
            <div class="flex flex-col py-2 pl-2 space-y-3">
              <a v-for="sub in item.children" :key="sub" href="#" class="text-gray-500 hover:text-black text-lg font-medium pl-2 border-l-2 border-transparent hover:border-black transition-all">{{ sub }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 mobile-menu-item opacity-0 translate-y-4 pb-10">
         <button class="w-full bg-black text-white py-4 rounded-full text-lg font-bold shadow-xl active:scale-95 transition-transform">立即订购 / Rent Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const menuItems = [
  { name: '首页' },
  { name: '关于我们', children: ['企业简介', '企业文化', '企业资讯'] },
  { name: '产品介绍', children: ['产品路线图', '在售产品'] },
  { name: '产品服务', children: ['售后服务', '网点查询'] },
  { name: '下载中心' },
  { name: '联系我们' }
]

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeAccordion = ref(null)
const mobileMenuRef = ref(null)
const dropdownRefs = ref([])

const setDropdownRef = (el, index) => { if (el) dropdownRefs.value[index] = el }

// --- PC 动画优化版 ---
const onEnter = (index) => {
  const el = dropdownRefs.value[index]
  if (!el) return
  
  // 1. 彻底停止当前元素上所有正在进行的动画
  gsap.killTweensOf(el)
  
  // 2. 只有在进入时才开启 pointer-events，防止干扰
  gsap.set(el, { pointerEvents: 'auto' })
  
  // 3. 执行展开动画
  gsap.to(el, { 
    autoAlpha: 1, 
    y: 0, 
    duration: 0.3, 
    ease: 'power2.out',
    overwrite: true // 强制覆盖旧动画
  })
}

const onLeave = (index) => {
  const el = dropdownRefs.value[index]
  if (!el) return
  
  // 1. 彻底停止当前动画
  gsap.killTweensOf(el)
  
  // 2. 离开时立即禁掉鼠标事件，防止鼠标划过残留区域触发错误
  gsap.set(el, { pointerEvents: 'none' })
  
  // 3. 执行收起动画
  gsap.to(el, { 
    autoAlpha: 0, 
    y: -10, 
    duration: 0.2, 
    ease: 'power2.in',
    overwrite: true 
  })
}

// --- 移动端逻辑保持不变 ---
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    const menu = mobileMenuRef.value
    const items = menu.querySelectorAll('.mobile-menu-item')
    gsap.set(menu, { autoAlpha: 1 })
    gsap.to(menu, { clipPath: 'circle(150% at 100% 0)', duration: 0.8, ease: 'power4.inOut' })
    gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'back.out(1.2)' })
    document.body.style.overflow = 'hidden'
  } else {
    const menu = mobileMenuRef.value
    gsap.to(menu, { clipPath: 'circle(0% at 100% 0)', duration: 0.6, ease: 'power4.inOut', onComplete: () => {
      gsap.set(menu, { autoAlpha: 0 })
      activeAccordion.value = null
    }})
    document.body.style.overflow = ''
  }
}

const toggleAccordion = (index) => { activeAccordion.value = activeAccordion.value === index ? null : index }

onMounted(() => {
  window.addEventListener('scroll', () => { isScrolled.value = window.scrollY > 20 })
})
</script>