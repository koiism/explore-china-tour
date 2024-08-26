<script setup lang="ts">
import type { IEmailTemplate } from '~/app/components/Email/Template'
import { emailTemplates } from '~/app/components/Email/Template'

const model = defineModel<IEmailTemplate>({
  required: true,
})
function onSelectTemplate(template: IEmailTemplate) {
  model.value = template
}
</script>

<template>
  <AMenu mode="inline">
    <ASubMenu>
      <template #icon>
        <MailOutlined />
      </template>
      <template #title>
        邮件模板
      </template>
      <AMenuItem v-for="(template, index) in emailTemplates" :key="index" @click="onSelectTemplate(template)">
        {{ template.name }}
      </AMenuItem>
    </ASubMenu>
  </AMenu>
</template>

<style scoped>

</style>
