<script setup lang="ts">
import { queryPostBySlug } from '~/sanity/queries'

definePageMeta({
  layout: 'default',
})
const route = useRoute<'post-slug___en'>()
const slug = route.params.slug
const { data: post } = await queryPostBySlug(slug)
const i18nStore = useI18nStore()
</script>

<template>
  <div>
    <SanityImage :asset-id="post?.mainImage?.asset?._ref" auto="format" h-82 w-full object-cover />
    <div layout-md flex flex-col gap-2 px-4 py-10 text-align-left>
      <h1 text-title>
        {{ post?.title }}
      </h1>
      <UAlert
        v-if="post?.language === 'en' && i18nStore.currentLocale !== 'en'"
        icon="i-heroicons-information-circle"
        color="amber"
        variant="subtle"
        :description="$t('no-locale', { language: i18nStore.currentLocaleName })"
      />
      <p text-p>
        {{ post?.excerpt }}
      </p>
      <p font-bold>
        {{ useDateFormat(post?._createdAt, 'YYYY-MM-DD') }}
      </p>
      <div v-if="post?.body">
        <ContentBlocks :blocks="post.body" mt-20 />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
