<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath('/')" flex items-center justify-center gap-2>
    <img mx-5 my-5 mr-0 h-6 w-6 switch-animation src="/icon.svg">
    <div hidden font-bold font-mono md:block text-common>
      {{ $t('explore-china-tour') }}
    </div>
  </NuxtLink>
</template>
