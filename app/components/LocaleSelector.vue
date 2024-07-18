<script setup lang="ts">
const i18nStore = useI18nStore()
</script>

<template>
  <UPopover
    mode="hover"
  >
    <div i-carbon-translate />
    <template #panel="{ close }">
      <div p-1 text-size-sm card-base>
        <ul>
          <li
            v-for="locale in i18nStore.otherLocales"
            :key="locale.key"
            cursor-pointer
            @click="i18nStore.setLocale(locale.key); close()"
          >
            {{ locale.label }}
          </li>
        </ul>
      </div>
    </template>
  </UPopover>
</template>

<style scoped>

</style>
