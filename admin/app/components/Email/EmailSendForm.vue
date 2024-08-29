<script setup lang="ts">
import type { TEmailOptionsDefault } from '~/server/trpc/routers/zods/email'

const { public: { EMAIL_HOST } } = useRuntimeConfig()

if (!EMAIL_HOST) {
  throw new Error('EMAIL_HOST is not defined in the server configuration.')
}
const emailHost = EMAIL_HOST!
const emailAlias = 'China Tour'
const sendEmailOption = defineModel<TEmailOptionsDefault>({
  required: true,
  default: {
    from: '',
    to: '',
    subject: '',
    html: '',
    text: '',
  },
})
sendEmailOption.value.from = `"${emailAlias}" <${emailHost}>`
const { $client } = useNuxtApp()
const sendingEmail = ref(false)
async function sendEmail() {
  try {
    sendingEmail.value = true
    await $client.email.send.mutate(sendEmailOption.value)

    notification.success({
      message: '发送成功',
      placement: 'bottomRight',
    })
  }
  catch (e: any) {
    notification.error({
      message: '发送失败',
      description: e,
    })
  }
  sendingEmail.value = false
}
</script>

<template>
  <AForm
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
  >
    <AFormItem label="发件人">
      <AInput v-model:value="sendEmailOption.from" />
    </AFormItem>
    <AFormItem v-if="typeof sendEmailOption.to === 'string'" label="收件人" required>
      <AInput v-model:value="sendEmailOption.to" name="email" autocomplete="true" />
    </AFormItem>
    <AFormItem label="主题" required>
      <AInput v-model:value="sendEmailOption.subject" />
    </AFormItem>
    <AButton :loading="sendingEmail" @click="sendEmail">
      发送
    </AButton>
  </AForm>
</template>

<style scoped>

</style>
