<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div flex flex-col gap-2>
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <div>{{ $t('not-found') }}</div>
    <div>
      <button btn text-sm m="3 t8" @click="router.back()">
        {{ $t('back') }}
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
