<!--
 * @Author: Dhx
 * @Date: 2023-11-30 14:50:51
 * @Description: 
 * @FilePath: \RvcWeb\src\App.vue
-->
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import LayoutHeader from '@/view/layout/header/layoutHeader.vue'
import './style.css'
onBeforeMount(() => {
  const loadingDom = document.querySelector(".before-app-render-loading");
  if (loadingDom) {
    console.log("loadingDom: ", loadingDom.parentElement);
    loadingDom.classList.add("unmount");
    setTimeout(() => {
      loadingDom.remove();
    }, 500);
    loadingDom.classList.add("unmount");
  }
});
</script>

<template>
  <!--  <div>-->
  <!--    <RouterView :key="$router.currentRoute.value.query.id as string" />-->
  <!--  </div>-->
  <div style="height: 100vh;width: 100vw;">
    <el-container>
      <el-header class="header">
        <LayoutHeader></LayoutHeader>
      </el-header>
      <el-main class="main">
        <RouterView :key="($router.currentRoute.value.query.id as string)" />
      </el-main>
      <el-footer class="foot flex">
        <router-link to="/about" target="_blank" class="foot-btn flex"> <p>加入我们</p> </router-link>
        <router-link to="/service" target="_blank" class="foot-btn flex"> <p>服务条款</p> </router-link>
        <router-link to="/feedback" target="_blank" class="foot-btn flex"> <p>反馈</p> </router-link>
      </el-footer>
    </el-container>
  </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Titan+One&display=swap");

* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.header {
  position: fixed;
  height: 70px;
  width: 100%;
  margin: 0;
  padding: 0;
  z-index: 1;
}

.main {
  position: fixed;
  height: 100vh;
  width:100vw;
  padding: 0;
  background-color: rgb(26,27,30);
  overflow: scroll;
}

.foot{
  justify-content: left;
  position: fixed;
  bottom: 0;
  width:100vw;
  height:40px;
  background: black;
  .foot-btn{
    width:100px;
    height:100%;
    color: #e5e5e5;
  }
}
</style>
