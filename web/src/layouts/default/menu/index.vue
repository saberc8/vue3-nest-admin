<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue'
  import BasicMenu from './components/Menu/BasicMenu.vue'
  import { useGo } from '@/hooks/web/usePage'
  import { useSplitMenu } from './useLayoutMenu'
  import { openWindow } from '@/utils'
  import { isUrl } from '@/utils/is'
  export default defineComponent({
    name: 'LayoutMenu',
    setup() {
      const go = useGo()
      const { menusRef } = useSplitMenu()
      const getCommonProps = computed(() => {
        const menus = unref(menusRef)
        return {
          menus,
          beforeClickFn: beforeMenuClickFn,
          items: menus,
          onMenuClick: handleMenuClick,
        }
      })
      /**
       * click menu
       * @param menu
       */

      function handleMenuClick(path: any) {
        go(path)
      }

      /**
       * before click menu
       * @param menu
       */
      async function beforeMenuClickFn(path) {
        if (!isUrl(path.key)) {
          return true
        }
        openWindow(path.key)
        return false
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps)
        if (!menus || !menus.length) return null
        return <BasicMenu {...(menuProps as any)} items={menus} />
      }

      return () => {
        return <>{renderMenu()}</>
      }
    },
  })
</script>
