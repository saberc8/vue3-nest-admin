<template>
  <a-card><ProForm /></a-card>
  <a-card class="margin-top-10"><ProBody :columns="columns" :dataSource="dataSource" /></a-card>
</template>

<script lang="ts" setup>
  import ProForm from './components/ProForm/index.vue'
  import ProBody from './components/ProBody/index.vue'
  const props = defineProps<{
    dataSource: {
      type: Object
      default: {}
    }
    columns: Array<any>
    searchForm: Array<any>
    showForm: Boolean
  }>()
  console.log(props, 'pro-table')
  // console.log(props.dataSource, 'pro-table-dataSource')
  // console.log(props.columns, 'pro-table-columns')
</script>

<style lang="less" scoped>
  .margin-top-10 {
    margin-top: 10px;
  }
</style>
