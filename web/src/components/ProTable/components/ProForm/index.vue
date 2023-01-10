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
          <a-button @click="() => proFromRef.resetFields()">重置</a-button>
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

  const props = defineProps<{
    searchForm: Array<any>
  }>()
  const emit = defineEmits(['searchData'])
  console.log(props, 'pro-form')
  const expand = ref(false)
  const proFromRef = ref()
  const formState = reactive({})
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    console.log('formState: ', formState)
    emit('searchData', values)
    inject(values)
  }
</script>
<style>
  #components-form-demo-advanced-search .ant-form {
    max-width: none;
  }

  #components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 2px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  [data-theme='dark'] .ant-advanced-search-form {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid #434343;
    padding: 24px;
    border-radius: 2px;
  }

  [data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
    border: 1px dashed #434343;
    background: rgba(255, 255, 255, 0.04);
  }
</style>
