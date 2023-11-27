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
      <div class="NoticeBoard"></div>
      <!--社区介绍板块-->
      <div class="Introduction">
        <div class="IntroductionPic"></div>
        <div class="IntroductionCard">
          <div class="IntroductionTitle">RVC社区</div>
          <div class="IntroductionContain">RVC社区是一个基于VITS语音合成系统的开源工具，可以实现实时的声音转换，适用于直播、视频录制等场景。RVC可以让用户将一个人的声音样本复制并转移到另一个人身上，或者自定义声音的特征，如音调、音色、语速等。RVC社区提供了模型分享下载、在线演示、教程指导等功能，让用户可以轻松上手和体验RVC的魅力。</div>
        </div>
      </div>
      <!--社区功能板块-->
      <div class="Functions">
        <div class="Function">
          <div class="FunctionTool">个人账号</div>
          <div class="FunctionImg"></div>
        </div>
        <div class="Function">
          <div class="FunctionTool">畅所欲言</div>
          <div class="FunctionImg"></div>
        </div>
        <div class="Function">
          <div class="FunctionTool">在线试音</div>
          <div class="FunctionImg"></div>
        </div>
        <div class="Function">
          <div class="FunctionTool">模型大全</div>
          <div class="FunctionImg"></div>
        </div>
        <div class="Function">
          <div class="FunctionTool">在线交易</div>
          <div class="FunctionImg"></div>
        </div>
        <div class="Function">
          <div class="FunctionTool">虚拟对话</div>
          <div class="FunctionImg"></div>
        </div>
        <div class="Function">
          <div class="FunctionTool">语音聊天室</div>
          <div class="FunctionImg"></div>
        </div>
      </div>
      <!--我们团队板块-->
      <div class="Team">
        <div class="TeamItem">
          <div class="NickName"></div>
          <div class="Description"></div>
          <div class="role"></div>
          <div class="Img"></div>
        </div>
      </div>
      <!--RVC版本板块-->
      <div class="Versions">
        <div class="VersionMessage">版本信息</div>
        <div class="VersionContain">{{ responseData.data.rvcDescription }}</div>
        <div class="VersionsBtn">了解更多</div>
      </div>
    </div>
</template>
<script setup lang="ts">
import '../../assets/HomePage.css'
import axios from 'axios';
import { ref, onMounted } from 'vue';

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
});

const fetchData = async () => {
  try {
    const config = {
      method: 'get',
      url: 'http://localhost:9300/web/info',
      headers: {
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
      }
    };

    const response = await axios(config);
    responseData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
</script>
