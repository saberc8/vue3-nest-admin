<template>
  <a-modal :visible="visible" :title="title" @ok="handleOk" @cancel="closeModal">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <a-form-item
        v-for="(item, index) in formList"
        :key="index"
        :label="item.label"
        :name="item.value"
      >
        <a-input v-model:value="formState[`${item.value}`]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { addUser } from '@/api/sys/user'
  import { message } from 'ant-design-vue'
  const emits = defineEmits(['closeModal', 'refresh'])
  defineProps<{
    visible: Boolean
    title: String
  }>()
  interface FormState {
    username: string
    nickname: string
    password: string
    confirmPassword: string
    // ignoreKeepAlive: boolean
  }
  const formState = reactive<FormState>({
    username: '1',
    nickname: '1',
    password: '123456',
    confirmPassword: '123456',
  })

  const formList = ref([
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      value: 'username',
    },
    {
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户昵称',
      value: 'nickname',
    },
    {
      type: 'input',
      label: '密码',
      placeholder: '请输入密码',
      value: 'password',
    },
    {
      type: 'input',
      label: '确认密码',
      placeholder: '请再次输入密码',
      value: 'confirmPassword',
    },
  ])
  const handleOk = () => {
    console.log('ok')
    console.log(formState)
    addUser(formState).then((res) => {
      console.log(res, 'res')

      message.success(res.message || res)
      emits('refresh', false)
    })
  }
  const closeModal = () => {
    formatFormState(formState)
    emits('closeModal', false)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const formatFormState = (data: any) => {
    Object.keys(data).forEach((key) => {
      data[key] = null
    })
  }
</script>
