<script setup lang="ts">
import { EEmailTemplate, type IEmailTemplate, emailTemplates } from '~/app/components/Email/Template'
import type { TEmailOptionsDefault } from '~/server/trpc/routers/zods/email'

const { public: { EMAIL_HOST } } = useRuntimeConfig()

if (!EMAIL_HOST) {
  throw new Error('EMAIL_HOST is not defined in the server configuration.')
}
const emailHost = EMAIL_HOST!
const emailAlias = 'China Tour'

const selectedTemplate = ref<IEmailTemplate>(emailTemplates[EEmailTemplate.orderConfirm])
const sendEmailOption = ref<TEmailOptionsDefault>({
  from: `"${emailAlias}" <${emailHost}>`,
  to: '',
  subject: selectedTemplate.value.subject,
  html: '',
  text: '',
})
watchEffect(() => {
  sendEmailOption.value.subject = selectedTemplate.value.subject
})
</script>

<template>
  <ALayout h-full>
    <ALayoutSider theme="light">
      <EmailSider v-model="selectedTemplate" />
    </ALayoutSider>
    <ALayoutContent p-4>
      <div h-full w-full flex justify-between gap-4>
        <AFlex vertical min-w-md align="center">
          <EmailSendForm v-model="sendEmailOption" min-w-md w-full />
          <ADivider />
          <AForm
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 16 }"
            min-w-md
            overflow-auto
          >
            <EmailConfigForm v-model="sendEmailOption.html" :schema="selectedTemplate.schema" :template="selectedTemplate.template" :name="selectedTemplate.subject" />
          </AForm>
        </AFlex>
        <EmailPreview :email="sendEmailOption.html" flex-1 />
      </div>
    </ALayoutContent>
  </ALayout>
</template>

<style scoped>

</style>
