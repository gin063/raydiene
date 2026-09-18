<template>
  <div class="min-h-screen w-full bg-[#050505] font-sans text-white selection:bg-brand">
    <section class="mx-auto w-full max-w-[1760px] px-4 pb-8 pt-14 lg:px-8">
      <p class="mb-4 font-mono text-sm tracking-widest text-brand">RAYDIENE · 3D 展厅</p>
      <h1 class="mb-5 font-hero text-4xl font-bold tracking-tight md:text-6xl">全系五款 · 三维交互</h1>
      <p class="max-w-3xl text-lg leading-relaxed text-gray-400">
        坚石 Pro、磐石 Pro / Max、星辰、星耀五款家用交流充电桩的交互式立体展示：拖动旋转、缩放细节，
        切换昼夜影棚，看清每一款的外观与用料。
      </p>
    </section>

    <section class="mx-auto w-full max-w-[1760px] px-4 pb-20 lg:px-8">
      <ClientOnly>
        <PileViewer3D ref="viewer" :products="products" :debug="debug" :perf="perf" />
        <template #fallback>
          <div
            class="grid aspect-[3/4] w-full place-items-center rounded-[1.75rem] bg-[#28323e] text-sm text-gray-400 sm:aspect-[4/3] lg:aspect-auto lg:h-[clamp(760px,82vh,920px)]">
            3D 视图加载中…
          </div>
        </template>
      </ClientOnly>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "3D展厅 - 家用充电桩全系三维交互展示 | Raydiene 雷迪恩",
  description:
    "在雷迪恩（RAYDIENE）3D展厅 360° 查看坚石 Pro、磐石 Pro、磐石 Max、星辰、星耀五款家用交流充电桩：" +
    "拖动旋转、缩放细节、切换昼夜影棚，对比 7kW / 21kW 功率、IP65 / IP67 防护与 25～28 重安全防护。",
  keywords: "充电桩3D展示, 家用充电桩外观, 雷迪恩充电桩, 坚石Pro, 磐石Pro, 磐石Max, 星辰充电桩, 星耀充电桩, Raydiene",
  ogTitle: "雷迪恩 3D 展厅：五款家用充电桩，360° 看清每个细节",
  ogDescription: "拖动旋转、缩放细节、切换昼夜影棚，全系五款家用交流充电桩的交互式立体展示。",
  // TODO 菜单背景图生成后换成展厅专属分享图
  ogImage: "https://assets.raydiene.cn/images/og-share.png",
});

/*
 * 画面主体是 canvas，爬虫和 AI 读不到里面的内容。
 * 用 ItemList 把「这页展示了哪五款、各自的详情页在哪」讲清楚；
 * 价格、质保等完整 Product 信息留在各产品页，这里不重复（两处都写容易口径不一致）。
 */
const ORG_ID = "https://www.raydiene.cn/#organization";
const SITE = "https://www.raydiene.cn";
const ASSETS = "https://assets.raydiene.cn";
const listItems = [
  ["雷迪恩坚石 Pro 7kW 家用交流充电桩", "/products/jianshi", "/images/products/jianshi.png"],
  ["雷迪恩磐石 Pro 7kW 家用交流充电桩", "/products/panshi", "/images/products/panshi-pro.png"],
  ["雷迪恩磐石 Max 7kW 家用交流充电桩", "/products/panshi?model=max", "/images/products/panshi-max.png"],
  ["雷迪恩星辰 7kW 家用交流充电桩", "/products/xingchen", "/images/products/xingchen.png"],
  ["雷迪恩星耀 7kW / 21kW 家用交流充电桩", "/products/xingyao", "/images/products/xingyao.png"],
];
useHead({
  script: [{
    type: "application/ld+json",
    key: "schema-showroom",
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "雷迪恩 3D 展厅",
      url: `${SITE}/products/showroom`,
      description: "雷迪恩（RAYDIENE）全系五款家用交流充电桩的交互式三维展示。",
      publisher: { "@id": ORG_ID },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: listItems.length,
        itemListElement: listItems.map(([name, path, img], i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
          url: SITE + path,
          image: ASSETS + img,
        })),
      },
    }),
  }],
});

const viewer = ref(null);

/*
 * 调试信息默认不显示，网址带 ?debug=1 才出现。
 * 性能排查开关（配合 debug 看帧数）：
 *   ?debug=1&msaa=0     关掉离屏画面的 4× 多重采样
 *   ?debug=1&dpr=2      像素比放回 2（桌面默认已是 1，见 PileViewer3D 的 dpr 注释）
 *   ?debug=1&glass=0    跳过玻璃合成，只画 3D 场景
 * 逐项打开对比帧数，就能看出瓶颈在哪一步
 */
const route = useRoute();
const debug = route.query.debug === "1";
const num = (v) => (v == null || v === "" || isNaN(+v) ? undefined : +v);
const perf = {
  msaa: num(route.query.msaa),
  dpr: num(route.query.dpr),
  glass: route.query.glass === "0" ? false : undefined,
};

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
    // logo 与磐石 Max 保持同一能见度（用户 2026-09-18）：上半部分英文字母（新材质 010，原线性 0.21）
    // 与下半部分无线图标（新材质 010 #1，原 0.063）都改成 Max 字母的浅灰 #dfdfdf。这两种材质只用在面板 logo 上
    colorFix: { "图层 20:新材质 010": "#dfdfdf", "图层 20:新材质 010 #1": "#dfdfdf" },
    finish: { color: 0xc2c8d0, metalness: 0.85, roughness: 0.26 },
    name: "磐石 Pro", tier: "简约时尚", tagline: "极简呼吸 · 智能互联", role: "◎ 简约主力",
    roleDesc: "7kW 家用交流，极简呼吸灯，26 重安全防护。",
    intro: "极简呼吸灯设计，简约而不简单。IP65 / IP67 级防护配合 26 重安全防护，支持 App 远程管理与峰谷定时充电。",
    power: "7 kW", powerPct: 0.34,
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
    // 面板上的 RAYDIENE 字母与青色「N」导出时颜色丢了（深灰 / 暗青），在黑面板上看不见，
    // 按材质名里写的设计色改回来。磐石 Pro 的 logo 材质颜色正常，不需要
    colorFix: { "Color:223:223:223": "#dfdfdf", "Color:0:255:255": "#00ffff" },
    // 下半部分的无线图标（5 段弧线，最长边 ≤ 10.7）与字母统一成浅灰。它的材质还被机身上两个
    // 32 高的圆柱件共用，所以按零件尺寸只改图标，不能按材质名整体改
    partColorFix: [{ material: "Color:156:168:171", maxSize: 12, color: "#dfdfdf" }],
    finish: { color: 0x1f6d94, metalness: 0.55, roughness: 0.34 },
    name: "磐石 Max", tier: "品质之选", tagline: "高清屏显 · 数据可见", role: "◎ 品质进阶",
    roleDesc: "7kW 家用交流，4.3 寸屏显，28 重安全防护。",
    intro: "配备 4.3 寸高清液晶显示屏，充电数据一目了然。28 重安全防护，支持 App 远程管理与峰谷定时充电。",
    power: "7 kW", powerPct: 0.34,
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
    // 同星耀：玻璃 + 合金反光重，单独压（说明见星耀）
    matte: { metalRoughness: 0.68, dielectricRoughness: 0.55, dielectricEnv: 0.6 },
    finish: { color: 0xb39468, metalness: 0.72, roughness: 0.3 },
    name: "星辰", tier: "美学之光", tagline: "钢化玻璃 · 智能科技", role: "◎ 质感之选",
    roleDesc: "7kW 家用交流，钢化玻璃面板配高清屏显。",
    intro: "高级曜石黑钢化玻璃面板与高强度合金机身，配备智能高清显示屏，支持 28 重安全防护与峰谷定时充电。",
    power: "7 kW", powerPct: 0.34,
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
    // 钢化玻璃面板 + 合金机身，镜面倒影最重。粗糙度拉高把「镜面」磨成柔光泽，
    // 玻璃面板的环境反射再压一点；金属的环境强度不动 —— 金属没有漫反射，压了会发黑
    matte: { metalRoughness: 0.68, dielectricRoughness: 0.55, dielectricEnv: 0.6 },
    finish: { color: 0x4a3f5c, metalness: 0.6, roughness: 0.32 },
    name: "星耀", tier: "时代之巅", tagline: "触控大屏 · 旗舰性能", role: "◎ 交互旗舰",
    roleDesc: "7kW / 21kW 双功率，7 寸智能触控大屏。",
    intro: "7kW 及 21kW 超快充，7 寸智能触控大屏。28 重安全防护，4 年全程只换不修。",
    power: "21 kW", powerPct: 1,
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
