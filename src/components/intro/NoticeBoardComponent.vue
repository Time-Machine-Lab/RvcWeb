<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:33:46
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:47:38
 * @FilePath: \RvcWeb\src\components\intro\NoticeBoardComponent.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getHomeNotice} from "@/api/home/introAPI.ts";
import {BoardVO} from "@/api/home/introTypes.ts";

// 获取首页的轮播图公告信息
const Boards = ref<BoardVO[]>([{author: "111", content: "111", cover: "https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg", createAt: "2021", likeNum: 0, noticeId: "1111", title: "111", watchNum: 2}]);
const getWebData = () => {
  getHomeNotice().then((res: any) => {
    console.log(res)
    Boards.value = res.data.pageList;
  })
}

onMounted(() => {
  getWebData()
});
</script>

<template>
  <div class="notice flex">
    <!--轮播图-->
    <el-carousel height="auto" autoplay>
      <el-carousel-item v-for="(item, index) in Boards" :key="index" style="height: 550px">
        <router-link :to="{ name: 'NoticeDetail', params: { id: item.noticeId } }" target="_blank" class="router">
          <img :src="item.cover" alt="Team Member Image" class="img"/>
<!--          <img src="https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg" alt="Team Member Image" class="img"/>-->
          <div class="message flex">
            <div class="message-title flex">{{item.title}}</div>
            <div class="message-author flex">{{item.author}}</div>
            <div class="message-watch flex">{{item.watchNum}}</div>
          </div>
        </router-link>
      </el-carousel-item>
    </el-carousel>
    <router-link to="/notice" target="_blank" class="more">
      <div class="tooltip-container">
        <span class="tooltip">查看更多</span>
        <span class="text">查看更多</span>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.more{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  width:100%;
  height:100px;
}
.tooltip-container {
  --background: #c5c6fa;
  background: var(--background);
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  font-family: ZCool;
  border-radius: 10px;
  width: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #efefef;
}
.tooltip {
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(-50%);
  padding: 0.3em 0.6em;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  background: var(--background);
  border-radius: 5px;
  width: 7em;
  text-align: center;
}
.tooltip::before {
  position: absolute;
  content: "";
  height: 0.6em;
  width: 0.6em;
  bottom: -0.2em;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  background: var(--background);
}
.tooltip-container:hover .tooltip {
  top: -100%;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  animation: shake 500ms ease-in-out forwards;
}
@keyframes shake {
  0% {
    transform: rotate(2deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  70% {
    transform: rotate(3deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
.text {
  position: relative;
  padding: 0.7em 1.8em;
  overflow: hidden;
  font-family: ZCool;
  font-size: 17px;
}
.text::before {
  content: "(^_^)/";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: inherit;
  background-color: var(--background);
  transition: 0.3s;
}
.tooltip-container:hover .text::before {
  top: 0;
}
.router{
  width:100%;
  height:550px;
}
.notice {
  flex-direction: column;
  width: 100%;
  height: 900px;
  .el-carousel {
    height: 550px;
    width: 900px;
    border-radius: 20px;
    box-sizing: border-box;
    border: 10px double #020202;
  }
  .el-carousel-item{
    width:100%;
    height:100%;
  }
  .img {
    width: 100%;
    height:100%;
  }

}
.message{
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width:100%;
  height:250px;
  background: linear-gradient(to bottom, transparent, rgba(255, 254, 254, 0.98));
  color:#3a3a3a;
  font-family: 方正粗黑宋简体;
}
.message-title{
  font-size: 26px;
  height:20%;
  width:80%;
}
.message-author{
  height:40%;
  width:80%;
  font-size: 20px;
}
.message-watch{
  height:20%;
  width:60%;
  justify-content: right;
}
</style>
