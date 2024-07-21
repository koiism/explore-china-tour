<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink flex gap-2 :to="localePath('/')">
    <div i-carbon-radar h-6 w-6 bg-black switch-animation dark:bg-green />
    <div font-bold font-mono text-base>
      {{ $t('explore-china-tour') }}
    </div>
  </NuxtLink>
</template>
