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
import "@/components/user/style/followUserCard.css"
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
      message.error(res.msg)
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