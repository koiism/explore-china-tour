<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath('/')" flex items-center justify-center gap-2>
    <div i-carbon-radar my-5 ml-5 mr-0 h-6 w-6 bg-black switch-animation md:ml-0 bg-primary />
    <div font-bold font-mono text-common>
      {{ $t('explore-china-tour') }}
    </div>
  </NuxtLink>
</template>
