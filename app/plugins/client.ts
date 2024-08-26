import process from 'node:process'
import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from 'admin/server/trpc/routers'

const baseUrl = process.env.ADMIN_BASE_URL! || 'http://localhost:3000'

export default defineNuxtPlugin(() => {
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${baseUrl}/api/trpc`,
      }),
    ],
  })

  return {
    provide: {
      client,
    },
  }
})
