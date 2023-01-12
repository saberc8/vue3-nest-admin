<template>
  <ProTable
    ref="proTable"
    :dataSource="dataSource"
    :columns="columns"
    :params="params"
    :searchForm="searchForm"
    :showForm="showForm"
    :getListFunc="getListFunc"
  >
    <template #toolbar_title>
      <span style="font-weight: bold; font-size: 20px; color: #000">用户表单</span>
    </template>
    <template #toolbar_buttons>
      <a-button type="primary" @click="addUserData">
        <template #icon><PlusOutlined /></template>
        新增
      </a-button>
    </template>
  </ProTable>
  <add-user :visible="visible" :title="title" @close-modal="closeModal" @refresh="refreshTable" />
</template>
<script lang="ts" setup>
  import ProTable from '@/components/ProTable/index.vue'
  import { getUserList } from '@/api/sys/user'
  import { VxeGridPropTypes } from 'vxe-table'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import addUser from './components/addUser.vue'
  import dayjs from 'dayjs'
  const proTable = ref()
  console.log(proTable.value, 'proTable')

  const visible = ref<Boolean>(false)
  const title = '新增菜单'
  const getListFunc = getUserList

  const columns: VxeGridPropTypes.Columns = [
    {
      type: 'seq',
      width: 60,
      treeNode: true, // 开启树图表
    },
    { field: 'id', title: 'ID', width: 80 },
    { field: 'username', title: '用户名' },
    { field: 'nickname', title: '用户昵称' },
    {
      field: 'createdAt',
      title: '创建时间',
      formatter: (row: any) => dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'updatedAt',
      title: '更新时间',
      formatter: (row: any) => dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  const showForm = true
  // 搜索区域
  const searchForm = [
    {
      label: '用户名',
      field: 'username',
      type: 'input',
      componentProps: {
        placeholder: '请输入用户名',
      },
    },
    {
      label: '用户昵称',
      field: 'nickname',
      type: 'input',
      componentProps: {
        placeholder: '请输入用户昵称',
      },
    },
  ]

  const params = ref({
    page: 1,
    size: 10,
  })

  let dataSource = ref<any>([])
  const addUserData = () => {
    visible.value = true
  }

  const closeModal = () => {
    visible.value = false
  }

  const refreshTable = () => {
    closeModal()
    proTable.value.reloadData()
  }
</script>
