<script setup lang="ts">
defineProps<{
  images: { url: string, alt: string }[]
}>()
</script>

<template>
  <section grid-cols-4 grid-rows-2 hidden h-80 max-h-sm gap-2 md:grid>
    <div grid-col-start-1 grid-row-start-1 grid-col-end-3 grid-row-end-3 overflow-hidden rounded>
      <img :src="images?.[0].url" :alt="images?.[0].alt" h-full w-full object-cover>
    </div>
    <div grid-col-start-3 grid-row-start-1 grid-col-end-4 grid-row-end-3 overflow-hidden rounded>
      <img :src="images?.[1].url" :alt="images?.[1].alt" h-full w-full object-cover>
    </div>
    <div grid-col-start-4 grid-row-start-1 grid-col-end-5 grid-row-end-2 overflow-hidden rounded>
      <img :src="images?.[2].url" :alt="images?.[2].alt" h-full w-full object-cover>
    </div>
    <div grid-col-start-4 grid-row-start-2 grid-col-end-5 grid-row-end-3 overflow-hidden rounded>
      <img :src="images?.[3].url" :alt="images?.[3].alt" h-full w-full object-cover>
    </div>
  </section>
</template>

<style scoped>

</style>
