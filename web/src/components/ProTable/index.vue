<template>
  <a-card><ProForm :searchForm="searchForm" /></a-card>
  <a-card class="margin-top-10">
    <ProBody :columns="columns" :dataSource="dataSource">
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
