<script setup lang="ts">
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRoute, useRouter} from 'vue-router'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import type {MenuItem} from 'primevue/menuitem'
import Drawer from 'primevue/drawer'
import {useAuthStore} from '@/stores/auth'
import {useLocaleStore} from '@/stores/locale'
import { LOCALE_LABELS, SUPPORTED_LOCALES } from '@/i18n';
import type { SupportedLocale } from '@/i18n';

interface NavItem {
  icon: string
  labelKey: string
  to: string
}

const props = defineProps<{
  nav: NavItem[]
}>()

const {t} = useI18n()
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const localeStore = useLocaleStore()

const mobileOpen = ref(false)
const userMenuRef = ref()
const localeMenuRef = ref()

const localeMenuItems = computed<MenuItem[]>(() =>
  SUPPORTED_LOCALES.map((code) => ({
    command: () => localeStore.setLocale(code as SupportedLocale),
    icon: `flag-icon flag-icon--${code}`,
    label: LOCALE_LABELS[code as SupportedLocale],
    ...(code === localeStore.locale && {class: 'locale-menu-item-active'}),
  })),
)

const userMenuItems = computed<MenuItem[]>(() => [
  {
    items: [{class: 'user-menu-logout', command: handleLogout, icon: 'pi pi-sign-out', label: t('nav.logout')}],
    label: t('nav.signedInAs', {email: auth.user?.email ?? ''})
  },
])

function handleLogout() {
  auth.logout().then(() => router.push('/login'))
}

function isActive(to: string) {
  return route.path === to
}
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="brand">
        <img class="brand-logo" src="@/assets/logo.svg" alt="FinPort logo"/>
        <span class="brand-name">{{ t('app.name') }}</span>
      </div>

      <nav class="nav">
        <RouterLink
          v-for="item in props.nav"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: isActive(item.to) }"
        >
          <i :class="item.icon"></i>
          <span>{{ t(item.labelKey) }}</span>
        </RouterLink>
      </nav>
    </aside>

    <div class="layout-main">
      <header class="topbar">
        <Button
          icon="pi pi-bars"
          text
          rounded
          class="mobile-toggle"
          aria-label="Menu"
          @click="mobileOpen = true"
        />

        <div class="topbar-spacer"></div>

        <Button
          icon="pi pi-globe"
          text
          rounded
          class="locale-btn"
          :aria-label="t('nav.language')"
          @click="localeMenuRef?.toggle($event)"
        />

        <Menu ref="localeMenuRef" :model="localeMenuItems" popup class="locale-menu"/>

        <Button
          text
          rounded
          class="user-btn"
          :aria-label="'User: ' + (auth.user?.name ?? 'Unknown')"
          @click="userMenuRef?.toggle($event)"
        >
          <Avatar :label="(auth.user?.name ?? 'U').charAt(0).toUpperCase()" shape="circle"
                  size="small"/>
          <span class="user-name">{{ auth.user?.name }}</span>
        </Button>

        <Menu ref="userMenuRef" :model="userMenuItems" popup class="user-menu"/>
      </header>

      <Drawer v-model:visible="mobileOpen" position="left" class="mobile-drawer">
        <nav class="nav mobile-nav">
          <RouterLink
            v-for="item in props.nav"
            :key="item.to"
            :to="item.to"
            class="nav-link"
            :class="{ active: isActive(item.to) }"
            @click="mobileOpen = false"
          >
            <i :class="item.icon"></i>
            <span>{{ t(item.labelKey) }}</span>
          </RouterLink>
        </nav>
      </Drawer>

      <main class="content">
        <RouterView/>
      </main>
    </div>
  </div>
</template>
