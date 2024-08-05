<script setup lang="ts">
import { getDaysInMonth } from 'date-fns'

const model = defineModel({
  type: String,
  default: undefined,
})
const now = new Date()
const year = ref(model.value.split('-')[0] ?? '')
const yearOptions = Array.from({ length: now.getFullYear() - 1900 + 1 }, (_, i) => (1900 + i).toString()).sort(() => -1)
const month = ref(model.value.split('-')[1] ?? '')
const monthOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
const day = ref(model.value.split('-')[2] ?? '')
const dayOptions = computed(() => Array.from({ length: getDaysInMonth(new Date(Number(year.value), Number(month.value) - 1)) }, (_, i) => (i + 1).toString()))
effect(() => {
  model.value = `${year.value}-${month.value.padStart(2, '0')}-${day.value.padStart(2, '0')}`
})
</script>

<template>
  <div flex gap-2>
    <UInputMenu v-model="year" :options="yearOptions" :placeholder="$t('year')" />
    <UInputMenu v-model="month" :options="monthOptions" :placeholder="$t('month')" />
    <UInputMenu v-model="day" :options="dayOptions" :placeholder="$t('day')" />
  </div>
</template>

<style scoped>

</style>
