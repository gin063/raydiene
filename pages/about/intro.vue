<template>
    <div class="bg-white text-slate-900 min-h-screen pt-20 font-sans selection:bg-blue-100">

        <div class="relative w-full py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden">
            <div
                class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gray-50 blur-[100px] -z-10 rounded-full opacity-60">
            </div>

            <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 class="text-5xl md:text-7xl font-hero font-bold tracking-tight mb-6 animate-fade-up text-black">
                    企业简介
                </h1>
                <div class="w-20 h-1 bg-black mx-auto mb-6 animate-fade-up delay-100"></div>
                <p
                    class="text-gray-500 text-sm md:text-base tracking-[0.3em] uppercase animate-fade-up delay-200 font-medium">
                    About Raydiene
                </p>
            </div>
        </div>

        <div class="container mx-auto px-6 pb-24">
            <div class="max-w-4xl mx-auto">

                <div class="mb-20 animate-fade-up delay-300">
                    <div class="flex items-baseline mb-8 border-b border-gray-200 pb-4">
                        <h2 class="text-2xl md:text-3xl font-bold text-black mr-4">
                            公司概况
                        </h2>
                        <span class="text-sm text-gray-400 font-hero">Company Profile</span>
                    </div>

                    <div class="text-slate-600 leading-loose space-y-6 text-lg text-justify font-light">
                        <p>
                            <strong
                                class="text-black font-bold">RAYDIENE雷迪恩</strong>，作为新能源充电领域的先锋品牌，始终致力于为全球用户提供卓越的能源解决方案。我们不仅仅是充电桩的制造者，更是绿色出行生活方式的倡导者。
                        </p>
                        <p>
                            公司总部位于上海临港新片区，依托强大的研发团队与工业设计能力，我们将“坚若磐石”的品质与“星辰大海”的美学追求完美融合，推出了坚石、磐石、星辰、星耀等一系列备受赞誉的交流充电桩产品。
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 animate-fade-up delay-400">
                    <div class="rounded-2xl overflow-hidden aspect-video border border-gray-100 shadow-lg group">
                        <NuxtImg src="/images/products/jianshi.png"
                            class="w-full h-full object-contain p-8 bg-gray-50 transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div class="rounded-2xl overflow-hidden aspect-video border border-gray-100 shadow-lg group">
                        <NuxtImg src="/images/products/panshi-max.png"
                            class="w-full h-full object-contain p-8 bg-gray-50 transition-transform duration-700 group-hover:scale-105" />
                    </div>
                </div>

                <div class="mb-16 animate-fade-up delay-500">
                    <div class="flex items-baseline mb-8 border-b border-gray-200 pb-4">
                        <h2 class="text-2xl md:text-3xl font-bold text-black mr-4">
                            愿景与使命
                        </h2>
                        <span class="text-sm text-gray-400 font-hero">Vision & Mission</span>
                    </div>

                    <div class="bg-gray-50 rounded-2xl p-10 border border-gray-100 relative overflow-hidden">

                        <div class="absolute top-4 left-6 text-9xl text-gray-200 font-serif opacity-50 select-none">“
                        </div>

                        <div
                            class="absolute -bottom-10 right-6 text-9xl text-gray-200 font-serif opacity-50 select-none leading-none">
                            ”</div>

                        <blockquote
                            class="text-2xl md:text-3xl font-hero text-center text-slate-900 leading-normal relative z-10 font-bold">
                            Charging For Better World
                        </blockquote>
                        <p
                            class="text-center text-gray-500 mt-6 text-xs tracking-widest uppercase relative z-10 font-bold">
                            — 我们的使命 —
                        </p>
                    </div>

                    <div class="mt-10 text-slate-600 leading-loose text-lg text-justify font-light">
                        <p>
                            我们相信，每一次充电都是对未来的投资。RAYDIENE坚持以技术创新驱动可持续发展，让清洁能源触手可及。我们的愿景是成为全球信赖的能源补给伙伴，让电动汽车的每一次出发都充满信心。
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-fade-up {
    animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(30px);
}

.delay-100 {
    animation-delay: 0.1s;
}

.delay-200 {
    animation-delay: 0.2s;
}

.delay-300 {
    animation-delay: 0.3s;
}

.delay-400 {
    animation-delay: 0.4s;
}

.delay-500 {
    animation-delay: 0.5s;
}

@keyframes fadeUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>