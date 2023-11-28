<script setup lang="ts">
import editProfile from './editProfile.vue'
import { useUserStore } from '../userStore.js'
import { profile } from '../userTypes'
import { ref } from 'vue'
import { getUserInfo } from '../../../../api/user/userApi.js'
const userStore = useUserStore()
const userProfile: profile = userStore.getProfile
const style = false
const loaded = ref(true)
let drawer = ref(false)
const figures = [
  {
    desc: 'LIKES',
    number: userProfile.fans_num
  },
  {
    desc: 'FOLLOWERS',
    number: userProfile.follow_num
  }
]
const open = () => {
  drawer.value = true
}
getUserInfo().then((res) => {
  userStore.setProfile(<profile>{
    avatar: res.avatar,
    nickName: res.nickName,
    description: res.description,
    register_date: res.register_date,
    fans_num: res.fans_num,
    follow_num: res.follow_num,
  })
})
setTimeout(function () {
  loaded.value = false
}, 2000)
</script>
<template>
  <div class="base-info">
    <div class="avatar-container">
      <div class="avatar">
      </div>
    </div>
    <div class="information">
      <div class="username-container">
        <span class="username">
          USERNAME
        </span>
      </div>
      <div class="creatTime-container">
        <span class="creatTime">
          Joined May 08,2023
        </span>
      </div>
    </div>
    <div class="button-container">
      <span class="button" v-if="style">
        关注
      </span>
      <span class="button" v-if="!style" @click="open">
        编辑资料
      </span>
    </div>
    <div class="line"></div>
    <div class="figures-container" v-if="style">
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
      <edit-profile v-loading="loaded" element-loading-background="transparent"></edit-profile>
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  background-image: url("/src/assets/picture/image (6).png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.base-info .username-container {
  width: 100%;
  position: relative;
}

.base-info .username-container .username {
  display: block;
  position: relative;
  font-size: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.base-info .creatTime-container .creatTime {
  display: block;
  position: relative;
  font-size: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
}

.button-container {
  width: 100%;
  padding: 20px 0;
}

.button-container .button {
  display: block;
  width: 90%;
  height: 60px;
  border-radius: 5px;
  margin: 20px auto auto;
  background-color: #646cff;
  line-height: 60px;
  font-size: 18px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}

.button-container .button:hover {
  background-color: #535bf2;
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
  background-color: rgba(40, 42, 54) !important
}</style>
../userStore