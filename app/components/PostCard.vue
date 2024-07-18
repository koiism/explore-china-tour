<script setup lang="ts">
import type { Post } from 'cms/sanity.types'

defineProps<{
  post: Post
}>()
const localePath = useLocalePath()
</script>

<template>
  <div relative flex flex-col items-start justify-between gap-2 p-2 md:flex-row card-base>
    <SanityImage
      :asset-id="post.mainImage?.asset?._ref"
      auto="format"

      h-58 w-full flex-none object-cover md:w-92
    />
    <div flex flex-col items-start gap-4 text-align-left>
      <NuxtLink
        :to="localePath(`/post/${post.slug?.current}`)"
        prefetch
        text-3xl font-bold
        before:absolute before:left-0 before:top-0 before:h-full before:w-full before:content-empty
      >
        {{ post.title }}
      </NuxtLink>
      <p>
        {{ post.excerpt }}
      </p>
      <p font-bold>
        {{ useDateFormat(post._createdAt, 'YYYY-MM-DD') }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
