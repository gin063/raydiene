<template>
  <span :class="{ scrambling: busy }">{{ out }}</span>
</template>

<script setup>
/**
 * 《黑客帝国》式代码乱码定格：文本先刷成雨帘字符，再从左往右逐字落定。
 *
 * 字符池按目标字符类型选：
 *  - 中日韩字符 → **全角片假名**（Matrix 的标志性字形，且全角宽度与中文一致）
 *  - 其余 → 数字 + 大写字母（等宽）
 * 宽度必须对齐，否则行宽会跳动，把卡片里其他内容推着走。
 */
const props = defineProps({
  text: { type: String, default: "" },
  duration: { type: Number, default: 560 },
  delay: { type: Number, default: 0 },
  /** 递增即重跑一遍。用于让**内容不变**的文本（表头、按钮）也参与切换动效 */
  trigger: { type: Number, default: 0 },
});

const KANA = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const ASCII = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
// 分隔符与单位符号不参与乱码，否则读起来像坏字
const KEEP = new Set([
  " ", "·", "/", ".", "-", "+", "~", "～", "℃", "%",
  "（", "）", "(", ")", "＋", "－", "◆", "◎", "✦", "»", "、", "，", "。",
]);

const out = ref(props.text);
const busy = ref(false);
let raf = 0;

const isWide = (c) => /[　-鿿＀-￯]/.test(c);
const noise = (c) => {
  const pool = isWide(c) ? KANA : ASCII;
  return pool[(Math.random() * pool.length) | 0];
};

function run() {
  const target = props.text ?? "";
  cancelAnimationFrame(raf);
  const chars = [...target];
  if (!chars.length) { out.value = target; busy.value = false; return; }

  busy.value = true;
  const start = performance.now() + props.delay;
  const step = () => {
    const t = (performance.now() - start) / props.duration;
    if (t < 0) { raf = requestAnimationFrame(step); return; }
    if (t >= 1) { out.value = target; busy.value = false; return; }
    // ×1.35 让尾部提前落定，收尾不拖沓
    const settled = t * chars.length * 1.35;
    out.value = chars
      .map((c, i) => (i < settled || KEEP.has(c) ? c : noise(c)))
      .join("");
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

watch(() => [props.text, props.trigger], run);

onMounted(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    out.value = props.text;
    return;
  }
  run();
});

onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>

<style scoped>
span {
  transition: opacity 240ms ease-out;
}
/*
  只压一点透明度，**不覆写 color** ——
  上一版统一改成品牌色，把本该是深墨色的产品名和参数值也染蓝了
*/
.scrambling {
  opacity: 0.82;
  transition: none;
}
</style>
