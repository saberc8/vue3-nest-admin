<template>
  <span>
    <Icon v-if="getIcon" :icon="getIcon" :size="18" />
    {{ getName }}
  </span>
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
