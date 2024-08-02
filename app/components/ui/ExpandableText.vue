<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
  maxLine: {
    type: Number,
    default: 3,
  },
})

const isExpanded = ref(false)

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div>
    <p v-if="!isExpanded" overflow-hidden class="expandable-text">
      {{ text }}
    </p>
    <p v-else overflow-hidden>
      {{ text }}
    </p>
    <UButton variant="link" cursor-pointer p-0 underline color="gray" @click="toggleExpand">
      {{ isExpanded ? $t('read-less') : $t('read-more') }}
    </UButton>
  </div>
</template>

<style scoped>
.expandable-text {
  display: -webkit-box;
  -webkit-line-clamp: v-bind(maxLine);
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.expanded {
  line-clamp: unset;
}
</style>
