<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DataTable from '../components/DataTable.vue';
import { getEarthquakes } from '../services/EarthquakeService';
import type { Earthquake } from '../types/earthquake';

const items = ref<Earthquake[]>([])
const loading = ref<boolean>(true)
const error = ref<string | undefined>()

onMounted(async () => {
    try {
        loading.value = true
        error.value = ''

        const response = await getEarthquakes();
        items.value = response;
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
        loading.value = false
    }
})
</script>
<template>
    <DataTable :items="items" :loading="loading" :error="error"/>
</template>