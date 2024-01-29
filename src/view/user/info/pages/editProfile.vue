<!--
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\pages\editProfile.vue
-->
<script setup lang="ts">
import { ref } from "vue";
import { editUserInfo, getUpdatePasswordCode, getPreCode, updatePassword, uploadAvatar } from "@/api/user/userApi.ts";
import { UserInfoVO, ProfileForm, EmailCodeForm, UpdatePasswordForm } from "@/api/user/userTypes";
import { message } from "@/utils/message";
import router from "@/router";
const props = defineProps<{
  userProfile: UserInfoVO;
}>();
const oldProfile = ref<ProfileForm>({
  avatar: props.userProfile.avatar,
  nickname: props.userProfile.nickname,
  description: props.userProfile.description,
  sex: props.userProfile.sex,
  birthday: props.userProfile.birthday,
});
let newProfile = ref<ProfileForm>({
  avatar: props.userProfile.avatar,
  nickname: props.userProfile.nickname,
  description: props.userProfile.description,
  sex: props.userProfile.sex,
  birthday: props.userProfile.birthday,
});
const sexOptions = ref([
  {
    value: "男",
    label: "男",
  },
  {
    value: "女",
    label: "女",
  },
]);
let preCode = ref<{
  uuid: string;
  base64: string;
}>({
  uuid: "",
  base64: ""
})
let emailCodeForm = ref<EmailCodeForm>({
  email: "",
  type: 2,
  code: "",
  uuid: ""
})
let form = ref<{
  updatePasswordForm: UpdatePasswordForm,
  confirmPassword: string
}>({
  updatePasswordForm: {
    email: "",
    emailCode: "",
    password: ""
  },
  confirmPassword: ""
})
let sexSelectvisibility = ref(false)
let clickSex = ref(false)
let currentSexIndex = ref(-1)
let updatePasswordDialogVisible = ref(false)
let sendCodeDialogVisible = ref(false)
let time = ref(0)
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
const beforeAvatarUpload = function (rawFile: File) {
  if (rawFile.type !== 'image/jpeg') {
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    message.warning('请上传小于10M的图片')
    return false
  }
  var reader = new FileReader();
  reader.readAsDataURL(rawFile);
  reader.onload = function () {
    newProfile.value.avatar = String(reader.result)
  }


  newProfile.value.avatar = rawFile.webkitRelativePath
  uploadAvatar(rawFile).then((res: any) => {
    if (res.code == 200) {
      message.success('上传成功，等待审核')
    } else {
      message.error(res.msg)
    }

  })
  return false
};
setInterval(() => {
  if (time.value != 0) time.value--;
}, 1000)
const submitChange = function () {
  if (!profileHasChanged()) {
    return
  }
  editUserInfo(newProfile.value).then((res: any) => {
    if (res.code == 200) {
      message.success("修改成功")
      router.go(0)
    }
    else {
      message.error(res.msg)
    }
  });
};
const profileHasChanged = function () {
  return !(oldProfile.value.birthday == newProfile.value.birthday && oldProfile.value.description == newProfile.value.description && oldProfile.value.nickname == newProfile.value.nickname && oldProfile.value.sex == newProfile.value.sex)
}
const getPreCodeFunc = function () {
  getPreCode().then((res: any) => {
    if (res.code == 200) {
      preCode.value = res.data
    } else {
      message.error('网络异常')
    }
  })
}
const sendCodeFunc = function () {
  emailCodeForm.value.uuid = preCode.value.uuid
  emailCodeForm.value.email = form.value.updatePasswordForm.email
  getUpdatePasswordCode(emailCodeForm.value).then((res: any) => {
    if (res.code == 200) {
      message.success("发送成功，请注意查收")
      sendCodeDialogVisible.value = false
      time.value = 60
    } else {
      getPreCodeFunc()
      message.error(res.msg)
    }
  })
}
const handleClickSendCode = function () {
  if (time.value > 0) return
  if (!checkEmail(form.value.updatePasswordForm.email)) {
    message.warning('请输入正确的邮箱')
    return
  }
  sendCodeDialogVisible.value = true
}
const checkEmail = function (email: string) {
  return /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
    email,
  )
}
const submitUpdatePassword = function(){
  if(form.value.updatePasswordForm.email == ''){
    message.warning('请输入邮箱')
    return
  }
  if(!checkEmail(form.value.updatePasswordForm.email)){
    message.warning('请输入正确的邮箱')
    return
  }
  if(form.value.updatePasswordForm.emailCode ==  ''){
    message.warning('请输入验证码')
    return
  }
  if(form.value.updatePasswordForm.password ==  ''){
    message.warning('请输入密码')
    return
  }
  if(form.value.confirmPassword ==  ''){
    message.warning('请再次确认密码')
    return
  }
  if(form.value.confirmPassword !=  form.value.updatePasswordForm.password){
    message.warning('两次输入的密码不相同')
    return
  }
  updatePassword(form.value.updatePasswordForm).then((res:any)=>{
    if(res.code==200){
      message.success('修改成功')
      router.go(0)
    } else {
      message.error(res.msg)
    }
  })
}
getPreCodeFunc()
</script>
<template>
  <el-dialog v-model="sendCodeDialogVisible" title="图形验证码" width="20%" style="background-color: rgba(26,27,30);"
    :append-to-body="true">
    <div class="dialog-content">
      <div class="dialog-content__precode">
        <img :src="'data:image/png;base64,' + preCode.base64" @click="getPreCodeFunc" style="height: 100%;width: 100%;">
      </div>
      <div>
        <input class="dialog-content__input" v-model="emailCodeForm.code" placeholder="输入图形验证码" maxlength="5">
      </div>
    </div>
    <div class="dialog-footer">
      <div class="dialog-footer__button">
        取消
      </div>
      <div class="dialog-footer__button" @click="sendCodeFunc">
        确定
      </div>
    </div>
  </el-dialog>
  <div class="edit-profile-container" v-if="!updatePasswordDialogVisible">
    <div class="header">
      <span class="title">编辑资料</span>
      <span class="button" @click="submitChange"
        :style="{ cursor: !profileHasChanged() ? 'not-allowed' : 'pointer' }">保存更改</span>
    </div>

    <div class="content">
      <el-row :gutter="20" class="row">
        <span class="label"> 头像 </span>
        <div class="upload-container">
          <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="newProfile.avatar" :src="newProfile.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"> {{ '<' }} 10M </el-icon>
          </el-upload>
        </div>
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 昵称 </span>
        <input v-model="newProfile.nickname" style="width: 170px;" class="input" placeholder="nickname"
          :input-style="inputStyle" />

      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 简介 </span>
        <input v-model="newProfile.description" class="input" placeholder="description" :input-style="inputStyle" />
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 性别 </span>
        <div class="select">
          <div tabindex="-1" class="sex-selecter"
            :style="{ border: sexSelectvisibility ? 'rgba(24,100,171) 1px solid' : '' }"
            :class="clickSex ? 'dither-animation' : ''" @click="handleClickSort" @blur="handleBlur">
            <div class="horizontal-center" style="display: flex;">
              <span style="line-height: 30px;margin-left: 3px;width: 140px;">{{
                currentSexIndex == -1 ? userProfile.sex : sexOptions[currentSexIndex]?.label }}</span>
              <span>
                <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                  :class="sexSelectvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
              </span>
            </div>

          </div>

        </div>
        <div class="sex-select" v-show="sexSelectvisibility">
          <div class="sex-select__item" v-for="(tag, index) in sexOptions" :key="index"
            @click="currentSexIndex = index; sexSelectvisibility = false; newProfile.sex = sexOptions[currentSexIndex].label">
            {{ tag.label }}
          </div>
        </div>
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 生日 </span>

        <div class="select">
          <div class="block">
            <el-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="newProfile.birthday" type="date"
              placeholder="Pick a day" />
          </div>
        </div>
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 密码 </span>
        <input class="input" style="cursor: not-allowed;width: 170px;" disabled placeholder="********"> <img
          @click="updatePasswordDialogVisible = true" style="margin-left: 10px;cursor: pointer;" src="/icon/setting.svg">
      </el-row>
    </div>
  </div>
  <div class="update-password__container" v-else>
    <div class="header">
      <span class="title">修改密码</span>
      <span class="button" @click="submitUpdatePassword" >保存</span>
      <span class="button" @click="updatePasswordDialogVisible = false" >返回</span>
    </div>
    <div class="content">
      <el-row :gutter="20" class="row">
        <span class="label"> 邮箱 </span>
        <input v-model="form.updatePasswordForm.email" style="width: 170px;" class="input" placeholder="输入绑定的邮箱"
          :input-style="inputStyle" />
        <div class="sendCode-button" @click="handleClickSendCode"
          :style="{ cursor: time == 0 ? 'pointer' : 'not-allowed' }">{{
            time == 0 ? '发送验证码' : time }}</div>
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 验证码 </span>
        <input v-model="form.updatePasswordForm.emailCode" style="width: 170px;" class="input" placeholder="邮箱验证码"
          :input-style="inputStyle" />
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 密码 </span>
        <input v-model="form.updatePasswordForm.password" type="password" style="width: 170px;" class="input" placeholder="密码"
          :input-style="inputStyle" />
      </el-row>
      <el-row :gutter="20" class="row">
        <span class="label"> 确认密码 </span>
        <input v-model="form.confirmPassword" type="password" style="width: 170px;" class="input" placeholder="确认密码"
          :input-style="inputStyle" />
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

.update-password__container {
  position: relative;
  width: 100%;
  height: 100%;
}

.header {
  height: 40px;
  width: 100%;
}

.header .title {
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 40px;
  float: left;
  font-family: 'ZCool';
}

.header .button {
  position: relative;
  float: right;
  background-color: rgba(25, 113, 194);
  height: 40px;
  width: 150px;
  border-radius: 20px;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  user-select: none;
  margin-right: 10px;
  top: 50%;
  transform: translate(0, -50%);
  font-family: 'ZCool';
  cursor: pointer;
}

.header .button:hover {
  background-color: rgba(24, 100, 171);
}

.sendCode-button {
  margin-left: 10px;
  height: 30px;
  padding: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'ZCool';
  font-size: 16px;
  line-height: 30px;
  color: white;
  background-color: rgba(25, 113, 194);
  user-select: none;
}

.sendCode-button:hover {
  background-color: rgba(24, 100, 171);
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
  object-fit: cover;
}

.content .row {
  margin-top: 20px;
}

.content .select {
  width: 100%;
  text-align: left;
  display: block;
}

.dialog-content {
  position: relative;
  width: 100%;
  height: 40px;
  left: 50%;
  margin-bottom: 20px;
  display: flex;
  transform: translate(-50%);
}

.dialog-content__precode {
  width: 50%;
  height: 100%;
  cursor: pointer;
}

.dialog-content__input {
  width: calc(80% - 20px);
  height: 100%;
  outline: none;
  font-size: 14px;
  line-height: 50px;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 0 10px;
  background-color: rgba(37, 38, 43);
  text-align: center;
}

.dialog-content__input::placeholder {
  font-size: 10px;
  text-align: center;
  font-family: 'ZCool';

}

.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.dialog-footer__button {
  height: 40px;
  width: 90px;
  border-radius: 5px;
  color: white;
  line-height: 40px;
  cursor: pointer;
  user-select: none;
}

.dialog-footer__button:nth-child(1) {
  background-color: rgba(52, 58, 64);
}

.dialog-footer__button:nth-child(1):hover {
  background-color: rgba(36, 40, 44);
}

.dialog-footer__button:nth-child(2) {
  background-color: rgba(25, 113, 194);
}

.dialog-footer__button:nth-child(2):hover {
  background-color: rgba(24, 100, 171);
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
  display: block;
  width: 100%;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  text-align: left;
  margin-bottom: 5px;
  font-family: 'ZCool';
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
  font-family: 'ZCool';
}
.input::placeholder{
  font-size: 14px;
  font-family: 'ZCool';

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
