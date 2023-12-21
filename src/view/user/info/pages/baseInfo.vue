<!--
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\pages\baseInfo.vue
-->
<script setup lang="ts">
import editProfile from "@/view/user/info/pages/editProfile.vue";
import { Profile } from "@/api/user/userTypes";
import {  ref } from "vue";
import { getUserInfoById } from "@/api/user/userApi.js";
import { useUserStore } from "@/view/user/info/userStore.js";

import router from "@/router/index.ts";
const userStore = useUserStore();

let style = true;
let hasFollow = ref(false);
const loaded = ref(true);
let drawer = ref(false);
let figures = ref([
  {
    desc: "",
    number: '0',
  },
]);
const open = () => {
  drawer.value = true;
};
let userProfile = ref<Profile>({
  id: 0,
  avatar: "", //头像链接
  nickName: "", //昵称
  description: "", //简介
  register_date: "", //注册时间
  sex: "", //性别
  fans_num: 0, //粉丝数量
  follow_num: 0, //关注数
});

const follow = function () {
  hasFollow.value = !hasFollow.value;
};

setTimeout(function () {
  if (
    (router.currentRoute.value.query.id as string) ==
      (userStore.getProfile.id as unknown as string) ||
    router.currentRoute.value.query.id == undefined
  ) {
    userProfile.value = userStore.getProfile;
    router.currentRoute.value.query.id = userProfile.value.uid!
    console.log(userProfile.value.uid);
    loaded.value = false;

    figures.value = [
      {
        desc: "LIKES",
        number: userStore.getProfile.fansNum!,
      },
      {
        desc: "FOLLOWERS",
        number: userStore.getProfile.followNum!,
      },
    ];
    style = false;
  } else {
    getUserInfoById(router.currentRoute.value.query.id as string).then(
      (res) => {
        userProfile.value = res.data;
        figures.value = [
          {
            desc: "LIKES",
            number: res.data.fansNum,
          },
          {
            desc: "FOLLOWERS",
            number: res.data.followNum,
          },
        ];
        loaded.value = false;

      },
    );
  }
}, 300);
</script>
<template>
  <div class="base-info">
    <div class="avatar-container">
      <div
        class="avatar"
        :style="{ backgroundImage: 'url(\'' + userProfile.avatar?userProfile?.avatar:'/teamPic/default.png' + '\')' }"
      ></div>
    </div>
    <div class="information">
      <div class="username-container">
        <span class="username">
          {{ userProfile.nickName ? userProfile.nickName : "unknow" }}
        </span>
      </div>
      <div class="creatTime-container">
        <span class="creatTime">
          创建于 {{ userProfile.register_date ? userProfile.register_date : "1970-01-01" }}
        </span>
      </div>
    </div>
    <div class="button-container">
      <span class="button" v-if="!style && !hasFollow" @click="follow">
        关注
      </span>
      <span class="greybutton" v-if="!style && hasFollow" @click="follow">
        已关注
      </span>
      <span class="button" v-if="style" @click="open"> 编辑资料 </span>
    </div>
    <div class="line"></div>
    <div class="figures-container">
      <div class="figures" v-for="(figure, index) in figures" :key="index">
        <div class="number">
          {{ figure.number }}
        </div>
        <div class="desc">
          {{ figure.desc }}
        </div>
      </div>
    </div>
    <el-drawer v-model="drawer" :with-header="false">
      <edit-profile
        v-loading="loaded"
        :userProfile="userProfile!"
        element-loading-background="transparent"
      ></edit-profile>
    </el-drawer>
  </div>
</template>

<style scoped>
.base-info {
  width: 100%;
  height: 100%;
}

.base-info .avatar-container {
  width: 100%;
  height: 220px;
  position: relative;
}

.base-info .avatar-container .avatar {
  width: 180px;
  height: 180px;
  position: relative;
  margin-left: 15px;
  top: 50%;
  transform: translate(0, -50%);
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.base-info .username-container {
  width: 100%;
  position: relative;
}

.base-info .username-container .username {
  margin-left: 15px;
  display: block;
  position: relative;
  font-size: 26px;
  text-align: left;
  line-height: 32px;

  color: rgba(255, 255, 255, 0.6);
}

.base-info .creatTime-container .creatTime {
  margin-left: 15px;
  display: block;
  position: relative;
  font-size: 14px;
  text-align: left;
  color: rgba(255, 255, 255, 0.4);
}

.button-container {
  width: 100%;
  padding: 20px 0;
}

.button-container .button {
  display: block;
  width: 90%;
  height: 40px;
  border-radius: 20px;
  margin: 20px auto auto;
  background-color: rgba(25,113,194);
  line-height: 40px;
  font-size: 16px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}
.button-container .greybutton {
  display: block;
  width: 90%;
  height: 40px;
  border-radius: 20px;
  margin: 20px auto auto;
  background-color: rgba(25,113,194);
  line-height: 40px;
  font-size: 16px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}

.button-container .button:hover {
  background-color: rgba(24,100,171);
}

.line {
  width: 90%;
  height: 1px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  background-color: rgba(255, 255, 255, 0.1);
}

.figures-container {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.figures-container .figures {
  height: 50px;
}

.figures-container .figures .number {
  height: 30px;
  width: 100%;
  font-size: 22px;
  line-height: 30px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 7px;
}

.figures-container .figures .desc {
  height: 20px;
  width: 100%;
  line-height: 20px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 7px;
}

:deep .el-drawer__body {
  background-color: rgba(26,27,30) !important;
}
</style>
../userStore
