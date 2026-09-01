<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const auth = useAuthStore()

const stats = computed(() => [
  { change: '+4.2%', label: t('dashboard.totalBalance'), trend: 'up', value: '$12,480.50' },
  { change: '+1.8%', label: t('dashboard.monthlyIncome'), trend: 'up', value: '$5,120.00' },
  { change: '-2.3%', label: t('dashboard.monthlyExpenses'), trend: 'down', value: '$3,860.20' },
  { change: '+7.5%', label: t('dashboard.portfolioValue'), trend: 'up', value: '$28,942.10' },
])
</script>

<template>
  <div class="dashboard">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <Card v-for="stat in stats" :key="stat.label" class="stat-card">
        <template #content>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="flex items-center gap-1 mt-1">
            <Tag
              :value="stat.change"
              :severity="stat.trend === 'up' ? 'success' : 'danger'"
              rounded
            />
          </div>
        </template>
      </Card>
    </div>

    <Card class="welcome-card">
      <template #content>
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">{{ t('dashboard.welcome', { name: auth.user?.name }) }}</h1>
            <p class="text-muted-color mt-1">{{ t('dashboard.title') }}</p>
          </div>
          <i class="pi pi-sparkles text-4xl text-primary"></i>
        </div>
      </template>
    </Card>
  </div>
</template>
