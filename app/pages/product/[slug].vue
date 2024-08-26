<script setup lang="ts">
import { queryProductBySlug } from '~/sanity/queries'

const route = useRoute<'product-slug___en'>()
const slug = route.params.slug
const { data: product, status } = await queryProductBySlug(slug)

definePageMeta({
  layout: 'home',
})
useSeoMeta({
  title: product.value?.title,
  ogTitle: product.value?.title,
  description: product.value?.intro,
  ogDescription: product.value?.intro,
  twitterCard: 'summary_large_image',
})

const links = ref<{ label: string, icon: string, to?: string }[]>([])
if (status.value === 'success') {
  links.value.push({
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  })
  if (product.value?.city) {
    links.value.push({
      label: product.value?.city?.name ?? '',
      icon: 'i-heroicons-building-office-2',
    })
  }
  links.value.push({
    label: product.value!.title!,
    icon: 'i-heroicons-ticket',
  })
}
const bookRoot = ref<HTMLElement>()
</script>

<template>
  <div v-if="product">
    <div layout-xl flex flex-col items-start justify-start gap-4 md:gap-10>
      <UCarousel
        v-if="(product?.image ?? []).length"
        v-slot="{ item }"
        :items="product?.image ?? []"
        :ui="{ item: 'h-40 basis-full' }"
        class="overflow-hidden rounded-lg"
        indicators block md:hidden
      >
        <img :src="item.url" :alt="item.alt" h-full w-full object-cover>
      </UCarousel>
      <UBreadcrumb :links="links" hidden md:block />
      <section flex flex-col items-start justify-start gap-2>
        <UBadge v-if=" product?.category?.name" color="gray" variant="solid" hidden md:block>
          {{ product?.category?.name }}
        </UBadge>
        <h1 text-title>
          {{ product?.title }}
        </h1>
      </section>
      <UiHeadImages v-if="(product?.image ?? []).length" :images="product?.image ?? []" />
      <section flex items-start justify-between gap-16>
        <div flex flex-col items-start justify-start gap-4>
          <BusinessProductInfo :product="product" />
          <div ref="bookRoot" card-base w-full flex flex-col items-start justify-start gap-4 p-2 md:p-4>
            <BusinessProductBook :product="product" />
          </div>
        </div>
        <BusinessProductCheckAvailability :product="product" :target-element="bookRoot" hidden md:block />
      </section>
    </div>
  </div>
  <div v-else>
    <UiNotFound />
  </div>
</template>

<style scoped>

</style>
