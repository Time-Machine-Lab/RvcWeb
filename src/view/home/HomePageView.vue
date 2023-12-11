<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:34:13
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:45:32
 * @FilePath: \RvcWeb\src\view\home\HomePageView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import LayoutHeader from '@/view/layout/header/layoutHeader.vue'
</script>

<template>
  <div>
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
  height: 50px;
  width: 100%;
  position: fixed;
  margin: 0;
  padding: 0;
  z-index: 1;
}
.main {
  height: 100vh;
  margin-top: 50px;
  padding: 0;
}

</style>
