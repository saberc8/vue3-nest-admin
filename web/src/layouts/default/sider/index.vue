<template>
  <a-layout-sider class="layout-sider" width="210">
    <div class="slogan"
      ><img src="@/assets/images/logo.png" alt="" /><div class="name">后台管理系统</div></div
    >
    <LayoutMenu />
  </a-layout-sider>
</template>
<script lang="ts" setup>
  import LayoutMenu from '../menu/index.vue'
</script>

<style lang="less" scoped>
  .layout-sider {
    position: relative;
  }

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

  .slogan {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    height: 60px;
    width: 210px;
    z-index: 1000;
    background: rgb(0, 21, 41);
  }

  .slogan img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .slogan .name {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
</style>
