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
    <div class="page-link">
      <RouterLink to="/">
        <div class="page-link__item">
          主页
        </div>
      </RouterLink>
      <RouterLink to="/model">
        <div class="page-link__item">
          模型
        </div>
      </RouterLink>
      <RouterLink to="/communication">
        <div class="page-link__item">
          社区
        </div>
      </RouterLink>
<!--      <RouterLink to="/feedback">-->
<!--        <div class="page-link__item">-->
<!--          反馈-->
<!--        </div>-->
<!--      </RouterLink>-->
    </div>
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
  background-color: #2d2d2d;
  display: flex;
}

.header .logo {
  position: relative;
  height: 100%;
  width: 100px;
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
