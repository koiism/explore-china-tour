<script lang="ts" setup>
export interface IStep {
  title: string
}
defineProps<{
  steps: IStep[]
  current: number
}>()

const checkedClass = {
  bg: ['bg-primary'],
  icon: ['bg-[#f0f0f0]', 'dark:bg-[#20202a]'],
  iconText: ['text-btn'],
  title: ['font-bold'],
}
const uncheckedClass = {
  bg: ['bg-disable'],
  icon: [],
  iconText: [],
  title: [],
}
</script>

<template>
  <ul w-full flex items-center justify-between gap-0>
    <li v-for="(step, index) in steps" :key="index" relative flex flex-1 flex-col items-center justify-center>
      <div v-if="index >= current " absolute class="bg-disable left-0 top-[12px] h-[4px] w-[100%] translate-x-[-50%] translate-y-[-50%] -z-1" />
      <div v-if="index < current && index > 0" absolute class="left-0 top-[12px] h-[4px] w-[100%] translate-x-[-50%] translate-y-[-50%] -z-1 bg-primary" />
      <div
        h-6 w-6 flex items-center justify-center rounded-full
        :class="index < current ? checkedClass.bg : uncheckedClass.bg"
      >
        <div v-if="index < current - 1" :class="index < current ? checkedClass.icon : uncheckedClass.icon" i-carbon-checkmark />
        <div v-else :class="index < current ? checkedClass.iconText : uncheckedClass.iconText">
          {{ index + 1 }}
        </div>
      </div>
      <span :class="index === current - 1 ? checkedClass.title : uncheckedClass.title" text-xs text-p> {{ step.title }} </span>
    </li>
  </ul>
</template>

<style scoped>
</style>
