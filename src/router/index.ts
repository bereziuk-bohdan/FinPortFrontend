import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onUnauthorized } from '@/api/authEvents'
import AppLayout from '@/layouts/AppLayout.vue'
import { navItems } from '@/config/nav'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      children: [
        {
          component: () => import('../views/DashboardView.vue'),
          name: 'dashboard',
          path: '',
        },
        {
          component: () => import('../views/BudgetView.vue'),
          name: 'budget',
          path: 'budget',
        },
        {
          component: () => import('../views/StocksView.vue'),
          name: 'stocks',
          path: 'stocks',
        },
        {
          component: () => import('../views/PortfoliosView.vue'),
          name: 'portfolios',
          path: 'portfolios',
        },
      ],
      component: AppLayout,
      meta: { requiresAuth: true },
      path: '/',
      props: { nav: navItems },
    },
    {
      component: () => import('../views/LoginView.vue'),
      meta: { guest: true },
      name: 'login',
      path: '/login',
    },
    {
      component: () => import('../views/RegisterView.vue'),
      meta: { guest: true },
      name: 'register',
      path: '/register',
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.matched.some((r) => r.meta.requiresAuth) && !auth.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.guest && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

onUnauthorized(() => {
  if (router.currentRoute.value.meta.guest) {
    return
  }
  router.push({ name: 'login' })
})

export default router