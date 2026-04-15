// plugins/vidstack.client.ts
// 仅在客户端注册 Vidstack 1.x 的 Web Components。
// .client 后缀确保不在 SSR 阶段执行（Web Components 需要浏览器环境）。

import "vidstack/player";
import "vidstack/player/ui";
import "vidstack/player/layouts/default";
import "vidstack/player/styles/default/theme.css";
import "vidstack/player/styles/default/layouts/video.css";

export default defineNuxtPlugin(() => {
  // 上述 side-effect imports 会自动注册
  // <media-player>, <media-provider>, <media-video-layout> 等所有自定义元素
});
