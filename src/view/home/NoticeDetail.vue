<script setup lang="ts">
import '@/assets/css/NoticeDetail.css'
let contain = {
  noticeId : '5bcd73d6-8546-42a7-8afe-1819643aac6c',
  title : '欢迎来到RVC社区',
  author : 'RVC社区官方',
  content : '欢迎来到RVC社区',
  cover : 'public/backPic/NoticeBack.png',
  createAt : '2023-11-29 01:47:50',
  likeNum : 0,
  watchNum : 0
}
// const axios = require('axios');
//
// const config = {
//   method: 'get',
//   url: 'http://localhost:9300/web/notice/detail?noticeId=5bcd73d6-8546-42a7-8afe-1819643aac6c',
//   headers: {
//     'uid': '',
//     'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
//   }
// };
//
// axios(config)
// .then(function (response: any) {
//   contain = response.data
// })
// .catch(function (error: any) {
//   console.log(error);
// });

</script>
<template>
  <div class="NoticeDetail flex">
    <div class="NoticeTitle">
      <div class="title flex">{{ contain.title }}</div>
      <div class="message flex">
        <div class="author">{{ contain.author }}</div>
        <div class="time">{{ contain.createAt }}</div>
      </div>
    </div>
    <div class="NoticeCover">
      <img :src="contain.cover" alt="Team Member Image">
    </div>
    <div class="NoticeContain flex">{{contain.content}}</div>
  </div>
</template>

