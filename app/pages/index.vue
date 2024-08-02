<script setup lang="ts">
import { useQueryPostList } from '~/sanity/queries'

definePageMeta({
  layout: 'home',
})
defineOgImageComponent('Nuxt', {
  headline: 'Greetings',
  title: 'Hello OG Image 👋',
  description: 'Look what at me using the Nuxt template',
})

const { list, next } = useQueryPostList()
next()
</script>

<template>
  <div layout-md flex flex-col gap-2>
    <BusinessPostCard v-for="post in list || []" :key="post._id" :post="post" />
  </div>
</template>
