<script setup lang="ts">
import LayoutHeader from '@/view/layout/header/layoutHeader.vue'
// import './style.css'
</script>

<template>
  <!-- <div>
    <RouterView :key="($router.currentRoute.value.query.id as string)" />
  </div> -->
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
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
.header{
    height: 50px;
    width: 100%;
    position:fixed;
    margin: 0;
    padding: 0;
    z-index: 1;
}
.main{
    height: 100vh;
    margin-top: 50px;
    padding:0;
}
</style>
