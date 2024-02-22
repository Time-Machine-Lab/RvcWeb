<!--
 * @Author: Dhx
 * @Date: 2023-11-30 18:48:48
 * @Description:
 * @FilePath: \RvcWeb\src\view\layout\header\layoutHeader.vue
-->
<script lang="ts" setup>
import userStatus from "@/components/user/userStatus.vue"
import searchComponent from "@/components/common/searchComponent.vue"
import {ref} from "vue";
import router from "@/router";
let clickBell = ref(false)
let msgVisibility = ref(false)
let clickSelect = ref(false)
let selectVisibility = ref(false)
let routes = ref<{
  name: string
  to: string
}[]>([{
  name: '新建贴子',
  to: '/newPost'
}, {
  name: '新建模型',
  to: '/newModel'
}])
const handleClickSort = function () {
  clickBell.value = true
  msgVisibility.value = !msgVisibility.value
  setTimeout(function () {
    clickBell.value = false
  }, 200)
}
const handleClickSelect = function () {
  clickSelect.value = true
  selectVisibility.value = !selectVisibility.value
  setTimeout(function () {
    clickSelect.value = false
  }, 500)
}
const handleBlur = function () {
  setTimeout(function () {
    msgVisibility.value = false
    selectVisibility.value = false
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
          <span class="tab">交流</span>
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

          <span class="tab">模型</span>
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

          <span class="tab">反馈</span>
        </router-link>
      </div>
    </div>
    <div class="search">
      <searchComponent></searchComponent>
    </div>
    <div class="header__right">
      <div class="button-group">
        <div tabindex="-1" class="new" @click="handleClickSelect" @blur="handleBlur">
          <img width="30" height="30" src="/icon/plus.svg" style="position:absolute;left:0;transition: all 0.3s;"
            :class="selectVisibility ? 'roll-animation' : ''">
        </div>
        <div class="select-window" v-show="selectVisibility">
          <div class="select-window__item" v-for="(route, index) in routes" :key="index" @click="router.push(route.to)">

            <div class="horizontal-center" style="display: flex;">
              <img width="10" height="10" class="vertical-center" src="/icon/write.svg">
              <span style="line-height: 40px;margin-left: 15px;margin-right: 7px;">{{ route.name }}</span>

            </div>
          </div>
        </div>

        <!-- <RouterLink to="/newModel">
          <div class="newModel">
            + 新模型
          </div>
        </RouterLink> -->
        <div tabindex="-1" @click="handleClickSort" @blur="handleBlur" class="bell"
          :class="clickBell ? 'dither-animation' : ''">
          <!-- <div class="bell__point"></div> -->
          <img src="/icon/bell.svg" width="25" height="25">
        </div>
        <div class="msg-window" style="z-index: 20;" v-show="msgVisibility">
          <div class="msg-window__title">
            <span>通知</span>
          </div>
          <div class="msg-window__content">
            <div class="msg-window__content__item ">
              <span class="scroll-text">欢迎来到RVC！
                --2023/12/31</span>
            </div>
            <!-- <div class="msg-window__content__item " >
              <span class="scroll-text">欢迎来到RVC！
                --2023/12/31</span>
            </div> -->
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
  z-index: 20;
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
  font-family: 'ZCool';
}

.header__link__item span:hover {
  color: rgba(255, 255, 255, 1);
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

.dither-animation {
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
  user-select: none;
}

.msg-window__title {
  width: 100%;
  height: 45px;
  border-bottom: rgba(55, 58, 64) 1px solid;
  font-size: 14px;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
  line-height: 45px;
  font-family: 'ZCool';
}

.msg-window__title span {
  padding-left: 15px;
}

.msg-window__content {
  width: calc(100% - 10px);
  padding: 5px;
}

.msg-window__content__item {
  position: relative;
  padding-left: 15px;
  overflow: hidden;
  width: calc(100% - 15px);
  /* height: 80px; */
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  display: flex;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-family: 'ZCool';
}

.msg-window__content__item:hover {
  background-color: rgba(56, 58, 64);
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
  right: 0;
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

.new {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  background-color: rgba(25, 113, 194);
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: black;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
}

.new span {
  display: inline-block;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 30px;
  position: relative;
  text-align: center;
}

.new:hover {
  background-color: rgba(24, 100, 171);
}

.select-window {
  position: absolute;
  top: 60px;
  right: 10px;
  width: 120px;
  border-radius: 10px;
  border: rgba(55, 58, 64) 1px solid;
  background-color: rgba(37, 38, 43);
  padding: 5px;
  z-index: 30;
  user-select: none;
}

.select-window__item {
  position: relative;
  padding-left: 15px;
  width: calc(100% - 0px);
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  display: flex;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.select-window__item:hover {
  background-color: rgba(56, 58, 64);
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

.roll-animation {
  transform: rotateZ(90deg);
  transform-origin: 52% 50%;
}
</style>
