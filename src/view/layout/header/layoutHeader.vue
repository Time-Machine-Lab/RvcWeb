<!--
 * @Author: Dhx
 * @Date: 2023-11-30 18:48:48
 * @Description: 
 * @FilePath: \RvcWeb\src\view\layout\header\layoutHeader.vue
-->
<script lang="ts" setup>
import userStatus from "@/components/user/userStatus.vue"
import searchComponent from "@/components/common/searchComponent.vue"
import { ref } from "vue";
let clickBell = ref(false)
let msgVisibility = ref(false)
const handleClickSort = function () {
  clickBell.value = true
  msgVisibility.value = !msgVisibility.value
  setTimeout(function () {
    clickBell.value = false
  }, 200)
}
const handleBlur = function () {
  setTimeout(function () {
    msgVisibility.value = false
  }, 200)
}
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

        <div tabindex="-1" @click="handleClickSort" @blur="handleBlur" class="bell" :class="clickBell ? 'dither-animation' : ''">
          <div class="bell__point"></div>
          <img src="/icon/bell.svg" width="25" height="25">
        </div>
        <div class="msg-window" v-show="msgVisibility">
          <div class="msg-window__title">
            <span>通知</span>
          </div>
          <div class="msg-window__content">

          </div>
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
  background-image: url("src/assets/logo/rvc.png");
  background-repeat: no-repeat;
  background-size: 150%;
  cursor: pointer;
  background-position: center;
}

.newPost {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  width: 100px;
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  color: rgba(165, 216, 255);
  line-height: 40px;
  background-color: rgba(26, 45, 63);
  cursor: pointer;
}

.bell {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  width: 25px;
  height: 25px;
  margin-left: 15px;
  cursor: pointer;
}
.dither-animation{
  top: 36px;
}
.bell__point {
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: rgba(224, 49, 49);
  top: 1px;
  right: 1px;
}
.msg-window {
    position: absolute;
    top: 65px;
    width: 250px;
    border-radius: 5px;
    border: rgba(55, 58, 64) 1px solid;
    background-color: rgba(37, 38, 43);
    z-index: 10;
    user-select: none;
}

.msg-window__title{
  width: 100%;
  height: 45px;
  border-bottom: rgba(55,58,64) 1px solid;
  font-size: 14px;
  text-align: left;
  color: rgba(255,255,255,0.7);
  line-height: 45px;
}
.msg-window__title span{
  padding-left: 15px;
}
.msg-window__content{
  width: 100%;
  min-height: 100px;
}

.msg-window__item:hover {
    background-color: rgba(56, 58, 64);
    cursor: pointer;
}
.newPost:hover {
  background-color: rgba(26, 52, 76);
}

.search {
  position: relative;
  height: 100%;
  width: 70%;
}

.right {
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
}
</style>
