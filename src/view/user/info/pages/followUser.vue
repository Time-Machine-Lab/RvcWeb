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
if ((router.currentRoute.value.query.id as string) == storage.get<string>('uid')) {
  getFollowUsers().then((res:any) => {
    if(res.code==200){
      followUsers.value = res.data;
      console.log(followUsers);
    } else{
      message.error('获取关注列表失败')
    }
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
    </el-scrollbar>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.follow-user-list {
  width: 100%;
  height: 100%;
  background-color: rgba(26,27,30);
}
.follow-user-list .follow-container {
  width: 100%;
  height: 100%;
}
</style>
