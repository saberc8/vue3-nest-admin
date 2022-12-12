import { computed } from 'vue'

import { useAppStore } from '@/store/modules/app'
export function useRootSetting() {
  const appStore = useAppStore()

  const getPageLoading = computed(() => appStore.getPageLoading)

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive)

  const getPermissionMode = computed(() => appStore.getProjectConfig.permissionMode)

  return {
    getPageLoading,
    getOpenKeepAlive,
    getPermissionMode,
  }
}
