<script setup lang="ts">
definePageMeta({
  layout: 'home',
})

const online = useOnline()
const { $client } = useNuxtApp()

const hello = await $client.demo.hello.useQuery()
</script>

<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
        <div text-gray:80>
          {{ hello }}
        </div>
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </div>
</template>
