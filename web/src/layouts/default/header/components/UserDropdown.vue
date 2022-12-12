<template>
  <a-popover>
    <template #content>
      <div @click="handleMenuClick(1)" class="popover">退出系统</div>
      <div @click="handleMenuClick(2)" class="popover">文档</div>
      <div @click="handleMenuClick(3)" class="popover">github</div>
    </template>
    <span>
      <img class="avatar" :src="getUserInfo.avatar" />
      <span>
        <span>
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>
  </a-popover>
</template>
<script lang="ts" setup>
  import { DOC_URL, GITHUB_URL } from '@/settings/siteSetting'

  import { useUserStore } from '@/store/modules/user'

  import headerImg from '@/assets/images/header.jpg'
  import { openWindow } from '@/utils'

  const userStore = useUserStore()

  const getUserInfo = computed(() => {
    const { realName = '', avatar, desc } = userStore.getUserInfo || {}
    return { realName, avatar: avatar || headerImg, desc }
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
    padding: 5px 10px;
    cursor: pointer;
    border-bottom: 1px solid #e8e8e8;
  }
</style>
