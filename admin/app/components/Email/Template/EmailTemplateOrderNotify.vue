<script setup lang="ts">
import { z } from 'zod'

const props = defineProps<{
  productName: string
  data: {
    name: string
    ticketType: string
    passport?: string | undefined
    birthDate?: string | undefined
  }[]
}>()

const orderDetailMd = computed(() => props.data.map(item => `
- **${item.name}**
  - **票种**: ${item.ticketType}
  ${item.passport ? `- **护照号**: ${item.passport}` : ''}
  ${item.birthDate ? `- **生日**: ${item.birthDate}` : ''}
`).join('\n'))

const md = computed(() => `# 订单通知

刚刚有客户下单商品 **${props.productName}**, 请确认

## 订单详情

${orderDetailMd.value}

`)
</script>

<script lang="ts">
export const zOrderNotifyOptions = z.object({
  productName: z.string().default(''),
  data: z.array(z.object({
    name: z.string().default(''),
    ticketType: z.string().default(''),
    passport: z.string().optional().default(''),
    birthDate: z.string().optional().default(''),
  })).default([]),
})
</script>

<template>
  <EmailTemplateBase>
    <EmailTemplateMd :md="md" />
  </EmailTemplateBase>
</template>

<style scoped>

</style>
