import { z } from 'zod'

const zOrderData = z.object({
  name: z.string(),
  ticketType: z.string(),
  title: z.string().optional(),
  passport: z.string().optional(),
  birthDate: z.string().date().optional(),
})

const zOrderApproveInput = z.object({
  orderId: z.string(),
  email: z.string().email(),
  name: z.string(),
  productName: z.string(),
  data: zOrderData.array(),
})
type TOrderApproveInput = z.infer<typeof zOrderApproveInput>

export {
  zOrderData,
  zOrderApproveInput,
}
export type {
  TOrderApproveInput,
}
