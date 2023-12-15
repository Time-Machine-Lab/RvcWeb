<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:33:46
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:45:41
 * @FilePath: \RvcWeb\src\view\home\IntroView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="intro">
    <div class="intro-back"></div>
    <!--欢迎页面-->
    <Welcome></Welcome>
    <div class="fixed-strip">RVC   RVC   RVC   RVC   RVC</div>
    <!--公告栏-->
    <NoticeBoard></NoticeBoard>
    <div class="fixed">RVC   RVC   RVC   RVC   RVC</div>
    <!--社区介绍板块-->
    <div class="Introduction">
      <div class="Introduction-pic"></div>
      <div class="introduction-contain">
        <div class="Introduction-card flex">
          <div class="Introduction-card__title flex">RVC社区</div>
          <div class="Introduction-card__contain">
            {{Infos.rvcDescription}}
<!--            RVC社区是一个基于VITS语音合成系统的开源工具，可以实现实时的声音转换，适用于直播、视频录制等场景。RVC可以让用户将一个人的声音样本复制并转移到另一个人身上，或者自定义声音的特征，如音调、音色、语速等。RVC社区提供了模型分享下载、在线演示、教程指导等功能，让用户可以轻松上手和体验RVC的魅力。-->
          </div>
        </div>
      </div>
    </div>
    <!--社区功能板块-->
    <div class="Functions flex">
      <div class="Functions-title flex">社区功能</div>
      <div v-for="(tool, index) in Tools" :key="index" class="Function">
        <div class="Function-tool flex">{{ tool.tool }}</div>
        <div class="Function-img flex">
          <img :src="tool.img" alt="Team Member Image" />
        </div>
      </div>
    </div>
    <!--我们团队板块-->
    <div class="Team flex">
      <div class="team-title flex">我们团队</div>
      <div class="team-list">
        <div class="team-content">
          <div v-for="(teamMember, index) in Teams" :key="index" class="team-item">
            <img :src="teamMember.avatar" alt="Team Member Image" class="team-item__img" />
            <div class="team-item__message flex">
              <div class="NickName flex">{{ teamMember.nickname }}</div>
              <div class="Description flex">{{ teamMember.description }}</div>
              <div class="Role flex">{{ teamMember.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--关于我们-->
    <div class="about flex">
      <div class="box"></div>
      <div class="about-btn flex">
        <router-link to="/about" target="_blank" class="about-btn__text"> <p>关于我们</p> </router-link>
      </div>
    </div>
    <!--RVC版本板块-->
    <div class="Versions">
      <div class="Version-message flex">版本信息</div>
      <div class="VersionContain flex">RVC已经到来</div>
      <a href="https://github.com/Time-Machine-Lab" class="Versions-btn flex">了解更多</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import "../../assets/css/HomePage.css"
import { ref, onMounted } from "vue"
import NoticeBoard from "@/components/intro/NoticeBoardComponent.vue"
import Welcome from "@/components/intro/welcome.vue";
import {getInfo, getTeam, getTools} from "@/api/home/introAPI.ts";

// 网站首页信息
interface Info {
  id: number
  officialConcat: string
  rvcDescription: string
  rvcVersion: string
  webDescription: string
  webName: string
}
// 社区功能
interface Tools {
  id: number
  img: string
  tool: string
  url: string
}
// 团队成员
interface Team {
  id: 1,
  avatar: string
  description: string
  nickname: string
  role: string
}
// 公告栏
// interface HomeNotice {
//   noticeId: string,
//   title: string
//   author: string
//   content: null,
//   cover: string
//   createAt: string
//   likeNum: null,
//   watchNum: 0
// }

const Infos = ref<Info>({ id: 0, officialConcat: '', rvcDescription: '', rvcVersion: '', webDescription: '', webName: ''})
const Tools = ref<Tools[]>([])
const Teams = ref<Team[]>([])

const getInfoDate = () => {
  getInfo().then((res: any) => {
    console.log(res)
    Infos.value = res.data
  })
}
const getToolDate = () => {
  getTools().then((res: any) => {
    console.log(res)
    Tools.value = res.data
  })
}
const getTeamDate = () => {
  getTeam().then((res: any) => {
    console.log(res)
    Teams.value = res.data
  })
}

onMounted(() => {
  getInfoDate()
  getToolDate()
  getTeamDate()
});





// const currentIndex = ref(0);
// const teamMembers = computed(() => {
//   let start = currentIndex.value % items.length;
//   if(currentIndex.value == 1){
//     return [
//       items[items.length-1],
//       items[items.length-2],
//       items[items.length-3],
//       items[items.length-4],
//       items[items.length-5],
//       items[items.length-6],
//     ];
//   }
//   return [
//     items[start],
//     items[(start + 1) % items.length],
//     items[(start + 2) % items.length],
//     items[(start + 3) % items.length],
//     items[(start + 4) % items.length],
//     items[(start + 5) % items.length],
//   ];
// });
// onMounted(() => {
//   setInterval(() => {
//     currentIndex.value = 1- currentIndex.value;
//   }, 15000);
// });



</script>
