<script setup lang="ts">
import { format } from 'date-fns'
import { useCart } from './composables/useCart'
import type { TTicketOption } from '~/sanity/queries'

const props = defineProps<{
  options: TTicketOption[]
}>()
const cart = useCart()
function isTicketAvailable(option: TTicketOption) {
  if (!cart.value.planDate) {
    return false
  }
  const dateStr = cart.value.planDate ? format(cart.value.planDate, 'yyyy-MM-dd') : ''
  return isDateValid(option.dateRange?.startDate, option.dateRange?.endDate, dateStr, option.dateRange?.closedDate)
}

const ticketOptions = computed(() => {
  return props.options.filter((option) => {
    return isTicketAvailable(option)
  }).concat(props.options.filter((option) => {
    return !isTicketAvailable(option)
  }))
})
</script>

<template>
  <div flex flex-wrap gap-2>
    <BusinessProductTicketOption
      v-for="(option) in ticketOptions" :key="option.title"
      :option="option" :disable="!isTicketAvailable(option)"
    />
  </div>
</template>

<style scoped>
</style>
