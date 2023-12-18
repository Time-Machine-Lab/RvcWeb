<!--
 * @Author: Dhx
 * @Date: 2023-11-30 18:48:48
 * @Description: 
 * @FilePath: \RvcWeb\src\view\layout\header\layoutHeader.vue
-->
<script lang="ts" setup>
import userStatus from "@/components/user/userStatus.vue";
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
  background-color: rgba(26,27,30);
  display: flex;
  border-bottom: rgba(255,255,255,0.1) 1px solid;
}

.header .logo {
  position: relative;
  height: 100%;
  width: 200px;
  background-image: url("/src/assets/logo/rvc.png");
  background-repeat: no-repeat;
  background-size: 150%;
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
.header .page-link{
  position: relative;
  height: 100%;
  display: flex;
}
.header .page-link__item{
  height: 100%;
  width: 80px;
  line-height: 50px;
  color: #fb7299;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  font-family: 'Zcool';
  text-align: center;
}
</style>
