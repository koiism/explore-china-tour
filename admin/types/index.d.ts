import type { trpcClientPlugin } from '~/plugins/client'

interface PluginsInjections {
  $client: ReturnType<typeof trpcClientPlugin>['provide']['client']
}

declare module '#app' {
  interface NuxtApp extends PluginsInjections {}
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends PluginsInjections {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginsInjections {}
}
