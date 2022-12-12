<template>
  <a-configProvider :locale="locale">
    <RouterView />
  </a-configProvider>
</template>

<script lang="ts" setup>
  import { useTitle } from '@/hooks/web/useTitle'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import dayjs from 'dayjs'
  import 'dayjs/locale/zh-cn'
  dayjs.locale('zh-cn')
  const locale = zhCN
  useTitle()
</script>

<style>
  /* 滚动条 */
  body *::-webkit-scrollbar {
    width: 4px;
    height: 5px;
  }

  body *::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 2px;
  }

  body *::-webkit-scrollbar-thumb {
    background: rgb(224, 224, 224);
    border-radius: 2px;
  }

  body *::-webkit-scrollbar-thumb:hover {
    background: rgb(175, 175, 175);
  }

  body *::-webkit-scrollbar-corner {
    background: rgb(255, 255, 255);
  }
</style>
