import process from 'node:process'
import Path from 'node:path'
import { appDescription } from './constants/index'

const sanityProjectId = process.env.SANITY_STUDIO_PROJECT_ID!
const sanityToken = process.env.SANITY_STUDIO_TOKEN!
const sanityStudioUrl = process.env.SANITY_VISUAL_EDITING_STUDIO_URL
const sanityDataset = process.env.NUXT_SANITY_DATASET!
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!
const paypalClientId = process.env.PAYPAL_CLIENT_ID!
const baseUrl = process.env.APP_BASE_URL!
const TRPC_HOST = process.env.ADMIN_BASE_URL! || 'http://localhost:3000'

export default defineNuxtConfig({
  alias: {
    '~': Path.resolve('.'),
    'cms': Path.resolve('../cms'),
    'admin': Path.resolve('../admin'),
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001,
  },
  extends: [
    'nuxt-umami',
  ],
  runtimeConfig: {
    public: {
      TRPC_HOST,
    },
  },
  appConfig: {
    umami: {
      version: 2,
    },
  },
  typescript: {
    tsConfig: {
      include: [
        // 未知原因导致IDE无法解析自动导入的组件，手动添加后解决
        './components.d.ts',
      ],
    },
  },
  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/sanity',
    '@nuxt/ui',
    '@nuxtjs/seo',
    'nuxt-paypal',
    '@nuxt/test-utils',
    '@nuxtjs/supabase',
  ],
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
  },
  supabase: {
    url: supabaseUrl,
    key: supabaseKey,
    redirect: false,
  },
  testUtils: {
    startOnBoot: true,
    logToConsole: true,
    vitestConfig: {
      setupFiles: ['./tests/setup/mocks'],
      environmentOptions: {
        nuxt: {
          mock: {
            indexedDb: true,
          },
        },
      },
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
    // '@unocss/reset/tailwind.css',
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
      ignore: ['/post'],
    },
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

  i18n: {
    vueI18n: './i18n.config.ts',
    locales: ['en'],
    defaultLocale: 'en',
    baseUrl,
    detectBrowserLanguage: false,
  },

  sanity: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: '2024-03-15',
    useCdn: true,
    visualEditing: {
      studioUrl: sanityStudioUrl,
      token: sanityToken,
      stega: true,
    },
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
  paypal: {
    clientId: paypalClientId,
  },

  compatibilityDate: '2024-07-16',
})
