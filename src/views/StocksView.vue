<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'

const { t } = useI18n()
</script>

<template>
  <Card>
    <template #title>{{ t('nav.stocks') }}</template>
    <template #content>
      <p class="muted">{{ t('placeholders.stocks') }}</p>
    </template>
  </Card>
</template>