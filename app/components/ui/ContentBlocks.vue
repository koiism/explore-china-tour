<script setup lang="ts">
import type { ArbitraryTypedObject, PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/vue'

defineProps<{
  blocks: (PortableTextBlock | ArbitraryTypedObject)[]
}>()
</script>

<template>
  <div class="content">
    <PortableText :value="blocks" />
  </div>
</template>

<style scoped>
.content > :first-child {
  margin-block-start: 0;
}
.content > :last-child {
  margin-block-end: 0;
}
.content :deep(h2) {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}
.content :deep(h3) {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}
.content :deep(h4) {
  display: block;
  margin-block-start: 1.33em;
  margin-block-end: 1.33em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}
.content :deep(p) {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  unicode-bidi: isolate;
}
.content :deep(ul) {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 1.2em;
  unicode-bidi: isolate;
}
.content :deep(li) {
  display: list-item;
  text-align: -webkit-match-parent;
  unicode-bidi: isolate;
}
</style>
