<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:34:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-14 14:53:38
 * @FilePath: \RvcWeb\src\view\home\HomePageView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import Model from '@/view/user/info/pages/likeModels.vue'
import WaterFall from '@/components/layout/waterFallComponent.vue'
import {ref} from 'vue'
// 选择器
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: '最多点赞',
  },
  {
    value: 'Option2',
    label: '最多收藏',
  },
  {
    value: 'Option3',
    label: '最新发布',
  },
]
</script>

<template>
  <div class="model">
    <div class="model-home">
      <div class="model-choice flex">
        <!--选择器-->
        <el-select v-model="value" clearable class="m-2" placeholder="Select" size="large">
          <el-option class="m-3"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
        </el-select>
        <!--搜索框-->
        <input type="text" name="text" class="input" placeholder="搜索">
      </div>
      <div class="model-contain">
        <div class="model-water" v-if="value === ''">
          <WaterFall>
            <div style="width:300px;height:400px;background: rgba(121,187,255,0.33)">1</div>
            <div style="width:300px;height:500px;background: rgba(121,187,255,0.33)">2</div>
            <div style="width:300px;height:450px;background: rgba(121,187,255,0.33)">3</div>
            <div style="width:300px;height:400px;background: rgba(121,187,255,0.33)">4</div>
            <div style="width:300px;height:500px;background: rgba(121,187,255,0.33)">5</div>
            <div style="width:300px;height:400px;background: rgba(121,187,255,0.33)">6</div>
            <div style="width:300px;height:500px;background: rgba(121,187,255,0.33)"></div>
            <div style="width:300px;height:400px;background: rgba(121,187,255,0.33)"></div>
          </WaterFall>
        </div>
        <div v-if="value === 'Option1'"> <Model></Model> </div>
        <div v-else-if="value === 'Option2'"></div>
        <div v-else-if="value === 'Option3'"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-input__wrapper) {
  background-color: transparent;
  border: #fb7299 1px solid;
  border-radius: 100px;
  width: 90px;
  height: 40px;
  outline: none;
  font-size: 16px;
  letter-spacing: 4px;
  box-shadow: none;
}
:deep(.el-input__inner) {
  color: white;
}
:deep(.el-select){
  --el-select-border-color-hover: none;
  --el-select-input-focus-border-color: none;
  outline: none;
  border: none;
}
.input {
  padding: 1rem;
  border-radius: 1rem;
  background: transparent;
  transition: 0.3s;
  border: #fb7299 1px solid;
}
.input:focus {
  outline-color: #e8e8e8;
  background: #e8e8e8;
  box-shadow: inset 20px 20px 60px #c5c5c5,
  inset -20px -20px 60px #ffffff;
  transition: 0.3s;
}
.model{
  width:100%;
  height:150vh;
  background-color: rgb(66, 66, 68);
}
.model-home{
  position: fixed;
  left:9%;
  width:82%;
  overflow: scroll;
  background-color:  rgb(66, 66, 68);
  box-shadow: 16px 16px 32px #363638,
  -16px -16px 32px #4e4e50;
  .model-choice{
    position: fixed;
    justify-content: space-around;
    width:82%;
    height:100px;
    box-shadow: 16px 16px 32px #363638;
    z-index: 5;
    background: rgb(49, 49, 49);
  }
}
.model-contain{
  position: relative;
  height:100vh;
  top:120px;
  width:100%;
}
.model-water{
  width:100%;
}
</style>
