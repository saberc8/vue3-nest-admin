<template>
  <ProTable
    ref="proTable"
    :dataSource="dataSource"
    :columns="columns"
    :params="params"
    :searchForm="searchForm"
    :showForm="showForm"
    :getListFunc="getListFunc"
    :gridOptions="gridOptions"
  >
    <template #toolbar_title>
      <span style="font-weight: bold; font-size: 20px; color: #000">系统菜单表单</span>
    </template>
    <template #toolbar_buttons>
      <a-button type="primary" @click="addMenuData">
        <template #icon><PlusOutlined /></template>
        新增
      </a-button>
    </template>
  </ProTable>
  <add-menu
    :visible="visible"
    :title="title"
    :formData="formData"
    @close-modal="closeModal"
    @refresh="refreshTable"
  />
</template>
<script lang="ts" setup>
  import dayjs from 'dayjs'
  import ProTable from '@/components/ProTable/index.vue'
  import { getMenuList, deleteMenu } from '@/api/sys/menu'
  import { VxeGridPropTypes } from 'vxe-table'
  import { createVNode, VNode } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import addMenu from './components/menuModal.vue'
  import { message, Modal } from 'ant-design-vue'
  import { FormState } from './type'
  const proTable = ref()
  const visible = ref<Boolean>(false)
  const title = ref('新增菜单')

  const getListFunc = getMenuList
  const formData = ref<FormState>()
  const columns: VxeGridPropTypes.Columns = [
    {
      type: 'seq',
      width: 60,
      treeNode: true, // 开启树图表
    },
    { field: 'id', title: 'ID', width: 80 },
    { field: 'pid', title: 'PID', width: 80 },
    { field: 'title', title: '标题', showOverflow: true, showHeaderOverflow: true, width: 150 },
    { field: 'name', title: '名称', showOverflow: true, showHeaderOverflow: true, width: 150 },
    { field: 'path', title: '路由', showOverflow: true, showHeaderOverflow: true, width: 150 },
    { field: 'component', title: '组件', showOverflow: true, showHeaderOverflow: true, width: 150 },
    {
      field: 'redirect',
      title: '父级重定向',
      showOverflow: true,
      showHeaderOverflow: true,
      width: 150,
    },
    { field: 'orderNo', title: '排序', showOverflow: true, showHeaderOverflow: true, width: 150 },
    { field: 'icon', title: '图标', showOverflow: true, showHeaderOverflow: true, width: 150 },
    {
      field: 'frameSrc',
      title: '内嵌iframe',
      showOverflow: true,
      showHeaderOverflow: true,
      width: 150,
    },
    {
      field: 'ignoreKeepAlive',
      title: '是否缓存',
      showOverflow: true,
      showHeaderOverflow: true,
      width: 100,
      align: 'center',
      slots: {
        default: ({ row }) => {
          return createVNode(
            resolveComponent('a-tag'),
            {
              color: row.ignoreKeepAlive ? 'pink' : 'green',
            },
            () => (row.ignoreKeepAlive ? '否' : '是'),
          )
        },
      },
    },
    {
      field: 'createdAt',
      title: '创建时间',
      showOverflow: true,
      showHeaderOverflow: true,
      width: 150,
      formatter: (row: any) => dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'updatedAt',
      title: '更新时间',
      showOverflow: true,
      showHeaderOverflow: true,
      width: 150,
      formatter: (row: any) => dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      slots: {
        default: ({ row }): VNode => {
          return createVNode(
            resolveComponent('a-space'),
            {
              size: 'middle',
            },
            {
              default: (): VNode[] => [
                createVNode(
                  resolveComponent('a-button'),
                  {
                    type: 'primary',
                    size: 'small',
                    onClick: () => {
                      editMenuData(row)
                    },
                  },
                  () => '编辑',
                ),
                createVNode(
                  resolveComponent('a-button'),
                  {
                    type: 'danger',
                    size: 'small',
                    onClick: () => {
                      Modal.confirm({
                        title: '提示',
                        content: '确定删除该菜单吗？',
                        onOk: () => {
                          deleteMenuFunc(row.id)
                        },
                      })
                    },
                  },
                  () => '删除',
                ),
              ],
            },
          )
        },
      },
      fixed: 'right',
    },
  ]
  // 树状图表的示例
  const gridOptions = {
    treeConfig: {
      transform: true,
      rowField: 'id',
      parentField: 'pid',
    },
    seqConfig: {
      seqMethod: ({ row, rowIndex }) => {
        return row.pid === 0 ? rowIndex + 1 : ''
      },
    },
  }

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
    {
      label: '菜单标题',
      field: 'title',
      type: 'input',
      componentProps: {
        placeholder: '请输入菜单标题',
      },
    },
    {
      label: '组件路径',
      field: 'path',
      type: 'input',
      componentProps: {
        placeholder: '请输入路由',
      },
    },
    {
      label: '名称',
      field: 'component',
      type: 'input',
      componentProps: {
        placeholder: '请输入组件路径',
      },
    },
    {
      label: '父级id',
      field: 'pid',
      type: 'input',
      componentProps: {
        placeholder: '请输入父级id',
      },
    },
  ]

  const params = ref({
    page: 1,
    size: 50,
  })

  let dataSource = ref<any>([])

  const addMenuData = () => {
    title.value = '新增菜单'
    visible.value = true
  }

  const editMenuData = (row: any) => {
    visible.value = true
    title.value = '编辑菜单'
    formData.value = row
  }

  const deleteMenuFunc = (id: number) => {
    deleteMenu({ id }).then((res) => {
      console.log(res, 'res')
      message.success('删除成功')
      proTable.value.reloadData()
    })
  }

  const closeModal = () => {
    visible.value = false
  }

  const refreshTable = () => {
    closeModal()
    proTable.value.reloadData()
  }
</script>
