import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/router/constant'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/workbench',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '仪表盘',
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作台',
      },
    },
  ],
}

export default dashboard
