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
    // ignoreKeepAlive: boolean
  }
  const formState = reactive<FormState>({
    name: '1',
    title: '2',
    path: '3',
    icon: '4',
    component: '5',
    redirect: '6',
    pid: 0,
    orderNo: 0,
    frameSrc: '7',
    // ignoreKeepAlive: false,
  })

  const formList = ref([
    {
      type: 'input',
      label: '名称',
      placeholder: '请输入名称',
      value: 'name',
    },
    {
      type: 'input',
      label: '标题',
      placeholder: '请输入标题',
      value: 'title',
    },
    {
      type: 'input',
      label: '路由',
      placeholder: '请输入路由',
      value: 'path',
    },
    {
      type: 'input',
      label: '图标',
      placeholder: '请输入图标',
      value: 'icon',
    },
    {
      type: 'input',
      label: '组件',
      placeholder: '请输入组件',
      value: 'component',
    },
    {
      type: 'input',
      label: 'PID',
      placeholder: '请输入PID',
      value: 'pid',
    },
    {
      type: 'input',
      label: '父级定向',
      placeholder: '请输入父级定向',
      value: 'redirect',
    },
    {
      type: 'input',
      label: '排序',
      placeholder: '请输入排序',
      value: 'orderNo',
    },
    {
      type: 'input',
      label: '内嵌iframe',
      placeholder: '请输入内嵌iframe',
      value: 'frameSrc',
    },
    // {
    //   type: 'input',
    //   label: '是否缓存',
    //   placeholder: '请输入是否缓存',
    //   value: 'ignoreKeepAlive',
    // },
  ])
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
