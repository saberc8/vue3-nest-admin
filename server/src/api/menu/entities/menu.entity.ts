import { SharedEntity } from '@src/shared/entities/base.entity'

import { Entity, Column, Index } from 'typeorm'

@Entity('menu')
export class MenuEntity extends SharedEntity {
  constructor() {
    super()
  }

  @Index()
  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '菜单名称',
  })
  name!: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'title',
    comment: '菜单标题',
  })
  title!: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'path',
    comment: '菜单路径',
  })
  path!: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'component',
    default: '',
    comment: '菜单组件',
  })
  component: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'icon',
    default: '',
    comment: '菜单图标',
  })
  icon: string

  @Column({
    type: 'varchar',
    length: 50,
    name: 'redirect',
    default: '',
    comment: '菜单定向/父级才有',
  })
  redirect: string

  @Column({
    type: 'boolean',
    name: 'hide_menu',
    default: false,
    comment: '是否显示菜单',
  })
  hideMenu: boolean

  @Column({
    type: 'boolean',
    name: 'hide_breadcrumb',
    default: false,
    comment: '是否显示面包屑',
  })
  hideBreadcrumb: boolean

  @Column({
    type: 'int',
    name: 'pid',
    default: '0',
    comment: '父级菜单id',
  })
  pid!: number

  @Column({
    type: 'tinyint',
    name: 'order_no',
    default: '0',
    comment: '菜单排序',
  })
  orderNo: number

  @Column({
    type: 'varchar',
    length: 50,
    name: 'frame_src',
    default: '',
    comment: '内嵌iframe',
  })
  frameSrc: string

  @Column({
    type: 'boolean',
    name: 'keep_alive',
    default: true,
    comment: '是否缓存',
  })
  keepAlive: boolean

  // @OneToMany(() => RoleMenuEntity, (roleMenuEntity) => roleMenuEntity.menu)
  // role!: RoleMenuEntity[]
}

// let list = [
//   {
//     path: '/dashboard',
//     name: 'Dashboard',
//     component: 'LAYOUT',
//     redirect: '/dashboard/analysis',
//     meta: { title: 'routes.dashboard.dashboard', hideChildrenInMenu: true, icon: 'bx:bx-home' },
//     children: [
//       {
//         path: 'analysis',
//         name: 'Analysis',
//         component: '/dashboard/analysis/index',
//         meta: {
//           hideMenu: true,
//           hideBreadcrumb: true,
//           title: 'routes.dashboard.analysis',
//           currentActiveMenu: '/dashboard',
//           icon: 'bx:bx-home',
//         },
//       },
//       {
//         path: 'workbench',
//         name: 'Workbench',
//         component: '/dashboard/workbench/index',
//         meta: {
//           hideMenu: true,
//           hideBreadcrumb: true,
//           title: 'routes.dashboard.workbench',
//           currentActiveMenu: '/dashboard',
//           icon: 'bx:bx-home',
//         },
//       },
//     ],
//   },
//   {
//     path: '/permission',
//     name: 'Permission',
//     component: 'LAYOUT',
//     redirect: '/permission/front/page',
//     meta: { icon: 'carbon:user-role', title: 'routes.demo.permission.permission' },
//     children: [
//       {
//         path: 'back',
//         name: 'PermissionBackDemo',
//         meta: { title: 'routes.demo.permission.back' },
//         children: [
//           {
//             path: 'page',
//             name: 'BackAuthPage',
//             component: '/demo/permission/back/index',
//             meta: { title: 'routes.demo.permission.backPage' },
//           },
//           {
//             path: 'btn',
//             name: 'BackAuthBtn',
//             component: '/demo/permission/back/Btn',
//             meta: { title: 'routes.demo.permission.backBtn' },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: '/level',
//     name: 'Level',
//     component: 'LAYOUT',
//     redirect: '/level/menu1/menu1-1',
//     meta: { icon: 'carbon:user-role', title: 'routes.demo.level.level' },
//     children: [
//       {
//         path: 'menu1',
//         name: 'Menu1Demo',
//         meta: { title: 'Menu1' },
//         children: [
//           {
//             path: 'menu1-1',
//             name: 'Menu11Demo',
//             meta: { title: 'Menu1-1' },
//             children: [
//               {
//                 path: 'menu1-1-1',
//                 name: 'Menu111Demo',
//                 component: '/demo/level/Menu111',
//                 meta: { title: 'Menu111' },
//               },
//             ],
//           },
//           {
//             path: 'menu1-2',
//             name: 'Menu12Demo',
//             component: '/demo/level/Menu12',
//             meta: { title: 'Menu1-2' },
//           },
//         ],
//       },
//       {
//         path: 'menu2',
//         name: 'Menu2Demo',
//         component: '/demo/level/Menu2',
//         meta: { title: 'Menu2' },
//       },
//     ],
//   },
//   {
//     path: '/system',
//     name: 'System',
//     component: 'LAYOUT',
//     redirect: '/system/account',
//     meta: { icon: 'ion:settings-outline', title: 'routes.demo.system.moduleName' },
//     children: [
//       {
//         path: 'account',
//         name: 'AccountManagement',
//         meta: { title: 'routes.demo.system.account', ignoreKeepAlive: true },
//         component: '/demo/system/account/index',
//       },
//       {
//         path: 'account_detail/:id',
//         name: 'AccountDetail',
//         meta: {
//           hideMenu: true,
//           title: 'routes.demo.system.account_detail',
//           ignoreKeepAlive: true,
//           showMenu: false,
//           currentActiveMenu: '/system/account',
//         },
//         component: '/demo/system/account/AccountDetail',
//       },
//       {
//         path: 'role',
//         name: 'RoleManagement',
//         meta: { title: 'routes.demo.system.role', ignoreKeepAlive: true },
//         component: '/demo/system/role/index',
//       },
//       {
//         path: 'menu',
//         name: 'MenuManagement',
//         meta: { title: 'routes.demo.system.menu', ignoreKeepAlive: true },
//         component: '/demo/system/menu/index',
//       },
//       {
//         path: 'dept',
//         name: 'DeptManagement',
//         meta: { title: 'routes.demo.system.dept', ignoreKeepAlive: true },
//         component: '/demo/system/dept/index',
//       },
//       {
//         path: 'changePassword',
//         name: 'ChangePassword',
//         meta: { title: 'routes.demo.system.password', ignoreKeepAlive: true },
//         component: '/demo/system/password/index',
//       },
//     ],
//   },
//   {
//     path: '/link',
//     name: 'Link',
//     component: 'LAYOUT',
//     meta: { icon: 'ion:tv-outline', title: 'routes.demo.iframe.frame' },
//     children: [
//       {
//         path: 'doc',
//         name: 'Doc',
//         meta: { title: 'routes.demo.iframe.doc', frameSrc: 'https://vvbin.cn/doc-next/' },
//       },
//       {
//         path: 'https://vvbin.cn/doc-next/',
//         name: 'DocExternal',
//         component: 'LAYOUT',
//         meta: { title: 'routes.demo.iframe.docExternal' },
//       },
//     ],
//   },
// ]
