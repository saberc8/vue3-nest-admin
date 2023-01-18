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
  import { FormState } from '../type'
  const emits = defineEmits(['closeModal', 'refresh'])
  const props = defineProps<{
    visible: Boolean
    title: String
    formData: FormState | undefined | null
  }>()
  // 检查props.formData类型
  console.log(typeof props.formData, 'props.formData')
  const formState = reactive<FormState>({
    username: '',
    nickname: '',
    password: '123456',
    confirmPassword: '123456',
  })

  watch(
    () => props.formData,
    (val) => {
      if (val) {
        const t = JSON.parse(JSON.stringify(val))
        formState.username = t.username
        formState.nickname = t.nickname
      }
    },
  )

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
      closeModal()
      emits('refresh', false)
    })
  }
  const closeModal = () => {
    formState.username = ''
    formState.nickname = ''
    emits('closeModal', false)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
</script>
