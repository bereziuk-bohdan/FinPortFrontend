import { createI18n } from 'vue-i18n'
import en from './locales/en'
import de from './locales/de'
import uk from './locales/uk'
import { DEFAULT_LOCALE } from './index'

const i18n = createI18n({
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false,
  locale: DEFAULT_LOCALE,
  messages: {
    de,
    en,
    uk,
  },
} as const)

export default i18n