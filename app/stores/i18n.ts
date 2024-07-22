import { acceptHMRUpdate, defineStore } from 'pinia'

const localesNameMap: Record<string, string> = {
  'zh-cn': '简体中文',
  'en': 'English',
  'ja': '日本語',
  'ko': '한국어',
  'zh-tw': '繁體中文',
  'fr': 'Français',
  'de': 'Deutsch',
  'es': 'Español',
  'pt': 'Português',
  'ru': 'Русский',
  'it': 'Italiano',
  'vi': 'Tiếng Việt',
}

export const useI18nStore = defineStore('i18n', () => {
  const i18n = useI18n()
  const currentLocale = i18n.locale
  const switchLocalePath = useSwitchLocalePath()
  const router = useRouter()
  const setCurrentLocale = (locale: string) => {
    currentLocale.value = locale
    i18n.setLocale(locale)
    router.push(switchLocalePath(locale))
  }
  const currentLocaleName = computed(() => localesNameMap[currentLocale.value])
  const locales = i18n.availableLocales

  const otherLocales = computed(() => {
    return locales.filter((locale) => {
      return locale !== currentLocale.value
    }).map((locale) => {
      return {
        key: locale,
        label: localesNameMap[locale],
      }
    })
  })

  return {
    currentLocale,
    setCurrentLocale,
    currentLocaleName,
    locales,
    otherLocales,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useI18nStore, import.meta.hot))
