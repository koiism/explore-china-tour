import { z } from 'zod'

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
