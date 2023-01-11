<template>
  <a-modal :visible="visible" :title="title" @ok="handleOk" @cancel="closeModal">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <a-form-item label="name" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { addMenu } from '@/api/sys/menu'
  import { message } from 'ant-design-vue'
  const emits = defineEmits(['closeModal', 'refresh'])
  defineProps<{
    visible: Boolean
    title: String
  }>()
  interface FormState {
    name: string
    title: string
    path: string
    icon: string
    component: string
    redirect: string
    pid: number
    orderNo: number
    frameSrc: string
    ignoreKeepAlive: boolean
  }
  const formState = reactive<FormState>({
    name: '',
    title: '',
    path: '',
    icon: '',
    component: '',
    redirect: '',
    pid: 0,
    orderNo: 0,
    frameSrc: '',
    ignoreKeepAlive: false,
  })
  const handleOk = () => {
    console.log('ok')
    console.log(formState)
    addMenu(formState).then((res) => {
      console.log(res, 'res')
      if (res.id) {
        message.success('添加成功')
        emits('refresh', false)
      }
    })
  }
  const closeModal = () => {
    emits('closeModal', false)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
</script>
