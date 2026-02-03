<template>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
        <div v-for="(item, index) in features" :key="index" class="flex flex-col items-center gap-3 group">
            <div
                class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand transition-transform duration-700 group-hover:scale-110">
                <component :is="item.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-sm font-bold text-gray-300">{{ item.text }}</h3>
        </div>
    </div>
</template>

<script setup>
defineProps({
    features: { type: Array, required: true }
})
</script>