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
  import { addRole } from '@/api/sys/role'
  import { message } from 'ant-design-vue'
  const emits = defineEmits(['closeModal', 'refresh'])
  defineProps<{
    visible: Boolean
    title: String
  }>()
  interface FormState {
    name: string
    // ignoreKeepAlive: boolean
  }
  const formState = reactive<FormState>({
    name: '1',
  })

  const formList = ref([
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      value: 'name',
    },
  ])
  const handleOk = () => {
    console.log('ok')
    console.log(formState)
    addRole(formState).then((res) => {
      console.log(res, 'res')
      if (res.id) {
        message.success('添加成功')
        emits('refresh', false)
      }
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
