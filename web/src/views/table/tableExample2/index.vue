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
  import { demoListApi } from '@/api/demo/table'
  console.log(typeof demoListApi)
  const columns = [
    { type: 'seq', width: 50 },
    { field: 'name', title: 'name' },
    { field: 'name1', title: 'sex', showHeaderOverflow: true },
    { field: 'name2', title: 'Address', showOverflow: true },
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
    pageSize: 10,
  }
  let dataSource: any = ref([])
  const t = async (params) => {
    const res = await demoListApi(params)
    console.log(res)
    dataSource.value = res.items
  }
  t(params)
</script>
