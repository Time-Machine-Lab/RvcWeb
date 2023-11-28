<!--By XMY-->
<!--2023/11/27-->
<template>
  <div class="HomePage">
      <div class="Welcome">
        <div class="WelcomeCard">
          <div class="WelcomeTitle">RVC社区</div>
          <div class="WelcomeContain">RVC模型交流社区<br/>2022-2023<br/>一起探索声音变换的无限可能,你梦想的声音从现在开始!</div>
          <div class="WelcomeBtn flex">
            <div class="RegisterBtn flex">立即注册</div>
            <div class="EnterBtn flex">进入社区</div>
          </div>
        </div>
      </div>
      <!--公告栏-->
      <div class="NoticeBoard">
        <el-carousel>
          <el-carousel-item></el-carousel-item>
          <el-carousel-item></el-carousel-item>
          <el-carousel-item></el-carousel-item>
        </el-carousel>
      </div>
      <!--社区介绍板块-->
      <div class="Introduction">
        <div class="IntroductionPic"></div>
        <div class="IntroductionCard flex">
          <div class="IntroductionTitle flex">RVC社区</div>
          <div class="IntroductionContain">RVC社区是一个基于VITS语音合成系统的开源工具，可以实现实时的声音转换，适用于直播、视频录制等场景。RVC可以让用户将一个人的声音样本复制并转移到另一个人身上，或者自定义声音的特征，如音调、音色、语速等。RVC社区提供了模型分享下载、在线演示、教程指导等功能，让用户可以轻松上手和体验RVC的魅力。</div>
        </div>
      </div>
      <!--社区功能板块-->
      <div class="Functions">
        <div class="FunctionsTitle">社区功能</div>
        <div v-for="(functionItem, index) in functionArray" :key="index" class="Function">
          <div class="FunctionTool flex">{{ functionItem.function }}</div>
          <div class="FunctionImg">
            <img :src="functionItem.img" alt="Team Member Image">
          </div>
        </div>
      </div>
      <!--我们团队板块-->
      <div class="Team">
        <div class="TeamTitle">我们团队</div>
        <div v-for="(teamMember, index) in teamMembers" :key="index" class="TeamItem">
          <div class="Img">
            <img :src="teamMember.img" alt="Team Member Image">
          </div>
          <div class="NickName flex">{{ teamMember.nickName }}</div>
          <div class="Description flex">{{ teamMember.description }}</div>
          <div class="Role flex">{{ teamMember.role }}</div>
        </div>
      </div>
      <!--RVC版本板块-->
      <div class="Versions">
        <div class="VersionMessage flex">版本信息</div>
        <div class="VersionContain flex">RVC已经到来</div>
        <div class="VersionsBtn flex">了解更多</div>
      </div>
    </div>
</template>
<script setup lang="ts">
import '../../assets/css/HomePage.css'
import axios from 'axios'
import { ref, onMounted } from 'vue'
// 社区功能板块
const functionArray = [
  { function: '个人账号', img: 'src/assets/picture/daocaoren.jpg' },
  { function: '畅所欲言', img: 'src/assets/picture/dhx.jpg' },
  { function: '在线试音', img: 'src/assets/picture/Genius.png' },
  { function: '模型大全', img: 'src/assets/picture/huaerbuku.jpg' },
  { function: '在线交易', img: 'src/assets/picture/jq.png' },
  { function: '虚拟对话', img: 'src/assets/picture/lishiming.webp' },
  { function: '语音聊天室', img: 'src/assets/picture/wangyoucao.jpg' },
]
// const functionArray = ref([
//   '个人账号',
//   '畅所欲言',
//   '在线试音',
//   '模型大全',
//   '在线交易',
//   '虚拟对话',
//   '语音聊天室',
// ]);
const teamMembers = [
  { nickName: 'Member1', description: 'Description1', role: 'Role1', img: 'src/assets/picture/daocaoren.jpg' },
  { nickName: 'Member1', description: 'Description1', role: 'Role1', img: 'src/assets/picture/dhx.jpg' },
  { nickName: 'Member1', description: 'Description1', role: 'Role1', img: 'src/assets/picture/Genius.png' },
  { nickName: 'Member1', description: 'Description1', role: 'Role1', img: 'src/assets/picture/huaerbuku.jpg' },
  { nickName: 'Member1', description: 'Description1', role: 'Role1', img: 'src/assets/picture/jq.png' },
  { nickName: 'Member1', description: 'Description1', role: 'Role1', img: 'src/assets/picture/lishiming.webp' },
  { nickName: 'Member1', description: 'Description1', role: 'Role1', img: 'src/assets/picture/wangyoucao.jpg' },
  { nickName: 'Member1', description: 'Description1', role: 'Role1', img: 'src/assets/picture/welsir.jpg' },
  { nickName: 'Member1', description: 'Description1', role: 'Role1', img: 'src/assets/picture/xi.jpg' },
  { nickName: 'Member1', description: 'Description1', role: 'Role1', img: 'src/assets/picture/xiangzong.jpg' },
  // Add more team members as needed
]

const responseData = ref({
  code: '',
  msg: '',
  data: {
    id: 0,
    officialConcat: '',
    rvcDescription: '',
    rvcVersion: '',
    webDescription: '',
    webName: ''
  },
  timestamp: null
})

const fetchData = async () => {
  try {
    const config = {
      method: 'get',
      url: 'http://localhost:9300/web/info',
      headers: {
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
      }
    }

    const response = await axios(config)
    responseData.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchData)
</script>
