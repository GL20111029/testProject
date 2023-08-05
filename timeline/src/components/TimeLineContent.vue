<script setup lang="ts">
import TimeLineItem from './TimeLineItem.vue';
import { LineItemArray } from './types/LineSourceData'

defineProps<{
  source: LineItemArray
}>()
</script>
<template>
  <div class="timeline">
    <TimeLineItem v-for="v in source" :key="v.imgsrc" :line-data="v" />
  </div>
</template>

<style lang="less" scoped>
.timeline {
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 700px;
  position: relative;

  &::before {
    position: absolute;
    left: 50%;
    width: 2px;
    height: 100%;
    margin-left: -1px;
    content: "";
    background: rgba(255, 255, 255, 0.07);
  }
}

@media only screen and (max-width: 767px) {
  .timeline:before {
    left: 40px;
  }
}
</style>