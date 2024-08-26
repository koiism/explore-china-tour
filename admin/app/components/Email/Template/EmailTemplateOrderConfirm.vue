<script setup lang="ts">
import { z } from 'zod'

const props = defineProps<{
  name: string
  data: {
    name: string
    ticketType: string
    passport?: string | undefined
    birthDate?: string | undefined
  }[]
}>()

const orderDetailMd = computed(() => props.data.map(item => `
- **${item.name}**
  - **Ticket Type**: ${item.ticketType}
  ${item.passport ? `- **Passport Number**: ${item.passport}` : ''}
  ${item.birthDate ? `- **Birth Date**: ${item.birthDate}` : ''}
`).join('\n'))

const md = computed(() => `# Ticket Purchase Confirmation

Dear ${props.name},

Thank you for purchasing tickets through our website. Below are the details of your order and important information, please read carefully.

## Order Details

${orderDetailMd.value}

## Important Information

1. **Refund Policy**: You can request a refund by contacting our designated email [explorechinatour@outlook.com](mailto:explorechinatour@outlook.com)
 24 hours before the ticket becomes valid. Please make sure to apply within the specified time frame, as refunds will not be processed after the deadline.

2. **Information Confirmation**: Please carefully check the above information. If you find any errors, please reply to this email promptly, and we will handle it for you as soon as possible.

3. **E-Ticket Delivery**: Depending on the type of ticket you purchased, we will send the e-ticket and park guidelines to your email no later than three days before your selected date. Please keep an eye on your email and ensure that your inbox is accessible to receive the tickets smoothly.

Should you have any questions, feel free to contact us. We wish you an enjoyable visit!

Best regards,
[explorechinatour.com](https://explorechinatour.com) Customer Service Team
`)
</script>

<script lang="ts">
export const zOrderConfirmOptions = z.object({
  name: z.string().default(''),
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
