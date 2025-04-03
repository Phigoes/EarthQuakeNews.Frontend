<script setup lang="ts">
import { ref } from 'vue';

const itemsPerPage = ref<number>(10)
const emit = defineEmits(['itemsPerPageChange']);

const items = (e: any) => {
    emit('itemsPerPageChange', e.target.value);
};
</script>

<template>
    <select @change="items" v-model="itemsPerPage" class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white">
        <option selected value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
    </select>
</template>