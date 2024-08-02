<script setup lang="ts">
import { format } from 'date-fns'
import { useCart } from './composables/useCart'
import type { TTicketOption } from '~/sanity/queries'

const props = defineProps<{
  option: TTicketOption
  disable?: boolean
}>()
const cart = useCart()
const isSelected = computed(() => {
  return cart.value.selectedTicketOption === props.option.title
})
watch(() => props.disable, () => {
  if (props.disable && isSelected.value) {
    cart.value.selectedTicketOption = undefined
  }
})
function onTicketSelected(option: TTicketOption) {
  cart.value.selectedTicketOption = option.title
}
const color = computed(() => {
  return isSelected.value ? 'primary' : 'white'
})
</script>

<template>
  <UButton
    :color="color" variant="solid"
    :disabled="disable" @click="onTicketSelected(option)"
  >
    {{ option.title }}
  </UButton>
</template>

<style scoped>

</style>
