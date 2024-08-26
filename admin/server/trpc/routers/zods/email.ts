import { z } from 'zod'
import { zOrderConfirmOptions } from '~/app/components/Email/Template/EmailTemplateOrderConfirm.vue'
import { zOrderNotifyOptions } from '~/app/components/Email/Template/EmailTemplateOrderNotify.vue'

const zEmailOptionsBase = z.object({
  from: z.string(),
  to: z.string().email(),
  subject: z.string(),
  text: z.string(),
})
type TEmailOptionsBase = z.infer<typeof zEmailOptionsBase>

const zEmailOptionsDefault = zEmailOptionsBase.extend({
  html: z.string(),
})
type TEmailOptionsDefault = z.infer<typeof zEmailOptionsDefault>

export {
  zEmailOptionsBase,
  zEmailOptionsDefault,
}
export type {
  TEmailOptionsBase,
  TEmailOptionsDefault,
}
