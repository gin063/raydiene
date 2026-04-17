// composables/useMediaLibrary.ts
// 媒体中心素材库 — 图片 + 视频统一数据源
// 后续新增素材只需向 images / videos 数组追加条目
// 建议图片条目填写 width / height（原始像素）以消除 Lightbox 首次切换的布局偏移

export type MediaCategory = "product" | "install" | "lifestyle" | "brand";

export interface MediaItem {
  id: string;
  kind: "image" | "video";
  src: string; // 原始高清 URL（用户右键"在新标签页打开"得到此 URL）
  thumb?: string; // 网格缩略图（图片专用，建议走 OSS resize 处理）
  poster?: string; // 视频海报图（视频专用）
  title: string;
  desc: string;
  category: MediaCategory;
  tags: string[];
  featured?: boolean; // 是否进入首屏"精选"轮播
  featuredOrder?: number; // 精选区内显式排序（越小越靠前；未指定的排在末尾；相同值按 images→videos、声明顺序兜底）
  duration?: string; // 视频 ISO 8601 时长（如 "PT2M18S"），供 JSON-LD 使用
  width?: number; // 图像原始宽度（可选，NuxtImg 透传用于 intrinsic aspect-ratio 预留空间）
  height?: number; // 图像原始高度（可选，同上）
}

const IMG_BASE = "https://assets.raydiene.cn/images/media/";
const VIDEO_BASE = "https://assets.raydiene.cn/videos/media/";

// thumb 返回"相对路径"（不带协议头、不带 x-oss-process）
// NuxtImg + aliyun provider（见 patches/@nuxt+image+2.0.0.patch）会负责拼 baseURL、加 x-oss-process、
// 并根据 NuxtImg 的 width 属性生成 resize,w_XXX 参数。尺寸控制改由模板里的 :width 决定。
const thumbOf = (filename: string) => `images/media/${filename}`;

// 原图仍返回绝对 URL，供 Lightbox 的原生 <img>/<media-player> 直接使用
const originalOf = (filename: string) => `${IMG_BASE}${filename}`;

export const useMediaLibrary = () => {
  // ============================================
  // 图片素材 — 后续按需追加
  // ============================================
  const images: MediaItem[] = [
    // --- 示例占位 · 替换为真实文件名后即可生效 ---
    {
      id: "img-001",
      kind: "image",
      src: originalOf("xingchen-hero.jpg"),
      thumb: thumbOf("xingchen-hero.jpg"),
      title: "星辰系列典雅墨绿",
      desc: "别墅车库场景，暖色氛围光映衬下的品质呈现",
      category: "product",
      tags: ["星辰系列", "产品大片"],
      featured: true,
    },
    {
      id: "img-002",
      kind: "image",
      src: originalOf("xingyao-sakura.jpg"),
      thumb: thumbOf("xingyao-sakura.jpg"),
      title: "星耀系列 · 樱花飘零",
      desc: "星耀安装在樱花树下的产品特写",
      category: "product",
      tags: ["星耀系列", "产品大片"],
      featured: true,
    },
    {
      id: "img-003",
      kind: "image",
      src: originalOf("panshi-scene-1.jpg"),
      thumb: thumbOf("panshi-scene-1.jpg"),
      title: "磐石Pro雨中静态特写",
      desc: "IP65防护等级，轻松应对户外环境",
      category: "product",
      tags: ["磐石系列", "产品特写"],
      featured: true,
    },
    {
      id: "img-004",
      kind: "image",
      src: originalOf("panshi-scene-2.jpg"),
      thumb: thumbOf("panshi-scene-2.jpg"),
      title: "磐石Pro车库安装场景",
      desc: "车库门口的磐石Pro，与温馨的暖色调融为一体",
      category: "lifestyle",
      tags: ["磐石系列", "生活方式"],
    },
    {
      id: "img-005",
      kind: "image",
      src: originalOf("jianshi-close-up-1.jpg"),
      thumb: thumbOf("jianshi-close-up-1.jpg"),
      title: "坚石Pro面板特写",
      desc: "IP65级防水防尘，简约而不简单",
      category: "product",
      tags: ["坚石系列", "产品特写"],
    },
    // ⬆ 替换以上 5 条为真实素材
    // ⬇ 继续追加剩余 ~45 张（按分类）
  ];

  // ============================================
  // 视频素材
  // ============================================
  const videos: MediaItem[] = [
    {
      id: "vid-001",
      kind: "video",
      src: `${VIDEO_BASE}xingyao-series-showcase.mp4`,
      poster: originalOf("video-poster/xingyao-showcase.jpg"),
      title: "星耀系列产品大片",
      desc: "黑曜石玻璃+金属拉丝工艺，工匠精神，用心打磨",
      category: "product",
      tags: ["星耀系列"],
      featured: true,
      featuredOrder: 1,
      duration: "PT0M44S",
    },
    {
      id: "vid-002",
      kind: "video",
      src: `${VIDEO_BASE}jianshi-series-showcase.mp4`,
      poster: originalOf("video-poster/jianshi-showcase.jpg"),
      title: "坚石系列产品大片",
      desc: "硬核防护，安全稳定；简约而不简单",
      category: "product",
      tags: ["坚石系列"],
      featured: true,
      featuredOrder: 2,
      duration: "PT0M24S",
    },
  ];

  // 精选 = 所有 featured: true 的素材
  // 排序：featuredOrder 升序（未指定视为 Infinity 排末尾），
  // 相同 featuredOrder 时按 images→videos、各自声明顺序兜底
  const featured: MediaItem[] = [...images, ...videos]
    .filter((m) => m.featured)
    .sort(
      (a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity),
    );

  return { images, videos, featured };
};
