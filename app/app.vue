<script setup lang="ts">
import type { Post } from './sanity/types'
import { POSTS_QUERY } from '~/sanity/queries'
import { appName } from '~/constants'

const query = POSTS_QUERY

useHead({
  title: appName,
})
const { data, refresh } = useSanityQuery<Post[]>(query)
function onRefresh() {
  refresh()
}
</script>

<template>
  {{ data?.[0]._id }}
  <button @click="onRefresh">
    refresh
  </button>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
