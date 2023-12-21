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
      </div>
      <div class="card-face card-face-back">
        <!-- 背面内容 -->
        <div class="back">
          <h1 class="title">联系我们</h1>
          <p style="margin-top: 50px">{{ data }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps(['data']);

const isFlipped = ref(false);

const flip = (value: boolean) => {
  isFlipped.value = value;
};

</script>


<style scoped>
.back{
  width:80%;
  height:80%;
}

.title{
  color: #ecdd9f;
  font-family: ZCool;
  width:100%;
}
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
  background:url("https://s2.loli.net/2023/12/13/8HsCriMFdE7pPlL.png");
  background-size: cover;
}

.card-face-back {
  position: relative;
  transform: rotateY(180deg);
  background:url("https://s2.loli.net/2023/12/11/Ws5LvbYnlZPMqG9.png");
  background-size: cover;
}

.flipped {
  transform: rotateY(180deg);
}
</style>
