<template>
    <div
        class="relative min-h-screen w-full bg-[#050505] text-gray-300 font-sans selection:bg-teal-500 selection:text-white">

        <div class="fixed inset-0 z-0 pointer-events-none">
            <div
                class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-b from-blue-900/10 to-transparent opacity-50">
            </div>
        </div>

        <div class="relative z-10 container mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-0 max-w-4xl">

            <div class="mb-16 border-b border-white/10 pb-8 animate-fade-in-up">
                <h1 class="text-3xl md:text-5xl font-bold text-white mb-6">隐私政策</h1>
                <div class="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-500">
                    <p>生效日期：2026年1月1日</p>
                    <span class="hidden md:block">|</span>
                    <p>最近更新：2026年1月1日</p>
                </div>
            </div>

            <div class="space-y-12 animate-fade-in-up" style="animation-delay: 0.1s">

                <section class="space-y-4">
                    <p class="leading-relaxed">
                        欢迎您使用雷迪恩（Raydiene）的产品和服务。雷迪恩（以下简称“我们”）深知个人信息对您的重要性，我们将按照法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。
                    </p>
                    <p class="leading-relaxed">
                        本《隐私政策》将向您说明我们在您使用雷迪恩充电桩硬件、移动应用（App）、官方网站及相关服务时，如何收集、使用、存储、共享和保护您的个人信息。
                    </p>
                </section>

                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white">1. 我们如何收集和使用您的信息</h2>
                    <p>为了向您提供优质的充电及售后服务，我们需要收集以下类型的信息：</p>

                    <div class="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-6">
                        <div>
                            <h3 class="text-lg font-bold text-teal-400 mb-2">1.1 购买与安装服务</h3>
                            <p class="text-sm">当您预约安装服务时，我们需要收集您的<span
                                    class="text-white font-bold">姓名、联系电话、安装地址</span>以及<span
                                    class="text-white font-bold">车型信息</span>。这些信息仅用于工程师上门勘测、安装施工及物流配送。</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-teal-400 mb-2">1.2 设备联网与OTA服务</h3>
                            <p class="text-sm">为了实现远程控制、固件升级（OTA）及故障诊断，当您绑定充电桩时，我们会收集设备的<span
                                    class="text-white font-bold">序列号(SN)、设备运行状态、充电记录（时间、电量、功率）、网络连接状态（Wi-Fi/4G信息）</span>。
                            </p>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-teal-400 mb-2">1.3 客户服务</h3>
                            <p class="text-sm">当您联系售后客服时，我们可能会记录您与客服的通话录音或对话记录，以及您提供的故障图片/视频，以便快速定位并解决问题。</p>
                        </div>
                    </div>
                </section>

                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white">2. 信息的存储</h2>
                    <p>
                        依据中国法律法规，我们在中华人民共和国境内运营中收集和产生的个人信息，将<span
                            class="text-white font-bold">存储在中国境内</span>。我们不会将您的个人信息传输至境外。
                    </p>
                    <p>
                        我们仅在提供服务所必需的期间内保留您的个人信息。在您注销账户或超出法定保存期限后，我们将对您的个人信息进行删除或匿名化处理。
                    </p>
                </section>

                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white">3. 信息的共享与披露</h2>
                    <p>我们承诺不会出售您的个人信息。但在以下情况中，我们可能会共享您的部分信息：</p>
                    <ul class="list-disc list-outside pl-5 space-y-2 text-gray-400">
                        <li><span
                                class="text-white">授权合作伙伴：</span>为了提供上门安装服务，我们必须将您的联系方式和地址共享给授权的第三方安装服务商。我们已与所有服务商签署严格的保密协议。
                        </li>
                        <li><span class="text-white">法定情形：</span>根据法律法规规定、诉讼争议解决需要，或按行政、司法机关依法提出的要求。</li>
                    </ul>
                </section>

                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white">4. 信息安全保护</h2>
                    <p>
                        我们已使用符合业界标准的安全防护措施保护您提供的个人信息。例如，您的设备与云端之间的数据交换采用 <span class="text-white">SSL
                            加密技术</span>；我们对敏感数据进行加密存储；我们建立了严格的数据访问权限控制制度。
                    </p>
                </section>

                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white">5. 您的权利</h2>
                    <p>您可以随时通过雷迪恩App或联系客服执行以下权利：</p>
                    <ul class="list-disc list-outside pl-5 space-y-2 text-gray-400">
                        <li>查询、更正您的个人信息。</li>
                        <li>删除您的充电记录或设备绑定信息。</li>
                        <li>注销账户（注销后我们将停止为您提供产品或服务，并删除您的个人信息）。</li>
                    </ul>
                </section>

                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white">6. 联系我们</h2>
                    <p>如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式与我们联系：</p>
                    <div class="bg-white/5 rounded-xl p-6 mt-4">
                        <p class="mb-2">上海捷益能科技有限公司</p>
                        <p class="mb-2">联系电话：400-699-2659</p>
                        <p>电子邮箱：service@raydiene.cn</p>
                    </div>
                </section>

            </div>

            <div class="mt-20 py-8 border-t border-white/10 text-center animate-fade-in-up"
                style="animation-delay: 0.2s">
                <NuxtLink to="/"
                    class="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    返回首页
                </NuxtLink>
            </div>

        </div>
    </div>
</template>

<script setup>
useHead({
    title: '隐私政策 - 雷迪恩 Raydiene',
    meta: [
        { name: 'robots', content: 'noindex, nofollow' } // 隐私政策页面通常不需要被SEO重点收录
    ]
})
</script>