<script setup lang="ts">
import type { Post } from 'cms/sanity.types'
import { PortableText } from '@portabletext/vue'
import { POST_QUERY } from '~/sanity/queries'

definePageMeta({
  layout: 'default',
})
const route = useRoute<'post-slug'>()
const slug = route.params.slug
const { data: post } = await useSanityQuery<Post>(POST_QUERY, { slug })
</script>

<template>
  <div>
    <SanityImage :asset-id="post?.mainImage?.asset?._ref" auto="format" h-82 w-full object-cover />
    <div layout-md flex flex-col gap-2 px-4 py-10 text-align-left>
      <h1 text-title>
        {{ post?.title }}
      </h1>
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
