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
    <div class="header__link">
            <div class="header__link__item" :style="{
                backgroundColor: $router.currentRoute.value.path == '/rvc/posts' ? 'rgba(255,255,255,0.1)' : 'transparent',
                boxShadow: $router.currentRoute.value.path == '/rvc/posts' ? '2px 2px 1px 1px black' : ''
            }">
                <router-link to="/rvc/posts" style="display: block;height: 100%;width: 100%;">
                    <span class="img_back"
                        :style="{ backgroundColor: $router.currentRoute.value.path == '/rvc/posts' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
                        <img width="12" height="12" src="/icon/post.svg" class="vh-center">
                    </span>
                    <span>贴子</span>
                </router-link>
            </div>
            <div class="header__link__item" :style="{
                backgroundColor: $router.currentRoute.value.path == '/rvc/models' ? 'rgba(255,255,255,0.1)' : 'transparent',
                boxShadow: $router.currentRoute.value.path == '/rvc/models' ? '2px 2px 1px 1px black' : ''
            }">
                <router-link to="/rvc/models" style="display: block;height: 100%;width: 100%;">
                    <span class="img_back"
                        :style="{ backgroundColor: $router.currentRoute.value.path == '/rvc/models' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
                        <img width="12" height="12" src="/icon/model.svg" class="vh-center">
                    </span>

                    <span>模型</span>
                </router-link>
            </div>
            <div class="header__link__item" :style="{
                backgroundColor: $router.currentRoute.value.path == '/feedback' ? 'rgba(255,255,255,0.1)' : 'transparent',
                boxShadow: $router.currentRoute.value.path == '/feedback' ? '2px 2px 1px 1px black' : ''
            }">
                <router-link to="/feedback" style="display: block;height: 100%;width: 100%;">
                    <span class="img_back"
                        :style="{ backgroundColor: $router.currentRoute.value.path == '/feedback' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
                        <img width="12" height="12" src="/icon/bulb.svg" class="vh-center">
                    </span>

                    <span>反馈</span>
                </router-link>
            </div>
        </div>
    <div class="search">
      <searchComponent></searchComponent>
    </div>
    <div class="header__right">
      <div class="button-group">
        <RouterLink to="/newPost">
          <div class="newPost">
            + 新帖子
          </div>
        </RouterLink>
        <!-- <RouterLink to="/newModel">
          <div class="newModel">
            + 新模型
          </div>
        </RouterLink> -->
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
  background-image: url("/logo/rvc.png");
  background-repeat: no-repeat;
  background-size: 150%;
  cursor: pointer;
  background-position: center;
}
.header__link {
    width: 20%;
    height: 70px;
    display: flex;
}

.header__link__item {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 40px;
    line-height: 40px;
    width: 80px;
    padding: 0 8px;
    margin-left: 5px;
    cursor: pointer;
    border-radius: 5px;
}
.img_back {
    position: relative;
    display: block;
    top: 50%;
    transform: translate(0, -50%);
    height: 30px;
    width: 30px;
    margin-left: 10px;
    border-radius: 5px;
}
.header__link__item span {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    margin-left: 3px;
    line-height: 40px;
    text-align: center;
    text-decoration: none;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1);
    font-family: '黑体';
}

.header__link__item span:hover {
    color: rgba(255, 255, 255, 1);
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
  margin-right: 10px;
}
.newModel{
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  width: 100px;
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  color: rgba(165, 216, 255);
  line-height: 40px;
  background-color: rgba(30,54,38);
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
  width: 40%;
}

.header__right {
  position: absolute;
  width: calc(30% - 500px);
  right:0;
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
