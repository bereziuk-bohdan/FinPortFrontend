import type en from './locales/en'

export type MessageSchema = typeof en

export const SUPPORTED_LOCALES = ['en', 'de', 'uk'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = 'en'

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  de: 'Deutsch',
  en: 'English',
  uk: 'Українська',
}

const STORAGE_KEY = 'locale'

export function getInitialLocale(): SupportedLocale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && (SUPPORTED_LOCALES as readonly string[]).includes(stored)) {
    return stored as SupportedLocale
  }

  const browserLang = navigator.language?.toLowerCase().slice(0, 2)
  if (browserLang && (SUPPORTED_LOCALES as readonly string[]).includes(browserLang)) {
    return browserLang as SupportedLocale
  }

  return DEFAULT_LOCALE
}

export function persistLocale(locale: SupportedLocale): void {
  localStorage.setItem(STORAGE_KEY, locale)
}