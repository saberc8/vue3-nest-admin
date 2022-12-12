<template>
  <div v-loading="getOpenPageLoading && getPageLoading">
    <PageLayout />
  </div>
</template>
<script lang="ts">
  import PageLayout from '@/layouts/page/index.vue'
  import { useRootSetting } from '@/hooks/setting/useRootSetting'
  import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'

  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout },
    setup() {
      const { getOpenPageLoading } = useTransitionSetting()
      const { getPageLoading } = useRootSetting()
      return {
        getOpenPageLoading,
        getPageLoading,
      }
    },
  })
</script>
