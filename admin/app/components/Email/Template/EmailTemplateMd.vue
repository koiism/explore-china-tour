<script setup lang="ts">
import { Markdown } from '@vue-email/components'

defineProps<{
  md: string
}>()
</script>

<template>
  <Markdown
    :markdown-custom-styles="{
      h1: {
        fontWeight: 'bold',
        fontSize: '2em',
        paddingTop: 0,
      },
      h2: {
        fontWeight: 'bold',
        fontSize: '1.5em',
        paddingTop: 0,
      },
      h3: {
        fontWeight: 'bold',
        fontSize: '1em',
        paddingTop: 0,
      },
      p: {
        fontSize: '14px',
        lineHeight: '24px',
        margin: '16px 0',
      },

    }"
    :source="md"
  />
</template>

<style scoped>

</style>
