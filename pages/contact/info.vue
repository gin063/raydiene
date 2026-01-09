<template>
    <div
        class="relative min-h-screen w-full bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-hidden">

        <div class="fixed inset-0 z-0 pointer-events-none">
            <div
                class="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/20 rounded-full blur-[120px] opacity-40 animate-pulse-slow">
            </div>
            <div
                class="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[100px] opacity-30">
            </div>           
        </div>

        <div class="relative z-10 container mx-auto px-6 md:px-12 py-32 md:py-48">

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                <div class="space-y-12 animate-slide-in-left">
                    <div>
                        <h1 class="text-4xl md:text-6xl font-bold font-hero tracking-tight mb-6">
                            联系我们
                        </h1>
                        <p class="text-gray-400 text-lg leading-relaxed max-w-md">
                            无论您是想咨询产品、寻求合作，还是需要售后支持
                            <br>
                            雷迪恩团队随时准备为您服务
                        </p>
                    </div>

                    <div class="space-y-8">
                        <div
                            class="group flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
                            <div
                                class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">服务热线</h3>
                                <a href="tel:4006992659"
                                    class="text-2xl md:text-3xl font-hero font-bold text-white group-hover:text-blue-400 transition-colors">
                                    400-699-2659
                                </a>
                            </div>
                        </div>

                        <div
                            class="group flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
                            <div
                                class="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">官方邮箱</h3>
                                <a href="mailto:service@raydiene.cn"
                                    class="text-xl md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                    service@raydiene.cn
                                </a>
                            </div>
                        </div>

                        <div
                            class="group flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
                            <div
                                class="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">总部地址</h3>
                                <p class="text-lg text-white leading-snug group-hover:text-teal-400 transition-colors">
                                    上海市青浦区万达茂A区<br>1号楼809室
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative w-full h-[500px] md:h-[650px] animate-slide-in-right">
                    <div
                        class="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none z-20 shadow-2xl">
                    </div>

                    <div id="amap-container"
                        class="w-full h-full rounded-[2rem] overflow-hidden bg-gray-900 z-10 relative">
                        <div v-if="!isMapLoaded"
                            class="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-500">
                            <span class="animate-pulse">地图加载中...</span>
                        </div>
                    </div>

                    <div class="absolute bottom-6 left-6 right-6 z-30 pointer-events-none">
                        <a href="https://www.amap.com/search?query=上海市青浦区万达茂" target="_blank"
                            class="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 flex justify-between items-center group pointer-events-auto hover:bg-black transition-colors shadow-lg">
                            <div>
                                <p class="text-xs text-gray-400 mb-1">NAVIGATE TO</p>
                                <p class="text-white font-bold">打开高德地图 APP 导航</p>
                            </div>
                            <div
                                class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// 状态
const isMapLoaded = ref(false)
let map = null

// 设置您的公司坐标 (上海市青浦区万达茂)
// 请使用高德坐标拾取器确认准确位置
const COMPANY_POSITION = [121.080457, 31.132366]

onMounted(async () => {
    const AMapLoader = (await import('@amap/amap-jsapi-loader')).default
    // 1. 配置安全密钥 (必须在 loader 加载前配置)
    // 请替换为您控制台里的【安全密钥】(Web端 JS API)
    window._AMapSecurityConfig = {
        securityJsCode: 'd5a1e19eb2d34320e4a33a07bc5b677c',
    }

    // 2. 加载地图
    AMapLoader.load({
        key: "7993cd4aeb060c491c7569bc429ebbc5", // 替换为您控制台里的【Key】
        version: "2.0",      // 指定要加载的 JSAPI 的版本
        plugins: ['AMap.Scale', 'AMap.ToolBar'], // 需要使用的插件列表
    })
        .then((AMap) => {
            isMapLoaded.value = true

            // 初始化地图
            map = new AMap.Map("amap-container", {
                viewMode: "3D", // 是否为3D地图模式
                zoom: 16,       // 初始化地图级别
                center: COMPANY_POSITION, // 初始化地图中心点位置
                mapStyle: 'amap://styles/grey', // 设置地图风格 (深色模式: grey, dark, blue, darkblue)
            });

            // 添加工具条
            map.addControl(new AMap.Scale())
            map.addControl(new AMap.ToolBar({ position: 'RT' })) // 右上角缩放工具

            // 添加标记点 (Marker)
            const marker = new AMap.Marker({
                position: COMPANY_POSITION,
                title: '雷迪恩 Raydiene', // 鼠标滑过显示的文字
            });

            // 创建信息窗体
            const infoWindow = new AMap.InfoWindow({
                content: `
          <div style="color:#000; padding:4px;">
            <h4 style="font-weight:bold; margin-bottom:4px;">雷迪恩 Raydiene</h4>
            <p style="font-size:12px;">上海市青浦区万达茂A区1号楼809室</p>
          </div>
        `,
                offset: new AMap.Pixel(0, -30)
            });

            // 绑定点击事件：点击标记打开信息窗体
            marker.on('click', () => {
                infoWindow.open(map, marker.getPosition());
            });

            map.add(marker);

            // 默认打开信息窗体 (可选)
            // infoWindow.open(map, marker.getPosition());

        })
        .catch((e) => {
            console.error(e);
        });
})

onUnmounted(() => {
    if (map) {
        map.destroy();
    }
})
</script>

<style scoped>
@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.4;
        transform: scale(1);
    }

    50% {
        opacity: 0.6;
        transform: scale(1.1);
    }
}

.animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
}

.animate-slide-in-left {
    animation: slideInLeft 1s ease-out forwards;
    opacity: 0;
    transform: translateX(-30px);
}

.animate-slide-in-right {
    animation: slideInRight 1s ease-out forwards;
    opacity: 0;
    transform: translateX(30px);
}

@keyframes slideInLeft {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* 强制覆盖高德地图默认的 logo 和版权信息样式（如果需要更沉浸式） */
:deep(.amap-logo),
:deep(.amap-copyright) {
    display: none !important;
    /* 注意：根据高德协议，建议保留 Logo，或将其调整为半透明 */
    /* opacity: 0.5 !important; */
}
</style>