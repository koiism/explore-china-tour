<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const i18nStore = useI18nStore()
</script>

<template>
  <UPopover
    mode="hover"
  >
    <div i-carbon-translate />
    <template #panel>
      <div p-1 text-size-sm card-base>
        <ul>
          <li
            v-for="locale in i18nStore.otherLocales"
            :key="locale.key"
            cursor-pointer
          >
            <NuxtLink :to="switchLocalePath(locale.key)">
              {{ locale.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </template>
  </UPopover>
</template>

<style scoped>

</style>
