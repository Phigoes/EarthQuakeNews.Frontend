<script setup lang="ts">
import type { Earthquake } from '@/types/earthquake';
import SearchForm from './SearchForm.vue';
import { computed, ref } from 'vue';
import FilterRadios from './FilterRadios.vue';
import FilterDropdown from './FilterDropdown.vue';
import Pagination from './Pagination.vue';
import ItemsPerPageDropdown from './ItemsPerPageDropdown.vue';

const searchFilter = ref('');
const radioFilter = ref('');
const citiesFilter = ref<string[]>([]);

const sortKey = ref<string | null>(null);
const sortOrder = ref<'asc' | 'desc'>('asc');

const props = defineProps({
    items: { type: Array<Earthquake>, required: true },
    loading: { type: Boolean, required: true },
    error: { type: String, required: false, default: '' }
}) 

const filteredItems = computed(() => {
    let items = props.items;

    switch (radioFilter.value) {
        case 'today':
            items = items.filter(item => new Date(item.earthquakeTime).getUTCDate() === new Date().getUTCDate());
            break;
        case 'past':
            items = items.filter(item => new Date(item.earthquakeTime).getUTCDate() < new Date().getUTCDate());
            break;
    }

    if (citiesFilter.value.length) {
        items = items.filter(item => 
            citiesFilter.value.includes(item.place.split(',').length > 1 ? item.place.split(',')[item.place.split(',').length - 1].trim() : item.place.trim()));
    }

    if (searchFilter.value !== '') {
        items = items.filter(item => 
            item.place.toLowerCase().includes(searchFilter.value) || item.magnitude.toFixed(2).toString().includes(searchFilter.value));
    }

    if (sortKey.value) {
        items = [...items].sort((a, b) => {
            let valA = a[sortKey.value as keyof Earthquake];
            let valB = b[sortKey.value as keyof Earthquake];

            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortOrder.value === 'asc' ? valA - valB : valB - valA;
            }

            if (typeof valA === 'string' && typeof valB === 'string') {
                return sortOrder.value === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }

            return 0;
        });
    }

    return items;
});

const sortBy = (key: string) => {
    if (sortKey.value === key) {
        if (sortOrder.value === 'asc') {
            sortOrder.value = 'desc';
        } else {
            sortKey.value = null;
            sortOrder.value = 'asc';
        }
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
};

const handleSearch = (search: string) => {
    searchFilter.value = search;
};

const handleRadioFilter = (filter: string) => {
    radioFilter.value = filter;
};

const handleCheckboxFilter = (filter: string) => {
    if (citiesFilter.value.includes(filter)) {
        return citiesFilter.value.splice(citiesFilter.value.indexOf(filter), 1);
    }
    citiesFilter.value.push(filter);
};

const currentPage = ref<number>(1);
const totalItems = computed(() => filteredItems.value.length);
const itemsPerPage = ref<number>(10);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

const handlePageChange = (page: number) => {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value));
};

const handleItemsPerChangeChange = (items: number) => {
    itemsPerPage.value = items;
    currentPage.value = 1;
};
</script>

<template>
    <div class="bg-white relative border rounded-lg max-w-7xl m-auto">
        <div class="flex items-center justify-between">
            <SearchForm @search="handleSearch"/>
            <div class="flex items-center justify-end text-sm font-semibold">
                <FilterRadios @filter="handleRadioFilter" />
                <FilterDropdown :items="items" @filter="handleCheckboxFilter"/>
            </div>
        </div>
        <div>
            <span class="px-4 font-medium text-gray-600">Total: {{ filteredItems.length }} earthquake(s)</span>
        </div>
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th @click="sortBy('magnitude')" class="px-4 py-3 cursor-pointer">
                        Magnitude <span v-if="sortKey === 'magnitude'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th @click="sortBy('place')" class="px-4 py-3 cursor-pointer">
                        Place <span v-if="sortKey === 'place'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th @click="sortBy('latitude')" class="px-4 py-3 cursor-pointer">
                        Latitude <span v-if="sortKey === 'latitude'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th @click="sortBy('longitude')" class="px-4 py-3 cursor-pointer">
                        Longitude <span v-if="sortKey === 'longitude'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th @click="sortBy('kmDepth')" class="px-4 py-3 cursor-pointer">
                        Km. Depth <span v-if="sortKey === 'kmDepth'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th @click="sortBy('earthquakeTime')" class="px-4 py-3 cursor-pointer">
                        Time <span v-if="sortKey === 'earthquakeTime'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th class="px-4 py-3">
                        <span class="sr-only">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loading">
                    <td class="py-8" colspan="7">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"></div>
                    </td>
                </tr>
                <tr v-else-if="error" class="text-center py-8 text-red-500 bg-red-50 rounded-lg border border-red-200">
                    <td class="py-8" colspan="7">
                        {{ error }}
                    </td>
                </tr>
                <tr v-else-if="filteredItems.length === 0" class="text-center py-8">
                    <td class="py-8" colspan="7">
                        There are no earthquake data or search criteria found nothing
                    </td>
                </tr>
                <tr v-else v-for="item in filteredItems.slice((currentPage - 1) * itemsPerPage, (itemsPerPage * currentPage))" :key="item.id" class="border-b border-gray-200">
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.magnitude.toFixed(2) }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ item.place }}</td>
                    <td class="px-4 py-3">{{ item.latitude.toFixed(3) }}°N</td>
                    <td class="px-4 py-3">{{ item.longitude.toFixed(3) }}°W</td>
                    <td class="px-4 py-3">{{ item.kmDepth }} km</td>
                    <td class="px-4 py-3">{{ new Date(item.earthquakeTime).toUTCString() }}</td>
                    <td class="px-4 py-3 flex items-center justify-end">
                        <a :href="item.url" target="_blank" class="text-blue-500 hover:underline">Details</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="totalPages > 1" class="mt-4 mb-2 flex justify-center items-center gap-2">
            <Pagination :current-page="currentPage" :total-pages="totalPages" :loading="loading" @page-change="handlePageChange"/>
            <ItemsPerPageDropdown :items-per-page="itemsPerPage" @items-per-page-change="handleItemsPerChangeChange"/>
        </div>
    </div>
</template>