import type { ProjectConfig, MenuSetting, TransitionSetting, MultiTabsSetting } from '/#/config'

import { defineStore } from 'pinia'
import { store } from '@/store'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import { Persistent } from '@/utils/cache/persistent'
import { resetRouter } from '@/router'
import { deepMerge } from '@/utils'

interface AppState {
  // Page loading status
  pageLoading: boolean
  // project config
  projectConfig: ProjectConfig | null
}
let timeId: TimeoutHandle
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading
    },

    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },

    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    },

    async resetAllState() {
      resetRouter()
      Persistent.clearAll()
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId)
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading)
        }, 50)
      } else {
        this.setPageLoading(loading)
        clearTimeout(timeId)
      }
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
