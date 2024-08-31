<script setup lang="ts">
import { useQueryProductList } from '~/sanity/queries'

definePageMeta({
  layout: 'home',
})
const title = 'Explore China Tour'
const desc = ''
useSeoMeta({
  title,
  ogTitle: title,
  description: desc,
  ogDescription: desc,
  twitterCard: 'summary_large_image',
})

const { list, next } = useQueryProductList()
await next()
</script>

<template>
  <div layout-xl flex flex-row flex-wrap gap-0>
    <div v-for="product in list" :key="product._id" w-full p-1 text-start md:p-2 class="md:w-[33.33%]">
      <div relative h-full flex flex-col justify-between card-base>
        <div h-full>
          <UBadge absolute left-2 top-2 color="gray" font-bold>
            {{ product.city.name }}
          </UBadge>
          <img :src="product.image.url" :alt="product.image.alt || product.title" aspect-ratio-video object-cover object-center>
          <div p-2 md:p-4>
            <RouterLink
              :to="`/product/${product.slug}`"
              before:absolute before:left-0 before:top-0 before:h-full before:w-full text-card-title before:content-empty
            >
              {{ product.title }}
            </RouterLink>
          </div>
        </div>
        <div flex flex-wrap items-center justify-center p-2 text-nowrap text-card-title>
          {{ $t('bottom-price') }}
          <span mx-2 text-nowrap text-primary>
            {{ $t('dollar') }}
            {{ getMinimumPriceFromTicketOptions(product.ticketOptions) }}
          </span>
          {{ $t('per-person') }}
        </div>
      </div>
    </div>
  </div>
</template>
