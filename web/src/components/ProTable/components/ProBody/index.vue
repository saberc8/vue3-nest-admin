<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <slot name="toolbar_title"></slot>
      </template>
      <template #toolbar_tools>
        <slot name="toolbar_buttons"></slot>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
  import { VxeGridProps } from 'vxe-table'
  const props = defineProps<{
    dataSource: {
      type: Object
      default: {}
    }
    columns: Array<any>
  }>()
  console.log(props, 'pro-body')
  console.log(props.dataSource, 'pro-body-dataSource')
  console.log(props.columns, 'pro-body-columns')
  let data: any = []
  const gridOptions = reactive<VxeGridProps>({
    border: true,
    align: null,
    columnConfig: {
      resizable: true,
    },
    columns: props.columns,
    toolbarConfig: {
      slots: {
        buttons: 'toolbar_buttons',
        tools: 'toolbar_tools',
      },
    },
    data,
  })
  watch(
    () => props.dataSource,
    (val: any) => {
      console.log('val', val)
      data = val
      gridOptions.data = data
    },
    { immediate: true },
  )
  watch(
    () => props.columns,
    (val) => {
      gridOptions.columns = val
    },
  )
</script>

<style scoped></style>
