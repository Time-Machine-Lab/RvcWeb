<!--
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\userPage.vue
-->
<script lang="ts" setup>
import router from "@/router/index.ts";
import BaseInfo from "@/view/user/info/pages/baseInfo.vue";
import { useUserStore } from "@/view/user/info/userStore.js";
const userStore = useUserStore();

setTimeout(function () {
  if (
    router.currentRoute.value.query.id == undefined &&
    userStore.getProfile.id
  ) {
    router.push({ query: { id: userStore.getProfile.id } });
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
        <router-link :to="{ path: '/user/followUser', query: $route.query }">
          <button>follow</button>
        </router-link>
        <router-link :to="{ path: '/user/likeModels', query: $route.query }">
          <button>likeModels</button>
        </router-link>
        <router-link
          :to="{ path: '/user/favoriteModels', query: $route.query }"
        >
          <button>favoriteModels</button>
        </router-link>
        <router-link :to="{ path: '/user/likePosts', query: $route.query }">
          <button>likePosts</button>
        </router-link>
        <router-link :to="{ path: '/user/favoritePosts', query: $route.query }">
          <button>favoritePosts</button>
        </router-link>
      </div>
      <div class="router-view-container">
        <router-view></router-view>
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
  background-color: rgba(50, 52, 64);
}
.userPage .base-info-container {
  display: inline-block;
  position: relative;
  width: 15%;
  min-width: 200px;
  background-color: rgba(40, 42, 54);
}
.userPage .other-info-container {
  display: inline-block;
  width: 85%;
}
.userPage .other-info-container .router-link-container {
  height: 100px;
  width: 100%;
}
.userPage .other-info-container .router-view-container {
  height: calc(100% - 100px);
  width: 100%;
}
</style>
