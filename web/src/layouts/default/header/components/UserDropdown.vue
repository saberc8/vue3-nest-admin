<template>
  <a-popover>
    <template #content>
      <div @click="handleMenuClick(1)" class="popover">退出系统</div>
      <div @click="handleMenuClick(2)" class="popover">文档</div>
      <div @click="handleMenuClick(3)" class="popover">github</div>
    </template>
    <a-space style="cursor: pointer">
      <img class="avatar" :src="getUserInfo.avatar" />
      <a-space>
        <span>
          {{ getUserInfo.nickname }}
        </span>
        <a-tag color="green">{{ getUserInfo.isSuperText }}</a-tag>
      </a-space>
    </a-space>
  </a-popover>
</template>
<script lang="ts" setup>
  import { DOC_URL, GITHUB_URL } from '@/settings/siteSetting'

  import { useUserStore } from '@/store/modules/user'

  import headerImg from '@/assets/images/header.jpg'
  import { openWindow } from '@/utils'

  const userStore = useUserStore()

  const getUserInfo = computed(() => {
    const { nickname = '', avatar, desc, isSuperText = '普通用户' } = userStore.getUserInfo || {}
    return { nickname, avatar: avatar || headerImg, desc, isSuperText }
  })

  //  login out
  function handleLoginOut() {
    userStore.confirmLoginOut()
  }

  // open doc
  function openDoc() {
    openWindow(DOC_URL)
  }

  // open doc
  function openGithub() {
    openWindow(GITHUB_URL)
  }

  function handleMenuClick(e) {
    switch (e) {
      case 1:
        handleLoginOut()
        break
      case 2:
        openDoc()
        break
      case 3:
        openGithub()
        break
    }
  }
</script>

<style lang="less" scoped>
  .userdrop {
    z-index: 999;
  }

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .popover {
    padding: 5px;
    cursor: pointer;
  }
</style>
