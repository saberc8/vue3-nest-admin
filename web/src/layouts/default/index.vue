<template>
  <a-layout class="layout">
    <LayoutSideBar class="layout-sidebar" />
    <a-layout>
      <a-layout-header class="layout-header"><LayoutHeader /></a-layout-header>
      <a-layout-content class="layout-content"><LayoutContent /></a-layout-content>
      <a-layout-footer class="layout-footer">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import LayoutContent from './content/index.vue'
  import LayoutSideBar from './sider/index.vue'
  import LayoutHeader from './header/index.vue'
</script>

<style lang="less" scoped>
  .layout {
    min-height: 100vh;

    &-sidebar {
      background: rgb(0, 21, 41);
      position: fixed;
      top: 60px;
      bottom: 0;
      left: 0;
      z-index: 1000;
      overflow: scroll;
      width: 210px;
      overflow-x: hidden;
    }

    &-header {
      background: rgb(255, 255, 255);
      height: 48px;
      line-height: 48px;
      padding: 0;
      position: fixed;
      top: 0;
      right: 0;
      left: 210px;
      z-index: 999;
    }

    &-content {
      margin-top: 80px;
      padding: 16px;
      margin-left: 210px;
    }
  }
</style>
