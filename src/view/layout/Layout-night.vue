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
  <el-container>
    <el-header class="header">
      <LayoutHeader></LayoutHeader>
    </el-header>
    <el-main class="main">
      <!-- <el-scrollbar> -->
      <RouterView v-slot="{ Component }">
        <Transition name="slide-fade">
          <component :is="Component"></component>
        </Transition>
      </RouterView>
      <!-- </el-scrollbar> -->
    </el-main>
    <LayoutFooter></LayoutFooter>
  </el-container>
</template>