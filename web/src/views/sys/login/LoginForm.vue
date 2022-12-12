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
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { useMessage } from '@/hooks/web/useMessage'
  import { useUserStore } from '@/store/modules/user'
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin'

  const { notification, createErrorModal } = useMessage()
  const userStore = useUserStore()

  const { getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()

  const formRef = ref()
  const loading = ref(false)
  const rememberMe = ref(false)

  const formData = reactive({
    account: 'vben',
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
        mode: 'none', //不要默认的错误提示
      })
      if (userInfo) {
        notification.success({
          message: '登录成功',
          description: `用户名: ${userInfo.realName}`,
          duration: 3,
        })
      }
    } catch (error) {
      createErrorModal({
        title: '错误提示',
        content: (error as unknown as Error).message || '登录失败',
        getContainer: () => document.body,
      })
    } finally {
      loading.value = false
    }
  }
</script>

<style lang="less" scoped>
  .login-form {
    width: 328px;
  }
</style>
