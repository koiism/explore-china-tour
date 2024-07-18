<script setup lang="ts">
import type { Post } from 'cms/sanity.types'

import { POSTS_QUERY } from '~/sanity/queries'

definePageMeta({
  layout: 'home',
})

const { data } = await useSanityQuery<Post[]>(POSTS_QUERY)
</script>

<template>
  <div layout-md flex flex-col gap-2>
    <PostCard v-for="post in data || []" :key="post._id" :post="post" />
  </div>
</template>
