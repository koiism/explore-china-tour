<script setup lang="ts">
import { format } from 'date-fns'
import { useCart } from './composables/useCart'
import type { TTicketOption } from '~/sanity/queries'

const props = defineProps<{
  options: TTicketOption[]
}>()
const { t } = useI18n()
const DAYS = [t('sunday'), t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday')]

const cart = useCart()

const option = computed(() => props.options.find(o => o.title === cart.value.ticketName))
function formatDate(dateStr?: string) {
  if (!dateStr) {
    return ''
  }
  const date = new Date(dateStr)
  return format(date, 'dd MMM')
}
const closedDays = computed(() => {
  return Array.from(option.value?.dateRange?.closedDate ?? '').reduce((acc, curr, index) => {
    if (curr === '0') {
      acc.push(DAYS[index])
    }
    return acc
  }, [] as string[])
})
</script>

<template>
  <div v-if="option">
    <UiSectionCard :title="$t('intro')">
      {{ option.description }}
    </UiSectionCard>
    <UiSectionCard :title="$t('valid-date')">
      {{ $t('from-mm-dd-to-mm-dd', { start: formatDate(option.dateRange?.startDate ?? '2024-01-01'), end: formatDate(option.dateRange?.endDate ?? '2024-12-31') }) }}
    </UiSectionCard>
    <UiSectionCard v-if="closedDays.length" :title="$t('closed-days')">
      {{ $t('closed-on') }}{{ closedDays.join(', ') }}
    </UiSectionCard>
  </div>
</template>

<style scoped>

</style>
