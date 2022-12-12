<template>
  <a-tooltip :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
    <span @click="toggle" class="tooltip">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </a-tooltip>
</template>
<script lang="ts" setup>
  import { useFullscreen } from '@vueuse/core'
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
  const { toggle, isFullscreen } = useFullscreen()
  const getTitle = computed(() => {
    return unref(isFullscreen) ? '还原' : '最大化'
  })
</script>

<style lang="less" scoped>
  .tooltip {
    padding: 0 16px;
  }
</style>
