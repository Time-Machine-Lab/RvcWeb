<script setup lang="ts">
import { ref } from 'vue'
import { editUserInfo } from '@/api/user/userApi.ts'
import { useUserStore } from '@/view/user/info/userStore.js'

import {profileForm} from '@/view/user/info/userTypes'
const userStore = useUserStore()

const form = ref<profileForm>({
  avatar: userStore.getProfile.avatar,
  nickName: userStore.getProfile.nickName,
  description: userStore.getProfile.description,
  sex: userStore.getProfile.sex,
  birthday: ''
})
const sexOptions = ref([
  {
    value: 'm',
    label: '男'
  },
  {
    value: 'f',
    label: '女'
  },
  {
    value: 'u',
    label: '未知'
  }
])
const inputStyle = ref({
  backgroundColor: 'rgba(50,52,66)',
  border: 'rgba(65,67,81) 1px solid',
  color: 'white'
})
const handleAvatarSuccess = function () {

}
const beforeAvatarUpload = function () {

}
const submitChange = function () {
  editUserInfo(form.value).then(() => {
    // console.log(res)
  })
}
</script>
<template>
  <div class="edit-profile-container">
    <div class="header">
      <span class="title">编辑资料</span>
      <span class="button" @click="submitChange">保存更改</span>
    </div>

    <div class="content">
      <el-row :gutter="20" class="row">
        <span class="label">
          头像
        </span>
        <div class="upload-container">
          <el-upload class="avatar-uploader" action="http://124.71.107.76" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            +
          </el-icon>
        </el-upload>
        </div>
         </el-row>
      <el-row :gutter="20" class="row">
        <span class="label">
          昵称
        </span>
        <el-input v-model="form.nickName" class="input" placeholder="nickname" :input-style="inputStyle" />
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label">
          简介
        </span>
        <el-input v-model="form.description" class="input" placeholder="description" :input-style="inputStyle" />
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label">
          性别
        </span>
        <div class="select">
          <el-select v-model="form.sex" class="m-2" placeholder="Select" :style="inputStyle">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>

      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label">
          生日
        </span>
        <div class="select">
          <div class="block">
            <el-date-picker v-model="form" type="date" placeholder="Pick a day" />
          </div>
        </div>

      </el-row>
    </div>
  </div>
</template>



<style scoped>
.edit-profile-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.edit-profile-container .header {
  height: 40px;
  width: 100%;
}

.edit-profile-container .header .title {
  font-size: 20px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  line-height: 40px;
  float: left;
}

.edit-profile-container .header .button {
  position: relative;
  float: right;
  background-color: #535bf2;
  height: 35px;
  width: 100px;
  border-radius: 5px;
  line-height: 35px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  margin-right: 10px;
  top: 50%;
  transform: translate(0, -50%);
}

.content {
  height: calc(100% - 40px);
  width: 100%;
}

.content .upload-container {
  width: 100%;
}

.content .upload-container .avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.content .row {
  margin-top: 20px;
}

.content .select {
  width: 100%;
  text-align: left;
  display: block;
}

:deep .el-input__inner {
  background-color: rgba(50, 52, 66);
}

:deep .el-select-dropdown {
  background-color: rgba(50, 52, 66);
}

.label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
}

:deep .avatar-uploader .el-upload {
  border: 1px dashed grey;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep.avatar-uploader .el-upload:hover {
  border-color: grey;
}

:deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}</style>
