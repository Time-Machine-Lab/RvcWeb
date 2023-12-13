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
  <el-scrollbar style="overflow: auto;height: 100vh;">
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          <LayoutHeader></LayoutHeader>
        </el-header>
        <el-main class="main">
          <RouterView :key="($router.currentRoute.value.query.id as string)" />
        </el-main>
        <el-footer style="margin: 0;padding:0">Footer</el-footer>
      </el-container>

    </div>
  </el-scrollbar>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Titan+One&display=swap");

* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.header {
  height: 50px;
  width: 100%;
  position: fixed;
  margin: 0;
  padding: 0;
  z-index: 1;
}

.main {
  margin-top: 50px;
  padding: 0;
  background-color: rgb(56, 56, 58);
}
</style>
