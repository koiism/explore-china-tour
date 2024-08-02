<script setup lang="ts">
const props = withDefaults(defineProps<{
  scrollBg?: boolean
}>(), {
  scrollBg: true,
})
const { y } = useWindowScroll()
const showBg = computed(() => !props.scrollBg || y.value > 0)

const classes = [
  'backdrop-blur-sm',
  'dark:bg-[#00000099]',
  'bg-[#ffffff99]',
  'border-b',
  'border-b-1',
  'border-b-gray-2',
  'shadow-2xl',
  'dark:border-b-gray-8',
]
</script>

<template>
  <Teleport to="body">
    <div
      :class="showBg ? classes : []"
      fixed top-0 z-899 h-20 w-full flex items-center justify-between switch-animation
    >
      <div layout-xl w-full flex items-center justify-between>
        <LayoutNavigationLeft />
        <LayoutNavigationRight />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>

</style>
