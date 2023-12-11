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
    <LayoutHeader></LayoutHeader>
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
