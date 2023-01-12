<template>
  <ProTable
    ref="proTable"
    :dataSource="dataSource"
    :columns="columns"
    :params="params"
    :searchForm="searchForm"
    :showForm="showForm"
    :getListFunc="getListFunc"
    :gridOptions="{}"
  >
    <template #toolbar_title>
      <span style="font-weight: bold; font-size: 20px; color: #000">角色表单</span>
    </template>
    <template #toolbar_buttons>
      <a-button type="primary" @click="addRoleData">
        <template #icon><PlusOutlined /></template>
        新增
      </a-button>
    </template>
  </ProTable>
  <add-role :visible="visible" :title="title" @close-modal="closeModal" @refresh="refreshTable" />
</template>
<script lang="ts" setup>
  import ProTable from '@/components/ProTable/index.vue'
  import { getRoleList } from '@/api/sys/role'
  import { VxeGridPropTypes } from 'vxe-table'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import addRole from './components/addRole.vue'
  const proTable = ref()
  console.log(proTable.value, 'proTable')
  const visible = ref<Boolean>(false)
  const title = '新增角色'
  const getListFunc = getRoleList
  const columns: VxeGridPropTypes.Columns = [
    {
      type: 'seq',
      width: 60,
      treeNode: true, // 开启树图表
    },
    { field: 'id', title: 'ID', width: 80 },
    { field: 'name', title: ' 角色名称' },
    { field: 'remark', title: ' 角色名称' },
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
  ]

  const params = ref({
    page: 1,
    size: 50,
  })
  let dataSource = ref<any>([])
  const addRoleData = () => {
    console.log('addRoleData')
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
