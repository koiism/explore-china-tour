<script setup lang="ts">
defineProps<{
  icon?: string
  title?: string
}>()
</script>

<template>
  <section w-full flex gap-2>
    <div v-if="icon" :class="[icon]" h-7 w-5 flex-none md:h-8 md:w-6 />
    <div w-full flex flex-col gap-1>
      <h2 text-start text-xl font-bold md:text-2xl text-base :class="[icon ? '' : 'text-section-title']">
        {{ title }}
      </h2>
      <div w-full text-start text-p>
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
