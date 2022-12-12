import type { Menu, MenuModule } from '@/router/types'
import { useAppStoreWithOut } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { transformMenuModule, getAllParentPath } from '@/router/helper/menuHelper'
import { PermissionModeEnum } from '@/enums/appEnum'

const modules = import.meta.globEager('./modules/**/*.ts')

const menuModules: MenuModule[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  menuModules.push(...modList)
})

const getPermissionMode = () => {
  const appStore = useAppStoreWithOut()
  return appStore.getProjectConfig.permissionMode
}
const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK
}

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}

const staticMenus: Menu[] = []
;(() => {
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0)
  })

  for (const menu of menuModules) {
    staticMenus.push(transformMenuModule(menu))
  }
})()

async function getAsyncMenus() {
  const permissionStore = usePermissionStore()
  if (isBackMode()) {
    return permissionStore.getBackMenuList.filter((item) => !item.meta?.hideMenu && !item.hideMenu)
  }
  if (isRouteMappingMode()) {
    return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu)
  }
  return staticMenus
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus()
  return menus
}

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus()
  const allParentPath = await getAllParentPath(menus, currentPath)
  return allParentPath?.[0]
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus()
  const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }))
  return shallowMenuList
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus()
  const parent = menus.find((item) => item.path === parentPath)
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as Menu[]
  }
  return parent.children
}
