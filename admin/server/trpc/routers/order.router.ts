import { publicProcedure, router } from '../trpc'
import { zOrderApproveInput } from './zods/order'
import { caller } from '.'

const approve = publicProcedure
  .input(
    zOrderApproveInput,
  )
  .mutation(async ({ input }) => {
    const promiseOrderConfirm = caller.email.orderConfirm({
      to: input.email,
      subject: `Order Confirmation: ${input.productName}`,
      text: '',
      option: {
        data: input.data,
        name: input.name,
      },
    })
    const promiseOrderNotify = caller.email.orderNotify({
      to: ['1092333914@qq.com', '544286175@qq.com'],
      subject: `${input.productName} 订单通知`,
      text: '',
      option: {
        data: input.data,
        productName: input.productName,
      },
    })
    try {
      await Promise.all([promiseOrderConfirm, promiseOrderNotify])
    }
    catch (e: any) {
      console.error(e)
      return { status: 1 }
    }
    return { status: 0 }
  })

export const OrderRouter = router({
  order: router({
    approve,
  }),
})
