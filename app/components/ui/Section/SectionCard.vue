<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div mt-4 flex flex-col>
    <div flex flex-col gap-2 card-sub md:flex-row md:gap-0>
      <div v-if="title" class="md:w-[25%]" flex-none px-2 font-bold md:px-4 md:py-4 md:font-normal>
        {{ title }}
      </div>
      <div flex-1 px-2 md:px-4 md:py-4>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
