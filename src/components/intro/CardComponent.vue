<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:34:13
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:47:51
 * @FilePath: \RvcWeb\src\components\intro\CardComponent.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="card-container" @mouseover="flip(true)" @mouseout="flip(false)">
    <div class="card" :class="{ flipped: isFlipped }">
      <div class="card-face card-face-front">
        <img :src="img">
      </div>
      <div class="card-face card-face-back">
        <!-- 背面内容 -->
        <div>{{ title }}</div>
        <p>{{ data }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps(['title', 'data', 'img']);

const isFlipped = ref(false);

const flip = (value: boolean) => {
  isFlipped.value = value;
};

</script>


<style scoped>
img{
  width:100%;
  height:100%
}
.card-container {
  perspective: 1000px;
  display: inline-block;
  animation: floatAnimation 1.5s linear .5s infinite alternate;

}

@keyframes floatAnimation {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}

.card {
  width: 350px;
  height: 500px;
  border-radius: 20px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  background: #ffffff;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

}

.card-face-front {
  transform: rotateY(0deg);
}

.card-face-back {
  transform: rotateY(180deg);
  background:url("public/backPic/about-back.png");
  background-size: cover;
}

.flipped {
  transform: rotateY(180deg);
}
</style>
