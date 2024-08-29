<script setup lang="ts">
import { format } from 'date-fns'

const date = defineModel<Date | undefined>({
  default: undefined,
})
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="date ? format(date, 'd MMM, yyy') : $t('please-select-the-date')" />
    <template #panel="{ close }">
      <UiDatePicker v-model="date" is-required locale="en" @close="close" />
    </template>
  </UPopover>
</template>
