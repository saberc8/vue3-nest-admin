import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import projectSetting from '@/settings/projectSetting'
import { PermissionModeEnum } from '@/enums/appEnum'
import { RoleEnum } from '@/enums/roleEnum'

import { intersection } from 'lodash-es'
import { isArray } from '@/utils/is'

// User permissions related operations
export function usePermission() {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  /**
   * Determine whether there is permission
   */
  function hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    // Visible by default
    if (!value) {
      return def
    }

    const permMode = projectSetting.permissionMode

    if ([PermissionModeEnum.ROUTE_MAPPING].includes(permMode)) {
      if (!isArray(value)) {
        return userStore.getRoleList?.includes(value as RoleEnum)
      }
      return (intersection(value, userStore.getRoleList) as RoleEnum[]).length > 0
    }

    if (PermissionModeEnum.BACK === permMode) {
      const allCodeList = permissionStore.getPermCodeList as string[]
      if (!isArray(value)) {
        return allCodeList.includes(value)
      }
      return (intersection(value, allCodeList) as string[]).length > 0
    }
    return true
  }

  return { hasPermission }
}
