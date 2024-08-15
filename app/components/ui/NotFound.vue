<script setup lang="ts">

</script>

<template>
  <div h-screen w-full flex items-center justify-center p-4 md:p-8>
    <UAlert :description="$t('not-found-hint')" :title="$t('Oops')" icon="i-carbon-face-dissatisfied" max-w-md />
  </div>
</template>

<style scoped>

</style>
