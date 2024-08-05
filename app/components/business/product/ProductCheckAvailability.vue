<script setup lang="ts">
import type { TProduct } from '~/sanity/queries'

const props = defineProps<{
  product: TProduct
  targetElement?: HTMLElement
}>()
const minimumPrice = computed(() => Math.min(...props.product.ticketOptions.map((option) => {
  const price = Math.min(...option.priceOptions.map(priceOption => priceOption.price!))
  return price
})))
function checkAvailability() {
  props.targetElement?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <aside flex-none>
    <div relative flex items-center gap-4 p-8 before:absolute before:left-0 before:top-0 before:h-1 before:w-full card-base before:bg-primary before:content-empty>
      <div flex flex-col items-start justify-start gap-0>
        <div text-common>
          {{ $t('bottom-price') }}
        </div>
        <div text-subtitle>
          {{ $t('dollar') }} {{ minimumPrice.toFixed(2) }}
        </div>
        <div text-common>
          {{ $t('per-person') }}
        </div>
      </div>
      <button px-8 btn @click="checkAvailability">
        {{ $t('check-availability') }}
      </button>
    </div>
  </aside>
</template>

<style scoped>

</style>
