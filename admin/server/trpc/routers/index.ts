import { createCallerFactory, mergeRouters } from '../trpc'
import { DemoRouter } from './demo.router'
import { EmailRouter } from './email.router'
import { OrderRouter } from './order.router'

export const appRouter = mergeRouters(
  DemoRouter,
  EmailRouter,
  OrderRouter,
)

export type AppRouter = typeof appRouter

const createCaller = createCallerFactory(appRouter)
export const caller = createCaller({})
