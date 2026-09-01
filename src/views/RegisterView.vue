<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const error = ref('')

async function submit() {
  error.value = ''
  try {
    await auth.register({
      email: email.value,
      name: name.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })
    router.push('/')
  } catch (err: unknown) {
    const apiError = err as { response?: { data?: { message?: string } } }
    error.value = apiError.response?.data?.message ?? t('auth.registerFailed')
  }
}
</script>

<template>
  <div class="auth-page">
    <form class="auth-card" @submit.prevent="submit">
      <h1>{{ t('auth.register') }}</h1>
      <p v-if="error" class="error">{{ error }}</p>

      <label>
        {{ t('auth.name') }}
        <input v-model="name" type="text" required autocomplete="name" />
      </label>

      <label>
        {{ t('auth.email') }}
        <input v-model="email" type="email" required autocomplete="email" />
      </label>

      <label>
        {{ t('auth.password') }}
        <input v-model="password" type="password" required autocomplete="new-password" />
      </label>

      <label>
        {{ t('auth.confirmPassword') }}
        <input
          v-model="passwordConfirmation"
          type="password"
          required
          autocomplete="new-password"
        />
      </label>

      <button type="submit" :disabled="auth.loading">
        {{ auth.loading ? t('auth.registering') : t('auth.register') }}
      </button>

      <p class="switch">
        {{ t('auth.haveAccount') }}
        <RouterLink to="/login">{{ t('auth.login') }}</RouterLink>
      </p>
    </form>
  </div>
</template>

