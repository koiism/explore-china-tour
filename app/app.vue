<script setup lang="ts">
import { appName } from '~/constants'

const { useUParams } = useUmami()
const { currentLocale } = storeToRefs(useI18nStore())

useUParams({
  language: currentLocale.value,
})

useHead({
  title: appName,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html {
  transition-property: color, background-color, border-color, outline-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  background: #fff;
}

html.dark {
  background: #222;
  color: rgba(229, 231, 235, 1);
  color-scheme: auto;
}
.dot-bg {
  --dot-bg-color: #fff;
  --dog-color: #a5aeb850;
  --dot-mask-color: red;
}
.dark .dot-bg {
  --dot-bg-color: #0d1117;
  --dog-color: #2f353c;
  --dot-mask-color: red;
}
.dot-bg::before {
  z-index: -1;
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, var(--dot-bg-color) 22px, transparent 1%) 50%,
    linear-gradient(var(--dot-bg-color) 22px, transparent 1%) 50%,
    var(--dog-color);
  background-position: center center;
  background-size: 24px 24px;
  mask-image: linear-gradient(0deg, transparent 5%, var(--dot-mask-color));
}
</style>
