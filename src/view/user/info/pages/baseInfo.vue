<!--
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\pages\baseInfo.vue
-->
<script setup lang="ts">
import editProfile from "@/view/user/info/pages/editProfile.vue";
import { UserInfoVO } from "@/api/user/userTypes";
import { ref } from "vue";
import { getUserInfoById,followUser } from "@/api/user/userApi.js";
// import { useUserStore } from "@/view/user/info/userStore.js";

import router from "@/router/index.ts";
import { storage } from "@/utils/storage";
import { message } from "@/utils/message";
// const userStore = useUserStore();

let hasFollow = ref(false);
const loaded = ref(true);
let drawer = ref(false);
let followDisabled = ref(false)
let figures = ref([
  {
    desc: "",
    number: '0',
  },
]);
const open = () => {
  drawer.value = true;
};
let userProfile = ref<UserInfoVO>({
avatar: '',
birthday: '',
description: '',
fansNum: '',
followNum: '',
nickname: '',
sex: '',
uid: "",
username: ""
});

const follow = function () {
  if(followDisabled.value){
    message.warning('请稍后再试')
    return
  }
  followDisabled.value = true
  setTimeout(function(){
    followDisabled.value = false
  },2000)
  followUser(userProfile.value.uid!).then((res:any)=>{
    if(res.code == 200){
      message.success(hasFollow.value?'取消':''+'关注成功')
      hasFollow.value = !hasFollow.value

    } else {
      message.error('服务器异常')
    }
  })
};

setTimeout(function () {
    getUserInfoById(router.currentRoute.value.query.id as string).then((res: any) => {
      if (res.code == 200) {
        userProfile.value = res.data.userInfo
        hasFollow.value = res.data.follow
        loaded.value = false
        figures.value = [
          {
            desc: "粉丝",
            number: userProfile.value.fansNum,
          },
          {
            desc: "关注",
            number: userProfile.value.followNum,
          },
        ];
      } else {
        message.error('服务器异常')
      }
    },
    );
}, 300);
</script>
<template>
  <div class="base-info">
    <div class="avatar-container">
      <div class="avatar" :style="{ backgroundImage: 'url(\'' + userProfile.avatar + '\')' }"></div>
    </div>
    <div class="information">
      <div class="username-container">
        <span class="username">
          {{ userProfile.nickname ? userProfile.nickname : "unknow" }}
        </span>
      </div>
      <div class="creatTime-container">
        <span class="creatTime">
          {{ userProfile.birthday }}
        </span>
      </div>
    </div>
    <div class="button-container">
      <span class="button" v-if="router.currentRoute.value.query.id != storage.get<string>('uid') && !hasFollow"
        @click="follow">
        关注
      </span>
      <span class="greybutton" v-if="router.currentRoute.value.query.id != storage.get<string>('uid') && hasFollow"
        @click="follow">
        已关注
      </span>
      <span class="button" v-if="router.currentRoute.value.query.id == storage.get<string>('uid')" @click="open"> 编辑资料
      </span>
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
      <edit-profile v-loading="loaded" :userProfile="userProfile!"
        element-loading-background="transparent"></edit-profile>
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
  height: 170px;
  position: relative;
}

.base-info .avatar-container .avatar {
  width: 50%;
  aspect-ratio: 1 / 1;
  position: relative;
  margin-left: 15px;
  top: 50%;
  transform: translate(0, -50%);
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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
  background-color: rgba(25, 113, 194);
  line-height: 40px;
  font-size: 16px;
  color: white;
  font-weight: 400;
  cursor: pointer;
  user-select: none;
  font-family: 'ZCool';
}

.button-container .greybutton {
  display: block;
  width: 90%;
  height: 40px;
  border-radius: 20px;
  margin: 20px auto auto;
  background-color: rgba(25, 113, 194);
  line-height: 40px;
  font-size: 16px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}

.button-container .button:hover {
  background-color: rgba(24, 100, 171);
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
  padding: 0 15px;
  font-family: 'ZCool';
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
  background-color: rgba(26, 27, 30) !important;
}
</style>
../userStore
