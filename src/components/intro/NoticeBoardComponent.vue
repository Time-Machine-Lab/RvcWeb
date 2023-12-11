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
import { ref } from 'vue';

const NoticeImg = ref([
  { img: "../../../public/teamPic/dhx.jpg" },
  { img: "../../../public/teamPic/dhx.jpg" },
  { img: "../../../public/teamPic/Genius.png" },
  { img: "../../../public/teamPic/huaerbuku.jpg" },
  { img: "../../../public/teamPic/jq.png" },
  { img: "../../../public/teamPic/lishiming.webp" },
  { img: "../../../public/teamPic/wangyoucao.jpg" },
]);

const tableData = ref([
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
]);
const listAll = ref([
  { date: "2017-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
  { date: "2016-05-03", id: "Tom", text: "No. 189, Grove St, Los Angeles" },
]);
const currentTab = ref('new');
const changeTab = (tab: any) => {
  currentTab.value = tab;
};

</script>

<template>
  <div class="notice flex">
    <!--轮播图-->
    <el-carousel height="auto" autoplay>
      <el-carousel-item
        v-for="(ImgItem, index) in NoticeImg"
        :key="index"
        style="height: 500px">
        <img :src="ImgItem.img" alt="Team Member Image" />
      </el-carousel-item>
    </el-carousel>
    <!--公告栏-->
    <div class="notice-board flex">
      <div class="notice-board__tabs flex">
        <button class="notice-board__tab flex" @click="changeTab('new')" :class="{ active: currentTab === 'new' }"><p>最新公告</p></button>
        <button class="notice-board__tab flex" @click="changeTab('hot')" :class="{ active: currentTab === 'hot' }">最热公告</button>
        <button class="notice-board__tab flex" @click="changeTab('all')" :class="{ active: currentTab === 'all' }">全部公告</button>
      </div>
      <div class="notice-board__list flex" v-if="currentTab === 'new'">
        <ul class="notice-board__contain flex" v-for="notice in tableData" :key="notice.id">
          <router-link :to="{ name: 'NoticeDetail', params: { id: notice.id } }" target="_blank" class="router flex">
            <li class="notice-board__id flex">{{ notice.id }}</li>
            <li class="notice-board__text flex">{{ notice.text }}</li>
            <li class="notice-board__date flex">{{ notice.date }}</li>
          </router-link>
        </ul>
      </div>
      <div class="notice-board__list flex" v-if="currentTab === 'hot'">
        <ul class="notice-board__contain flex" v-for="notice in tableData" :key="notice.id">
          <li class="notice-board__id flex">{{ notice.id }}</li>
          <li class="notice-board__text flex">{{ notice.text }}</li>
          <li class="notice-board__date flex">{{ notice.date }}</li>
        </ul>
      </div>
      <div class="notice-board__list flex" v-if="currentTab === 'all'">
        <ul class="notice-board__contain flex" v-for="notice in listAll" :key="notice.id">
          <li class="notice-board__id flex">{{ notice.id }}</li>
          <li class="notice-board__text flex">{{ notice.text }}</li>
          <li class="notice-board__date flex">{{ notice.date }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router{
  width:100%;
  height:100%;
}
.notice {
  width: 100%;
  height: 700px;
  flex-direction: row;
  .el-carousel {
    height: 500px;
    width: 55%;
    border-radius: 20px;
    box-sizing: border-box;
    border: 25px double #ffffff;
  }
  .el-carousel img {
    width: 100%;
  }
  .notice-board {
    position: relative;
    border-radius: 50px 1px;
    margin-left: 5%;
    background: #fbfdff;
    width: 30%;
    height: 500px;
    box-shadow: 1px 1px 7px #939393;
  }
  .notice-board__tabs{
    position: absolute;
    left:0;
    flex-direction: column;
    justify-content: space-evenly;
    width:50px;
    height:100%;
    background: #ffffff;
    border-radius: 50px 1px;
    box-shadow: 1px 1px 3px #d0d0d0;
    .notice-board__tab{
      background: transparent;
      height:27%;
      width:100%;
      border-radius: 50px 1px;
      border:none;
      cursor: pointer;
      transition-duration: .3s;
      writing-mode: vertical-rl;
    }
    .notice-board__tab.active{
      background: #e6eaff;
      height:47%;
    }
  }
  .notice-board__list{
    position: absolute;
    right:0;
    height:100%;
    width:90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .notice-board__contain{
    justify-content: center;
    width:calc(100% - 50px);;
    height:15%;
    border-bottom: solid 1px #eaeaea;
  }
  .notice-board__contain li{
    margin-left:10px;
  }
  .notice-board__id{
    width:10%;
    height:100%;
  }
  .notice-board__text{
    width:65%;
    height:100%;
  }
  .notice-board__date{
    width:15%;
    height:100%;
  }
}
</style>
