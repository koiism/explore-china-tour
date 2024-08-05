<script setup lang="ts">
import type { PriceOption } from 'cms/sanity.types'
import { useCart } from './composables/useCart'
import type { ITicket } from './ProductBook.vue'
import type { TTicketOption } from '~/sanity/queries'

const props = defineProps<{
  options: TTicketOption[]
}>()
const model = defineModel<Required<ITicket>[]>()
const cart = useCart()
const ticketName = computed(() => props.options.find(o => o.title === cart.value.ticketName))
const priceOptions = ref<(Required<ITicket> & PriceOption)[]>([])
watch(ticketName, () => {
  priceOptions.value = ticketName.value?.priceOptions.map(o => ({
    ...o,
    priceOptionId: o._id,
    quantity: 0,
    price: o.price!,
    title: o.title!,
  })) ?? []
})
watchEffect(() => {
  model.value = priceOptions.value.filter(o => o?.quantity).map(o => ({
    priceOptionId: o._id,
    quantity: o.quantity,
    price: o.price,
    title: o.title,
  }))
})
const totalPrice = computed(() => priceOptions.value.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0))
</script>

<template>
  <div v-if="ticketName?.priceOptions" flex flex-col gap-2>
    <div v-for="option in priceOptions" :key="option.name" w-full flex items-center justify-between gap-2>
      <div flex flex-1 flex-col>
        <div text-subtitle>
          {{ $t('dollar') }} {{ option.price }} {{ $t('per-person') }}
        </div>
        <div text-p>
          {{ option.ticketApplicability }}
        </div>
      </div>
      <div v-if="option.price" flex flex-none items-center justify-between gap-2>
        <UButtonGroup>
          <UButton icon="i-carbon-subtract" :disabled="option.quantity <= 0" @click="option.quantity--" />
          <UInput v-model="option.quantity" type="number" disabled :min="0" :max="9" w-auto text-center />
          <UButton icon="i-carbon-add" @click="option.quantity++" />
        </UButtonGroup>
      </div>
    </div>
    <div flex items-center justify-end gap-4 text-subtitle>
      <div>
        {{ $t('total-price') }}
      </div>
      <div min-w-20 text-primary>
        {{ $t('dollar') }}
        {{ totalPrice.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
