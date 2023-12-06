<template>
  <div class="card-container" @mouseover="flip(true)" @mouseout="flip(false)">
    <div class="card" :class="{ flipped: isFlipped }">
      <div class="card-face card-face-front">
        <div>{{ title }}</div>
      </div>
      <div class="card-face card-face-back">
        <!-- 背面内容 -->
        <p>{{ data }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps(['title', 'data']);

const isFlipped = ref(false);

const flip = (value: boolean) => {
  isFlipped.value = value;
};

</script>


<style scoped>
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
  width: 300px;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-face-front {
  transform: rotateY(0deg);
}

.card-face-back {
  transform: rotateY(180deg);
  background-color: #ffffff; /* 背面颜色 */
}

.flipped {
  transform: rotateY(180deg);
}
</style>
