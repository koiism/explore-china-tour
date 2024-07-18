<script setup lang="ts">
const props = defineProps<{
  scrollBg?: boolean
}>()
const { y } = useWindowScroll()
const showBg = computed(() => !props.scrollBg || y.value > 0)
</script>

<template>
  <Teleport to="body">
    <div
      :class="{
        'backdrop-blur-sm': showBg,
        'dark:bg-[#00000099]': showBg,
        'bg-[#ffffff99]': showBg,
      }"

      fixed top-0 z-899 h-20 w-screen flex items-center justify-between border-b border-b-1 border-b-gray-2 px-6 shadow shadow-2xl switch-animation dark:border-b-gray-8
    >
      <NavigationLeft />
      <NavigationRight />
    </div>
  </Teleport>
</template>

<style scoped>

</style>
