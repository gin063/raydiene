<template>
  <div>
    <!-- PC 端 Header (保持不变) -->
    <header 
      class="fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/5"
      :class="[
        isMobileMenuOpen ? 'bg-transparent border-none' : (isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg' : 'bg-black/20 backdrop-blur-lg')
      ]"
    >
      <div class="container mx-auto px-6 h-20 flex items-center justify-between relative z-50">
        
        <!-- Logo -->
        <div class="flex-shrink-0 cursor-pointer transition-all duration-300" :class="{'invert': isMobileMenuOpen}">
          <img src="/logo-placeholder.png" alt="Raydiene Logo" class="h-8 md:h-10 w-auto" />
        </div>

        <!-- PC 导航 -->
        <nav class="hidden md:flex space-x-10 h-full items-center">
          <div 
            v-for="(item, index) in menuItems" 
            :key="index"
            class="relative group h-full flex items-center"
            @mouseenter="onEnter(index)"
            @mouseleave="onLeave(index)"
          >
            <a href="#" class="text-white text-lg font-bold tracking-wide hover:text-blue-400 transition-colors py-2 drop-shadow-sm font-sans">
              {{ item.name }}
            </a>
            <div 
              v-if="item.children"
              :ref="el => setDropdownRef(el, index)"
              class="absolute top-full left-1/2 transform -translate-x-1/2 min-w-[140px] w-auto whitespace-nowrap bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-b-lg overflow-hidden opacity-0 invisible pointer-events-none"
            >
              <div class="py-2">
                <a v-for="sub in item.children" :key="sub" href="#" class="block px-6 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors text-center">{{ sub }}</a>
              </div>
            </div>
          </div>
        </nav>

        <!-- 移动端汉堡按钮 -->
        <button 
          class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 group"
          @click="toggleMobileMenu"
        >
          <span 
            class="block w-6 h-0.5 transition-all duration-300 ease-out origin-center shadow-sm"
            :class="[isMobileMenuOpen ? 'bg-black rotate-45 translate-y-2' : 'bg-white']"
          ></span>
          <span 
            class="block w-6 h-0.5 transition-all duration-300 ease-out shadow-sm"
            :class="[isMobileMenuOpen ? 'bg-black opacity-0' : 'bg-white']"
          ></span>
          <span 
            class="block w-6 h-0.5 transition-all duration-300 ease-out origin-center shadow-sm"
            :class="[isMobileMenuOpen ? 'bg-black -rotate-45 -translate-y-2' : 'bg-white']"
          ></span>
        </button>
      </div>
    </header>

    <!-- 
      ★ 移动端全屏菜单 (修复白屏版)
      Teleport 确保层级最高
    -->
    <Teleport to="body">
      <div 
        v-if="isMenuMounted"
        ref="mobileMenuContainer"
        class="fixed inset-0 bg-white z-40 md:hidden overflow-hidden invisible"
      >
        <!-- 层级 1：主菜单列表 -->
        <div 
          ref="mainMenuLayer"
          class="absolute inset-0 pt-28 px-8 w-full h-full overflow-y-auto"
        >
          <div class="flex flex-col space-y-1">
            <div v-for="(item, index) in menuItems" :key="index" class="mobile-menu-item opacity-0">
              
              <!-- 主菜单项 -->
              <div 
                class="flex justify-between items-center py-5 border-b border-gray-100 cursor-pointer group"
                @click="handleMenuClick(item)"
              >
                <span class="text-slate-900 text-xl font-bold tracking-tight group-active:text-gray-500 transition-colors">
                  {{ item.name }}
                </span>
                
                <!-- 修改点 1：图标改为 LV 风格的回括号 (Chevron Right) -->
                <span v-if="item.children" class="text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          
          <div class="mt-12 mobile-menu-item opacity-0 pb-10">
             <button class="w-full bg-black text-white py-4 rounded-full text-lg font-bold shadow-xl active:scale-95 transition-transform">
                立即订购 / Rent Now
             </button>
          </div>
        </div>

        <!-- 层级 2：子菜单列表 -->
        <!-- 注意：删除了 translate-x-full 类，完全交给 GSAP 初始化控制，避免冲突 -->
        <div 
          ref="subMenuLayer"
          class="absolute inset-0 pt-28 px-8 w-full h-full overflow-y-auto bg-white z-50"
        >
          <!-- 只有 activeSubMenu 有值时才渲染内部，避免报错 -->
          <div v-if="activeSubMenu">
            <!-- 
              修改点 2：返回按钮区域
              增加 cursor-pointer 确保可点击
              左侧是一个标准的 < 形状图标
            -->
            <div 
              class="flex items-center space-x-2 mb-8 cursor-pointer text-slate-500 hover:text-black transition-colors"
              @click="closeSubMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span class="text-sm font-bold tracking-wide uppercase">返回</span>
            </div>

            <!-- 子菜单标题 -->
            <h2 class="text-3xl font-bold text-black mb-8">{{ activeSubMenu.name }}</h2>

            <!-- 子菜单列表 -->
            <div class="flex flex-col space-y-2">
              <a 
                v-for="sub in activeSubMenu.children" 
                :key="sub" 
                href="#" 
                class="block py-4 text-lg font-medium text-gray-600 border-b border-gray-50 active:text-black active:bg-gray-50 transition-colors"
              >
                {{ sub }}
              </a>
            </div>
          </div>
        </div>

      </div>
    </Teleport>
  </div>
</template>

<script setup>
// ★ 关键修改：引入 nextTick
import { ref, onMounted, nextTick } from 'vue'
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
const activeSubMenu = ref(null) 
const isMenuMounted = ref(false)

// Refs
const mobileMenuContainer = ref(null)
const mainMenuLayer = ref(null)
const subMenuLayer = ref(null)
const dropdownRefs = ref([])

const setDropdownRef = (el, index) => { if (el) dropdownRefs.value[index] = el }

// --- PC 动画 ---
const onEnter = (index) => {
  const el = dropdownRefs.value[index]
  if (!el) return
  gsap.killTweensOf(el)
  gsap.set(el, { pointerEvents: 'auto' })
  gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out', overwrite: true })
}

const onLeave = (index) => {
  const el = dropdownRefs.value[index]
  if (!el) return
  gsap.killTweensOf(el)
  gsap.set(el, { pointerEvents: 'none' })
  gsap.to(el, { autoAlpha: 0, y: -10, duration: 0.2, ease: 'power2.in', overwrite: true })
}

// --- ★★★ 移动端交互逻辑 ★★★ ---

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  
  const container = mobileMenuContainer.value
  const mainLayer = mainMenuLayer.value
  const items = mainLayer.querySelectorAll('.mobile-menu-item')

  if (isMobileMenuOpen.value) {
    gsap.set(container, { autoAlpha: 1 }) 
    // 幕布下落 (0.8s, power4.out 模拟重力)
    gsap.fromTo(container, 
      { yPercent: -100 }, 
      { yPercent: 0, duration: 0.8, ease: 'power4.out' }
    )
    
    // 内容上浮 (错峰显示)
    gsap.fromTo(items, 
      { autoAlpha: 0, y: 20 }, 
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, delay: 0.2, ease: 'power2.out' }
    )
    
    document.body.style.overflow = 'hidden'
  } else {
    // 关闭时，确保子菜单也归位
    gsap.to(container, {
      yPercent: -100,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        activeSubMenu.value = null
        gsap.set(subMenuLayer.value, { xPercent: 100 }) // 重置子菜单位置
        gsap.set(mainLayer, { xPercent: 0, autoAlpha: 1 }) // 重置主菜单位置
      }
    })
    
    document.body.style.overflow = ''
  }
}

const handleMenuClick = async (item) => {
  if (item.children) {
    // ★ 关键修复：await openSubMenu 确保逻辑顺序
    await openSubMenu(item)
  } else {
    console.log('Navigate to:', item.name)
    toggleMobileMenu() 
  }
}

// 3. 进入子菜单动画 (Push Left)
const openSubMenu = async (item) => {
  // 1. 先赋值数据
  activeSubMenu.value = item
  
  // 2. ★ 核心修复：等待 Vue 将数据渲染成 DOM（否则是白屏）
  await nextTick()

  // 3. 数据渲染完毕后，开始动画
  
  // 主菜单：向左移动 (-30%) 并变淡 (视差效果)
  gsap.to(mainMenuLayer.value, {
    xPercent: -30,
    autoAlpha: 0,
    duration: 0.6,
    ease: 'power3.out'
  })

  // 子菜单：从右侧 (100%) 滑入到屏幕 (0%)
  // 这里的 duration: 0.6 + power3.out 保证了极高的丝滑度
  gsap.fromTo(subMenuLayer.value,
    { xPercent: 100 },
    { xPercent: 0, duration: 0.6, ease: 'power3.out' }
  )
}

// 4. 返回主菜单动画 (Push Right / Back)
const closeSubMenu = () => {
  // 主菜单：归位 (0%) 并显示
  gsap.to(mainMenuLayer.value, {
    xPercent: 0,
    autoAlpha: 1,
    duration: 0.5,
    ease: 'power3.out'
  })

  // 子菜单：向右滑出 (100%)
  gsap.to(subMenuLayer.value, {
    xPercent: 100,
    duration: 0.5,
    ease: 'power3.out',
    onComplete: () => {
      activeSubMenu.value = null // 清理数据
    }
  })
}

onMounted(() => {
  isMenuMounted.value = true
  
  setTimeout(() => {
    // 初始化位置：菜单在天花板上 (-100%)
    if(mobileMenuContainer.value) gsap.set(mobileMenuContainer.value, { yPercent: -100 })
    // 初始化位置：子菜单在屏幕右侧外 (100%)
    if(subMenuLayer.value) gsap.set(subMenuLayer.value, { xPercent: 100 })
  }, 0)

  dropdownRefs.value.forEach(el => { if(el) gsap.set(el, { y: -10, autoAlpha: 0 }) })
  window.addEventListener('scroll', () => { isScrolled.value = window.scrollY > 20 })
})
</script>

<style scoped>
.invert {
  filter: invert(1);
}
</style>