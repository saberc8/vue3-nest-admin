<template>
  <div class="multiple-tabbar">
    <a-tabs
      type="editable-card"
      size="small"
      :animated="false"
      :hideAdd="true"
      :tabBarGutter="3"
      :activeKey="activeKeyRef"
      @change="handleChange"
      @edit="handleEdit"
      :tabBarStyle="tabBarStyle"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <a-tab-pane :closable="!(item && item.meta && item.meta.affix)">
          <template #tab>
            <div>{{ item.meta?.title }}</div>
          </template>
        </a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
  import { useGo } from '@/hooks/web/usePage'
  import { useMultipleTabStore } from '@/store/modules/multipleTab'
  import { useUserStore } from '@/store/modules/user'
  import { initAffixTabs, useTabsDrag } from './useMultipleTabs'
  import { REDIRECT_NAME } from '@/router/constant'
  import { listenerRouteChange } from '@/logics/mitt/routeChange'

  const affixTextList = initAffixTabs()
  const activeKeyRef = ref('')
  useTabsDrag(affixTextList)
  const tabStore = useMultipleTabStore()
  const userStore = useUserStore()
  const router = useRouter()
  const go = useGo()
  const getTabsState = computed(() => {
    return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
  })
  const tabBarStyle = {
    margin: '0px',
    border: 'none',
  }
  const unClose = computed(() => unref(getTabsState).length === 1)

  listenerRouteChange((route) => {
    const { name } = route
    if (name === REDIRECT_NAME || !route || !userStore.getToken) {
      return
    }

    const { path, fullPath, meta = {} } = route
    const { currentActiveMenu, hideTab } = meta as RouteMeta
    const isHide = !hideTab ? null : currentActiveMenu
    const p = isHide || fullPath || path
    if (activeKeyRef.value !== p) {
      activeKeyRef.value = p as string
    }

    if (isHide) {
      const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu)
      findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized)
    } else {
      tabStore.addTab(unref(route))
    }
  })

  function handleChange(activeKey: any) {
    activeKeyRef.value = activeKey
    go(activeKey, false)
  }

  // Close the current tab
  function handleEdit(targetKey: string) {
    // Added operation to hide, currently only use delete operation
    if (unref(unClose)) {
      return
    }
    tabStore.closeTabByKey(targetKey, router)
  }
</script>
<style lang="less">
  .multiple-tabbar {
    z-index: 10;
    height: 30px;
    line-height: 28px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%),
      0 2px 4px 0 rgb(0 0 0 / 2%);

    .ant-tabs-small {
      height: 28px;
    }

    .ant-tabs.ant-tabs-card {
      border: #ffffff 1px solid;

      .ant-tabs-nav {
        height: 28px;
        margin: 0;
        background-color: rgb(255, 255, 255);
        border: 0;
        box-shadow: none;

        .ant-tabs-nav-container {
          height: 28px;
          border: 0;
        }

        .ant-tabs-tab {
          height: 26px;
          line-height: 26px;
          color: rgb(0, 0, 0);
          background-color: #ffffff;
          transition: none;
          border: 1px solid #eee;
          font-size: 10px;
          padding: 1px 6px;

          &:hover {
            .ant-tabs-tab-remove {
              opacity: 1;
            }
          }

          .ant-tabs-tab-remove {
            width: 4px;
            font-size: 12px;
            color: inherit;
            opacity: 0;
            transition: none;
            margin-right: 4px;
            margin-left: 0px;

            &:hover {
              svg {
                width: 0.8em;
              }
            }
          }

          svg {
            fill: rgb(133, 133, 133);
          }
        }

        .ant-tabs-tab:not(.ant-tabs-tab-active) {
          &:hover {
            color: rgb(0, 0, 0);
            font-size: 10px;
          }
        }

        .ant-tabs-tab-active {
          position: relative;
          background: #1677ff;
          border: 0;
          transition: none;
          color: #fff;
          font-size: 10px;

          .ant-tabs-tab-btn {
            color: rgb(255, 255, 255);
          }

          span {
            color: rgb(255, 255, 255) !important;
          }

          .ant-tabs-tab-remove {
            opacity: 1;
          }

          svg {
            width: 0.7em;
            fill: rgb(255, 255, 255);
          }
        }
      }

      .ant-tabs-nav > div:nth-child(1) {
        padding: 0 6px;

        .ant-tabs-tab {
          margin-right: 3px !important;
        }
      }
    }

    .ant-tabs-tab:not(.ant-tabs-tab-active) {
      .anticon-close {
        font-size: 10px;

        svg {
          width: 0.6em;
        }
      }
    }

    .ant-dropdown-trigger {
      display: inline-flex;
    }

    &--hide-close {
      .ant-tabs-tab-remove {
        opacity: 0 !important;
      }
    }
  }

  .ant-tabs-dropdown-menu {
    &-title-content {
      display: flex;
      align-items: center;

      .multiple-tabbar {
        &-content__info {
          width: auto;
          margin-left: 0;
          line-height: 28px;
        }
      }
    }

    &-item-remove {
      margin-left: auto;
    }
  }

  .multiple-tabs__dropdown {
    .ant-dropdown-content {
      width: 172px;
    }
  }
</style>
