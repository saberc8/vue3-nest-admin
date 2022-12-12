<template>
  <div class="header">
    <div class="header-left">
      <!-- <LayoutTrigger /> -->
      <LayoutBreadcrumb />
    </div>
    <div class="header-right">
      <FullScreen />
      <UserDropDown />
    </div>
    <MultipleTabs class="header-tabs" />
  </div>
</template>
<script lang="ts" setup>
  // import LayoutTrigger from '../trigger/index.vue'
  import { UserDropDown, LayoutBreadcrumb, FullScreen } from './components'
  import MultipleTabs from '../tabs/index.vue'
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    position: relative;
    justify-content: space-between;
    background-color: rgb(255, 255, 255);
    height: 48px;
    padding: 0 16px;

    &-left {
      display: flex;
      align-items: center;
    }

    &-right {
      display: flex;
      align-items: center;
    }

    &-tabs {
      position: absolute;
      top: 48px;
      left: 0px;
      right: 0;
    }
  }
</style>
