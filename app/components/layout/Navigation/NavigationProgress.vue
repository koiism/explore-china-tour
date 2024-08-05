<script setup lang="ts">
import type { IStep } from '~/components/ui/Steps.vue'

defineProps<{
  steps: IStep[]
  current: number
}>()
</script>

<template>
  <div
    relative h-20 w-full flex items-center justify-between switch-animation
  >
    <div layout-xl w-full flex items-center justify-between>
      <LayoutNavigationLeft />
      <div absolute bottom-0 left-0 right-0 top-0 mx-auto max-w-120 flex items-center justify-center>
        <UiSteps
          :steps="steps" :current="current"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
