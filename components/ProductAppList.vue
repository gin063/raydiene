<template>
    <ul class="space-y-6">
        <li v-for="(item, i) in items" :key="i" class="flex items-start gap-4">
            <div
                class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-500 bg-brand/10 text-brand">
                <component :is="item.icon" class="w-6 h-6" />
            </div>
            <div>
                <h4 class="text-xl font-bold text-white">{{ item.title }}</h4>
                <p class="text-gray-500 text-sm mt-1">{{ item.desc }}</p>
            </div>
        </li>
    </ul>
</template>

<script setup>
defineProps({
    items: { type: Array, required: true },
});
</script>
