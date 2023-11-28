<script setup lang="ts" >
import {otherUser} from '@/view/user/info/userTypes'
import FollowUserCard from '../components/followUserCard.vue'

  let followUsers:otherUser[] = [
    {id:0, avatar: '/src/assets/picture/daocaoren.jpg',nickName: 'daocaoren',description: '啥也不会 躺平就好'},
    {id:1, avatar: '/src/assets/picture/dhx.jpg',nickName: 'O.o',description: 'why so series'},
    {id:2, avatar: '/src/assets/picture/Genius.png',nickName: 'Genius',description: ''},
    {id:3, avatar: '/src/assets/picture/huaerbuku.jpg',nickName: 'huaerbuku',description: ''},
    {id:4, avatar: '/src/assets/picture/jq.png',nickName: 'o.0',description: ''},
    {id:5, avatar: '/src/assets/picture/lishiming.webp',nickName: 'lishiming',description: '看到世界的底层代码'},
    {id:6, avatar: '/src/assets/picture/wangyoucao.jpg',nickName: 'wangyoucao',description: ''},
    {id:7, avatar: '/src/assets/picture/welsir.jpg',nickName: 'welsir',description: '计算机是最伟大的艺术品'},
    {id:8, avatar: '/src/assets/picture/xi.jpg',nickName: 'xi',description: ''},
    {id:9, avatar: '/src/assets/picture/xiangzong.jpg',nickName: 'xiangzong',description: ''}
  ]

</script>
<template>
  <div class="follow-user-list">
    <div class="follow-container" v-for="(followUser,index) in followUsers" :key="index">
      <FollowUserCard :followUser = "followUser"></FollowUserCard>
    </div>
  </div>
</template>


<style scoped>
  .follow-user-list{
    width: 100%;
    height: 100%;
    background-color: rgba(50, 52, 64);
  }
  .follow-user-list .follow-container{
    width:100%;
  }
</style>
