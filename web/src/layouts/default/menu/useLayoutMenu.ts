import type { Menu } from '@/router/types'
import { watch, unref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThrottleFn } from '@vueuse/core'
import { getChildrenMenus, getCurrentParentPath, getMenus } from '@/router/menus'
import { usePermissionStore } from '@/store/modules/permission'
export function useSplitMenu() {
  const menusRef = ref<Menu[]>([])
  const { currentRoute } = useRouter()
  const permissionStore = usePermissionStore()
  const throttleHandleSplitLeftMenu = useThrottleFn(handleSplitLeftMenu, 50)
  watch(
    () => unref(currentRoute).path,
    async ([path]: [string]) => {
      const { meta } = unref(currentRoute)
      const currentActiveMenu = meta.currentActiveMenu as string
      let parentPath = await getCurrentParentPath(path)
      if (!parentPath) {
        parentPath = await getCurrentParentPath(currentActiveMenu)
      }
      parentPath && throttleHandleSplitLeftMenu(parentPath)
    },
    {
      immediate: true,
    },
  )

  // Menu changes
  watch(
    [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
    () => {
      genMenus()
    },
    {
      immediate: true,
    },
  )

  // Handle left menu split
  async function handleSplitLeftMenu(parentPath: string) {
    // spilt mode left
    const children = await getChildrenMenus(parentPath)
    if (!children || !children.length) {
      menusRef.value = []
      return
    }
    menusRef.value = children
  }

  // get menus
  async function genMenus() {
    menusRef.value = await getMenus()
  }

  return { menusRef }
}
