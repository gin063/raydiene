<template>
    <div class="grid grid-cols-2 gap-6">
        <div v-for="(item, index) in items" :key="index"
            class="p-6 bg-white/5 rounded-xl border border-white/5 transition-colors duration-500 hover:border-brand/30">
            <div class="mb-2 transition-colors duration-500 text-brand">
                <component :is="item.icon" class="w-8 h-8" />
            </div>
            <h4 class="text-lg font-bold mb-1">{{ item.title }}</h4>
            <p class="text-xs text-gray-400">{{ item.desc }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    items: { type: Array, required: true }
    // 数据格式: [{ title, desc, icon }]
})
</script>