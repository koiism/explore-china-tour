<script setup lang="ts">
import type { TProduct, TTicketOption } from '~/sanity/queries'

const props = defineProps<{
  product: TProduct
}>()
const cart = ref<ICart>(defaultCart.value)
provide(CART_KEY, cart)
const selectedTicketOption = computed<TTicketOption | undefined>(() => {
  return cart.value.selectedTicketOption
    ? props.product.ticketOptions.find(option => option.title === cart.value.selectedTicketOption)
    : undefined
})
const options = computed(() => {
  return selectedTicketOption.value?.entryTime?.map(time => ({
    label: time,
    value: time,
  }))
})
watch(options, () => {
  if (options.value?.length) {
    cart.value.selectedEntryTime = options.value[0].value
  }
})
const enableBook = computed(() => {
  return cart.value.date && cart.value.selectedTicketOption && cart.value.selectedEntryTime && cart.value.tickets?.length
})
const target = useParentElement()
const targetIsVisible = useElementVisibility(target)
function checkAvailability() {
  target.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<script lang="ts">
export const CART_KEY = Symbol('cart')
export const defaultCart = ref({
  date: undefined,
  selectedTicketOption: undefined,
  selectedEntryTime: undefined,
  tickets: [],
})
export interface ITicket {
  priceOptionId?: string
  quantity?: number
  price?: number
}
export interface ICart {
  date?: Date
  selectedTicketOption?: string
  selectedEntryTime?: string
  tickets?: ITicket[]
}
</script>

<template>
  <UiSection v-if="product?.ticketOptions" :title="$t('book-now')">
    <UiSectionCard :title="$t('please-select-the-date')">
      <UiDateSelectBtn v-model="cart.date" />
    </UiSectionCard>
    <Transition name="slide-fade">
      <UiSectionCard v-show="cart.date" :title="$t('please-select-a-ticket-option')">
        <BusinessProductTicketOptionGroup :options="product.ticketOptions" :date="cart.date" />
      </UiSectionCard>
    </Transition>
    <Transition name="slide-fade">
      <BusinessProductSelectedTicketOptionInfo v-show="cart.selectedTicketOption" :options="product.ticketOptions" />
    </Transition>
    <Transition name="slide-fade">
      <UiSectionCard v-show="cart.selectedTicketOption" :title="$t('select-an-entry-time')">
        <URadioGroup v-model="cart.selectedEntryTime" :options="options" />
      </UiSectionCard>
    </Transition>
    <Transition name="slide-fade">
      <UiSectionCard v-show="cart.selectedTicketOption" :title="$t('select-number-of-people')">
        <BusinessProductTicketsSelector v-model="cart.tickets" :options="product.ticketOptions" />
      </UiSectionCard>
    </Transition>
    <div w-full flex items-center justify-center p-2 md:p-4>
      <UButton :color="enableBook ? 'primary' : 'gray'" variant="solid" :disabled="!enableBook" block :ui="{ rounded: 'rounded-full', font: 'font-bold' }">
        {{ $t('check-availability') }}
      </UButton>
    </div>
    <Teleport to="body">
      <Transition name="slide-down">
        <div v-if="!targetIsVisible" fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center p-4 md:hidden bg-base>
          <UButton :ui="{ rounded: 'rounded-full', font: 'font-bold' }" block @click="checkAvailability">
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
