<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <a-button @click="gridOptions.align = 'left'">居左</a-button>
        <a-button @click="gridOptions.align = 'center'">居中</a-button>
        <a-button @click="gridOptions.align = 'right'">居右</a-button>
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
  watch(
    () => props.dataSource,
    (val: any) => {
      data = val
      gridOptions.data = data
    },
  )
  watch(
    () => props.columns,
    (val) => {
      gridOptions.columns = val
    },
  )
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
      },
    },
    data,
  })
</script>
