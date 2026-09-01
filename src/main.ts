import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import i18n from './i18n/i18n'
import { getInitialLocale } from './i18n'
import { AppPreset } from './primevue'

const app = createApp(App)

i18n.global.locale.value = getInitialLocale()

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  theme: {
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind, primevue',
      },
    },
    preset: AppPreset,
  },
})

app.mount('#app')