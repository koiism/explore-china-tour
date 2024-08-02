<script setup lang="ts">
import type { TProduct } from '~/sanity/queries'

defineProps<{
  product: TProduct
}>()
</script>

<template>
  <UiSection v-if="product?.intro" icon="i-carbon-information" :title="$t('intro')">
    <UiExpandableText :text="product.intro" />
  </UiSection>
  <UiSection v-if="product?.openingTime?.length" icon="i-carbon-time" :title="$t('opening-time')">
    <ul flex flex-col gap-2>
      <li v-for="(time, index) in product?.openingTime" :key="index">
        <h3 font-bold text-base>
          {{ time.desc }}
        </h3>
        <div text-p>
          {{ time.start }} - {{ time.end }}
        </div>
      </li>
    </ul>
  </UiSection>
  <UiSection v-if="product?.cancelRelativeTime !== 0" icon="i-carbon-rule-cancelled" :title="$t('free-cancellation')">
    {{ $t('cancellation-policy-tips', { hours: product?.cancelRelativeTime ?? 24 }) }}
  </UiSection>
  <UiSection v-else icon="i-carbon-rule-cancelled" :title="$t('cancellation-policy')">
    {{ $t('cannot-cancel') }}
  </UiSection>
  <UiSection v-if="product?.notAllowed" icon="i-carbon-error" :title="$t('not-allowed')">
    <UiContentBlocks :blocks="product.notAllowed" />
  </UiSection>
  <UiSection v-if="product?.notice" icon="i-carbon-notification" :title="$t('notice')">
    <UiContentBlocks :blocks="product.notice" />
  </UiSection>
  <UiSection v-if="product?.enterInfo" :title="$t('enter-info')">
    <UiSectionCard v-if="product.enterInfo.freeTicketPolicy" :title="$t('free-ticket-policy')">
      <UiContentBlocks :blocks="product.enterInfo.freeTicketPolicy" />
    </UiSectionCard>
    <UiSectionCard v-if="product.enterInfo.howToUseTickets" :title="$t('how-to-use-tickets')">
      <UiContentBlocks :blocks="product.enterInfo.howToUseTickets" />
    </UiSectionCard>
    <UiSectionCard v-if="product.enterInfo.whatToBring" :title="$t('what-to-bring')">
      {{ product.enterInfo.whatToBring }}
    </UiSectionCard>
  </UiSection>
</template>

<style scoped>

</style>
