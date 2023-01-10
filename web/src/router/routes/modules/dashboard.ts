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
    title: '项目介绍',
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '项目介绍',
      },
    },
  ],
}

export default dashboard
