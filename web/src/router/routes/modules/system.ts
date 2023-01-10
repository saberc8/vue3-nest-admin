import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/menu',
  meta: {
    orderNo: 10,
    icon: 'ant-design:cluster-outlined',
    title: '系统设置',
  },
  children: [
    {
      path: 'menu',
      name: 'Menu',
      component: () => import('@/views/system/menu/index.vue'),
      meta: {
        title: '菜单管理',
      },
    },
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: '角色管理',
      },
    },
  ],
}

export default system
