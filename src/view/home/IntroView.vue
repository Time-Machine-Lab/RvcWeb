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
    <div class="fixed-strip">RVC   RVC   RVC   RVC   RVC   RVC   RVC   RVC   RVC   RVC</div>
    <!--公告栏-->
    <NoticeBoard></NoticeBoard>
    <div class="fixed">RVC   RVC   RVC   RVC   RVC   RVC   RVC   RVC   RVC   RVC</div>
    <!--社区介绍板块-->
    <div class="Introduction">
      <div class="Introduction-pic"></div>
      <div class="introduction-contain">
        <div class="Introduction-card flex">
          <div class="Introduction-card__title flex">RVC社区</div>
          <div class="Introduction-card__contain">
            RVC社区是一个基于VITS语音合成系统的开源工具，可以实现实时的声音转换，适用于直播、视频录制等场景。RVC可以让用户将一个人的声音样本复制并转移到另一个人身上，或者自定义声音的特征，如音调、音色、语速等。RVC社区提供了模型分享下载、在线演示、教程指导等功能，让用户可以轻松上手和体验RVC的魅力。
          </div>
        </div>
      </div>

    </div>
    <!--社区功能板块-->
    <div class="Functions flex">
      <div class="Functions-title flex">社区功能</div>
      <div v-for="(functionItem, index) in functionArray" :key="index" class="Function">
        <div class="Function-tool flex">{{ functionItem.function }}</div>
        <div class="Function-img flex">
          <img :src="functionItem.img" alt="Team Member Image" />
        </div>
      </div>
    </div>
    <!--我们团队板块-->
    <div class="Team flex">
      <div class="team-title flex">我们团队</div>
      <div class="team-list">
        <div class="team-content">
          <div v-for="(teamMember, index) in teamMembers" :key="index" class="team-item">
            <img :src="teamMember.img" alt="Team Member Image" class="team-item__img" />
            <div class="team-item__message flex">
              <div class="NickName flex">{{ teamMember.nickName }}</div>
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
import axios from "axios"
import { ref, onMounted,computed } from "vue"
import NoticeBoard from "@/components/intro/NoticeBoardComponent.vue"
import Welcome from "@/components/intro/welcome.vue";
// welcome板块
window.addEventListener('scroll', function() {
  const scrollDistance = window.scrollY;
  const strip = document.querySelector('.fixed-strip');
  strip.style.transform = `translateX(-${scrollDistance}px)`;
});
window.addEventListener('scroll', function() {
  const scrollDistance = window.scrollY;
  const strip = document.querySelector('.fixed');
  strip.style.transform = `translateX(${scrollDistance}px)`;
});
// 社区功能板块
const functionArray = [
  { function: "个人账号", img: "../../../public/teamPic/daocaoren.jpg" },
  { function: "畅所欲言", img: "../../../public/teamPic/dhx.jpg" },
  { function: "在线试音", img: "../../../public/teamPic/Genius.png" },
  { function: "模型大全", img: "../../../public/teamPic/huaerbuku.jpg" },
  { function: "在线交易", img: "../../../public/teamPic/jq.png" },
  { function: "虚拟对话", img: "../../../public/teamPic/lishiming.webp" },
  { function: "语音聊天室", img: "../../../public/teamPic/wangyoucao.jpg" },
];
// team板块

const items = [
  {
    id: 1,
    nickName: "Member1",
    description: "Description1",
    role: "Role1",
    img: "../../../public/teamPic/daocaoren.jpg",
  },
  {
    id: 2,
    nickName: "Member2",
    description: "Description1",
    role: "Role1",
    img: "../../../public/teamPic/dhx.jpg",
  },
  {
    id: 3,
    nickName: "Member3",
    description: "Description1",
    role: "Role1",
    img: "../../../public/teamPic/Genius.png",
  },
  {
    id: 4,
    nickName: "Member4",
    description: "Description1",
    role: "Role1",
    img: "../../../public/teamPic/huaerbuku.jpg",
  },
  {
    id: 5,
    nickName: "Member5",
    description: "Description1",
    role: "Role1",
    img: "../../../public/teamPic/jq.png",
  },
  {
    id: 6,
    nickName: "Member6",
    description: "Description1",
    role: "Role1",
    img: "../../../public/teamPic/lishiming.webp",
  },
  {
    id: 7,
    nickName: "Member7",
    description: "Description1",
    role: "Role1",
    img: "../../../public/teamPic/wangyoucao.jpg",
  },
  {
    id: 8,
    nickName: "Member8",
    description: "Description1",
    role: "Role1",
    img: "../../../public/teamPic/welsir.jpg",
  },
  {
    id: 9,
    nickName: "Member9",
    description: "Description1",
    role: "Role1",
    img: "../../../public/teamPic/xi.jpg",
  },
  {
    id: 10,
    nickName: "Member10",
    description: "Description1",
    role: "Role1",
    img: "../../../public/teamPic/xiangzong.jpg",
  },
  // Add more team members as needed
];
const currentIndex = ref(0);
const teamMembers = computed(() => {
  let start = currentIndex.value % items.length;
  if(currentIndex.value == 1){
    return [
      items[items.length-1],
      items[items.length-2],
      items[items.length-3],
      items[items.length-4],
      items[items.length-5],
      items[items.length-6],
    ];
  }
  return [
    items[start],
    items[(start + 1) % items.length],
    items[(start + 2) % items.length],
    items[(start + 3) % items.length],
    items[(start + 4) % items.length],
    items[(start + 5) % items.length],
  ];
});
onMounted(() => {
  setInterval(() => {
    currentIndex.value = 1- currentIndex.value;
  }, 15000);
});

const responseData = ref({
  data: {
    id: 0,
    officialConcat: "",
    rvcDescription: "",
    rvcVersion: "",
    webDescription: "",
    webName: "",
  },
});

const fetchData = async () => {
  try {
    const config = {
      method: "get",
      url: "http://localhost:9300/web/info",
      headers: {
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
      },
    };

    const response = await axios(config);
    responseData.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchData);
</script>
