<template>
  <div @mouseleave="closeMenu">
    <header class="fixed top-0 left-0 w-full z-50 transition-colors duration-300 shadow-2xl" :class="[
      isMobileMenuOpen
        ? 'bg-white/60 backdrop-blur-xl'
        : 'bg-black/60 backdrop-blur-xl'
    ]" :style="{ paddingRight: scrollbarWidth + 'px' }" @mouseleave="scheduleCloseMenu" @mouseenter="cancelCloseTimer">
      <div class="container mx-auto px-6 h-20 flex items-center justify-between relative">

        <div class="flex-shrink-0 cursor-pointer z-50 transition-all duration-300"
          :class="{ 'invert': isMobileMenuOpen }">
          <NuxtLink to="/">
            <img src="/logo-placeholder.png" alt="Raydiene Logo" class="h-8 md:h-10 w-auto" />
          </NuxtLink>
        </div>

        <nav class="hidden md:flex h-full items-center justify-center flex-1 space-x-1">
          <div v-for="(item, index) in menuItems" :key="index"
            class="h-full flex items-center px-5 relative cursor-pointer group" @mouseenter="onMenuEnter(index)"
            @mouseleave="onMenuLeave">

            <span class="text-base font-bold tracking-wide transition-all duration-300 origin-center font-hero" :class="[
              activeMenuIndex === index && !isClosing
                ? 'text-white scale-110'
                : 'text-gray-300 group-hover:text-white group-hover:scale-110'
            ]">
              {{ item.name }}
            </span>
          </div>
        </nav>

        <button
          class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 group"
          @click="toggleMobileMenu">
          <span class="block w-6 h-0.5 transition-all duration-300 ease-out origin-center shadow-sm"
            :class="[isMobileMenuOpen ? 'bg-black rotate-45 translate-y-2' : 'bg-white']"></span>
          <span class="block w-6 h-0.5 transition-all duration-300 ease-out shadow-sm"
            :class="[isMobileMenuOpen ? 'bg-black opacity-0' : 'bg-white']"></span>
          <span class="block w-6 h-0.5 transition-all duration-300 ease-out origin-center shadow-sm"
            :class="[isMobileMenuOpen ? 'bg-black -rotate-45 -translate-y-2' : 'bg-white']"></span>
        </button>
      </div>
    </header>

    <div ref="megaMenuRef"
      class="fixed top-20 left-0 w-full bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden origin-top z-40 custom-scrollbar"
      style="height: 0; opacity: 0; max-height: calc(100vh - 80px);" @mouseenter="cancelCloseTimer"
      @mouseleave="scheduleCloseMenu" @wheel.stop>
      <div class="container mx-auto px-6 py-10 h-full max-h-[50vh] overflow-y-auto custom-scrollbar"
        v-if="activeItem && activeItem.children" :key="activeMenuIndex">
        <div class="grid grid-cols-12 gap-8 h-full min-h-[300px]">

          <div ref="col1" class="col-span-3 border-r border-white/10 pr-4 opacity-0 translate-x-[-10px]">
            <div class="space-y-1">
              <div v-for="(cat, cIndex) in activeItem.children" :key="cIndex"
                class="px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 flex justify-between items-center group/cat"
                :class="activeCategoryIndex === cIndex ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'"
                @mouseenter="onCategoryEnter(cIndex)">
                <span class="font-hero font-bold text-lg">{{ cat.name }}</span>
                <svg v-if="activeCategoryIndex === cIndex" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </div>

          <div ref="col2" class="col-span-3 border-r border-white/10 pr-4 opacity-0 translate-x-[-10px]"
            v-if="currentCategory && currentCategory.series" :key="activeCategoryIndex">
            <div class="space-y-1">
              <div v-for="(ser, sIndex) in currentCategory.series" :key="sIndex"
                class="px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 flex justify-between items-center"
                :class="activeSeriesIndex === sIndex ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'"
                @mouseenter="onSeriesEnter(sIndex)">
                <span class="font-body font-medium">{{ ser.name }}</span>
                <svg v-if="activeSeriesIndex === sIndex" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </div>

          <div ref="col3" class="col-span-6 pl-8 opacity-0 translate-x-[-10px]">
            <transition name="fade" mode="out-in" :key="activeCategoryIndex">
              <div v-if="currentSeries && currentSeries.products" :key="currentSeries.name"
                class="flex gap-6 h-full items-start">
                <div v-for="(prod, pIndex) in currentSeries.products" :key="pIndex" class="group/prod cursor-pointer">
                  <div
                    class="relative w-48 h-48 bg-white/5 rounded-xl overflow-hidden border border-white/5 mb-3 transition-transform duration-500 group-hover/prod:border-white/20">
                    <img :src="prod.image" :alt="prod.name"
                      class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover/prod:scale-105" />
                  </div>
                  <p
                    class="text-center font-hero font-bold text-white group-hover/prod:text-blue-400 transition-colors">
                    {{ prod.name }}</p>
                </div>
              </div>
              <div v-else-if="currentCategory && !currentCategory.series" class="grid grid-cols-2 gap-4">
                <a href="#"
                  class="block p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                  <span class="font-hero font-bold text-white block mb-1 text-lg">
                    {{ currentCategory.linkTitle || '了解更多' }}
                  </span>
                  <span class="text-xs text-gray-400">
                    {{ currentCategory.linkDesc || '点击进入详情页面' }}
                  </span>
                </a>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="isMenuMounted" ref="mobileMenuContainer"
        class="fixed inset-0 bg-white/60 backdrop-blur-xl shadow-2xl z-40 md:hidden overflow-hidden invisible">
        <div ref="mainMenuLayer" class="absolute inset-0 pt-28 px-8 w-full h-full overflow-y-auto">
          <div class="flex flex-col space-y-1">
            <div v-for="(item, index) in menuItems" :key="index" class="mobile-menu-item opacity-0">
              <div class="flex justify-between items-center py-5 cursor-pointer group" @click="handleMenuClick(item)">
                <span
                  class="text-slate-900 text-xl font-bold tracking-tight group-active:text-gray-500 transition-colors">{{
                    item.name }}</span>
                <span v-if="item.children" class="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg></span>
              </div>
            </div>
          </div>
        </div>
        <div ref="subMenuLayer" class="absolute inset-0 pt-28 px-8 w-full h-full overflow-y-auto bg-white z-50">
          <div v-if="activeSubMenu">
            <div
              class="flex items-center space-x-2 mb-8 cursor-pointer text-slate-500 hover:text-black transition-colors"
              @click="closeSubMenu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
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
  { name: '关于我们', type: 'mega', children: [{ name: '企业简介' }, { name: '企业文化' }, { name: '企业资讯' }] },
  { name: '产品介绍', type: 'mega', children: [{ name: '在售产品', series: [{ name: '坚石系列', products: [{ name: '坚石', image: '/images/products/jianshi.png' }] }, { name: '磐石系列', products: [{ name: '磐石Max', image: '/images/products/panshi-max.png' }, { name: '磐石Pro', image: '/images/products/panshi-pro.png' }] }, { name: '星辰系列', products: [{ name: '星辰', image: '/images/products/xingchen.png' }] }, { name: '星耀系列', products: [{ name: '星耀', image: '/images/products/xingyao.png' }] }] }, { name: '产品路线图', linkTitle: '交流充电桩' }] },
  { name: '产品服务', type: 'mega', children: [{ name: '安装服务' }, { name: '售后服务' }] },
  { name: '下载中心', type: 'mega', children: [{ name: 'App下载' }, { name: '说明书下载' }] },
  { name: '联系我们', type: 'mega', children: [{ name: '联系方式' }, { name: '官方渠道' }, { name: '加入我们' }] }
]

// 状态
const activeMenuIndex = ref(null)
const activeCategoryIndex = ref(0)
const activeSeriesIndex = ref(0)
const isMenuOpen = ref(false)
const megaMenuRef = ref(null)
const closeTimer = ref(null)

// ★★★ 修复 1：补全缺失的 isClosing 状态 ★★★
const isClosing = ref(false)

// ★★★ 新增：切换计时器，用于处理防抖 ★★★
const switchTimer = ref(null)

const scrollbarWidth = ref(0)

const col1 = ref(null)
const col2 = ref(null)
const col3 = ref(null)

const isMobileMenuOpen = ref(false)
const activeSubMenu = ref(null)
const isMenuMounted = ref(false)
const mobileMenuContainer = ref(null)
const mainMenuLayer = ref(null)
const subMenuLayer = ref(null)
const dropdownRefs = ref([])

const activeItem = computed(() => activeMenuIndex.value !== null ? menuItems[activeMenuIndex.value] : null)
const currentCategory = computed(() => activeItem.value?.children?.[activeCategoryIndex.value])
const currentSeries = computed(() => currentCategory.value?.series?.[activeSeriesIndex.value])

const getScrollbarWidth = () => {
  if (typeof window === 'undefined') return 0
  return window.innerWidth - document.documentElement.clientWidth
}

// ★★★ 新增：取消切换计时器函数 ★★★
const cancelSwitchTimer = () => {
  if (switchTimer.value) {
    clearTimeout(switchTimer.value)
    switchTimer.value = null
  }
}

// ★★★ 核心修改：鼠标进入一级菜单 (带延迟) ★★★
const onMenuEnter = (index) => {
  // 1. 取消关闭菜单的倒计时（保持菜单打开）
  cancelCloseTimer()
  // 2. 取消任何正在进行的切换倒计时（防止冲突）
  cancelSwitchTimer()

  if (activeMenuIndex.value === index) return

  // 封装切换逻辑
  const performSwitch = () => {
    activeMenuIndex.value = index
    activeCategoryIndex.value = 0
    activeSeriesIndex.value = 0

    if (menuItems[index].type === 'mega') {
      openMenu()
      runStaggerAnimation()
    } else {
      closeMenu()
    }
  }

  // 3. 智能延迟逻辑
  if (!isMenuOpen.value) {
    // 场景 A：菜单目前是关闭的 -> 立即打开 (为了响应迅速)
    performSwitch()
  } else {
    // 场景 B：菜单已经是打开的，用户在切换标题
    // 给 200ms 的延迟，防止鼠标斜向划过时误触邻近菜单
    switchTimer.value = setTimeout(performSwitch, 200)
  }
}

// ★★★ 新增：鼠标快速离开一级菜单项 ★★★
const onMenuLeave = () => {
  // 如果用户鼠标只是匆匆掠过某个菜单项，还没到 200ms 就离开了
  // 那么取消这个切换任务，菜单将保持原状
  cancelSwitchTimer()
}

const onCategoryEnter = async (index) => {
  if (activeCategoryIndex.value === index) return

  const targetsToHide = [col2.value, col3.value].filter(el => el)
  if (targetsToHide.length > 0) gsap.set(targetsToHide, { opacity: 0 })

  activeCategoryIndex.value = index
  activeSeriesIndex.value = 0

  await nextTick()

  const targetsToShow = [col2.value, col3.value].filter(el => el)

  if (targetsToShow.length > 0) {
    gsap.killTweensOf(targetsToShow)

    // 👇【核心修改】同样改用 fromTo
    gsap.fromTo(targetsToShow,
      {
        opacity: 0,
        x: -30
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.3,
        overwrite: 'auto'
      }
    )
  }
}

const onSeriesEnter = (index) => { activeSeriesIndex.value = index }

const runStaggerAnimation = async () => {
  // 1. 清理旧元素 (保持不变)
  const oldTargets = [col1.value, col2.value, col3.value].filter(el => el)
  if (oldTargets.length > 0) gsap.set(oldTargets, { opacity: 0 })

  await nextTick()

  // 2. 获取新元素
  const newTargets = [col1.value, col2.value, col3.value].filter(el => el)
  gsap.killTweensOf(newTargets)

  // 👇【核心修改】改用 fromTo，强制规定“从哪里开始，到哪里结束”
  // 这样无论之前的状态如何，动画都会强制从 opacity: 0 开始执行
  gsap.fromTo(newTargets,
    {
      opacity: 0,
      x: -30
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power3.out',
      overwrite: 'auto' // 确保新动画会自动覆盖旧动画
    }
  )
}

// 打开菜单
const openMenu = async () => {
  // ★★★ 修复 2：逻辑条件补全，允许在关闭过程中强制重新打开 ★★★
  if (!isMenuOpen.value || isClosing.value) {
    isMenuOpen.value = true
    // 重置关闭标记
    isClosing.value = false

    const width = getScrollbarWidth()
    scrollbarWidth.value = width
    document.body.style.paddingRight = `${width}px`
    document.body.style.overflow = 'hidden'

    // 强制杀掉所有正在进行的关闭动画 (column + menu)
    const columnTargets = [col1.value, col2.value, col3.value].filter(el => el)
    gsap.killTweensOf(columnTargets)

    gsap.killTweensOf(megaMenuRef.value)
    gsap.to(megaMenuRef.value, { height: 'auto', opacity: 1, duration: 0.6, ease: 'power3.out' })

    await runStaggerAnimation()
  }
}

// 关闭菜单动画
const closeMenu = () => {
  closeTimer.value = setTimeout(() => {
    isClosing.value = true

    // ❌ 删除下面这一行！不要在这里清空，否则内容没了，高度就塌陷了
    // activeMenuIndex.value = null 

    const targets = [col1.value, col2.value, col3.value].filter(el => el)
    gsap.to(targets, { opacity: 0, duration: 0.3, overwrite: true })

    gsap.to(megaMenuRef.value, {
      height: 0,
      duration: 0.5,
      delay: 0.2, 
      ease: 'power3.inOut',
      overwrite: true,
      onComplete: () => {
        isMenuOpen.value = false
        isClosing.value = false
        
        // ✅ 恢复下面这一行！动画播完了，现在可以安全销毁内容了
        activeMenuIndex.value = null
        
        // 确保彻底清理内部状态
        activeCategoryIndex.value = 0
        activeSeriesIndex.value = 0

        document.body.style.paddingRight = ''
        document.body.style.overflow = ''
        scrollbarWidth.value = 0
      }
    })
  }, 100)
}

// ★★★ 修复 3：定义模板中调用的 scheduleCloseMenu ★★★
const scheduleCloseMenu = () => closeMenu()

const cancelCloseTimer = () => {
  if (closeTimer.value) {
    clearTimeout(closeTimer.value)
    closeTimer.value = null
  }
}

// 移动端逻辑
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
    if (mobileMenuContainer.value) gsap.set(mobileMenuContainer.value, { yPercent: -100 })
    if (subMenuLayer.value) gsap.set(subMenuLayer.value, { xPercent: 100 })
  }, 0)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.invert {
  filter: invert(1);
}
</style>