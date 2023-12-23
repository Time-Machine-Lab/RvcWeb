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
import {onMounted, ref} from "vue";
import {DetailVO} from "@/api/home/introTypes.ts";
import {getDetail} from "@/api/home/introAPI.ts";
import { useRoute } from 'vue-router';
const noticeId = ref("");
const Detail = ref<DetailVO>(<DetailVO>{author: "RVC官方", content: "1511", cover: "https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg", createAt: "2023-12-20", likeNum: 0, noticeId: "", title: "关于一测的公告", watchNum: 0});

onMounted(() => {
  noticeId.value = <string>useRoute().params.id;
  getDetail(noticeId.value).then((res: any) => {
    console.log(res)
    Detail.value = res.data;
  })
});
</script>
<template>
  <div class="NoticeDetail">
    <div class="NoticeTitle">
      <div class="title flex">{{ Detail.title }}</div>
      <div class="message flex">
        <div class="author">{{ Detail.author }}</div>
        <div class="time">{{ Detail.createAt }}</div>
      </div>
    </div>
    <div class="NoticeCover">
      <img :src="Detail.cover" alt="Team Member Image" class="NoticeImg"/>
    </div>
    <div class="NoticeContain flex">{{ Detail.content }}</div>
  </div>
</template>
