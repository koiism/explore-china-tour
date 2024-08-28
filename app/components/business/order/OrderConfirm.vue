<script setup lang="ts">

</script>

<template>
  <div layout-xl flex flex-col gap-4 p-4 text-start shadow-2xl card-base>
    <h1 text-2xl font-bold>
      {{ $t('orderConfirm.title') }}
    </h1>
    <p>
      {{ $t('orderConfirm.description') }}
    </p>
    <ol flex flex-col list-decimal gap-2 pl-10>
      <li>
        <strong>
          {{ $t('orderConfirm.notice.1.title') }}
        </strong>
        {{ $t('orderConfirm.notice.1.content') }}
      </li>
      <li>
        <strong>
          {{ $t('orderConfirm.notice.2.title') }}
        </strong>
        {{ $t('orderConfirm.notice.2.content') }}
      </li>
      <li>
        <strong>
          {{ $t('orderConfirm.notice.3.title') }}
        </strong>
        {{ $t('orderConfirm.notice.3.content') }}
        <NuxtLink href="mailto:explorechinatour@outlook.com" text-primary>
          explorechinatour@outlook.com
        </NuxtLink>
      </li>
    </ol>
    <p>
      {{ $t('orderConfirm.end') }}
    </p>
  </div>
</template>

<style scoped>

</style>
