<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

async function submit() {
  error.value = ''
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push('/')
  } catch (err: unknown) {
    const apiError = err as { response?: { data?: { message?: string } } }
    error.value = apiError.response?.data?.message ?? t('auth.loginFailed')
  }
}
</script>

<template>
  <div class="auth-page">
    <form class="auth-card" @submit.prevent="submit">
      <h1>{{ t('auth.login') }}</h1>
      <p v-if="error" class="error">{{ error }}</p>

      <label>
        {{ t('auth.email') }}
        <input v-model="email" type="email" required autocomplete="email" />
      </label>

      <label>
        {{ t('auth.password') }}
        <input v-model="password" type="password" required autocomplete="current-password" />
      </label>

      <button type="submit" :disabled="auth.loading">
        {{ auth.loading ? t('auth.loggingIn') : t('auth.login') }}
      </button>

      <p class="switch">
        {{ t('auth.noAccount') }}
        <RouterLink to="/register">{{ t('auth.register') }}</RouterLink>
      </p>
    </form>
  </div>
</template>


