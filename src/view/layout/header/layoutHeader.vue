<!--
 * @Author: Dhx
 * @Date: 2023-11-30 18:48:48
 * @Description: 
 * @FilePath: \RvcWeb\src\view\layout\header\layoutHeader.vue
-->
<script lang="ts" setup>
import userStatus from "@/view/layout/header/components/userStatus.vue";
</script>
<template>
  <div class="header">
    <RouterLink to="/">
      <div class="logo"></div>
    </RouterLink>

    <div class="user-status">
      <userStatus></userStatus>
    </div>
  </div>
</template>
<style scoped>
.header {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
}

.header .logo {
  position: absolute;
  height: 100%;
  width: 100px;
  background-image: url("/src/assets/logo/rvc.png");
  background-repeat: no-repeat;
  background-size: 150%;
  float: left;
  cursor: pointer;
  background-position: center;
}

.header .user-status {
  position: absolute;
  height: 100%;
  width: 100px;
  right: 0;
  margin-right: 10px;
}
</style>
