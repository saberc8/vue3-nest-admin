<template>
  <ProTable
    :dataSource="dataSource"
    :columns="columns"
    :searchForm="searchForm"
    :showForm="showForm"
  >
    <template #toolbar_title>
      <span style="font-weight: bold; font-size: 20px; color: #000">系统菜单表单</span>
    </template>
    <template #toolbar_buttons>
      <a-button type="primary">新增</a-button>
    </template>
  </ProTable>
  <a-tag>1</a-tag>
</template>
<script lang="ts" setup>
  import ProTable from '@/components/ProTable/index.vue'
  import { getMenuList } from '@/api/sys/menu'
  import { VxeGridPropTypes } from 'vxe-table'
  import { createVNode } from 'vue'
  // import { RouteItem } from '@/api/sys/model/menuModel'

  // interface searchItem {
  //   page: number
  //   size: number
  //   name: string
  //   title: string
  //   path: string
  //   component: string
  //   redirect: string
  //   pid: number
  //   orderNo: number
  //   frameSrc: string
  //   ignoreKeepAlive: boolean
  // }
  const columns: VxeGridPropTypes.Columns = [
    { type: 'seq', width: 50 },
    { field: 'title', title: '标题' },
    { field: 'name', title: '名称' },
    { field: 'path', title: '路由' },
    { field: 'component', title: '组件' },
    { field: 'redirect', title: '父级定向' },
    { field: 'orderNo', title: '排序' },
    { field: 'icon', title: '图标' },
    { field: 'frameSrc', title: '内嵌iframe' },
    { field: 'ignoreKeepAlive', title: '是否缓存' },
    {
      field: 'address',
      title: 'Address',
      showOverflow: true,
      showHeaderOverflow: true,
      width: 200,
      slots: {
        default: ({ row }) => {
          return createVNode(
            resolveComponent('a-tag'),
            {
              color: 'pink',
            },
            () => row.title,
          )
        },
      },
    },
  ]

  const showForm = true
  // 搜索区域
  const searchForm = [
    {
      label: '名称',
      field: 'name',
      type: 'input',
      componentProps: {
        placeholder: '请输入名称',
      },
    },
    {
      label: '菜单标题',
      field: 'title',
      type: 'input',
      componentProps: {
        placeholder: '请输入菜单标题',
      },
    },
    {
      label: '组件路径',
      field: 'path',
      type: 'input',
      componentProps: {
        placeholder: '请输入路由',
      },
    },
    {
      label: '名称',
      field: 'component',
      type: 'input',
      componentProps: {
        placeholder: '请输入组件路径',
      },
    },
    {
      label: '父级id',
      field: 'pid',
      type: 'input',
      componentProps: {
        placeholder: '请输入父级id',
      },
    },
  ]

  const params = {
    page: 1,
    size: 10,
  }
  let dataSource = ref<any>([])
  const renderMenuList = async (params) => {
    const res = await getMenuList(params)
    console.log(res, '--')
    dataSource.value = res.list
  }
  renderMenuList(params)
</script>
