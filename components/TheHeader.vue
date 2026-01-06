<template>
  <div @mouseleave="closeMenu">
    <header class="fixed top-0 left-0 w-full z-50 transition-colors duration-300 shadow-2xl" :class="[
      isMobileMenuOpen
        ? 'bg-white/60 backdrop-blur-xl'
        : 'bg-black/60 backdrop-blur-xl'
    ]" :style="{ paddingRight: scrollbarWidth + 'px' }" @mouseleave="scheduleCloseMenu" @mouseenter="cancelCloseTimer">
      
      <div class="container mx-auto px-6 h-20 flex items-center justify-between relative">

        <div class="flex-shrink-0 cursor-pointer z-50 transition-[filter] duration-300"
          :class="{ 'invert': isMobileMenuOpen }">
          <NuxtLink to="/">
            <img 
              src="/images/logo.svg" 
              alt="Raydiene Logo" 
              class="h-12 md:h-16 w-auto object-contain" 
            />
          </NuxtLink>
        </div>

        <nav class="hidden md:flex h-full items-center justify-center space-x-1 absolute left-1/2 top-0 -translate-x-1/2">
          <div v-for="(item, index) in menuItems" :key="index"
            class="h-full flex items-center px-5 relative cursor-pointer group" @mouseenter="onMenuEnter(index)"
            @mouseleave="onMenuLeave">

            <span
              class="text-base font-bold tracking-wide transition-all duration-500 ease-in-out origin-center font-hero"
              :class="[
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
           
           <template v-if="currentCategory && currentCategory.series">
             <div ref="col2" class="col-span-3 border-r border-white/10 pr-4 opacity-0 translate-x-[-10px]">
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
                   
                   <NuxtLink 
                      v-for="(prod, pIndex) in currentSeries.products" 
                      :key="pIndex" 
                      :to="prod.link"
                      @click.prevent="handleCategoryClick(prod)"
                      class="group/prod cursor-pointer block"
                   >
                     <div class="relative w-48 h-48 bg-white/5 rounded-xl overflow-hidden border border-white/5 mb-3 transition-transform duration-500 group-hover/prod:border-white/20">
                       <NuxtImg :src="prod.image" :alt="prod.name"
                         class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover/prod:scale-105 pointer-events-none"
                         sizes="500px" format="webp" loading="lazy" />
                     </div>
                     <p class="text-center font-hero font-bold text-white group-hover/prod:text-blue-400 transition-colors">
                       {{ prod.name }}
                     </p>
                   </NuxtLink>
                   </div>
               </transition>
             </div>
           </template>

           <div v-else-if="currentCategory && currentCategory.image" ref="col2"
             class="col-span-9 pl-8 opacity-0 translate-x-[-10px] flex items-center">
             
             <NuxtLink 
               :to="currentCategory.link"
               @click.prevent="handleCategoryClick(currentCategory)"
               class="w-full h-full relative rounded-xl overflow-hidden group cursor-pointer border border-white/10 block"
             >
               <NuxtImg :src="currentCategory.image"
                 class="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-105 opacity-60 pointer-events-none"
                 sizes="500px" format="webp" />
               <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none"></div>
               <div class="absolute inset-0 flex flex-col justify-center px-12 z-10 pointer-events-none">
                 <h3 class="text-4xl font-bold text-white mb-4 font-hero">{{ currentCategory.name }}</h3>
                 <p class="text-gray-300 text-lg max-w-lg leading-relaxed mb-8">{{ currentCategory.desc }}</p>
                 <div
                   class="flex items-center text-white/80 font-bold tracking-wider uppercase text-sm group-hover:text-white transition-colors">
                   <span class="group-hover:translate-x-1 transition-transform duration-300">了解更多</span>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor"
                     class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                   </svg>
                 </div>
               </div>
             </NuxtLink>
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
        <div ref="subMenuLayer" class="absolute inset-0 w-full h-full overflow-y-auto bg-white z-50 custom-scrollbar">
           <div v-if="activeSubMenu" class="pt-24 px-6 pb-20">
             <div
              class="flex items-center space-x-2 mb-6 cursor-pointer text-slate-500 hover:text-black transition-colors inline-flex"
              @click="closeSubMenu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span class="text-sm font-bold tracking-wide uppercase">返回</span>
            </div>
            
            <div v-if="activeSubMenu && activeSubMenu.image"
              class="w-full aspect-[16/9] rounded-lg overflow-hidden mb-8 bg-gray-50 shadow-sm">
              <NuxtImg :src="activeSubMenu.image" class="w-full h-full object-cover" sizes="500px" format="webp"
                loading="lazy" />
            </div>

            <h2 class="text-3xl font-bold text-black mb-8 font-hero">{{ activeSubMenu.name }}</h2>

            <div class="flex flex-col space-y-2">
              <div class="flex flex-col space-y-2">
                <div v-for="(child, ci) in activeSubMenu.children" :key="ci">
                  <div v-if="child.series"
                    class="py-5 border-b border-gray-100 cursor-pointer flex justify-between items-center group active:bg-gray-50 transition-colors"
                    @click="openThirdMenu(child)"> <span
                      class="text-lg font-bold text-gray-900 group-hover:text-black">{{
                        child.name }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-5 h-5 text-gray-400 group-hover:text-black">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                  <div v-else
                    class="py-5 border-b border-gray-100 cursor-pointer flex justify-between items-center group active:bg-gray-50 transition-colors"
                    @click="handleCategoryClick(child)">
                    <span class="text-lg font-bold text-gray-900 group-hover:text-black">{{ child.name }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-5 h-5 text-gray-300 group-hover:text-black">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
           </div>
        </div>
        <div ref="thirdMenuLayer"
          class="absolute inset-0 w-full h-full overflow-y-auto bg-white z-[60] custom-scrollbar invisible">
           <div v-if="activeThirdMenu" class="pt-24 px-6 pb-20">
             <div
              class="flex items-center space-x-2 mb-8 cursor-pointer text-slate-500 hover:text-black transition-colors inline-flex"
              @click="closeThirdMenu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span class="text-sm font-bold tracking-wide uppercase">返回 {{ activeSubMenu?.name }}</span>
            </div>

            <h2 class="text-3xl font-bold text-black mb-8 font-hero">{{ activeThirdMenu.name }}</h2>

            <div class="grid grid-cols-2 gap-x-4 gap-y-8">
              <div v-for="(ser, si) in activeThirdMenu.series" :key="si" class="group cursor-pointer flex flex-col"
                @click="handleCategoryClick(ser)">
                <div class="w-full aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden mb-3 relative">
                  <NuxtImg v-if="ser.image" :src="ser.image"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    format="webp"       
                    sizes="500px" 
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-200">
                    No Image
                  </div>
                </div>
                <span class="text-sm font-bold text-gray-900 text-center group-hover:text-black">
                  {{ ser.name }}
                </span>
              </div>
            </div>
           </div>
        </div>
       </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'

// 菜单数据
const { menuItems } = useSiteData()

// 状态
const activeMenuIndex = ref(null)
const activeCategoryIndex = ref(0)
const activeSeriesIndex = ref(0)
const isMenuOpen = ref(false)
const megaMenuRef = ref(null)
const closeTimer = ref(null)
const isClosing = ref(false)
const switchTimer = ref(null)
const scrollbarWidth = ref(0)

const col1 = ref(null)
const col2 = ref(null)
const col3 = ref(null)

const isMobileMenuOpen = ref(false)
const activeSubMenu = ref(null)
const activeThirdMenu = ref(null) // 当前激活的三级菜单数据
const thirdMenuLayer = ref(null)  // DOM 引用
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

const cancelSwitchTimer = () => {
  if (switchTimer.value) {
    clearTimeout(switchTimer.value)
    switchTimer.value = null
  }
}

const onMenuEnter = (index) => {
  cancelCloseTimer()
  cancelSwitchTimer()

  if (isMobileMenuOpen.value) return
  if (activeMenuIndex.value === index) return

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

  if (!isMenuOpen.value) {
    performSwitch()
  } else {
    switchTimer.value = setTimeout(performSwitch, 200)
  }
}

const onMenuLeave = () => {
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
    gsap.fromTo(targetsToShow,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.3, overwrite: 'auto' }
    )
  }
}

const onSeriesEnter = (index) => { activeSeriesIndex.value = index }

const runStaggerAnimation = async () => {
  const oldTargets = [col1.value, col2.value, col3.value].filter(el => el)
  if (oldTargets.length > 0) gsap.set(oldTargets, { opacity: 0 })

  await nextTick()

  const newTargets = [col1.value, col2.value, col3.value].filter(el => el)
  gsap.killTweensOf(newTargets)

  gsap.fromTo(newTargets,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.8, stagger: 0.3, ease: 'power3.out', overwrite: 'auto' }
  )
}

const openMenu = async () => {
  if (!isMenuOpen.value || isClosing.value) {
    const width = getScrollbarWidth()
    scrollbarWidth.value = width
    document.body.style.paddingRight = `${width}px`
    document.body.style.overflow = 'hidden'

    isMenuOpen.value = true
    isClosing.value = false

    const columnTargets = [col1.value, col2.value, col3.value].filter(el => el)
    gsap.killTweensOf(columnTargets)
    gsap.killTweensOf(megaMenuRef.value)
    gsap.to(megaMenuRef.value, { height: 'auto', opacity: 1, duration: 0.6, ease: 'expo.out' })

    await runStaggerAnimation()
  }
}

const closeMenu = () => {
  if (isMobileMenuOpen.value) return
  closeTimer.value = setTimeout(() => {
    isClosing.value = true
    const targets = [col1.value, col2.value, col3.value].filter(el => el)
    gsap.to(targets, { opacity: 0, duration: 0.2, overwrite: true })

    gsap.to(megaMenuRef.value, {
      height: 0, duration: 0.5, delay: 0.1, ease: 'expo.inOut', overwrite: true,
      onComplete: () => {
        isMenuOpen.value = false
        isClosing.value = false
        activeMenuIndex.value = null
        activeCategoryIndex.value = 0
        activeSeriesIndex.value = 0
        document.body.style.paddingRight = ''
        document.body.style.overflow = ''
        scrollbarWidth.value = 0
      }
    })
  }, 100)
}

const scheduleCloseMenu = () => closeMenu()

const cancelCloseTimer = () => {
  if (closeTimer.value) {
    clearTimeout(closeTimer.value)
    closeTimer.value = null
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  const container = mobileMenuContainer.value
  const mainLayer = mainMenuLayer.value
  const items = mainLayer.querySelectorAll('.mobile-menu-item')

  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
    gsap.set(container, { autoAlpha: 1 })
    gsap.fromTo(container, { yPercent: -100 }, { yPercent: 0, duration: 0.8, ease: 'expo.out' })
    gsap.fromTo(items, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, delay: 0.2, ease: 'expo.out' })
  } else {
    gsap.to(container, {
      yPercent: -100, duration: 0.8, ease: 'expo.inOut',
      onComplete: () => {
        activeSubMenu.value = null;
        gsap.set(subMenuLayer.value, { xPercent: 100 });
        gsap.set(mainLayer, { xPercent: 0, autoAlpha: 1 })
        document.body.style.overflow = ''
      }
    })
  }
}

const handleMenuClick = async (item) => {
  if (item.children) {
    gsap.killTweensOf([mainMenuLayer.value, subMenuLayer.value])
    activeSubMenu.value = item
    await nextTick()
    gsap.to(mainMenuLayer.value, { xPercent: -30, autoAlpha: 0, duration: 0.8, ease: 'expo.out' })
    gsap.fromTo(subMenuLayer.value, { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: 'expo.out' })
  } else { toggleMobileMenu() }
}

// 打开三级菜单 (从右侧滑入)
const openThirdMenu = async (child) => {
  // 保护机制：杀掉正在运行的动画
  gsap.killTweensOf([subMenuLayer.value, thirdMenuLayer.value])

  activeThirdMenu.value = child
  await nextTick()

  // 1. 二级菜单退后 (变淡、左移)
  gsap.to(subMenuLayer.value, { xPercent: -30, autoAlpha: 0, duration: 0.8, ease: 'expo.out' })
  
  // 2. 三级菜单进场 (从右侧 100% 移到 0%)
  // 先设置 visible 避免闪烁
  gsap.set(thirdMenuLayer.value, { autoAlpha: 1 })
  gsap.fromTo(thirdMenuLayer.value, 
    { xPercent: 100 }, 
    { xPercent: 0, duration: 0.8, ease: 'expo.out' }
  )
}

// 关闭三级菜单 (返回二级)
const closeThirdMenu = () => {
  gsap.killTweensOf([subMenuLayer.value, thirdMenuLayer.value])

  // 1. 二级菜单回归
  gsap.to(subMenuLayer.value, { xPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out' })

  // 2. 三级菜单退出
  gsap.to(thirdMenuLayer.value, { 
    xPercent: 100, 
    duration: 0.8, 
    ease: 'expo.out',
    onComplete: () => { activeThirdMenu.value = null } // 清理数据
  })
}

const closeSubMenu = () => {
  gsap.killTweensOf([mainMenuLayer.value, subMenuLayer.value, thirdMenuLayer.value]) // 把 third 也加上

  // ... 原有逻辑不变 ...
  gsap.to(mainMenuLayer.value, { xPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out' })
  gsap.to(subMenuLayer.value, { 
    xPercent: 100, 
    duration: 0.8, 
    ease: 'expo.out', 
    onComplete: () => { 
      activeSubMenu.value = null 
      activeThirdMenu.value = null // 顺便清理三级
    } 
  })
}

const handleCategoryClick = async (category) => {
  // 只有当数据里配置了 link 属性时才跳转
  if (category.link) {

    // 判断当前是移动端菜单打开，还是 PC 端菜单打开
    if (isMobileMenuOpen.value) {
      // 如果是移动端，调用 toggleMobileMenu 来执行关闭动画
      toggleMobileMenu()
    } else {
      // 如果是 PC 端，调用 closeMenu 关闭幕布
      closeMenu()
    }

    // 执行跳转
    await navigateTo(category.link)
  }
}

onMounted(() => {
  isMenuMounted.value = true
  setTimeout(() => {
    if (mobileMenuContainer.value) gsap.set(mobileMenuContainer.value, { yPercent: -100 })
    if (subMenuLayer.value) gsap.set(subMenuLayer.value, { xPercent: 100 })
  }, 0)
})
onUnmounted(() => {
  document.body.style.paddingRight = ''
  document.body.style.overflow = ''
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