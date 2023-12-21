<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:34:13
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:45:04
 * @FilePath: \RvcWeb\src\view\home\AboutView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import Card from '@/components/intro/CardComponent.vue';
import {getInfo} from "@/api/home/introAPI.ts";
import {onMounted, ref} from "vue";
import {Info} from "@/api/home/introTypes.ts";

const Infos = ref<Info>({
  id: 0,
  officialConcat: "QQ:901648607",
  rvcDescription: "训练出当前最强开源人声音高提取模型RMVPE，并用于RVC的训练、离线/实时推理，支持pytorch/onnx/DirectML\\\\r\\\\n通过pytorch-dml支持A卡和I卡的</br>（1）实时变声（2）推理（3）人声伴奏分离（4）训练暂未支持，会切换至CPU训练；通过onnx_dml支持rmvpe_gpu的推理",
  rvcVersion: "1.6",
  webDescription: "RVC社区是一个致力于分享和交流RVC（Retrieval based Voice Conversion，检索式声音转换）技术的平台。RVC是一个基于VITS语音合成系统的开源工具，能实现实时声音变换，适用于直播、视频录制等场景",
  webName: "RVC官方社区"})
const getInfoDate = () => {
  getInfo().then((res: any) => {
    console.log(res)
    Infos.value = res.data
  })
}
onMounted(() => {
  getInfoDate()
});
</script>


<template>
  <div class="about flex">
    <Card :data="Infos.officialConcat"></Card>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.about {
  height: 100%;
  width: 100%;
  background: url("https://s2.loli.net/2023/12/13/xVG4Cd62hlYikuH.jpg");
  background-size: cover;
  justify-content: space-around;
}
</style>
