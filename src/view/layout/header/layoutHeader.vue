<!--
 * @Author: Dhx
 * @Date: 2023-11-30 18:48:48
 * @Description: 
 * @FilePath: \RvcWeb\src\view\layout\header\layoutHeader.vue
-->
<script lang="ts" setup>
import userStatus from "@/components/user/userStatus.vue";
import searchComponent from "@/components/common/searchComponent.vue";
</script>
<template>
  <div class="header">
    <RouterLink to="/">
      <div class="logo"></div>
    </RouterLink>
    <div class="search">
      <searchComponent></searchComponent>
    </div>
    <div class="right">
      <div class="button-group">
        <RouterLink to="/newPost">
          <div class="newPost">
          + 新帖子
        </div>
        </RouterLink>
        
        <div class="bell">
          <div class="bell__point"></div>
          <img src="/icon/bell.svg" width="25" height="25">
        </div>
      </div>
      <div class="user-status">
        <userStatus></userStatus>
      </div>
    </div>

  </div>
</template>
<style scoped>
.header {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 27, 30);
  display: flex;
  border-bottom: rgba(255, 255, 255, 0.1) 1px solid;
}

 .logo {
  position: relative;
  height: 100%;
  width: 200px;
  background-image: url("/src/assets/logo/rvc.png");
  background-repeat: no-repeat;
  background-size: 150%;
  cursor: pointer;
  background-position: center;
}
.newPost{
  position: relative;
  top: 50%;
  transform: translate(0,-50%);
  width: 100px;
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  color: rgba(165,216,255);
  line-height: 40px;
  background-color: rgba(26,45,63);
  cursor: pointer;
}
.bell{
  position: relative;
  top: 50%;
  transform: translate(0,-50%);
  width: 25px;
  height: 25px;
  margin-left: 15px;
  cursor: pointer;
}
.bell__point{
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: rgba(224,49,49);
  top: 1px;
  right: 1px;
}
.newPost:hover{
  background-color: rgba(26,52,76);
}
 .search {
  position: relative;
  height: 100%;
  width: 70%;
}
.right{
  position: relative;
  width: calc(30% - 500px);
  min-width: 300px;
  height: 100%;
  display: flex;
  justify-content: right;
}

 .button-group {
  position: absolute;
  height: 100%;
  width: 70%;
  width: 200px;
  right: 120px;
  display: flex;
  justify-content: end;
}

 .user-status {
  position: relative;
  height: 100%;
  width: 30%;
  min-width: 80px;
  margin-right: 10px;
}

 .page-link {
  position: relative;
  height: 100%;
  display: flex;
}

 .page-link__item {
  height: 100%;
  width: 80px;
  line-height: 50px;
  color: #fb7299;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  font-family: 'Zcool';
  text-align: center;
}</style>
