import type { ProjectConfig } from '/#/config'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import {
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
} from '@/enums/appEnum'
// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // Permission mode
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // Whether to cancel the menu, the top, the multi-tab page display, for possible embedded in other systems
  fullContent: false,

  // Multi-label
  multiTabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
  },

  // Transition Setting
  transitionSetting: {
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoading
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // Whether to open the top progress bar
    openNProgress: false,
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,
}

export default setting
