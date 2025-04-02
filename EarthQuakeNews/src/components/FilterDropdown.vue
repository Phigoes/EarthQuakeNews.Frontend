<script setup lang="ts">
import type { Earthquake } from '@/types/earthquake';
import { computed, ref } from 'vue';

const show = ref(false);
const selectedLocations = ref<string[]>([])
const emit = defineEmits(['filter']);

const props = defineProps({
    items: {
        type: Array<Earthquake>,
        required: true
    }
});

const locations = computed(() => {
    return [...new Set(props.items.map(item => item.place.split(',').length > 1 ? item.place.split(',')[item.place.split(',').length - 1].trim() : item.place.trim()))]
})

const filter = (e: any) => {
    emit('filter', e.target.value)
}

</script>

<template>
    <div class="relative flex items-center w-full px-4">
        <button @click="show = !show" class="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-400 rounded-lg hover:bg-gray-200">
            Filter
        </button>
        <div v-if="show" class="absolute top-12 right-0 z-10 w-70 p-3 bg-white rounded-lg shadow-xl">
            <h6 class="mb-3 text-sm font-medium text-gray-900">Location</h6>
            <ul class="space-y-2 text-sm">
                <li v-for="(location, index) in locations.sort((one, two) => (one > two ? 1 : -1))">
                    <input :id="`filter_option_${index}`" @change="filter" type="checkbox" :value="location" v-model="selectedLocations" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-sm">
                    <label :for="`filter_option_${index}`" class="ml-2 text-sm font-medium text-gray-900">{{ location }}</label>
                </li>
            </ul>
        </div>
    </div>
</template>