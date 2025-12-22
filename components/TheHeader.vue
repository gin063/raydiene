<template>
  <div @mouseleave="closeMenu">
    <!-- Header -->
    <header 
      class="fixed top-0 left-0 w-full z-50 border-b border-white/10 transition-colors duration-300"
      :class="[
        isMenuOpen ? 'bg-black/90 backdrop-blur-xl' : (isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg' : 'bg-black/20 backdrop-blur-lg')
      ]"
      :style="{ paddingRight: scrollbarWidth + 'px' }" 
    >
      <!-- 
        注意上面加了 :style="{ paddingRight... }" 
        这是为了防止 Header 本身因为滚动条消失而抖动
      -->
      
      <div class="container mx-auto px-6 h-20 flex items-center justify-between relative">
        
        <!-- Logo -->
        <div class="flex-shrink-0 cursor-pointer z-50 transition-all duration-300" :class="{'invert': isMobileMenuOpen}">
          <NuxtLink to="/">
            <img src="/logo-placeholder.png" alt="Raydiene Logo" class="h-8 md:h-10 w-auto" />
          </NuxtLink>
        </div>

        <!-- PC 导航菜单 -->
        <nav class="hidden md:flex h-full items-end justify-center flex-1 space-x-1">
          <div 
            v-for="(item, index) in menuItems" 
            :key="index"
            class="h-full flex items-center px-5 relative cursor-pointer transition-all duration-300 group box-border"
            :class="[
              // ★★★ 修复标题抖动的核心 CSS ★★★
              // 1. 始终保持 border-t border-x border-b (四边都有边框)，保证盒子高度一致。
              // 2. 激活时：上左右为亮色，下边框为黑色(border-b-black/90) 以融入幕布，而不是去掉(border-b-0)。
              // 3. 未激活时：四边都是透明 (border-transparent)。
              activeMenuIndex === index 
                ? 'bg-black/90 border-t-white/10 border-x-white/10 border-b-black/90 rounded-t-lg translate-y-[1px] z-50 border-t border-x border-b' 
                : 'hover:bg-white/5 border-transparent border-t border-x border-b'
            ]"
            @mouseenter="onMenuEnter(index)"
          >
            <span 
              class="text-base font-bold tracking-wide transition-colors font-hero"
              :class="[ activeMenuIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white' ]"
            >
              {{ item.name }}
            </span>
          </div>
        </nav>

        <!-- 移动端按钮 -->
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

    <!-- Mega Menu 幕布 -->
    <div 
      ref="megaMenuRef"
      class="fixed top-20 left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl overflow-hidden origin-top z-40"
      style="height: 0; opacity: 0;"
      @wheel.stop
      @mouseenter="cancelCloseTimer" 
      @mouseleave="closeMenu"
    >
      <div class="container mx-auto px-6 py-10 h-full max-h-[50vh] overflow-y-auto" v-if="activeItem && activeItem.children">
        <div class="grid grid-cols-12 gap-8 h-full min-h-[300px]">
          
          <!-- 第一列：二级菜单 -->
          <div class="col-span-3 border-r border-white/10 pr-4">
            <h4 class="text-xs text-gray-500 font-bold mb-4 uppercase tracking-widest">类别 / Category</h4>
            <div class="space-y-1">
              <div 
                v-for="(cat, cIndex) in activeItem.children"
                :key="cIndex"
                class="px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 flex justify-between items-center group/cat"
                :class="activeCategoryIndex === cIndex ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'"
                @mouseenter="onCategoryEnter(cIndex)"
              >
                <span class="font-hero font-bold text-lg">{{ cat.name }}</span>
                <svg v-if="activeCategoryIndex === cIndex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </div>
            </div>
          </div>

          <!-- 第二列：三级菜单 -->
          <div class="col-span-3 border-r border-white/10 pr-4" v-if="currentCategory && currentCategory.series">
            <h4 class="text-xs text-gray-500 font-bold mb-4 uppercase tracking-widest">系列 / Series</h4>
            <div class="space-y-1">
              <div 
                v-for="(ser, sIndex) in currentCategory.series"
                :key="sIndex"
                class="px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 flex justify-between items-center"
                :class="activeSeriesIndex === sIndex ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'"
                @mouseenter="onSeriesEnter(sIndex)"
              >
                <span class="font-body font-medium">{{ ser.name }}</span>
                <svg v-if="activeSeriesIndex === sIndex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </div>
            </div>
          </div>

          <!-- 第三列：产品展示 -->
          <div class="col-span-6 pl-8">
            <h4 class="text-xs text-gray-500 font-bold mb-4 uppercase tracking-widest">产品展示 / Product</h4>
            <transition name="fade" mode="out-in">
              <div v-if="currentSeries && currentSeries.products" :key="currentSeries.name" class="flex gap-6 h-full items-start">
                <div v-for="(prod, pIndex) in currentSeries.products" :key="pIndex" class="group/prod cursor-pointer">
                  <div class="relative w-48 h-48 bg-white/5 rounded-xl overflow-hidden border border-white/5 mb-3 transition-transform duration-500 group-hover/prod:border-white/20">
                    <img :src="prod.image" :alt="prod.name" class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover/prod:scale-105" />
                  </div>
                  <p class="text-center font-hero font-bold text-white group-hover/prod:text-blue-400 transition-colors">{{ prod.name }}</p>
                </div>
              </div>
              <div v-else-if="currentCategory && !currentCategory.series" class="grid grid-cols-2 gap-4">
                 <a href="#" class="block p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                    <span class="font-bold text-white block mb-1">了解更多</span>
                    <span class="text-xs text-gray-400">点击进入详情页面</span>
                 </a>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <Teleport to="body">
      <div v-if="isMenuMounted" ref="mobileMenuContainer" class="fixed inset-0 bg-white z-40 md:hidden overflow-hidden invisible">
        <div ref="mainMenuLayer" class="absolute inset-0 pt-28 px-8 w-full h-full overflow-y-auto">
          <div class="flex flex-col space-y-1">
            <div v-for="(item, index) in menuItems" :key="index" class="mobile-menu-item opacity-0">
              <div class="flex justify-between items-center py-5 border-b border-gray-100 cursor-pointer group" @click="handleMenuClick(item)">
                <span class="text-slate-900 text-xl font-bold tracking-tight group-active:text-gray-500 transition-colors">{{ item.name }}</span>
                <span v-if="item.children" class="text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></span>
              </div>
            </div>
          </div>
        </div>
        <div ref="subMenuLayer" class="absolute inset-0 pt-28 px-8 w-full h-full overflow-y-auto bg-white z-50">
          <div v-if="activeSubMenu">
            <div class="flex items-center space-x-2 mb-8 cursor-pointer text-slate-500 hover:text-black transition-colors" @click="closeSubMenu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              <span class="text-sm font-bold tracking-wide uppercase">返回</span>
            </div>
            <h2 class="text-3xl font-bold text-black mb-8">{{ activeSubMenu.name }}</h2>
            <div class="flex flex-col space-y-2">
               <div v-for="(child, ci) in activeSubMenu.children" :key="ci" class="py-4 border-b border-gray-50">
                  <p class="text-lg font-medium text-gray-800">{{ child.name }}</p>
                  <div v-if="child.series" class="mt-2 pl-4 space-y-2">
                     <p v-for="ser in child.series" :key="ser.name" class="text-sm text-gray-500">{{ ser.name }}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'

// 菜单数据
const menuItems = [
  { name: '新闻中心', type: 'mega', children: [{ name: '新品发布' }, { name: '企业资讯' }] },
  { name: '在售产品', type: 'mega', children: [{ name: '交流充电桩', series: [{ name: '坚石系列', products: [{ name: '坚石', image: '/images/products/jianshi.png' }] }, { name: '磐石系列', products: [{ name: '磐石Max', image: '/images/products/panshi-max.png' }, { name: '磐石Pro', image: '/images/products/panshi-pro.png' }] }, { name: '星辰系列', products: [{ name: '星辰', image: '/images/products/xingchen.png' }] }, { name: '星耀系列', products: [{ name: '星耀', image: '/images/products/xingyao.png' }] }] }] },
  { name: '服务支持', type: 'mega', children: [{ name: '预约安装' }, { name: '售后服务' }] },
  { name: '下载中心', type: 'mega', children: [{ name: '产品手册' }, { name: 'App下载' }] },
  { name: '发现', type: 'mega', children: [{ name: '关于我们' }, { name: '联系我们' }] }
]

// 状态
const activeMenuIndex = ref(null)
const activeCategoryIndex = ref(0)
const activeSeriesIndex = ref(0)
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const megaMenuRef = ref(null)
const closeTimer = ref(null)
const scrollbarWidth = ref(0) // ★ 新增：存储滚动条宽度

// 移动端状态
const isMobileMenuOpen = ref(false)
const activeSubMenu = ref(null)
const isMenuMounted = ref(false)
const mobileMenuContainer = ref(null)
const mainMenuLayer = ref(null)
const subMenuLayer = ref(null)
const dropdownRefs = ref([])

// 计算属性
const activeItem = computed(() => {
  if (activeMenuIndex.value === null) return null
  return menuItems[activeMenuIndex.value]
})
const currentCategory = computed(() => {
  if (!activeItem.value || !activeItem.value.children) return null
  return activeItem.value.children[activeCategoryIndex.value]
})
const currentSeries = computed(() => {
  if (!currentCategory.value || !currentCategory.value.series) return null
  return currentCategory.value.series[activeSeriesIndex.value]
})

// ★★★ 核心修复逻辑：获取滚动条宽度 ★★★
const getScrollbarWidth = () => {
  if (typeof window === 'undefined') return 0
  return window.innerWidth - document.documentElement.clientWidth
}

const onMenuEnter = (index) => {
  cancelCloseTimer()
  activeMenuIndex.value = index
  if (menuItems[index].type === 'mega') {
    openMenu()
    activeCategoryIndex.value = 0
    activeSeriesIndex.value = 0
  } else {
    closeMenu()
  }
}

const onCategoryEnter = (index) => {
  activeCategoryIndex.value = index
  activeSeriesIndex.value = 0
}

const onSeriesEnter = (index) => {
  activeSeriesIndex.value = index
}

// ★★★ 锁定滚动条 + 补偿 Padding ★★★
const openMenu = () => {
  if (isMenuOpen.value) return
  isMenuOpen.value = true
  
  // 1. 计算滚动条宽度
  const width = getScrollbarWidth()
  scrollbarWidth.value = width // 赋值给 Header 用于 padding-right
  
  // 2. 锁死 Body 并添加 Padding 防止抖动
  document.body.style.paddingRight = `${width}px`
  document.body.style.overflow = 'hidden'

  gsap.to(megaMenuRef.value, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' })
}

const closeMenu = () => {
  closeTimer.value = setTimeout(() => {
    isMenuOpen.value = false
    activeMenuIndex.value = null
    
    // 恢复滚动条
    document.body.style.paddingRight = ''
    document.body.style.overflow = ''
    scrollbarWidth.value = 0 // 重置 Header padding

    gsap.to(megaMenuRef.value, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' })
  }, 100)
}

const cancelCloseTimer = () => {
  if (closeTimer.value) clearTimeout(closeTimer.value)
}

// 移动端逻辑 (保持不变)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  const container = mobileMenuContainer.value
  const mainLayer = mainMenuLayer.value
  const items = mainLayer.querySelectorAll('.mobile-menu-item')

  if (isMobileMenuOpen.value) {
    gsap.set(container, { autoAlpha: 1 }) 
    gsap.fromTo(container, { yPercent: -100 }, { yPercent: 0, duration: 0.8, ease: 'power4.out' })
    gsap.fromTo(items, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, delay: 0.2, ease: 'power2.out' })
    document.body.style.overflow = 'hidden'
  } else {
    gsap.to(container, {
      yPercent: -100, duration: 0.5, ease: 'power3.inOut',
      onComplete: () => { activeSubMenu.value = null; gsap.set(subMenuLayer.value, { xPercent: 100 }); gsap.set(mainLayer, { xPercent: 0, autoAlpha: 1 }) }
    })
    document.body.style.overflow = ''
  }
}

const handleMenuClick = async (item) => {
  if (item.children) {
    activeSubMenu.value = item
    await nextTick()
    gsap.to(mainMenuLayer.value, { xPercent: -30, autoAlpha: 0, duration: 0.6, ease: 'power3.out' })
    gsap.fromTo(subMenuLayer.value, { xPercent: 100 }, { xPercent: 0, duration: 0.6, ease: 'power3.out' })
  } else { toggleMobileMenu() }
}

const closeSubMenu = () => {
  gsap.to(mainMenuLayer.value, { xPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' })
  gsap.to(subMenuLayer.value, { xPercent: 100, duration: 0.5, ease: 'power3.out', onComplete: () => { activeSubMenu.value = null } })
}

const setDropdownRef = (el, index) => { if (el) dropdownRefs.value[index] = el }

onMounted(() => {
  isMenuMounted.value = true
  setTimeout(() => {
    if(mobileMenuContainer.value) gsap.set(mobileMenuContainer.value, { yPercent: -100 })
    if(subMenuLayer.value) gsap.set(subMenuLayer.value, { xPercent: 100 })
  }, 0)
  window.addEventListener('scroll', () => { isScrolled.value = window.scrollY > 20 })
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from { opacity: 0; transform: translateX(10px); }
.fade-leave-to { opacity: 0; transform: translateX(-10px); }
.invert { filter: invert(1); }
</style>