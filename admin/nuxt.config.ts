import Path from 'node:path'
import process from 'node:process'
import PluginVue from '@vitejs/plugin-vue'
import { appDescription } from './app/constants/index'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

export default defineNuxtConfig({
  alias: {
    '~': Path.resolve('.'),
    'cms': Path.resolve('../cms'),
    'app': Path.resolve('../app'),
  },

  build: {
    transpile: ['trpc-nuxt'],
  },

  plugins: [
    'plugins/client',
  ],

  devServer: {
    host: '0.0.0.0',
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@ant-design-vue/nuxt',
    '@nuxtjs/supabase',
  ],

  runtimeConfig: {
    public: {
      EMAIL_HOST: process.env.EMAIL_HOST || 'localhost',
    },
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
    rollupConfig: {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      plugins: [PluginVue()],
    },
  },

  imports: {
    presets: [
      {
        from: 'zod',
        imports: ['z'],
      },
    ],
  },

  routeRules: {
    '/api/**': { cors: true },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-08-14',

  supabase: {
    url: supabaseUrl,
    key: supabaseKey,
    redirect: false,
  },
})
