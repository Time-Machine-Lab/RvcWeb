<script lang="ts" setup>
import BaseInfo from './pages/baseInfo.vue'
</script>
<template>
  <div class="userPage">
    <div class="base-info-container">
      <base-info></base-info>
    </div>
    <div class="other-info-container">
      <div class="router-link-container">
        <router-link to="/user/followUser">
          <button>follow</button>
        </router-link>
        <router-link to="/user/likeModels">
          <button>likeModels</button>
        </router-link>
        <router-link to="/user/favoriteModels">
          <button>favoriteModels</button>
        </router-link>
        <router-link to="/user/likePosts">
          <button>likePosts</button>
        </router-link>
        <router-link to="/user/favoritePosts">
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
  .userPage{
    display: flex;
    /*height: 100%;*/
    /*width: 100%;*/
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
  }
  .userPage .base-info-container{
    display: inline-block;
    position: relative;
    width: 15%;
    min-width: 200px;
    background-color: rgba(40,42,54);
  }
  .userPage .other-info-container{
    display: inline-block;
    width: 85%;
    background-color: rgba(0,0,0,0.1);
  }
  .userPage .other-info-container .router-link-container{
    height: 100px;
    width: 100%;
    background-color: rgba(0,0,0,0.2);
  }
  .userPage .other-info-container .router-view-container{
    height: calc(100% - 100px);
    width: 100%;
    background-color: rgba(0,0,0,0.1);

  }
</style>
