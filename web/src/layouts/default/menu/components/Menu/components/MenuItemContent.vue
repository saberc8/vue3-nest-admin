<template>
  <div class="menu-text">
    <Icon v-if="getIcon" :icon="getIcon" :size="18" />
    <span>{{ getName }}</span>
  </div>
</template>
<script lang="ts" setup>
  import Icon from '@/components/Icon/index'
  import { contentProps } from '../props'
  const props = defineProps({
    ...contentProps,
  })
  const getName = computed(() => props.item?.name)
  const getIcon = computed(() => props.item?.icon)
</script>

<style scoped>
  .menu-text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
    cursor: pointer;
  }
</style>
