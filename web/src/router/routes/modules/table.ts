import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'

const table: AppRouteModule = {
  path: '/table',
  name: 'Table',
  component: LAYOUT,
  redirect: '/table/tableExample1',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '表格',
  },
  children: [
    {
      path: 'tableExample1',
      name: 'TableExample1',
      component: () => import('@/views/table/tableExample1/index.vue'),
      meta: {
        // affix: true,
        title: '表格',
      },
    },
    {
      path: 'tableExample2',
      name: 'TableExample2',
      component: () => import('@/views/table/tableExample2/index.vue'),
      meta: {
        // affix: true,
        title: 'ProTable组件',
      },
    },
  ],
}

export default table
