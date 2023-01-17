import type { Menu } from '@/router/types'
import { watch, ref } from 'vue'
import { getMenus } from '@/router/menus'
import { usePermissionStore } from '@/store/modules/permission'
export function useSplitMenu() {
  const menusRef = ref<Menu[]>([])
  const permissionStore = usePermissionStore()

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

  // get menus
  async function genMenus() {
    menusRef.value = await getMenus()
  }

  return { menusRef }
}
