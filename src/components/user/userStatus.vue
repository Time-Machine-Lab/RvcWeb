<!--
 * @Author: Dhx
 * @Date: 2023-11-30 18:48:48
 * @Description: 
 * @FilePath: \RvcWeb\src\components\user\userStatus.vue
-->
<script lang="ts" setup>
import { getLoginUserInfo, logout } from '@/api/user/userApi.js'
import { useUserStore } from '@/view/user/info/userStore.js'
import { UserInfoVO } from '@/api/user/userTypes'
import {onMounted, ref} from 'vue';
import { message } from '@/utils/message';
import { storage } from '@/utils/storage';
import router from '@/router';
import LoginComponent from "@/components/intro/LoginComponent.vue";
let LoginOpen = ref(false)

const userStore = useUserStore()
let userProfile = ref<UserInfoVO>()
let userStatusVisibility = ref(false)
// 改变登陆状态为登录
const changeLoginState = () => {
  getLoginUserInfo().then((res: any) => {
    if (res.code == 200) {
      storage.set('uid', res.data.uid)
      userStore.setProfile(<UserInfoVO>res.data)
      userProfile.value = userStore.getProfile
    }
  })
}
const handleClickUser = function () {
    userStatusVisibility.value = !userStatusVisibility.value
}
const handleBlur = function () {
    setTimeout(function () {
        userStatusVisibility.value = false
    }, 200)
}
const logoutFunc = function () {
    logout().then((res: any) => {
        if (res.code == 200) {
            console.log(res)
            message.success('登出成功')
            storage.remove('token')
            storage.remove('uid')
            setTimeout(() => {
                router.go(0)
            }, 500)
        }
    })
}
const LoginClose = () => {
  LoginOpen.value = false;
};
// 检测登陆状态
const checkLoginState = () => {
  if(storage.get<string>('token')){
    getLoginUserInfo().then((res: any) => {
      if (res.code == 200) {
        storage.set('uid', res.data.uid)
        userStore.setProfile(<UserInfoVO>res.data)
        userProfile.value = userStore.getProfile
      }
    })
  }
};
onMounted(() => {
  checkLoginState()
})
</script>
<template>
    <div class="user-status">
<!--登陆弹窗-->
      <LoginComponent v-if="LoginOpen" class="login" @close="LoginClose" @login="changeLoginState"></LoginComponent>
<!--未登录状态-->
      <div class="login-button" v-if="!userProfile?.uid" @click="LoginOpen=true">
        登录
      </div>
<!--登陆状态-->
      <div class="avatar-container" v-else>
        <div tabindex="-1" @click="handleClickUser" @blur="handleBlur" class="avatar"
             :style="{ backgroundImage: 'url(' + userProfile?.avatar + ')' }">
        </div>
      </div>
<!--下拉菜单-->
      <div class="user-more" v-show="userStatusVisibility">
        <RouterLink :to="'/user?id=' + userProfile?.uid">
          <div class="user-more__item">
            <div class="horizontal-center" style="display: flex;">
              <span>
                  <img width="24" height="24" class="vertical-center" src="/icon/user.svg">
              </span>
              <span style="line-height: 50px;margin-left: 15px;margin-right: 7px;">个人主页</span>
            </div>
          </div>
        </RouterLink>
        <div class="user-more__item" @click="logoutFunc">
          <div class="horizontal-center" style="display: flex;">
            <span style="margin-left: 2px;">
                <img width="24" height="24" class="vertical-center" src="/icon/logout.svg">
            </span>
            <span style="line-height: 50px;margin-left: 15px;margin-right: 7px;">登出</span>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>
@import "@/components/user/style/userStatus.css";
.login{
  position: fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
}
.user-status {
    position:absolute;
    height: 100%;
    width: 100%;
    border-left: rgba(255, 255, 255, 0.1) 1px solid;
}

.user-status .login-button {
    position: relative;
    height: 30px;
    width: 70px;
    background-color: transparent;
    border: rgba(237, 130, 201) 1px solid;
    left: 50%;
    top: 50%;
    color: rgba(237, 130, 201);
    transform: translate(-50%, -50%);
    line-height: 30px;
    font-weight: 700;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s;
}

.user-status .login-button:hover {
    border: rgba(217, 110, 181) 1px solid;
    color: rgba(217, 110, 181);
}

.user-status .avatar-container {
    position: relative;
    height: 40px;
    width: 40px;
    left: 50%;
    top: 50%;
    cursor: pointer;
    border-radius: 20px;
    /* overflow: hidden; */
    transform: translate(-50%, -50%);
}

.user-status .avatar {
    position: relative;
    height: 40px;
    width: 40px;
    cursor: pointer;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.5s;
}

.user-more {
    position: absolute;
    top: 65px;
    right: 0px;
    width: 200px;
    border-radius: 5px;
    border: rgba(55, 58, 64) 1px solid;
    background-color: rgba(37, 38, 43);
    padding: 5px;
    z-index: 10;
    user-select: none;
}

.user-more__item {
    padding-left: 15px;
    width: calc(100% - 0px);
    height: 50px;
    font-size: 14px;
    border-radius: 5px;
    text-align: left;
    color: rgba(255, 255, 255, 0.7);
    font-family: 'ZCool';
}

.user-more__item:hover {
    background-color: rgba(56, 58, 64);
    cursor: pointer;
}

/* .user-status .avatar:hover {
    scale: 1.1;
} */
</style>