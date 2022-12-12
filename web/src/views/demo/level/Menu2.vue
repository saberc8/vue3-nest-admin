<template>
  <div class="p-5">
    多层级缓存-页面2
    <br />
    <div v-for="item in list" :key="item.name" class="flex"
      ><div class="item">{{ item.name }}</div></div
    >
  </div>
</template>
<script lang="ts" setup>
  const times: any = 99
  let list: any = reactive([])
  for (let i = 0; i < times; i++) {
    list.push({
      name: '菜单' + i,
      path: '/demo/level/menu' + i,
    })
  }
</script>

<style lang="less" scoped>
  .p-5 {
    padding: 5px;

    .flex {
      flex-direction: column;
      color: black;

      .item {
        width: 100px;
        height: 30px;
        padding: 4px;
        margin: 10px;
        background-color: aliceblue;
        border-radius: 4px;
      }
    }
  }
</style>
