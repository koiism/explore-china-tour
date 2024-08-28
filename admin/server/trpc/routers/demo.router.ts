import { publicProcedure, router } from '../trpc'

const hello = publicProcedure
  .query(() => {
    return {
      greeting: `hello`,
    }
  })

export const DemoRouter = router({
  demo: router({
    hello,
  }),
})
