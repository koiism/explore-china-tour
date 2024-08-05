<script setup lang="ts">
import { format } from 'date-fns'
import type { TProduct, TTicketOption } from '~/sanity/queries'

const props = defineProps<{
  product: TProduct
}>()
const cart = ref<ICart>(defaultCart.value)
cart.value.productId = props.product._id
provide(CART_KEY, cart)
const ticketName = computed<TTicketOption | undefined>(() => {
  return cart.value.ticketName
    ? props.product.ticketOptions.find(option => option.title === cart.value.ticketName)
    : undefined
})
const options = computed(() => {
  return ticketName.value?.entryTime?.map(time => ({
    label: time,
    value: time,
  }))
})
watch(options, () => {
  if (options.value?.length) {
    cart.value.planTime = options.value[0].value
  }
})
const enableBook = computed(() => {
  return cart.value.planDate && cart.value.ticketName && cart.value.planTime && cart.value.priceInfo?.length
})
const target = useParentElement()
const targetIsVisible = useElementVisibility(target)
function goCheckAvailability() {
  target.value?.scrollIntoView({ behavior: 'smooth' })
}
const sb = useSupabase()
const isCheckingAvailability = ref(false)
const router = useRouter()
async function checkAvailability() {
  if (isCheckingAvailability.value || !cart.value.planDate || !cart.value.ticketName || !cart.value.planTime || !cart.value.priceInfo?.length) {
    return
  }
  isCheckingAvailability.value = true
  const { data: order } = await sb.from('order').insert({
    ...cart.value,
    planDate: format(cart.value.planDate, 'yyyy-MM-dd'),
  }).select()
  if (order?.[0]) {
    const { orderId } = order[0]
    router.push(`/confirm/${orderId}`)
  }
  isCheckingAvailability.value = false
}
</script>

<script lang="ts">
export const CART_KEY = Symbol('cart')
export const defaultCart: Ref<ICart> = ref({
  productId: undefined,
  planDate: undefined,
  planTime: undefined,
  ticketName: undefined,
  priceInfo: [],
})
export interface ITicket {
  priceOptionId?: string
  quantity?: number
  price?: number
  title?: string
}
export interface ICart {
  productId?: string
  planDate?: Date
  planTime?: string
  ticketName?: string
  priceInfo: Required<ITicket>[]
}
</script>

<template>
  <UiSection v-if="product?.ticketOptions" :title="$t('book-now')">
    <UiSectionCard :title="$t('please-select-the-date')">
      <UiDateSelectBtn v-model="cart.planDate" />
    </UiSectionCard>
    <Transition name="slide-fade">
      <UiSectionCard v-show="cart.planDate" :title="$t('please-select-a-ticket-option')">
        <BusinessProductTicketOptionGroup :options="product.ticketOptions" />
      </UiSectionCard>
    </Transition>
    <Transition name="slide-fade">
      <BusinessProductticketNameInfo v-show="cart.ticketName" :options="product.ticketOptions" />
    </Transition>
    <Transition name="slide-fade">
      <UiSectionCard v-show="cart.ticketName" :title="$t('select-an-entry-time')">
        <URadioGroup v-model="cart.planTime" :options="options" />
      </UiSectionCard>
    </Transition>
    <Transition name="slide-fade">
      <UiSectionCard v-show="cart.ticketName" :title="$t('select-number-of-people')">
        <BusinessProductTicketsSelector v-model="cart.priceInfo" :options="product.ticketOptions" />
      </UiSectionCard>
    </Transition>
    <div w-full flex items-center justify-center p-2 md:p-4>
      <UButton :color="enableBook ? 'primary' : 'gray'" variant="solid" :disabled="!enableBook" block :ui="{ rounded: 'rounded-full', font: 'font-bold' }" :loading="isCheckingAvailability" @click="checkAvailability">
        {{ $t('check-availability') }}
      </UButton>
    </div>
    <Teleport to="body">
      <Transition name="slide-down">
        <div v-if="!targetIsVisible" fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center p-4 md:hidden bg-base>
          <UButton :ui="{ rounded: 'rounded-full', font: 'font-bold' }" block @click="goCheckAvailability">
            {{ $t('check-availability') }}
          </UButton>
        </div>
      </Transition>
    </Teleport>
  </UiSection>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
