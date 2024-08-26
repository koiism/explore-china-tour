import { mergeRouters } from '../trpc'
import { DemoRouter } from './demo.router'
import { EmailRouter } from './email.router'

export const appRouter = mergeRouters(
  DemoRouter,
  EmailRouter,
)

// export type definition of API
export type AppRouter = typeof appRouter
