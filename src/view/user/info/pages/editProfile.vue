<!--
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\pages\editProfile.vue
-->
<script setup lang="ts">
import { ref } from "vue";
import { editUserInfo } from "@/api/user/userApi.ts";
import { Profile, ProfileForm } from "@/api/user/userTypes";
const props = defineProps<{
  userProfile: Profile;
}>();
const form = ref<ProfileForm>({
  avatar: props.userProfile.avatar,
  nickName: props.userProfile.nickName,
  description: props.userProfile.description,
  sex: props.userProfile.sex,
  birthday: "",
});
const sexOptions = ref([
  {
    value: "m",
    label: "男",
  },
  {
    value: "f",
    label: "女",
  },
  {
    value: "u",
    label: "未知",
  },
]);
let sexSelectvisibility = ref(false)
let clickSex = ref(false)
let currentSexIndex = ref(2)
const handleClickSort = function () {
  clickSex.value = true
  sexSelectvisibility.value = !sexSelectvisibility.value
  setTimeout(function () {
    clickSex.value = false
  }, 200)
}
const handleBlur = function () {
  setTimeout(function () {
    sexSelectvisibility.value = false
  }, 200)
}
const inputStyle = ref({
  backgroundColor: "rgba(37,38,43)",
  color: "white",
});
const handleAvatarSuccess = function () { };
const beforeAvatarUpload = function () { };
const submitChange = function () {
  editUserInfo(form.value).then((res) => {
    console.log(res + "res");
  });
};
</script>
<template>
  <div class="edit-profile-container">
    <div class="header">
      <span class="title">编辑资料</span>
      <span class="button" @click="submitChange">保存更改</span>
    </div>

    <div class="content">
      <el-row :gutter="20" class="row">
        <span class="label"> 头像 </span>
        <div class="upload-container">
          <el-upload class="avatar-uploader" action="http://124.71.107.76" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"> + </el-icon>
          </el-upload>
        </div>
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 昵称 </span>
        <input v-model="form.nickName" class="input" placeholder="nickname" :input-style="inputStyle" />
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 简介 </span>
        <input v-model="form.description" class="input" placeholder="description" :input-style="inputStyle" />
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 性别 </span>
        <div class="select">
          <div tabindex="-1" class="sex-selecter"
            :style="{ border: sexSelectvisibility ? 'rgba(24,100,171) 1px solid' : '' }"
            :class="clickSex ? 'dither-animation' : ''" @click="handleClickSort" @blur="handleBlur">
            <div class="horizontal-center" style="display: flex;">
              <span style="line-height: 30px;margin-left: 3px;width: 140px;">{{
                sexOptions[currentSexIndex]?.label }}</span>
              <span>
                <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                  :class="sexSelectvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
              </span>
            </div>

          </div>

        </div>
        <div class="sex-select" v-show="sexSelectvisibility">
          <div class="sex-select__item" v-for="(tag, index) in sexOptions" :key="index"
            @click="currentSexIndex = index; sexSelectvisibility = false;">
            {{ tag.label }}
          </div>
        </div>
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 生日 </span>
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
  background-color: rgba(25, 113, 194);
  height: 40px;
  width: 150px;
  border-radius: 20px;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
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

:deep(.el-input__inner) {
  background-color: rgba(37, 38, 43);
}

:deep(.el-input__wrapper) {
  background-color: rgba(37, 38, 43);
}

:deep(.el-select-dropdown) {
  background-color: rgba(37, 38, 43);
}

.label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
  margin-bottom: 5px;
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed grey;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: grey;
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.input {
  position: relative;
  display: block;
  width: 100%;
  float: left;
  height: 30px;
  border: rgba(55, 58, 64) 1px solid;
  outline: none;
  border-radius: 5px;
  background-color: rgba(37, 38, 43);
  color: rgba(255, 255, 255, 0.7);
  padding-left: 10px;
}

.sex-selecter {
  width: 160px;
  height: 30px;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 14px;
  background-color: rgba(37, 38, 43);
  cursor: pointer;
  display: flex;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s;
  user-select: none;
  border: rgba(55, 58, 64) 1px solid;
}

.sex-select {
  position: absolute;
  top: 60px;
  /* left: 10px; */
  width: 150px;
  border-radius: 10px;
  border: rgba(55, 58, 64) 1px solid;
  background-color: rgba(37, 38, 43);
  padding: 5px;
  z-index: 10;
  user-select: none;
}

.sex-select__item {
  padding-left: 15px;
  width: calc(100% - 15px);
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
}

.sex-select__item:hover {
  background-color: rgba(56, 58, 64);
  cursor: pointer;
}

.revolve-animation {
  transform: rotateZ(180deg);
  transform-origin: 6px 3.5px;
}
</style>
