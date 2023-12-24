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
    <div class="fixed-strip">RVC   RVC   RVC   RVC   RVC   RVC   RVC</div>
    <!--公告栏-->
    <NoticeBoard></NoticeBoard>
    <div class="fixed">RVC   RVC   RVC   RVC   RVC   RVC   RVC</div>
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
    <Portfolio :tools="Tools"/>
    <!--了解更多-->
    <Banner :webInfo="Infos"/>
    <!--我们团队板块-->
    <div class="Team flex">
      <h1 class="team-title flex">我们团队</h1>
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
      <div class="parent">
        <div class="card">
          <div class="content-box">
            <span class="card-title">
              {{Infos.webName}}
<!--              RVC官方社区-->
            </span>
            <h4 class="card-content">
              {{Infos.webDescription}}
<!--              RVC社区是一个致力于分享和交流RVC（Retrieval based Voice Conversion，检索式声音转换）技术的平台。RVC是一个基于VITS语音合成系统的开源工具，能实现实时声音变换，适用于直播、视频录制等场景-->
            </h4>
            <router-link to="/about" target="_blank" class="see-more"> <p>关于我们</p> </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import "../../../assets/css/HomePage.css"
import { ref, onMounted } from "vue"
import NoticeBoard from "@/components/intro/NoticeBoardComponent.vue"
import Welcome from "@/components/intro/welcome.vue";
import {getInfo, getTeam, getTools} from "@/api/home/introAPI.ts";
import Portfolio from "@/view/home/intro/comps/Portfolio.vue";
import Banner from "@/view/home/intro/comps/Banner.vue"
// import {preloadImages} from "@/utils/preload.ts";

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
const Infos = ref<Info>(<Info>{id: 1, officialConcat: "",
  rvcDescription: "训练出当前最强开源人声音高提取模型RMVPE，并用于RVC的训练、离线/实时推理，支持pytorch/onnx/DirectML\\\\r\\\\n通过pytorch-dml支持A卡和I卡的</br>（1）实时变声（2）推理（3）人声伴奏分离（4）训练暂未支持，会切换至CPU训练；通过onnx_dml支持rmvpe_gpu的推理",
  rvcVersion: "1.6",
  webDescription: "RVC社区是一个致力于分享和交流RVC（Retrieval based Voice Conversion，检索式声音转换）技术的平台。RVC是一个基于VITS语音合成系统的开源工具，能实现实时声音变换，适用于直播、视频录制等场景",
  webName: "RVC官方社区"})
const Tools = ref<Tools[]>([])
const Teams = ref<Team[]>([
  {avatar: "https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg", description: "RVC开源项目创始人", id: 1, nickname: "花儿不哭", role: "社区创造者"},
  {avatar: "https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg", description: "RVC开源项目创始人", id: 1, nickname: "花儿不哭", role: "社区创造者"},
  {avatar: "https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg", description: "RVC开源项目创始人", id: 1, nickname: "花儿不哭", role: "社区创造者"},
  {avatar: "https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg", description: "RVC开源项目创始人", id: 1, nickname: "花儿不哭", role: "社区创造者"},
  {avatar: "https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg", description: "RVC开源项目创始人", id: 1, nickname: "花儿不哭", role: "社区创造者"},
  {avatar: "https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg", description: "RVC开源项目创始人", id: 1, nickname: "花儿不哭", role: "社区创造者"},
])
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
  // preloadImages();
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
<style lang="scss" scoped>
@import "@/style/scss/intro/_intro.scss";
</style>
