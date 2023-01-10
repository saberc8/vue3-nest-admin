<template>
  <ProTable
    :dataSource="dataSource"
    :columns="columns"
    :searchForm="searchForm"
    :showForm="showForm"
  />
</template>
<script lang="ts" setup>
  import ProTable from '@/components/ProTable/index.vue'
  import { getMenuList } from '@/api/sys/menu'
  // import { RouteItem } from '@/api/sys/model/menuModel'
  const columns = [
    { type: 'seq', width: 50 },
    { field: 'name', title: 'name' },
  ]

  const showForm = true
  // 搜索区域
  const searchForm = [
    {
      label: '姓名',
      field: 'name',
      type: 'input',
      componentProps: {
        placeholder: '请输入',
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
