<!--
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\pages\followUser.vue
-->
<script setup lang="ts">
import { UserInfoVO } from '@/api/user/userTypes'
import FollowUserCard from "@/components/user/followUserCardComponent.vue";
import { getFollowUsers } from "@/api/user/userApi";
import router from "@/router/index.ts";
import { ref } from "vue";
import { storage } from '@/utils/storage';
import { message } from '@/utils/message';
let followUsers = ref<UserInfoVO[]>();
let loading = ref(false)
let loaded = ref(false)
if ((router.currentRoute.value.query.id as string) == storage.get<string>('uid')) {
  loading.value = true
  getFollowUsers().then((res:any) => {
    if(res.code==200){
      followUsers.value = res.data;
      loaded.value = true
    } else{
      message.error('获取关注列表失败')
    }
    loading.value = false
  });
}

const scroll = function () {
  console.log("scroll");
};
</script>
<template>
  <div class="follow-user-list">
    <el-scrollbar>
      <ul
        class="follow-container infinite-list"
        v-infinite-scroll="scroll"
        style="overflow: auto"
      >
        <li v-for="(followUser, index) in followUsers" :key="index">
          <FollowUserCard :user="followUser"></FollowUserCard>
        </li>
      </ul>
      <el-empty :image-size="200" v-if="loaded && (!followUsers || followUsers?.length == 0)" style="font-family: 'ZCool';"
                    description="还未关注用户" image="/icon/person-empty.svg" />
      <div class="loading" v-if="loading"></div>
    </el-scrollbar>
  </div>
</template>
<style scoped>
@import "@/view/user/info/style/followUser.css";
</style>