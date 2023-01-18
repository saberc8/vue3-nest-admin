<template>
  <a-form
    class="login-form"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <a-form-item name="account" class="enter-x">
      <a-input
        size="large"
        v-model:value="formData.account"
        placeholder="账号"
        class="fix-auto-fill"
      />
    </a-form-item>
    <a-form-item name="password" class="enter-x">
      <a-input-password
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        placeholder="密码"
      />
    </a-form-item>

    <a-row class="enter-x">
      <a-col :span="12">
        <a-form-item>
          <!-- No logic, you need to deal with it yourself -->
          <a-checkbox v-model:checked="rememberMe" size="small"> 记住我 </a-checkbox>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item class="enter-x">
      <a-button type="primary" size="large" block @click="handleLogin" :loading="loading">
        登录
      </a-button>
      <a-button
        type="danger"
        size="large"
        block
        @click="handleInitDatabase"
        style="margin-top: 20px"
      >
        数据库初始化
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { useMessage } from '@/hooks/web/useMessage'
  import { useUserStore } from '@/store/modules/user'
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin'
  import { initDatabase } from '@/api/sys/user'

  const { notification, createMessage } = useMessage()
  const userStore = useUserStore()

  const { getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()

  const formRef = ref()
  const loading = ref(false)
  const rememberMe = ref(false)

  const formData = reactive({
    account: 'admin',
    password: '123456',
  })

  const { validForm } = useFormValid(formRef)

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  async function handleLogin() {
    const data = await validForm()
    if (!data) return
    try {
      loading.value = true
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
      })
      console.log(userInfo, 'userInfo')
      if (userInfo) {
        notification.success({
          message: '登录成功',
          description: `用户名: ${userInfo.nickname}`,
          duration: 3,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  async function handleInitDatabase() {
    const { createConfirm } = useMessage()

    createConfirm({
      iconType: 'warning',
      title: () => h('span', '温馨提醒'),
      content: () => h('span', '确定要初始化数据库吗？'),
      onOk: async () => {
        console.log('初始化数据库')
        const res = await initDatabase()
        console.log(res)
        createMessage.success('初始化成功')
      },
    })
  }
</script>

<style lang="less" scoped>
  .login-form {
    width: 328px;
  }
</style>
