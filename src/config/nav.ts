export interface NavItem {
  icon: string
  labelKey: string
  to: string
}

export const navItems: NavItem[] = [
  {
    icon: 'pi pi-home',
    labelKey: 'nav.dashboard',
    to: '/',
  },
  {
    icon: 'pi pi-wallet',
    labelKey: 'nav.budget',
    to: '/budget',
  },
  {
    icon: 'pi pi-chart-line',
    labelKey: 'nav.stocks',
    to: '/stocks',
  },
  {
    icon: 'pi pi-briefcase',
    labelKey: 'nav.portfolios',
    to: '/portfolios',
  },
]