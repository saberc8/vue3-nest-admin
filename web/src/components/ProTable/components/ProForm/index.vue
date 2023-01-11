<template>
  <a-form
    ref="proFromRef"
    name="advanced_search"
    class="ant-advanced-search-form"
    :model="formState"
    @finish="onFinish"
  >
    <a-row :gutter="24">
      <template v-for="(item, index) in searchForm" :key="index">
        <a-col v-show="expand || index <= 3" :xxl="6" :xl="8" :sm="12" :xs="24">
          <a-form-item :name="item.field" :label="item.label">
            <a-input
              v-model:value="formState[`${item.field}`]"
              :placeholder="item.componentProps.placeholder"
              :allowClear="true"
            />
          </a-form-item>
        </a-col>
      </template>
      <a-col style="margin-left: auto">
        <a-space>
          <a-button @click="resetFields">重置</a-button>
          <a-button type="primary" html-type="submit">查询</a-button>
          <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand">
              收起
              <UpOutlined />
            </template>
            <template v-else>
              展开
              <DownOutlined />
            </template>
          </a>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
  import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
  defineProps<{
    searchForm: Array<any>
  }>()
  const emit = defineEmits(['searchData'])
  const expand = ref(false)
  const proFromRef = ref()
  const formState = reactive({})
  const onFinish = (values: any) => {
    emit('searchData', values)
  }

  const resetFields = () => {
    proFromRef.value.resetFields()
    emit('searchData', formState)
  }
</script>
