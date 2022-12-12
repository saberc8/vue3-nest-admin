import { computed } from 'vue'

import { useAppStore } from '@/store/modules/app'

export function useMultipleTabSetting() {
  const appStore = useAppStore()

  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show)

  return {
    getShowMultipleTab,
  }
}
