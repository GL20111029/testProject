<script setup lang="tsx">
import TimeLineContent from '@/components/TimeLineContent.vue';
import { LineItemArray } from '@/components/types/LineSourceData';
import { onMounted } from 'vue';


import $ from './components/hook/index'

const init = () => {
  $('#timelineBox').timeline()
}

onMounted(() => {
  init()
})

const source: LineItemArray = [
  {
    imgsrc: 'src/assets/img/01.jpg',
    descriptions: '如果你停止，就是谷底。如果你还在继续，<br/>就是上坡。这是我听过关于人生低谷最好的阐述。',
    Timelinestime: '2021',
    datatext: '《你的孤独，虽败犹荣》'
  }, {
    imgsrc: 'src/assets/img/02.jpg',
    descriptions: '如果你停止，就是谷底。如果你还在继续，<br/>就是上坡。这是我听过关于人生低谷最好的阐述。',
    Timelinestime: '2022',
    datatext: '《下班就失联，找我靠随缘》'
  }, {
    imgsrc: 'src/assets/img/03.jpg',
    descriptions: '如果你停止，就是谷底。如果你还在继续，<br/>就是上坡。这是我听过关于人生低谷最好的阐述。',
    Timelinestime: '2023',
    datatext: '《人定胜天》'
  }, {
    imgsrc: 'src/assets/img/04.jpg',
    descriptions: '如果你停止，就是谷底。如果你还在继续，<br/>就是上坡。这是我听过关于人生低谷最好的阐述。',
    Timelinestime: '2024',
    datatext: '《找工作好难》'
  }, {
    imgsrc: 'src/assets/img/05.jpg',
    descriptions: '如果你停止，就是谷底。如果你还在继续，<br/>就是上坡。这是我听过关于人生低谷最好的阐述。',
    Timelinestime: '2025',
    datatext: '《趁年轻，出去走走》'
  }, {
    imgsrc: 'src/assets/img/06.jpg',
    descriptions: '如果你停止，就是谷底。如果你还在继续，<br/>就是上坡。这是我听过关于人生低谷最好的阐述。',
    Timelinestime: '2026',
    datatext: '《遇见她》'
  }, {
    imgsrc: 'src/assets/img/07.jpg',
    descriptions: '如果你停止，就是谷底。如果你还在继续，<br/>就是上坡。这是我听过关于人生低谷最好的阐述。',
    Timelinestime: '2027',
    datatext: '《为了她》'
  }, {
    imgsrc: 'src/assets/img/08.jpg',
    descriptions: '如果你停止，就是谷底。如果你还在继续，<br/>就是上坡。这是我听过关于人生低谷最好的阐述。',
    Timelinestime: '2028',
    datatext: '《放手》'
  },
]
</script>

<template>
  <div id="timelineBox">
    <TimeLineContent :source="source" />
  </div>
</template>

<style scoped lang="less">
#timelineBox {
  width: 100%;
  position: relative;
  padding: 80px 0;
  transition: 0.3s ease 0s;
  background-attachment: fixed;
  background-size: cover;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(99, 99, 99, 0.8);
    content: "";
  }
}
</style>
