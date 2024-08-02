<script setup lang="ts">
import type { ICart } from './product/ProductBook.vue'

const props = defineProps<{
  cart: ICart
}>()

const { trackEvent } = useUmami()
usePaypalButton({
  createOrder: async (_data, _actions) => {
    const orderInfo = await useFetch('/api/paypal/createOrder', {
      method: 'POST',
      body: {
        cart: props.cart,
      },
    })
    if (orderInfo.data.value?.id) {
      return orderInfo.data.value?.id
    }
    throw new Error('Error creating order')
  },
  onApprove: async (data, actions) => {
    try {
      const details = await actions.order?.capture()
      trackEvent('order-approved', details)
    }
    catch (error) {
      console.error('Error capturing payment:', error)
    }
  },
  style: {
    disableMaxWidth: true,
    color: 'black',
    shape: 'rect',
    label: 'pay',
    height: 40,
  },
})
</script>

<template>
  <div id="paypal-checkout" p-4 />
</template>

<style scoped>

</style>
