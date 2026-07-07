// composables/useProducts.js
// 产品结构化数据单一数据源（特性条 / 特性卡 / App 功能 / 规格表）。
// SEO / JSON-LD schema / hero 图仍留在各产品页（属页面级 metadata）。
// 图标统一引用自 ~/utils/productIcons。
import {
  IconCheck, IconTool, IconClock, IconVerified, IconWifi,
  IconIP, IconShield, IconConnect, IconTemp,
  IconApp, IconTime, IconShare, IconAlert, IconBell,
  IconScreen, IconLight, IconMetal, IconAutoStop,
  IconTouch, IconCar, IconVoice, IconCustom, IconSpeaker,
} from '~/utils/productIcons'

// 顶部通用特性条（仅质保描述不同）
const baseFeatures = (warranty) => [
  { text: '适配99%车型', icon: IconCheck },
  { text: '专业上门安装', icon: IconTool },
  { text: '7*15h 响应', icon: IconClock },
  { text: warranty, icon: IconVerified },
  { text: '终身免费流量 & OTA', icon: IconWifi },
]

const PRODUCTS = {
  jianshi: {
    features: baseFeatures('2年质保只换不修'),
    highlightCards: [
      { title: 'IP67/IP65 防护', desc: '枪头IP67 / 桩体IP65', icon: IconIP },
      { title: '25重安全防护', desc: '过压/过流/漏电/防雷等', icon: IconShield },
      { title: '-30℃ ~ 50℃', desc: '极端温度稳定运行', icon: IconTemp },
      { title: '智能互联', desc: '蓝牙 / 4G / 充满自停', icon: IconConnect },
    ],
    appFeatures: [
      { title: 'APP 远程管理', desc: '无论身在何处，一键启动/停止充电，实时查看进度。', icon: IconApp },
      { title: '预约错峰充电', desc: '设置定时任务，利用夜间低谷电价，为您省钱。', icon: IconTime },
      { title: '私桩共享', desc: '闲置时可授权亲友使用，或共享赚取收益。', icon: IconShare },
    ],
    specs: [
      { label: '产品型号', value: 'A1607-GB01-101' },
      { label: '产品名称', value: '坚石Pro交流充电桩' },
      { label: '最大功率', value: '7 kW', highlight: true },
      { label: '输出电流', value: '32A' },
      { label: '输入/输出电压', value: 'AC 220V ± 20%' },
      { label: '外观尺寸', value: '374.8 * 186.5 * 121 mm' },
      { label: '设备重量', value: '3.1kg' },
      { label: '外壳材质', value: 'PC + ABS（V0级阻燃）' },
      { label: '防护等级', value: 'IP65 (适合室内/室外)' },
      { label: '工作温度', value: '-30°C ~ 50°C' },
      { label: '线缆长度', value: '5 米' },
      { label: '安装方式', value: '壁挂式 / 立柱式' },
      { label: '执行标准', value: 'GB 39752-2024 / GB 44263-2024' },
      { label: '安全设计', value: '漏电保护、防反接保护、接地保护、过温保护、雷电保护、静电保护、防盗充保护、急停保护、浪涌保护、过充保护等25重主动安全防护。' },
    ],
  },

  xingchen: {
    features: baseFeatures('2年质保只换不修'),
    highlightCards: [
      { title: 'IP67 / IP65', desc: '枪头IP67 / 桩体IP65', icon: IconIP },
      { title: '智能高清屏显', desc: '充电状态 实时可见', icon: IconScreen },
      { title: '钢化玻璃+合金', desc: '高规格用料 曜石黑', icon: IconMetal },
      { title: '充满自停', desc: '蓝牙 / 4G 全支持', icon: IconAutoStop },
    ],
    appFeatures: [
      { title: '充电数据可视', desc: '充电状态实时屏显，APP端数据直观展示。', icon: IconApp },
      { title: '预约充电', desc: '设置定时任务，利用夜间低谷电价，为您省钱。', icon: IconTime },
      { title: '故障监测通知', desc: '异常情况实时推送，全方位守护充电安全。', icon: IconBell },
    ],
    specs: [
      { label: '产品型号', value: 'A1507-GB01-001' },
      { label: '产品名称', value: '星辰交流充电桩' },
      { label: '最大功率', value: '7 kW', highlight: true },
      { label: '输出电流', value: '32A' },
      { label: '输入/输出电压', value: 'AC 220V ± 20%' },
      { label: '外观尺寸', value: '365 * 235 * 120 (mm)' },
      { label: '设备重量', value: '4.9kg' },
      { label: '外壳材质', value: '钢化玻璃 + 合金 + PC' },
      { label: '防护等级', value: 'IP65 (适合室内/室外)' },
      { label: '工作温度', value: '-30°C ~ 50°C' },
      { label: '线缆长度', value: '6m / 7.5m' },
      { label: '安装方式', value: '壁挂式 / 立柱式' },
      { label: '执行标准', value: 'GB 39752-2024 / GB 44263-2024' },
      { label: '安全设计', value: '漏电保护、防反接保护、接地保护、过温保护、雷电保护、静电保护、防盗充保护、急停保护、浪涌保护、过充保护等28重主动安全防护。' },
    ],
  },

  xingyao: {
    features: baseFeatures('4年质保只换不修'),
    highlightCards: [
      { title: '7寸智能触控', desc: '大屏交互 如手机般流畅', icon: IconTouch },
      { title: '28重安全防护', desc: '新增枪温保护/浪涌/防盗充等防护', icon: IconShield },
      { title: '特斯拉一键开盖', desc: '智能感应 便捷体验', icon: IconCar },
      { title: '智能语音助手', desc: '语音播报 & 充满自停', icon: IconVoice },
    ],
    appFeatures: [
      { title: '个性化定制', desc: '自定义屏保画面，可调节流光氛围灯。', icon: IconCustom },
      { title: '智能语音播报', desc: '充电状态语音实时提醒，人机交互更友好。', icon: IconSpeaker },
      { title: '全数据监控', desc: 'APP远程管理，实时屏显，一切尽在掌握。', icon: IconApp },
    ],
    specs: [
      { label: '产品型号', value: 'A1507-GB01-101 <span class="mx-2 text-gray-600">/</span> A1521-GB03-101' },
      { label: '产品名称', value: '星耀交流充电桩' },
      { label: '最大功率', value: '<span class="text-brand font-bold">7 kW</span> <span class="mx-2 text-gray-600">/</span> <span class="text-brand font-bold">21 kW</span>' },
      { label: '输出电流', value: '32A' },
      { label: '输入输出电压', value: 'AC 220V ± 20% <span class="mx-2 text-gray-600">/</span> AC 380V ± 20%' },
      { label: '外观尺寸', value: '365 * 235 * 120 (mm)' },
      { label: '设备重量', value: '5.6kg <span class="mx-2 text-gray-600">/</span> 7kg' },
      { label: '外壳材质', value: '钢化玻璃 + 合金 + PC' },
      { label: '防护等级', value: 'IP65 (适合室内/室外)' },
      { label: '工作温度', value: '-30°C ~ 50°C' },
      { label: '线缆长度', value: '7.5 米' },
      { label: '安装方式', value: '壁挂式 / 立柱式' },
      { label: '执行标准', value: 'GB 39752-2024 / GB 44263-2024' },
      { label: '安全设计', value: '漏电保护、防反接保护、接地保护、过温保护、雷电保护、静电保护、防盗充保护、急停保护、浪涌保护、过充保护等28重主动安全防护。' },
    ],
  },

  // 磐石：Pro / Max 双版本，页面按 activeModel 选择
  panshi: {
    features: baseFeatures('2年质保只换不修'),
    appFeatures: [
      { title: 'APP 远程管理', desc: '无论身在何处，一键启动/停止充电，实时查看进度。', icon: IconApp },
      { title: '预约错峰充电', desc: '设置定时任务，利用夜间低谷电价，为您省钱。', icon: IconTime },
      { title: '故障监测通知', desc: '异常情况实时推送通知，安心无忧。', icon: IconAlert },
    ],
    pro: {
      highlightCards: [
        { title: 'IP67 / IP65', desc: '枪头IP67 / 桩体IP65', icon: IconIP },
        { title: '智能呼吸灯', desc: '简约交互 状态直观', icon: IconLight },
        { title: '26重安全防护', desc: '过压/过流/漏电/防雷等', icon: IconShield },
        { title: '智能互联', desc: '蓝牙 / 4G / 充满自停', icon: IconConnect },
      ],
      specs: [
        { label: '产品型号', value: 'A1607-GB01-001' },
        { label: '产品名称', value: '磐石Pro交流充电桩' },
        { label: '显示配置', value: '智能呼吸灯', highlight: true },
        { label: '外观尺寸', value: '374.8 * 186.5 * 121 (mm)' },
        { label: '设备重量', value: '3.6kg' },
        { label: '外壳材质', value: 'PC+ABS（V0级阻燃）' },
        { label: '线缆长度', value: '6m' },
        { label: '最大功率', value: '7 kW' },
        { label: '输出电流', value: '32A' },
        { label: '输入/输出电压', value: 'AC 220V ± 20%' },
        { label: '防护等级', value: 'IP65 (适合室内/室外)' },
        { label: '工作温度', value: '-30°C ~ 50°C' },
        { label: '工作海拔', value: '&lt; 4000m' },
        { label: '执行标准', value: 'GB 39752-2024 / GB 44263-2024' },
        { label: '安全设计', value: '漏电保护、防反接保护、接地保护、过温保护、雷电保护、静电保护、防盗充保护、急停保护、浪涌保护、过充保护等26重主动安全防护。' },
      ],
    },
    max: {
      highlightCards: [
        { title: 'IP67 / IP65', desc: '枪头IP67 / 桩体IP65', icon: IconIP },
        { title: '智能高清屏显', desc: '状态数据 可视化', icon: IconScreen },
        { title: '28重安全防护', desc: '过压/过流/漏电/防雷等', icon: IconShield },
        { title: '智能互联', desc: '蓝牙 / 4G / 充满自停', icon: IconConnect },
      ],
      specs: [
        { label: '产品型号', value: 'A1607-GB01-002' },
        { label: '产品名称', value: '磐石Max交流充电桩' },
        { label: '显示配置', value: '智能高清屏显', highlight: true },
        { label: '外观尺寸', value: '374.8 * 186.5 * 121 (mm)' },
        { label: '设备重量', value: '3.6kg' },
        { label: '外壳材质', value: 'PC+ABS（V0级阻燃）' },
        { label: '线缆长度', value: '6m' },
        { label: '最大功率', value: '7 kW' },
        { label: '输出电流', value: '32A' },
        { label: '输入/输出电压', value: 'AC 220V ± 20%' },
        { label: '防护等级', value: 'IP65 (适合室内/室外)' },
        { label: '工作温度', value: '-30°C ~ 50°C' },
        { label: '工作海拔', value: '&lt; 4000m' },
        { label: '执行标准', value: 'GB 39752-2024 / GB 44263-2024' },
        { label: '安全设计', value: '漏电保护、防反接保护、接地保护、过温保护、雷电保护、静电保护、防盗充保护、急停保护、浪涌保护、过充保护等28重主动安全防护。' },
      ],
    },
  },
}

export const useProducts = (key) => PRODUCTS[key]
