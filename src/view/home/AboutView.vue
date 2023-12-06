<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:34:13
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:45:04
 * @FilePath: \RvcWeb\src\view\home\AboutView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import { reactive } from "vue";
import Card from '@/components/intro/CardComponent.vue';

const cards = reactive([
  { title: '我们是谁', data: '我们是RVC开发组' },
  { title: '我们是谁', data: '我们是谁' },
  { title: '联系我们', data: '联系我们' }
]);
</script>


<template>
  <div class="about flex">
    <Card v-for="(card, index) in cards" :key="index" :title="card.title" :data="card.data"></Card>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.about {
  height: 100vh;
  width: 100%;
  background: #d9e8ff;
  justify-content: space-around;
}
</style>
