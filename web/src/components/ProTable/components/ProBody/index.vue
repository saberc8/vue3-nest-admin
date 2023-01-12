<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #toolbar_buttons>
        <slot name="toolbar_title"></slot>
      </template>

      <template #toolbar_tools>
        <slot name="toolbar_buttons"></slot>
        <a-tooltip>
          <template #title>刷新</template>
          <redo-outlined
            :style="{ cursor: 'pointer', 'margin-left': '15px' }"
            @click="reloadData"
          />
        </a-tooltip>
      </template>

      <template #pager>
        <vxe-pager
          :layouts="[
            'Sizes',
            'PrevJump',
            'PrevPage',
            'Number',
            'NextPage',
            'NextJump',
            'FullJump',
            'Total',
          ]"
          v-model:current-page="tablePage.page"
          v-model:page-size="tablePage.size"
          :total="tablePage.total"
          @page-change="handlePageChange"
        />
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
  import { defineExpose } from 'vue'
  import { RedoOutlined } from '@ant-design/icons-vue'
  import { VxeGridInstance, VxeGridProps, VxePagerEvents } from 'vxe-table'
  const props = defineProps<{
    dataSource: Array<any>
    columns: Array<any>
    gridOtherOptions?: Object
  }>()
  const emit = defineEmits(['reloadData', 'pageChange'])
  const xGrid = ref<VxeGridInstance>()
  defineExpose({
    xGrid,
  })
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
    ...props.gridOtherOptions,
  })
  const tablePage = reactive({
    total: 0,
    page: 1,
    size: 10,
  })
  const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
    tablePage.page = currentPage
    tablePage.size = pageSize
    console.log('currentPage', tablePage)
    emit('pageChange', tablePage)
  }
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

  const reloadData = () => {
    console.log('redo')
    emit('reloadData')
    // data.map((item) => {
    //   item.children = []
    // })
    // const $grid = xGrid.value
    // if ($grid) {
    //   $grid.reloadData(data)
    // }
  }
</script>

<style scoped></style>
