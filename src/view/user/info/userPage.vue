<!--
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\userPage.vue
-->
<script lang="ts" setup>
import router from "@/router/index.ts";
import { storage } from "@/utils/storage";
// import { storage } from "@/utils/storage";
import BaseInfo from "@/view/user/info/pages/baseInfo.vue";
import { useUserStore } from "@/view/user/info/userStore.js";
const userStore = useUserStore();

setTimeout(function () {
  if (
    router.currentRoute.value.query.id == undefined &&
    userStore.getProfile.uid
  ) {
    router.push({ query: { id: userStore.getProfile.uid } });
  }
}, 1000);
</script>
<template>
  <div class="userPage">
    <div class="base-info-container">
      <base-info></base-info>
    </div>
    <div class="other-info-container">
      <div class="router-link-container">
        <div class="user-home__link__item" v-if="router.currentRoute.value.query.id == storage.get<string>('uid')" :style="{
          backgroundColor: $router.currentRoute.value.path == '/user/followUser' ? 'rgba(255,255,255,0.1)' : 'transparent',
          boxShadow: $router.currentRoute.value.path == '/user/followUser' ? '2px 2px 1px 1px black' : ''
        }">
          <router-link :to="{ path: '/user/followUser', query: $route.query }"
            style="display: block;height: 100%;width: 100%;" v-show="$route.query.id == storage.get<string>('uid')">
            <span class="img_back"
              :style="{ backgroundColor: $router.currentRoute.value.path == '/user/followUser' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
              <img width="12" height="12" src="/icon/follow.svg" class="vh-center">
            </span>
            <span>关注</span>
          </router-link>
        </div>
        <div class="user-home__link__item" v-if="router.currentRoute.value.query.id == storage.get<string>('uid')" :style="{
          backgroundColor: $router.currentRoute.value.path == '/user/likes' ? 'rgba(255,255,255,0.1)' : 'transparent',
          boxShadow: $router.currentRoute.value.path == '/user/likes' ? '2px 2px 1px 1px black' : ''
        }">
          <router-link :to="{ path: '/user/likes', query: $route.query }"
            style="display: block;height: 100%;width: 100%;">
            <span class="img_back"
              :style="{ backgroundColor: $router.currentRoute.value.path == '/user/likes' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
              <img width="12" height="12" src="/icon/heart.svg" class="vh-center">
            </span>
            <span>喜欢</span>
          </router-link>
        </div>
        <div class="user-home__link__item" v-if="router.currentRoute.value.query.id == storage.get<string>('uid')" :style="{
          backgroundColor: $router.currentRoute.value.path == '/user/collections' ? 'rgba(255,255,255,0.1)' : 'transparent',
          boxShadow: $router.currentRoute.value.path == '/user/collections' ? '2px 2px 1px 1px black' : ''
        }">
          <router-link :to="{ path: '/user/collections', query: $route.query }"
            style="display: block;height: 100%;width: 100%;">
            <span class="img_back"
              :style="{ backgroundColor: $router.currentRoute.value.path == '/user/collections' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
              <img width="12" height="12" src="/icon/box.svg" class="vh-center">
            </span>
            <span>收藏</span>
          </router-link>
        </div>
        <div class="user-home__link__item" v-if="router.currentRoute.value.query.id == storage.get<string>('uid')" :style="{
          backgroundColor: $router.currentRoute.value.path == '/user/create' ? 'rgba(255,255,255,0.1)' : 'transparent',
          boxShadow: $router.currentRoute.value.path == '/user/create' ? '2px 2px 1px 1px black' : ''
        }">
          <router-link :to="{ path: '/user/create', query: $route.query }"
            style="display: block;height: 100%;width: 100%;">
            <span class="img_back"
              :style="{ backgroundColor: $router.currentRoute.value.path == '/user/create' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
              <img width="12" height="12" src="/icon/upload.svg" class="vh-center">
            </span>
            <span>发布</span>
          </router-link>
        </div>

      </div>
      <div class="router-view-container">
        <router-view v-if="router.currentRoute.value.query.id == storage.get<string>('uid')"></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.userPage {
  display: flex;
  /*height: 100%;*/
  /*width: 100%;*/
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: rgba(26, 27, 30);
}

.userPage .base-info-container {
  display: inline-block;
  position: relative;
  width: 17%;
  min-width: 280px;
  background-color: rgba(37, 38, 43);
}

.userPage .other-info-container {
  display: inline-block;
  width: 83%;
}

.userPage .other-info-container .router-link-container {
  height: 70px;
  width: 100%;
  display: flex;
}

.userPage .other-info-container .router-view-container {
  height: calc(100% - 100px);
  width: 100%;
}

.user-home__link__item {
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
  font-family: 'ZCool';
}

.user-home__link__item span {
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

.user-home__link__item span:hover {
  color: rgba(255, 255, 255, 1);
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
</style>
