<!--
 * @Author: Dhx
 * @Date: 2023-11-30 14:50:51
 * @Description:
 * @FilePath: \RvcWeb\src\App.vue
-->
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import LayoutHeader from '@/view/layout/header/layoutHeader.vue'
import LayoutFooter from '@/view/layout/footer/layoutFooter.vue'
import './style.css'
// import { preloadImages } from '@/utils/preload';

onBeforeMount(async () => {
  const loadingDom = document.querySelector(".before-app-render-loading");
  if (loadingDom) {
    console.log("loadingDom: ", loadingDom.parentElement);
    // 图片预加载
    // await preloadImages();
    let count = 0;
    let imgs = [
      'https://s2.loli.net/2023/12/13/xVG4Cd62hlYikuH.jpg',
      'https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg'
    ]
    for (let img of imgs) {
      let image = new Image();
      image.onload = () => {
        count++;
      };
      image.src = img;
    }
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
  <div id="appVue" style="height: 100vh;width: 100vw;min-width: 1080px;">
    <el-container>
      <el-header class="header">
        <LayoutHeader></LayoutHeader>
      </el-header>
      <el-main class="main">
        <Transition name="slide-fade">
          <RouterView :key="($router.currentRoute.value.query.id as string)" />
        </Transition>
      </el-main>
      <LayoutFooter></LayoutFooter>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Titan+One&display=swap");

* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.header {
  height: 70px;
  width: 100%;
  min-width: 1080px;
  position: fixed;
  margin: 0;
  padding: 0;
  z-index: 2;
}

.main {
  position:relative;
  top:70px;
  height: calc(100vh - 110px);
  padding: 0;
  background-color: rgb(26,27,30);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
