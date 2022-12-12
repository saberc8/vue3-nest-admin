<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" :size="size" type="editable-card">
      <a-tab-pane key="1" tab="Tab 1">Content of tab 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">Content of tab 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of tab 3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  const activeKey = ref('1')
  const size = ref('small')
</script>
