<!--
 * @Author: Dhx
 * @Date: 2023-12-05 13:02:25
 * @Description: 
 * @FilePath: \RvcWeb\src\components\user\followUserCardComponent.vue
-->
<script lang="ts" setup>
import { followUser } from '@/api/user/userApi';
import { UserInfoVO } from '@/api/user/userTypes'
import { message } from '@/utils/message';
import { ref } from 'vue';
const props = defineProps<{
  user: UserInfoVO;
}>();
let disabled = ref(false)
const follow = function(){
  if(disabled.value)return
  disabled.value = true
  setTimeout(()=>{
    disabled.value = false
  },5000)
  followUser(props.user.uid).then((res:any)=>{
    if(res.code == 200){
      hasFollow.value = !hasFollow.value
      message.success('')
    } else {
      message.error(res.message)
    }
  })
}
let hasFollow = ref(true)
</script>
<template>
  <div class="user-card">
    <RouterLink :to="'/user/likes?id=' + props.user.uid">
      <div
        class="avatar"
        :style="{ backgroundImage: 'url(' + props.user.avatar + ')' }"
      ></div>
    </RouterLink>

    <div class="info">
      <div class="username">
        {{ props.user.nickname }}
      </div>
      <div class="description">
        {{ props.user.description }}
      </div>
    </div>
    <div class="operation">
      <span class="button" @click="follow" v-if="hasFollow">
        已关注
      </span>
      <span class="button" @click="follow" v-else style="background-color: rgba(25,113,194);">
        关注
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
  color: rgba(255, 255, 255, 1);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  cursor: pointer;
  font-family: 'ZCool';
}
</style>
