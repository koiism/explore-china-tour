<script setup lang="ts">
defineProps<{
  email: string
}>()
</script>

<template>
  <iframe :srcdoc="email" frameborder="0" seamless width="100%" height="100%" />
</template>

<style scoped>

</style>
