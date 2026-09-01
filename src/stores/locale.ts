import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n from '@/i18n/i18n'
import { getInitialLocale, persistLocale } from '@/i18n';
import type { SupportedLocale } from '@/i18n';

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref<SupportedLocale>(getInitialLocale())

  function setLocale(next: SupportedLocale) {
    locale.value = next
    i18n.global.locale.value = next
    persistLocale(next)
  }

  return {
    locale,
    setLocale,
  }
})