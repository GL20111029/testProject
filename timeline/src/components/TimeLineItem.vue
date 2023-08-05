<script setup lang="ts">
import { LineItem } from './types/LineSourceData'

defineProps<{
  lineData: LineItem
}>()
</script>
<template>
  <div class="item" :data-text="lineData?.datatext">
    <div class="contet">
      <img :src="lineData.imgsrc" alt="" class="img">
      <h2 class="content-title">{{ lineData.Timelinestime }}</h2>
      <p class="content-desc" v-html="lineData.descriptions"></p>
    </div>
  </div>
</template>

<style scoped lang="less">
.item {
  padding: 40px 0;
  opacity: 0.3;
  filter: blur(2px);
  transition: 0.5s;
  box-sizing: border-box;
  width: calc(50% - 40px);
  display: flex;
  position: relative;
  transform: translateY(-80px);

  &::before {
    content: attr(data-text);
    letter-spacing: 3px;
    width: 100%;
    position: absolute;
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    border-left: 2px solid rgba(255, 255, 255, 0.5);
    top: 70%;
    margin-top: -5px;
    padding-left: 15px;
    opacity: 0;
    right: calc(-100% - 56px);
    font: 900 20px '';
    letter-spacing: 5px;
  }

  &:nth-child(even) {
    align-self: flex-end;

    &::before {
      right: auto;
      text-align: right;
      left: calc(-100% - 56px);
      padding-left: 0;
      border-left: none;
      border-right: 2px solid rgba(255, 255, 255, 0.5);
      padding-right: 15px;
    }
  }

  .content-title {
    font-weight: normal;
    font-size: 66px;
    margin: -10px 0 0 0;
    transition: 0.4s;
    padding: 0 10px;
    box-sizing: border-box;
    color: #fff;
  }

  .content-desc {
    margin: 0;
    font-size: 15px;
    box-sizing: border-box;
    color: rgba(255, 255, 255, 0.7);
    line-height: 25px;
  }

  .img {
    max-width: 100%;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
  }

  &.active {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);

    &::before {
      top: 50%;
      transition: 0.3s all 0.2s;
      opacity: 1;
    }

    .content-title {
      margin: -50px 0 20px 0;
    }
  }
}

@media only screen and (max-width: 767px) {
  .item {
    align-self: baseline !important;
    width: 100%;
    padding: 0 30px 150px 80px;

    &::before {
      left: 10px !important;
      padding: 0 !important;
      top: 50px;
      text-align: center !important;
      width: 60px;
      border: none !important;
    }

    &:last-child {

      padding-bottom: 40px;
    }
  }
}
</style>