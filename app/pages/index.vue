<script setup lang="ts">
import { queryPosts } from '~/sanity/queries'

definePageMeta({
  layout: 'home',
})

const { data } = await queryPosts()
</script>

<template>
  <div layout-md flex flex-col gap-2>
    <PostCard v-for="post in data || []" :key="post._id" :post="post" />
  </div>
</template>
