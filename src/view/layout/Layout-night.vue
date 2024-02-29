<!--
 * @Author: Dhx
 * @Date: 2024-02-18 23:07:26
 * @Description: 
 * @FilePath: \RvcWeb\src\view\layout\Layout-night.vue
-->
<script setup lang="ts">
import LayoutHeader from '@/view/layout/header/layoutHeader.vue'
import LayoutFooter from '@/view/layout/footer/layoutFooter.vue'
import '@/style/scss/index.scss'

</script>
<template>
  <el-container style="height: 100%;">
    <el-header class="header">
      <LayoutHeader></LayoutHeader>
    </el-header>
    <div class="main">
      <!-- <el-scrollbar> -->
      <RouterView v-slot="{ Component }">
        <Transition name="slide-fade">
          <component :is="Component"></component>
        </Transition>
      </RouterView>
      <!-- </el-scrollbar> -->
    </div>
    <LayoutFooter></LayoutFooter>
  </el-container>
</template>
<style scoped>
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
  position: relative;
  top: 70px;
  height: calc(100% -  125px);
  padding: 0;
  background-color: rgb(26, 27, 30);
  overflow: hidden;
}
</style>