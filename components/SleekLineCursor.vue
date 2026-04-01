<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { onMounted, onUnmounted, ref } from "vue";

// 这是一个简易版的合并类名的函数，替代了原来的插件依赖
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

interface Props {
    friction?: number;
    trails?: number;
    size?: number;
    dampening?: number;
    tension?: number;
    class?: HTMLAttributes["class"];
}

// 电流参数配置
const props = withDefaults(defineProps<Props>(), {
    friction: 0.5,
    trails: 5,
    size: 40,
    dampening: 0.25,
    tension: 0.98,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);

interface NodeType {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

interface WaveOptions {
    phase?: number;
    offset?: number;
    frequency?: number;
    amplitude?: number;
}

interface LineOptions {
    spring: number;
}

class Wave {
    phase: number = 0;
    offset: number = 0;
    frequency: number = 0.001;
    amplitude: number = 1;
    private e: number = 0;

    constructor(options: WaveOptions = {}) {
        this.init(options);
    }

    init(options: WaveOptions): void {
        this.phase = options.phase || 0;
        this.offset = options.offset || 0;
        this.frequency = options.frequency || 0.001;
        this.amplitude = options.amplitude || 1;
    }

    update(): number {
        this.phase += this.frequency;
        this.e = this.offset + Math.sin(this.phase) * this.amplitude;
        return this.e;
    }

    value(): number {
        return this.e;
    }
}

class Node implements NodeType {
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
}

class Line {
    spring: number = 0;
    friction: number = 0;
    nodes: NodeType[] = [];

    constructor(options: LineOptions) {
        this.init(options);
    }

    init(options: LineOptions): void {
        this.spring = options.spring + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];

        for (let n = 0; n < E.size; n++) {
            const t = new Node();
            t.x = pos.x;
            t.y = pos.y;
            this.nodes.push(t);
        }
    }

    update(): void {
        let e = this.spring;
        let t = this.nodes[0];

        t.vx += (pos.x - t.x) * e;
        t.vy += (pos.y - t.y) * e;

        for (let i = 0, a = this.nodes.length; i < a; i++) {
            t = this.nodes[i];

            if (i > 0) {
                const n = this.nodes[i - 1];
                t.vx += (n.x - t.x) * e;
                t.vy += (n.y - t.y) * e;
                t.vx += n.vx * E.dampening;
                t.vy += n.vy * E.dampening;
            }

            t.vx *= this.friction;
            t.vy *= this.friction;
            t.x += t.vx;
            t.y += t.vy;
            e *= E.tension;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let e: NodeType;
        let n = this.nodes[0].x;
        let i = this.nodes[0].y;

        ctx.beginPath();
        ctx.moveTo(n, i);

        for (let a = 1, o = this.nodes.length - 1; a < o; a++) {
            e = this.nodes[a];

            const jitterAmount = 15;
            const jitterX = (Math.random() - 0.5) * jitterAmount;
            const jitterY = (Math.random() - 0.5) * jitterAmount;

            ctx.lineTo(e.x + jitterX, e.y + jitterY);
        }

        e = this.nodes[this.nodes.length - 1];
        ctx.lineTo(e.x, e.y);
        ctx.stroke();
        ctx.closePath();
    }
}

let ctx: CanvasRenderingContext2D & { running?: boolean; frame?: number };
let f: Wave;
let pos = { x: 0, y: 0 };
let lines: Line[] = [];

const E = {
    debug: true,
    friction: props.friction,
    trails: props.trails,
    size: props.size,
    dampening: props.dampening,
    tension: props.tension,
};

function createLines(): void {
    lines = [];
    for (let e = 0; e < E.trails; e++) {
        lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
    }
}

function updatePosition(e: MouseEvent | TouchEvent): void {
    if ("touches" in e) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
    } else {
        pos.x = e.clientX;
        pos.y = e.clientY;
    }
    e.preventDefault();
}

function handleTouchMove(e: TouchEvent): void {
    if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
    }
}

function render(): void {
    if (ctx.running) {
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.globalCompositeOperation = "lighter";

        const hue = Math.round(f.update());
        const color = `hsla(${hue}, 100%, 65%, 0.8)`;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;

        ctx.shadowBlur = 12;
        ctx.shadowColor = color;

        for (let t = 0; t < E.trails; t++) {
            const e = lines[t];
            e.update();
            e.draw(ctx);
        }

        ctx.shadowBlur = 0;

        ctx.frame = (ctx.frame || 0) + 1;
        window.requestAnimationFrame(render);
    }
}

function resizeCanvas(): void {
    if (ctx && ctx.canvas) {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
}

function onMouseMove(e: MouseEvent | TouchEvent): void {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchstart", onMouseMove);
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("touchmove", updatePosition);
    document.addEventListener("touchstart", handleTouchMove);
    updatePosition(e);
    createLines();
    render();
}

function handleFocus(): void {
    if (!ctx.running) {
        ctx.running = true;
        render();
    }
}

function handleBlur(): void {
    ctx.running = true;
}

function initCanvas(): void {
    const canvas = canvasRef.value;
    if (!canvas) return;

    ctx = canvas.getContext("2d") as CanvasRenderingContext2D & {
        running?: boolean;
        frame?: number;
    };

    ctx.running = true;
    ctx.frame = 1;

    // 👇 这里是颜色控制的核心魔法 👇
    f = new Wave({
        phase: Math.random() * 2 * Math.PI,

        // offset 是基础色相：220 处于纯正的蓝色区域
        offset: 220,

        // amplitude 是色相的摆动幅度：上下浮动 50。
        // 这意味着颜色会在 170 (青绿/冰蓝) 到 270 (深蓝/紫) 之间无级渐变。
        // 完美避开了红、橙、黄等暖色调！
        amplitude: 50,

        // frequency 控制颜色变化的速度。
        // 我帮你稍微调大了一点点（从 0.0015 改为 0.0025）。
        // 这样颜色渐变会更活跃细腻，不会让人觉得老停留在同一种蓝色上。
        frequency: 0.0025,
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchstart", onMouseMove);
    document.body.addEventListener("orientationchange", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    resizeCanvas();
}

function cleanup(): void {
    if (ctx) {
        ctx.running = false;
    }

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mousemove", updatePosition);
    document.removeEventListener("touchstart", onMouseMove);
    document.removeEventListener("touchstart", handleTouchMove);
    document.removeEventListener("touchmove", updatePosition);
    document.body.removeEventListener("orientationchange", resizeCanvas);
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("focus", handleFocus);
    window.removeEventListener("blur", handleBlur);
}

onMounted(() => {
    initCanvas();
});

onUnmounted(() => {
    cleanup();
});
</script>

<template>
    <canvas id="canvas" ref="canvasRef" :class="cn(`pointer-events-none fixed inset-0 z-50`, props.class)" />
</template>