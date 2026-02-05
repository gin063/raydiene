<template>
    <div class="overflow-hidden rounded-xl border border-white/10">
        <table class="w-full text-left text-sm md:text-base">
            <tbody class="divide-y divide-white/10">
                <tr v-for="(row, index) in specs" :key="index" :class="index % 2 === 0 ? 'bg-white/5' : ''">
                    <td class="p-4 font-bold text-gray-300 w-1/3 align-top">
                        {{ row.label }}
                    </td>

                    <td class="p-4 text-white transition-all duration-300"
                        :class="{ 'text-brand font-bold': row.highlight }">
                        <span v-html="row.value"></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
// 接收父组件传来的数据
defineProps({
    specs: {
        type: Array,
        required: true,
        // 数据格式示例: [{ label: '型号', value: 'X1', highlight: false }]
    },
});
</script>
