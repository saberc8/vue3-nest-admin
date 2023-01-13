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
  import { addMenu, updateMenu } from '@/api/sys/menu'
  import { message } from 'ant-design-vue'
  import { FormState } from '../type'
  const emits = defineEmits(['closeModal', 'refresh'])
  const props = defineProps<{
    visible: Boolean
    title: String
    formData: FormState | undefined
  }>()
  let formState = reactive<FormState>({
    id: null,
    name: '1',
    title: '1',
    path: '1',
    icon: '1',
    component: '1',
    redirect: '1',
    pid: 0,
    orderNo: 0,
    frameSrc: '1',
    // ignoreKeepAlive: false,
  })
  console.log(props.formData, 'props.formData')
  watch(
    () => props.formData,
    (val) => {
      if (val) {
        const t = JSON.parse(JSON.stringify(val))
        formState.id = t.id
        formState.name = t.name
        formState.title = t.title
        formState.path = t.path
        formState.icon = t.icon
        formState.component = t.component
        formState.redirect = t.redirect
        formState.pid = t.pid
        formState.orderNo = t.orderNo
        formState.frameSrc = t.frameSrc
      }
    },
    { immediate: true },
  )

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
    console.log('ok', props.title)
    console.log(formState)
    if (props.title === '编辑菜单') {
      const params = {
        id: Number(formState.id),
        name: formState.name,
        title: formState.title,
        path: formState.path,
        icon: formState.icon,
        component: formState.component,
        redirect: formState.redirect,
        pid: formState.pid,
        orderNo: formState.orderNo,
        frameSrc: formState.frameSrc,
        // ignoreKeepAlive: formState.ignoreKeepAlive,
      }
      updateMenuFunc(params)
    } else {
      addMenuFunc()
    }
  }

  const updateMenuFunc = (params) => {
    updateMenu(params).then((res) => {
      console.log(res)
      message.success('修改成功')
      emits('refresh', false)
    })
  }

  const addMenuFunc = () => {
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
