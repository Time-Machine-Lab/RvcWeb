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
import { ref } from 'vue';
import { message } from '@/utils/message';
import { storage } from '@/utils/storage';
import router from '@/router';
const userStore = useUserStore()
let userProfile = ref<UserInfoVO>()
let userStatusVisibility = ref(false)
if(storage.get<string>('token')){
    getLoginUserInfo().then((res: any) => {
    if (res.code == 200) {
        userStore.setProfile(<UserInfoVO>res.data)
        userProfile.value = userStore.getProfile
        storage.set('uid', res.data.uid)
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
</script>
<template>
    <div class="user-status">
        <div class="login-button" v-if="!userProfile?.uid" @click="$router.push('/login')">
            登录
        </div>
        <div class="avatar-container" v-else>
            <div tabindex="-1" @click="handleClickUser" @blur="handleBlur" class="avatar"
                :style="{ backgroundImage: 'url(' + userProfile?.avatar + ')' }">

            </div>

        </div>
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
</style>