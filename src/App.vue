<!--
 * @Author: Dhx
 * @Date: 2023-11-30 14:50:51
 * @Description:
 * @FilePath: \RvcWeb\src\App.vue
-->
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import LayoutNight from './view/layout/Layout-night.vue';

// import { preloadImages } from '@/utils/preload';

onBeforeMount(async () => {
  const loadingDom = document.querySelector(".before-app-render-loading");
  if (loadingDom) {
    // console.log("loadingDom: ", loadingDom.parentElement);
    // 图片预加载
    // await preloadImages();
    let count = 0;
    let imgs = [
      'https://s2.loli.net/2023/12/13/xVG4Cd62hlYikuH.jpg',
      'https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg'
    ]
    console.log(count);

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
    }, 100);
    loadingDom.classList.add("unmount");
  }
});
</script>

<template>
  <div id="appVue" style="height: 100vh;width: 100vw;min-width: 1080px;">
    <LayoutNight></LayoutNight>
  </div>
</template>
<style scoped>
@import '@/style/scss/index.scss';
@import url("https://fonts.googleapis.com/css2?family=Titan+One&display=swap");

@font-face {
  font-family: "ZCool";
  src: url("public/font/ZCOOLKuaiLe-Regular.ttf");
}

@font-face {
  font-family: "OpenSans";
  src: url("public/font/OpenSans-Regular.ttf");
}

@font-face {
  font-family: "NotoSerif";
  src: url("public/font/NotoSerif-Black.ttf");
}

* {
  margin: 0;
  padding: 0;
  list-style: none;
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
