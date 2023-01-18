<template>
  <a-card><ProForm :searchForm="searchForm" @search-data="searchData" /></a-card>
  <a-card class="margin-top-10">
    <ProBody
      ref="proBody"
      :columns="columns"
      :dataSource="data"
      :gridOtherOptions="gridOptions"
      :total="total"
      @reload-data="reloadData"
      @page-change="pageChange"
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
    params: Object
    gridOptions?: {}
  }>()
  const data = ref([])
  const proBody = ref()
  let searchParams = {}
  let total = ref(0)
  const renderTable = (func: Function, params: Object) => {
    console.log(params, 'params2')
    func(params).then((res) => {
      console.log(res, '---')
      data.value = res.list
      total.value = res.total
    })
  }
  if (typeof props.getListFunc === 'function') {
    renderTable(props.getListFunc, props.params)
  }
  const reloadData = () => {
    console.log(proBody, 'proBody')
    renderTable(props.getListFunc, props.params)
  }
  const pageChange = (e) => {
    console.log(e, 'son-page-change')
    // eslint-disable-next-line vue/no-mutating-props
    // props.params.page = e.page
    // // eslint-disable-next-line vue/no-mutating-props
    // props.params.size = e.size
    // const params = {
    //   ...props.params,
    //   ...searchParams,
    // }
    // renderTable(props.getListFunc, params)
    searchData(e)
  }

  const searchData = (e) => {
    console.log('e', e, 'searchData')

    searchParams = e
    const params = {
      ...props.params,
      ...searchParams,
    }
    console.log(params, 'params')
    renderTable(props.getListFunc, params)
  }
  defineExpose({
    proBody,
    reloadData,
  })
</script>

<style lang="less" scoped>
  .margin-top-10 {
    margin-top: 10px;
  }
</style>
