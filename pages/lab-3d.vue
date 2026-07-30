<template>
  <div class="min-h-screen w-full bg-[#050505] font-sans text-white selection:bg-brand">
    <section class="mx-auto w-full max-w-[1760px] px-4 pb-8 pt-14 lg:px-8">
      <p class="mb-4 font-mono text-sm tracking-widest text-brand">RAYDIENE · 产品立体预览</p>
      <h1 class="mb-5 font-hero text-4xl font-bold tracking-tight md:text-6xl">全系五款 · 三维交互</h1>
      <p class="max-w-3xl text-lg leading-relaxed text-gray-400">
        坚石、磐石 Pro / Max、星辰、星耀五款家用交流充电桩的交互式立体展示。
      </p>
    </section>

    <section class="mx-auto w-full max-w-[1760px] px-4 lg:px-8">
      <ClientOnly>
        <PileViewer3D ref="viewer" :products="products" debug />
        <template #fallback>
          <div
            class="grid aspect-[3/4] w-full place-items-center rounded-[1.75rem] bg-[#e6eaef] text-sm text-gray-500 sm:aspect-[4/3] lg:aspect-auto lg:h-[clamp(760px,82vh,920px)]">
            3D 视图加载中…
          </div>
        </template>
      </ClientOnly>
    </section>

    <!-- 全系规格。canvas 对爬虫是黑洞，参数必须在 DOM 里可读 -->
    <section class="mx-auto w-full max-w-[1760px] px-4 py-20 lg:px-8">
      <h2 class="mb-3 font-hero text-3xl font-bold md:text-4xl">全系规格</h2>
      <p class="mb-10 text-base text-gray-500">
        五款均通过 3C 强制性认证，符合 GB 39752-2024 / GB 44263-2024 新国标。
      </p>
      <div class="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        <article v-for="prod in products" :key="prod.key"
          class="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
          <p class="mb-1.5 font-mono text-xs tracking-widest text-brand">{{ prod.tier }}</p>
          <h3 class="mb-1.5 font-hero text-2xl font-bold">{{ prod.name }}</h3>
          <p class="mb-6 text-sm leading-relaxed text-gray-500">{{ prod.intro }}</p>
          <dl class="mb-6 space-y-2.5">
            <div v-for="s in prod.specs" :key="s.k" class="flex justify-between border-b border-white/5 pb-2">
              <dt class="text-sm text-gray-500">{{ s.k }}</dt>
              <dd class="font-mono text-sm text-gray-300">
                {{ s.num != null ? s.num + " " + s.unit : s.v }}
              </dd>
            </div>
            <div class="flex justify-between border-b border-white/5 pb-2">
              <dt class="text-sm text-gray-500">外观尺寸</dt>
              <dd class="font-mono text-sm text-gray-300">{{ prod.dims }}</dd>
            </div>
            <div class="flex justify-between border-b border-white/5 pb-2">
              <dt class="text-sm text-gray-500">外壳材质</dt>
              <dd class="font-mono text-sm text-gray-300">{{ prod.material }}</dd>
            </div>
          </dl>
          <ul class="flex flex-wrap gap-2">
            <li v-for="hl in prod.highlights" :key="hl.t"
              class="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
              {{ hl.t }} · {{ hl.d }}
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "全系五款 · 三维交互预览",
  meta: [{ name: "robots", content: "noindex,nofollow" }],
});

const viewer = ref(null);

/*
 * 规格与文案取自 composables/useProducts.js 与各产品页，未编造。
 *
 * 约束（切换时不能让任何区域变位置）：
 *  - tier 一律 4 字，tagline 一律「4 字 · 4 字」，role 一律「◎ + 4 字」
 *  - specs 五款同序等长，数值项按下标做滚动插值
 *  - intro 控制在 48~52 字
 *
 * finish 只作用于 3D 机身；UI 文字一律品牌色，不随产品变。
 */
const products = [
  {
    key: "jianshi", variant: "jianshi",
    // 原始导出有 4 个网格绕序朝内（其中一个 67k 面），在查看器里表现为
    // 「破面 + 黑黢黢」。optimize-glb.mjs 已自动检测并翻正
    model: "/models/jianshi.glb",
    finish: { color: 0x1a1c1f, metalness: 0.35, roughness: 0.5 },
    name: "坚石 Pro", tier: "大道至简", tagline: "实用至上 · 硬核防护", role: "◎ 入门标杆",
    roleDesc: "7kW 家用交流，25 重安全防护，性价比之选。",
    intro: "7kW 家用充电桩，专为复杂环境设计。IP65 / IP67 高等级防护配合 25 重安全防护，支持 App 远程控制与预约错峰充电。",
    power: "7 kW", powerPct: 0.34,
    dims: "374.8 × 186.5 × 121 mm",
    material: "PC + ABS（V0 级阻燃）",
    buyUrl: "https://item.jd.com/10193535139932.html",
    specs: [
      { k: "最大功率", num: 7, unit: "kW", digits: 0 },
      { k: "输出电流", num: 32, unit: "A", digits: 0 },
      { k: "设备重量", num: 3.1, unit: "kg", digits: 1 },
      { k: "线缆长度", num: 5, unit: "m", digits: 1 },
      { k: "防护等级", v: "IP65" },
    ],
    highlights: [
      { t: "IP67 / IP65", d: "枪头 IP67 · 桩体 IP65" },
      { t: "25 重安全防护", d: "过压 / 过流 / 漏电 / 防雷" },
      { t: "-30℃ ~ 50℃", d: "极端温度稳定运行" },
    ],
  },
  {
    key: "panshi", variant: "panshi",
    // 工厂 KeyShot 数模，经 scripts/optimize-glb.mjs 处理（22.2MB → 1.03MB）。
    // 有 model 字段时 finish 不生效 —— 真实数模用厂家自己的材质
    model: "/models/panshi-pro.glb",
    finish: { color: 0xc2c8d0, metalness: 0.85, roughness: 0.26 },
    name: "磐石 Pro", tier: "简约时尚", tagline: "极简呼吸 · 智能互联", role: "◎ 简约主力",
    roleDesc: "7kW 家用交流，极简呼吸灯，26 重安全防护。",
    intro: "极简呼吸灯设计，简约而不简单。IP65 / IP67 级防护配合 26 重安全防护，支持 App 远程管理与峰谷定时充电。",
    power: "7 kW", powerPct: 0.34,
    dims: "374.8 × 186.5 × 121 mm",
    material: "PC + ABS（V0 级阻燃）",
    buyUrl: "https://item.jd.com/10138575243363.html",
    specs: [
      { k: "最大功率", num: 7, unit: "kW", digits: 0 },
      { k: "输出电流", num: 32, unit: "A", digits: 0 },
      { k: "设备重量", num: 3.6, unit: "kg", digits: 1 },
      { k: "线缆长度", num: 6, unit: "m", digits: 1 },
      { k: "防护等级", v: "IP65" },
    ],
    highlights: [
      { t: "智能呼吸灯", d: "简约交互 · 状态直观" },
      { t: "26 重安全防护", d: "过压 / 过流 / 漏电 / 防雷" },
      { t: "智能互联", d: "蓝牙 / 4G / 充满自停" },
    ],
  },
  {
    key: "panshiMax", variant: "panshiMax",
    model: "/models/panshi-max.glb",
    finish: { color: 0x1f6d94, metalness: 0.55, roughness: 0.34 },
    name: "磐石 Max", tier: "品质之选", tagline: "高清屏显 · 数据可见", role: "◎ 品质进阶",
    roleDesc: "7kW 家用交流，4.3 寸屏显，28 重安全防护。",
    intro: "配备 4.3 寸高清液晶显示屏，充电数据一目了然。28 重安全防护，支持 App 远程管理与峰谷定时充电。",
    power: "7 kW", powerPct: 0.34,
    dims: "374.8 × 186.5 × 121 mm",
    material: "PC + ABS（V0 级阻燃）",
    buyUrl: "https://item.jd.com/10138575243363.html",
    specs: [
      { k: "最大功率", num: 7, unit: "kW", digits: 0 },
      { k: "输出电流", num: 32, unit: "A", digits: 0 },
      { k: "设备重量", num: 3.6, unit: "kg", digits: 1 },
      { k: "线缆长度", num: 6, unit: "m", digits: 1 },
      { k: "防护等级", v: "IP65" },
    ],
    highlights: [
      { t: "智能高清屏显", d: "状态数据 · 可视化" },
      { t: "28 重安全防护", d: "过压 / 过流 / 漏电 / 防雷" },
      { t: "智能互联", d: "蓝牙 / 4G / 充满自停" },
    ],
  },
  {
    key: "xingchen", variant: "xingchen",
    model: "/models/xingchen.glb",
    // 星辰/星耀的充电枪装在机体右侧，且 KeyShot 场景里正面朝 −X。
    // 由「右 = Y × 正面」反推，绕 Y 轴 +90° 才能转到与磐石一致的「正面朝 +Z」
    rotateY: 90,
    finish: { color: 0xb39468, metalness: 0.72, roughness: 0.3 },
    name: "星辰", tier: "美学之光", tagline: "钢化玻璃 · 智能科技", role: "◎ 质感之选",
    roleDesc: "7kW 家用交流，钢化玻璃面板配高清屏显。",
    intro: "高级曜石黑钢化玻璃面板与高强度合金机身，配备智能高清显示屏，支持 28 重安全防护与峰谷定时充电。",
    power: "7 kW", powerPct: 0.34,
    dims: "365 × 235 × 120 mm",
    material: "钢化玻璃 + 合金 + PC",
    buyUrl: "/products/xingchen",
    specs: [
      { k: "最大功率", num: 7, unit: "kW", digits: 0 },
      { k: "输出电流", num: 32, unit: "A", digits: 0 },
      { k: "设备重量", num: 4.9, unit: "kg", digits: 1 },
      { k: "线缆长度", num: 6, unit: "m", digits: 1 },
      { k: "防护等级", v: "IP65" },
    ],
    highlights: [
      { t: "智能高清屏显", d: "充电状态实时可见" },
      { t: "钢化玻璃合金", d: "高规格用料 · 曜石黑" },
      { t: "充满自停", d: "蓝牙 / 4G 全支持" },
    ],
  },
  {
    key: "xingyao", variant: "xingyao",
    model: "/models/xingyao.glb",
    // 与星辰同一机体（主壳同为 130×368×248），朝向问题一致
    rotateY: 90,
    finish: { color: 0x4a3f5c, metalness: 0.6, roughness: 0.32 },
    name: "星耀", tier: "时代之巅", tagline: "触控大屏 · 旗舰性能", role: "◎ 交互旗舰",
    roleDesc: "7kW / 21kW 双功率，7 寸智能触控大屏。",
    intro: "7kW 及 21kW 超快充，7 寸智能触控大屏。28 重安全防护，4 年全程只换不修，特斯拉版支持一键开盖。",
    power: "21 kW", powerPct: 1,
    dims: "365 × 235 × 120 mm",
    material: "钢化玻璃 + 合金 + PC",
    buyUrl: "/products/xingyao",
    specs: [
      { k: "最大功率", num: 21, unit: "kW", digits: 0 },
      { k: "输出电流", num: 32, unit: "A", digits: 0 },
      { k: "设备重量", num: 7, unit: "kg", digits: 1 },
      { k: "线缆长度", num: 7.5, unit: "m", digits: 1 },
      { k: "防护等级", v: "IP65" },
    ],
    highlights: [
      { t: "7 寸智能触控", d: "大屏交互 · 如手机流畅" },
      { t: "28 重安全防护", d: "枪温 / 浪涌 / 防盗充" },
      { t: "智能语音助手", d: "语音播报 · 充满自停" },
    ],
  },
];
</script>
