<script setup lang="ts">
const emit = defineEmits(['search']);

const search = (e: any) => {
    emit('search', e.target.value);
}
</script>

<template>
    <form class="py-3 px-4 flex items-center">
        <label class="sr-only">Search</label>
        <div class="relative w-full">
            <input type="text" @input="search" placeholder="Search" class="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
        </div>
    </form>
</template>