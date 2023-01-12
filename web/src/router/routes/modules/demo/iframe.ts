import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue')

const iframe: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/doc',
  meta: {
    orderNo: 1000,
    icon: 'ion:tv-outline',
    title: '相关文档',
  },
  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: IFrame,
      meta: {
        frameSrc: 'https://saberc8.cn/nest/docs',
        title: '接口文档',
      },
    },
    {
      path: 'antv',
      name: 'Antv',
      component: IFrame,
      meta: {
        frameSrc: 'https://www.antdv.com/',
        title: 'Antv',
      },
    },
    {
      path: 'https://doc.vvbin.cn',
      name: 'DocExternal',
      component: IFrame,
      meta: {
        title: 'DocExternal',
      },
    },
  ],
}

export default iframe
