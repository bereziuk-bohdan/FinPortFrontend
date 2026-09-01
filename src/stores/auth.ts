import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authApi } from '@/api/auth';
import { onUnauthorized } from '@/api/authEvents';
import type { LoginPayload, RegisterPayload, User } from '@/api/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)

  const isAuthenticated = computed(() => Boolean(token.value))

  function clearSession() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  onUnauthorized(clearSession)

  async function login(payload: LoginPayload) {
    loading.value = true
    try {
      const data = await authApi.login(payload)
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
    } finally {
      loading.value = false
    }
  }

  async function register(payload: RegisterPayload) {
    loading.value = true
    try {
      const data = await authApi.register(payload)
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    if (!token.value) {return}
    user.value = await authApi.me()
  }

  async function logout() {
    try {
      await authApi.logout()
    } finally {
      clearSession()
    }
  }

  return {
    fetchUser,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    token,
    user,
  }
})
