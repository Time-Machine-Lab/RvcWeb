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
import { getUserInfoById, followUser } from "@/api/user/userApi.js";
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
let clickMore = ref(false)
let moreVisibility = ref(false)
const handleClickMore = function () {
  clickMore.value = true
  moreVisibility.value = !moreVisibility.value
  setTimeout(function () {
    clickMore.value = false
  }, 200)
}
const handleBlur = function () {
  setTimeout(function () {
    moreVisibility.value = false
  }, 200)
}
const follow = function () {
  if (followDisabled.value) {
    message.warning('请稍后再试')
    return
  }
  followDisabled.value = true
  setTimeout(function () {
    followDisabled.value = false
  }, 2000)
  followUser(userProfile.value.uid!).then((res: any) => {
    if (res.code == 200) {
      message.success(hasFollow.value ? '取消' : '' + '关注成功')
      hasFollow.value = !hasFollow.value

    } else {
      message.error('服务器异常')
    }
  })
};
const handleShare = function () {
    var input = document.createElement("input");
    var body = document.body;
    body.appendChild(input);
    input.value = window.location.href;
    input.select();
    document.execCommand("copy");
    body.removeChild(input);
    message.success("已复制链接")
}
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
    <div class="share" @click="handleShare">
      <img style="position: absolute;top: 1px;" src="/icon/share.svg" height="13" width="13">
    </div>
    <div tabindex="-1" class="more" @click="handleClickMore" @blur="handleBlur"
      :class="clickMore ? 'dither-animation' : ''">
      <div
        style="height: 16px;width:16px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
      </div>
    </div>
    <div class="more-window" v-show="moreVisibility">
      <div class="more-window__item" @click="message.warning('开发中')">
        举报
      </div>
    </div>
    <div class="avatar-container">
      <div class="avatar" :style="{ backgroundImage: 'url(\'' + userProfile.avatar + '\')' }"></div>
    </div>
    <div class="information">
      <div class="username-container">
        <span class="username">
          {{ userProfile.nickname ? userProfile.nickname : "unknow" }}<img
            :src="userProfile.sex == '男' ? '/icon/male.svg' : '/icon/female.svg'">
        </span>
      </div>

      <div class="description-container">
        <span class="description">个人简介： {{ userProfile.description }}</span>
      </div>
      <div class="creatTime-container">
        <span class="creatTime">
          生日： {{ userProfile.birthday }}
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
@import "@/view/user/info/style/baseInfo.css"
</style>