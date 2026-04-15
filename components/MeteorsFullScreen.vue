<script lang="ts" setup>
import { onMounted, ref } from 'vue'

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

const props = defineProps({
    count: {
        type: Number,
        default: 40, // 全屏默认 40 颗
    },
    class: String,
});

// 使用响应式数据，确保在客户端获取真实屏幕宽高后生成坐标，避免 SSR 报错
const meteorStyles = ref<{ top: string; left: string; animationDelay: string; animationDuration: string }[]>([]);

onMounted(() => {
    // 扩大流星的生成舞台，确保全屏都有流星，且从各个位置自然划入
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    meteorStyles.value = Array.from({ length: props.count }).map(() => ({
        // Y轴：从屏幕上方外侧一直到屏幕中部随机生成
        top: `${Math.floor(Math.random() * screenHeight * 1.2) - 200}px`,
        // X轴：因为流星向左下划，所以X轴要向右多延伸一些（比如 1.5 倍屏宽）
        left: `${Math.floor(Math.random() * screenWidth * 1.5)}px`,
        // 随机延迟起步时间
        animationDelay: `${Math.random() * 2 + 0.2}s`,
        // 全屏划过的距离更长，所以把动画时间放慢，显得更宏大深邃 (4s 到 12s)
        animationDuration: `${Math.floor(Math.random() * 8 + 4)}s`,
    }));
});
</script>

<template>
    <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <span v-for="(style, index) in meteorStyles" :key="`meteor-fullscreen-${index}`" :style="style" :class="cn(
            // 使用独立的纯净动画类名 pure-meteor-fullscreen，防止与卡片版冲突
            `pure-meteor-fullscreen absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']`,
            $props.class,
        )
            " />
    </div>
</template>

<style scoped>
.pure-meteor-fullscreen {
    animation: meteor-fullscreen linear infinite;
}

@keyframes meteor-fullscreen {
    0% {
        transform: rotate(215deg) translateX(0);
        opacity: 1;
    }

    70% {
        opacity: 1;
    }

    100% {
        /* 加大位移至 -2500px，确保无论屏幕多宽，流星都能完整划出屏幕 */
        transform: rotate(215deg) translateX(-2500px);
        opacity: 0;
    }
}
</style>