import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

const hello = publicProcedure
  .input(
    z.object({
      text: z.string().nullish(),
    }),
  )
  .query(({ input }) => {
    return {
      greeting: `hello ${input?.text ?? 'world'}`,
    }
  })

export const DemoRouter = router({
  demo: router({
    hello,
  }),
})
