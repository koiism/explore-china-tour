import type { ZodType } from 'zod'
import EmailTemplateOrderConfirm, { zOrderConfirmOptions } from '~/app/components/Email/Template/EmailTemplateOrderConfirm.vue'
import EmailTemplateOrderNotify, { zOrderNotifyOptions } from '~/app/components/Email/Template/EmailTemplateOrderNotify.vue'

export interface IEmailTemplate {
  name: string
  subject: string
  schema: ZodType
  template: Component
}

export enum EEmailTemplate {
  orderConfirm = 'orderConfirm',
  orderNotify = 'orderNotify',
}
export const emailTemplates = {
  [EEmailTemplate.orderConfirm]: {
    name: '确认订单',
    subject: 'Order Confirmation',
    template: EmailTemplateOrderConfirm,
    schema: zOrderConfirmOptions,
  },
  [EEmailTemplate.orderNotify]: {
    name: '订单通知',
    subject: '获取到新订单',
    template: EmailTemplateOrderNotify,
    schema: zOrderNotifyOptions,
  },
}
