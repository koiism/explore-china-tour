import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '../../admin/server/trpc/routers'

export function trpcClientPlugin() {
  const config = useRuntimeConfig()
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${config.public.TRPC_HOST}/api/trpc`,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            mode: 'cors',
          })
        },
      }),
    ],
  })

  return {
    provide: {
      client,
    },
  }
}
export default defineNuxtPlugin(trpcClientPlugin)
