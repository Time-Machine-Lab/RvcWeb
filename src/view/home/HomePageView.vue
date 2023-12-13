<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:34:13
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:45:32
 * @FilePath: \RvcWeb\src\view\home\HomePageView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import Model from '@/view/user/info/pages/likeModels.vue'
import WaterFall from '@/components/layout/waterFallComponent.vue'
import {ref} from 'vue'
import {RvcModelVo} from "@/view/rvcModel/modelType.ts";

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

const models = ref<RvcModelVo[]>([{
  model_id: '111',
  uid: '1',
  username: '1',
  nickname: '1',
  avatar: '1',
  model_name: '1',
  model_type: '1',
  model_label: '1',
  model_image: '1',
  model_desc: '1',
  model_note: '1',
  watch_num: 1,
  like_num: 1,
  collection_num: 1,
  create_at: '1',
  has_like: false,
  has_collection: false,
}])
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
        <div v-if="value === ''"> <Model></Model> </div>
        <div v-if="value === 'Option1'"> <Model></Model> </div>
        <div v-else-if="value === 'Option2'">
          <WaterFall :data="models">
            <div style="width:300px;height:500px;background: #79bbff"></div>
          </WaterFall>
        </div>
        <div v-else-if="value === 'Option3'"> <!-- Content sorted by latest --> </div>
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
  height:100vh;
  background-color: rgb(66, 66, 68);
}
.model-home{
  position: fixed;
  left:9%;
  width:82%;
  height: 100vh;
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
  .model-contain{
    position: absolute;
    top:150px;
    left:15px;
  }
}
</style>
