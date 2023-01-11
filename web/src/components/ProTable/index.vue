<template>
  <a-card><ProForm :searchForm="searchForm" @search-data="searchData" /></a-card>
  <a-card class="margin-top-10">
    <ProBody
      ref="proBody"
      :columns="columns"
      :dataSource="data"
      :gridOtherOptions="gridOptions"
      @reload-data="reloadData"
    >
      <template #toolbar_buttons>
        <slot name="toolbar_buttons"></slot>
      </template>
      <template #toolbar_title>
        <slot name="toolbar_title"></slot>
      </template>
    </ProBody>
  </a-card>
</template>

<script lang="ts" setup>
  import ProForm from './components/ProForm/index.vue'
  import ProBody from './components/ProBody/index.vue'
  const props = defineProps<{
    dataSource: {
      type: Array<any>
      default: []
    }
    columns: Array<any>
    searchForm: Array<any>
    showForm: Boolean
    getListFunc: Function
    gridOptions: Object
    params: Object
  }>()
  const data = ref([])
  const renderTable = (func: Function, params: Object) => {
    func(params).then((res) => {
      data.value = res.list
    })
  }
  if (typeof props.getListFunc === 'function') {
    renderTable(props.getListFunc, props.params)
  }
  const reloadData = () => {
    renderTable(props.getListFunc, props.params)
  }
  const searchData = (e) => {
    const params = {
      ...props.params,
      ...e,
    }
    renderTable(props.getListFunc, params)
  }
</script>

<style lang="less" scoped>
  .margin-top-10 {
    margin-top: 10px;
  }
</style>
