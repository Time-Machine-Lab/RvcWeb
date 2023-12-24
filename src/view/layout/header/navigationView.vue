<!--
 * @Author: Dhx
 * @Date: 2023-12-24 05:26:22
 * @Description: 
 * @FilePath: \RvcWeb\src\view\layout\header\navigationView.vue
-->
<script setup lang="ts">
import { ref } from 'vue';

const activeIndex = ref(0);
const menuList = [
  // { to: '/', text: '首页' ,icon:'mdi mdi-home' },
  { to: '/rvc/posts', text: '交流分区' ,icon:'mdi mdi-chat'  },
  { to: '/rvc/models', text: '模型展厅' ,icon:"mdi mdi-robot-excited" },
];
const click = (index:number)=>{
  activeIndex.value=index
  console.log(activeIndex.value)
}
</script>

<template>
  <div class="navigation">
    <ul>
      <li :class="activeIndex===index?'list active':'list'" v-for="(item, index) in menuList" :key="index">
        <a @click="click(index)">
          <router-link :to="item.to">
            <span :class="`icon `+item.icon"></span>
            <span class="text" >{{ item.text }}</span>
          </router-link>
        </a>
      </li>
      <div class="indicator"></div>
    </ul>
  </div>
</template>


<style scoped>
@import url("@/style/scss/header/_navigation.scss");
</style>
