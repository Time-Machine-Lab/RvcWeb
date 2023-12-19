<!--
 * @Author: Dhx
 * @Date: 2023-11-30 18:48:48
 * @Description: 
 * @FilePath: \RvcWeb\src\view\layout\header\components\userStatus.vue
-->
<script lang="ts" setup>
import { getLoginUserInfo } from '@/api/user/userApi.js'
import { useUserStore } from '@/view/user/info/userStore.js'
import { Profile } from '@/api/user/userTypes'
const userStore = useUserStore()
getLoginUserInfo().then(res => {
        console.log(res.data)
        userStore.setProfile(<Profile>res.data)
    })
const login = function () {
    getLoginUserInfo().then(res => {
        console.log(res.data)
        userStore.setProfile(<Profile>res.data)
    })
}

</script>
<template>
    <div class="user-status">
        <div class="login-button" v-if="!userStore?.getProfile?.id" @click="login">
            登录
        </div>
        <div class="" v-else>
            
        </div>
        <div class="avatar-container">
            <RouterLink to="/user/">
                <div class="avatar" v-if="userStore?.getProfile?.id"
                    :style="{ backgroundImage: 'url(' + userStore?.getProfile?.avatar + ')' }">

                </div>
            </RouterLink>

        </div>

    </div>
</template>
<style scoped>
.user-status {
    position: relative;
    height: 100%;
    width: 100%;
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

.user-status .avatar:hover {
    scale: 1.1;
}</style>