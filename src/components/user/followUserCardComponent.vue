<!--
 * @Author: Dhx
 * @Date: 2023-12-05 13:02:25
 * @Description: 
 * @FilePath: \RvcWeb\src\components\user\followUserCardComponent.vue
-->
<script lang="ts" setup>
import { OtherUser } from '@/api/user/userTypes'
import { useUserStore } from "@/view/user/info/userStore.js";
const userStore = useUserStore();
const props = defineProps<{
  followUser: OtherUser;
}>();
</script>
<template>
  <div class="user-card">
    <RouterLink :to="'/user/likeModels?id=' + props.followUser.id">
      <div
        class="avatar"
        :style="{ backgroundImage: 'url(' + props.followUser.avatar + ')' }"
      ></div>
    </RouterLink>

    <div class="info">
      <div class="username">
        {{ props.followUser.nickName }}
      </div>
      <div class="description">
        {{ props.followUser.description }}
      </div>
    </div>
    <div class="operation">
      <span class="button" v-if="followUser.id != userStore.getProfile.id">
        已关注
      </span>
    </div>
  </div>
</template>
<style scoped>
.user-card {
  width: 70%;
  height: 100px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  transition: all 0.5s;
}
.user-card:hover {
  /* background-color: rgba(0,0,0,0.1); */
}
.user-card .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}
.user-card .info {
  width: calc(70% - 100px);
}
.user-card .info .username {
  text-align: left;
  padding-left: 20px;
  line-height: 50px;
  height: 50px;
  font-size: 28px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  width: 100%;
}

.user-card .info .description {
  text-align: left;
  padding-left: 20px;
  line-height: 50px;
  height: 50px;
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.3);
  width: 100%;
}
.user-card .operation .button {
  position: relative;
  display: block;
  width: 80px;
  height: 30px;
  border: grey 1px solid;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  line-height: 30px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  cursor: pointer;
}
</style>
