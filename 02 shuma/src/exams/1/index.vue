<!-- 第一题 -->
<template>
  <div className="card">
    <div className="title">
      <div><b>{{ title }}</b></div>
      <div>{{ subTitle }}</div>
    </div>
    <div class="button"><b>抢购</b></div>
  </div>
</template>

<script lang="ts">
import { h } from 'vue';

/**
 * 测试数据
 */
const cardDataList = [
  {
    title: '杭州市通用5元券',
    subTitle:
      '杭味面馆非常好吃，太好吃了，相当不错，味道鲜美，特别划算，快快抢购，聚划算',
  },
  {
    title: '杭州市10元券',
    subTitle: '兰州拉面非常好吃',
  },
];

const Card = {
  props: ['title', 'subTitle'],
  __test__: () => { },
  components: {},
};

export default Card;

/**
 * 以下为测试用例，无需修改
 */
Card.__test__ = () =>
  cardDataList && cardDataList.map(data => h(Card, { ...data, key: data.title }));
</script>

<style lang="less">
.card {
  background-color: #fff0f1;
  height: 1.36rem;
  width: 4.3rem;
  margin: 0 auto;
  margin-bottom: 0.1rem;
  border-radius: 0.12rem;
  padding-left: 0.3rem;
  padding-right: 0.12rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.title {
  width: 60%;
  color: black;
  user-select: none;

  &>div:nth-child(1) {
    font-size: 0.24rem;
  }

  &>div:nth-child(2) {
    color: #666666;
    font-size: 0.22rem;
    white-space: nowrap;
    word-break: keep-all;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.button {
  width: 1.08rem;
  height: 0.45rem;
  border-radius: 0.12rem;
  font-size: 0.25rem;
  text-align: center;
  color: #fef5f6;
  padding-top: 0.1rem;
  background-color: #f00;
  cursor: pointer;
  user-select: none;
}

html {
  font-size: 60px;
}
</style>
