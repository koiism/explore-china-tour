import process from 'node:process'
import Path from 'node:path'
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
    locales: ['en', 'zh-cn'],
    defaultLocale: 'en',
  },

  sanity: {
    projectId: sanityProjectId,
    dataset: process.env.NUXT_SANITY_DATASET,
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

  compatibilityDate: '2024-07-16',
})
