import process from 'node:process'
import Path from 'node:path'
import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

const sanityProjectId = process.env.SANITY_STUDIO_PROJECT_ID!
const sanityToken = process.env.SANITY_STUDIO_TOKEN!
const sanityStudioUrl = process.env.SANITY_VISUAL_EDITING_STUDIO_URL

export default defineNuxtConfig({
  alias: {
    '~': Path.resolve('.'),
    'cms': Path.resolve('../cms'),
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxtjs/sanity',
    '@nuxt/ui',
  ],

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
      ignore: ['/post'],
    },
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

  pwa,

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
  },

  sanity: {
    projectId: sanityProjectId,
    dataset: process.env.NUXT_SANITY_DATASET,
    apiVersion: '2024-03-15',
    useCdn: false,
    visualEditing: {
      studioUrl: sanityStudioUrl,
      token: sanityToken,
      stega: true,
    },
  },

  compatibilityDate: '2024-07-16',
})
