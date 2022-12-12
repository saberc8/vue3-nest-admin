<template>
  <div class="login-container">
    <div class="login-container-slogan">
      <img class="login-container-slogan-logo" src="../../../assets/images/logo.png" />
      <div class="login-container-slogan-title">
        {{ title }}
      </div>
    </div>
    <div class="login-container-description">
      {{ description }}
    </div>
    <div class="login-container-form">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="账号密码登录"><LoginForm /></a-tab-pane>
        <a-tab-pane key="2" tab="手机号登录" force-render><div></div></a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LoginForm from './LoginForm.vue'
  const title = 'Vben Admin'
  const description = 'Vben Admin 是一个基于 Vue3 和 TypeScript 的后台管理系统解决方案'
  const activeKey = ref('1')
</script>
<style lang="less">
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    overflow: auto;
    background: #dee2e7;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;

    &-slogan {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
      margin-top: 150px;

      &-logo {
        width: 44px;
        height: 44px;
        margin-right: 20px;
      }

      &-title {
        font-size: 33px;
        color: #000000d9;
      }
    }

    &-description {
      margin-bottom: 40px;
      font-size: 14px;
      color: #00000073;
      font-weight: 500;
      text-align: center;
    }

    &-form {
      width: 400px;
      height: 300px;
      // background: rgb(255, 255, 255);
      display: flex;
      justify-content: center;
    }
  }
</style>
