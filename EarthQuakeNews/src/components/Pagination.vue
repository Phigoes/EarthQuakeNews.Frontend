<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    loading: { type: Boolean, default: false }
});

const emit = defineEmits(['pageChange']);

const maxVisiblePages = 7;

const pageNumbers = computed(() => {
    if (props.totalPages <= maxVisiblePages) return Array.from({ length: props.totalPages }, (_, i) => i + 1);

    const startPage = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(props.totalPages, startPage + maxVisiblePages - 1);
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    
    return pages;
});

const changePage = (page: number) => {
    if (page >= 1 && page <= props.totalPages && !props.loading) {
        emit('pageChange', page);
    }
};

const buttonClasses = computed(() => ({
    normal: `px-6 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg border
            border-black-200 cursor-pointer hover:bg-black-50 disabled:opacity-50
            disabled:hover:bg-transparent disabled:cursor-not-allowed`,
    actived: `bg-gray-700 cursor-pointer text-white border-gray-700`
}));
</script>

<template>
    <button @click="changePage(1)" :disabled="currentPage === 1 || loading" :class="buttonClasses.normal">
        <<
    </button>
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1 || loading" :class="buttonClasses.normal">
        <
    </button>
    <button v-for="page in pageNumbers" :key="page" @click="changePage(page)" :disabled="loading" :class="[buttonClasses.normal, currentPage === page ? buttonClasses.actived : '']">
        {{ page }}
    </button>
    <div v-if="currentPage !== totalPages && currentPage <= totalPages - 4">
        <span class="mr-2">...</span>
        <button @click="changePage(totalPages)" :disabled="currentPage === totalPages || loading" :class="buttonClasses.normal">
            {{ totalPages }}
        </button>
    </div>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages || loading" :class="buttonClasses.normal">
        >
    </button>
    <button @click="changePage(totalPages)" :disabled="currentPage === totalPages || loading" :class="buttonClasses.normal">
        >>
    </button>
</template>