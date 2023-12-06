<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:33:46
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:45:57
 * @FilePath: \RvcWeb\src\view\home\NoticeDetailView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import "@/assets/css/NoticeDetail.css";
// import request from '@/utils/request.ts';

let contain = {
  author: "RVC社区官方",
  content: "欢迎来到RVC社区",
  cover: "public/backPic/NoticeBack.png",
  createAt: "2023-11-29 01:47:50",
  likeNum: 0,
  noticeId: "5bcd73d6-8546-42a7-8afe-1819643aac6c",
  title: "",
  watchNum: 0,
};
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
      <img :src="contain.cover" alt="Team Member Image" />
    </div>
    <div class="NoticeContain flex">{{ contain.content }}</div>
  </div>
</template>
