import type { Menu as MenuType } from '@/router/types'
import type { MenuState } from './types'
import { computed, Ref, toRaw, unref } from 'vue'
import { getAllParentPath } from '@/router/helper/menuHelper'
import { useTimeoutFn } from '@/hooks/core/useTimeout'

export function useOpenKeys(menuState: MenuState, menus: Ref<MenuType[]>) {
  async function setOpenKeys(path: string) {
    useTimeoutFn(() => {
      const menuList = toRaw(menus.value)
      if (menuList?.length === 0) {
        menuState.openKeys = []
        return
      }
      menuState.openKeys = getAllParentPath(menuList, path)
    }, 16)
  }

  const getOpenKeys = computed(() => {
    return menuState.openKeys
  })

  /**
   * @description:  重置值
   */
  function resetKeys() {
    menuState.selectedKeys = []
    menuState.openKeys = []
  }

  function handleOpenChange(openKeys: string[]) {
    const rootSubMenuKeys: string[] = []
    for (const { children, path } of unref(menus)) {
      if (children && children.length > 0) {
        rootSubMenuKeys.push(path)
      }
    }

    const latestOpenKey = openKeys.find((key) => menuState.openKeys.indexOf(key) === -1)
    if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) {
      menuState.openKeys = openKeys
    } else {
      menuState.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }
  return { setOpenKeys, resetKeys, getOpenKeys, handleOpenChange }
}
