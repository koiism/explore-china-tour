import en from './i18n/en.json'
// import zhCn from './i18n/zh-cn.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    // 'zh-cn': zhCn,
  },
}))
