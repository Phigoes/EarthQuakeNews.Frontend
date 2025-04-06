<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['filter']);

const date = ref();

const handleDate = (modelData: any) => {
  date.value = modelData;
  emit('filter', date.value)
}

</script>

<template>
    <div class="py-3 px-4 flex items-center">
        <VueDatePicker :model-value="date" @update:model-value="handleDate" :enable-time-picker="false" />
    </div>
</template>