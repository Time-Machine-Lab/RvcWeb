<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:33:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-11 14:30:10
 * @FilePath: \RvcWeb\src\view\home\LoginView.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<script lang="ts">
import { defineComponent } from "vue";
import {
  login,
  getCode,
  register,
  getPreCode,
  forgetPassword,
} from "@/api/user/userApi";
import { message } from "@/utils/message";
import { storage } from "@/utils/storage";
import router from "@/router";
export default defineComponent({
  name: "login-home",
  data() {
    return {
      isChecked: false,
      loginClicked: true,
      registerClicked: false,
      LoginStatus: true,
      centerDialogVisible: false,
      loadingStatus: false,
      DialogTitle: "",
      hasSendCode: false,
      form: {
        email: "",
        code: "",
        password: "",
        repeatPassword: "",
      },
      preCode: {
        uuid: "",
        base64: "",
        inputCode: "",
        time: 0,
      },
      emailType: 0,
      preCodeDisabled: false,
    };
  },
  methods: {
    loginFunc() {
      if (this.form.email == "") {
        message.warning("请输入邮箱");
        return;
      }
      if (!this.checkEmain(this.form.email)) {
        message.warning("邮箱格式错误");
        return;
      }
      if (this.form.password == "") {
        message.warning("请输入密码");
        return;
      }
      let form = {
        email: this.form.email,
        password: this.form.password,
      };
      login(form).then((res: any) => {
        if (res.code == 200) {
          storage.set("token", res.data.token as string);
          message.success("登录成功");
          this.$router.go(0)
        } else {
          message.error(res.msg);
        }
      });
    },
    registerFunc() {
      if (this.form.password == "" || this.form.repeatPassword == "") {
        message.warning("请输入密码");
        return;
      }
      if (this.form.password != this.form.repeatPassword) {
        message.warning("两次密码输入不一致");
        return;
      }
      if (this.form.code == "") {
        message.warning("请输入验证码");
        return;
      }
      if (!this.isChecked) {
        message.warning("请先勾选同意用户协议");
        return;
      }
      let form = {
        email: this.form.email,
        emailCode: this.form.code,
        password: this.form.password,
      };
      register(form).then((res: any) => {
        if (res.code == 200) {
          message.success("注册成功");
          storage.set("token", res.data.token);
          router.go(0);
        } else {
          message.error(res.msg);
        }
      });
    },
    Return(){
      if(this.LoginStatus == false){
        this.form.repeatPassword = "";
        this.form.password = "";
        this.LoginStatus = true;
      }else{
        this.form.password = "";
        this.LoginStatus = false;
        this.emailType = 0;
        return;
      }
    },
    ForgetPassword() {
      this.DialogTitle = "Forget Password";
      this.centerDialogVisible = true;
    },
    loadImage() {
      this.loadingStatus = false;
    },
    sendCode(values: any) {
      if(this.preCode.time!=0)return
      if (this.form.email == "") {
        message.warning("请输入邮箱");
        return;
      }
      if (!this.checkEmain(this.form.email)) {
        message.warning("邮箱格式错误");
        return;
      }
      this.emailType = values == "Forget Password" ? 3 : 0;
      this.preCode.inputCode = "";
      this.DialogTitle = "验证码";
      this.centerDialogVisible = true;
      this.getPreCodeFunc();
    },
    checkEmain(email: string) {
      return /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
        email,
      );
    },
    getPreCodeFunc() {
      if (this.preCodeDisabled) {
        return;
      }
      this.loadingStatus = true;
      getPreCode().then((res) => {
        this.preCode.uuid = res.data.uuid;
        this.preCode.base64 = res.data.base64;
        this.preCodeDisabled = false;
      });
    },
    handleComfirm() {
      if (this.DialogTitle == "验证码") {
        if (this.preCode.inputCode == "") {
          message.warning("请输入图片验证码");
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let that = this;
        let form = {
          email: this.form.email,
          type: this.emailType,
          uuid: this.preCode.uuid,
          code: this.preCode.inputCode,
        };
        getCode(form).then((res: any) => {
          if (res.code == 200) {
            message.success("发送成功");
            this.hasSendCode = true;
            this.preCode.time = 60;
            setTimeout(function () {
              that.hasSendCode = false;
            }, 60000);
            this.centerDialogVisible = false;
            if (this.emailType == 3) {
              this.ForgetPassword();
            }
          } else {
            this.getPreCodeFunc()
            if (res.code == 529) {
              this.preCode.inputCode = "";
              message.error(res.msg);
            } else {
              this.centerDialogVisible = false;
              message.error(res.msg);
            }
          }
        });
      } else {
        if (this.form.code == "") {
          message.warning("请输入验证码");
          return;
        }
        if (this.form.password == "") {
          message.warning("请输入密码");
          return;
        }
        let form = {
          email: this.form.email,
          password: this.form.password,
          emailCode: this.form.code,
        };
        forgetPassword(form).then((res: any) => {
          if (res.code == 200) {
            message.success("修改成功");
            this.centerDialogVisible = false;
            router.go(0)
          } else {
            message.error(res.msg);
          }
        });
      }
    },
  },
  mounted() {
    let that = this;
    setInterval(function () {
      if (that.preCode.time != 0) {
        that.preCode.time--;
      }
    }, 1000)
    if (storage.get<string>('token')) {
      this.$router.replace('posts')
    }
  },
});
</script>

<template>
  <div class="login flex">
    <div class="login-contain flex">
      <div class="flex right-top">
        <div class="right-title">
          <Transition  mode="out-in">
            <span v-if="LoginStatus">LOGIN</span>
            <span v-else>Register</span>
          </Transition>
        </div>
        <div @click="Return()" :key="1" class="return-btn">
          <svg xml:space="preserve" viewBox="0 0 100 100" y="0" x="0" xmlns="http://www.w3.org/2000/svg" width="100px" height="100px"><g class="ldl-scale" style="transform-origin: 50% 50%; transform: rotate(0deg) scale(0.8, 0.8);"><g class="ldl-ani"><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -0.740741s infinite normal forwards running breath-22a0af47-da9e-4e12-81ea-61c54fa6b026;"><circle stroke-miterlimit="10" stroke-width="8" stroke="#333" fill="none" r="40" cy="50" cx="50" style="stroke: rgba(161,164,196,0.96);"></circle></g></g><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -0.925926s infinite normal forwards running breath-22a0af47-da9e-4e12-81ea-61c54fa6b026;"><path fill="#77a4bd" d="M75 54.9l-7.8-8.2-8.2 7.7 4.5.1c-1.6 4.8-5.7 8.5-10.8 9.5-3.7.7-7.5 0-10.7-2.2l-3.7 5.5c3.5 2.3 7.5 3.6 11.6 3.6 1.3 0 2.7-.1 4-.4 8.1-1.6 14.4-7.7 16.3-15.7l4.8.1z" style="fill: rgb(255,182,182);"></path></g></g><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -1.11111s infinite normal forwards running breath-22a0af47-da9e-4e12-81ea-61c54fa6b026;"><path fill="#a0c8d7" d="M46 29.5c-8.1 1.6-14.4 7.7-16.3 15.7l-4.7-.1 7.8 8.2 8.2-7.8-4.5-.1c1.6-4.8 5.7-8.5 10.8-9.5 3.7-.7 7.5 0 10.7 2.2l3.7-5.5c-4.7-3-10.2-4.1-15.7-3.1z" style="fill: rgb(238,163,208);"></path></g></g></g></g></svg>
        </div>
      </div>
      <form class="right">
        <TransitionGroup name="list">
          <TransitionGroup name="list" tag="div" class="flex" :key="1" style="flex-direction: column">
            <TransitionGroup name="list" tag="div" class="flex" style="display: flex; width: 100%">
              <input class="right-input" type="email" v-model="form.email" placeholder="Email address"
                :style="{ width: LoginStatus ? '' : '70%' }" :key="3" />
              <div v-if="!LoginStatus" class="GetCode" :key="4">
                <Transition name="Register" mode="out-in">
                  <span v-if="!hasSendCode" @click="sendCode">发送验证码</span>
                  <input class="right-input" v-else v-model="form.code" placeholder="验证码" style="margin-top: 0" />
                </Transition>

                <span style="margin-right: 12px" v-show="hasSendCode">{{
                  preCode.time
                }}</span>
              </div>
            </TransitionGroup>

            <input type="password" class="right-input" placeholder="Password" :key="2" v-model="form.password"/>
          </TransitionGroup>

          <Transition name="list">
            <input v-if="!LoginStatus" class="right-input" type="password" placeholder="Confirm Password" :key="2"
              v-model="form.repeatPassword" />
          </Transition>

          <Transition name="Register" mode="out-in">
            <div v-if="LoginStatus" class="Forget-password" @click="ForgetPassword">
              忘记密码?
            </div>
            <div v-else class="Forget-password">
              <input type="checkbox" v-model="isChecked" class="codestatus" style="transform: scale(1.4)" />
              <span class="myCheckbox"><router-link to="/service" target="_blank" class="myCheckbox">同意《用户协议》</router-link></span>
            </div>
          </Transition>
          <TransitionGroup name="list" tag="div" class="login-btn" :key="5">
            <button v-if="LoginStatus" type="button" class="right-button" @click="loginFunc">
              登录
            </button>
            <button v-else class="left-button" @click="registerFunc">
              注册
            </button>
          </TransitionGroup>
        </TransitionGroup>
      </form>
    </div>
    <el-dialog v-model="centerDialogVisible" width="30%" align-center>
      <template #header>
        <span class="Dialog-header">{{ DialogTitle }}</span>
      </template>
      <div class="flex" v-loading="loadingStatus" :element-loading-text="`R\nV\nC`">
        <div v-if="DialogTitle == '验证码'">
          <div class="flex" style="width: 100%">
            <img :src="'data:image/png;base64,' + preCode.base64"
                 style="cursor: pointer; height: 6vh; width: 30%; margin-right: 6%" @load="loadImage"
                 @click="getPreCodeFunc" />
            <input class="right-input loading-input" type="text" v-model="preCode.inputCode" placeholder="验证码"
                   style="margin-top: 0; width: 50%" />
          </div>
        </div>
        <div v-else style="width: 100%">
          <div class="flex">
            <input class="right-input loading-input" type="text" placeholder="Email address" style="width: 50%"
                   v-model="form.email" />
            <div class="GetCode loading-input">
              <Transition name="Register" mode="out-in">
                <span v-if="true" @click="sendCode('Forget Password')">{{preCode.time==0?'发送验证码':preCode.time}}</span>
              </Transition>
            </div>
          </div>
          <input class="right-input loading-input" v-model="form.code" placeholder="验证码" />
          <input class="right-input loading-input" type="password" placeholder="Password" v-model="form.password" />
        </div>
      </div>
      <template #footer>
      <span class="dialog-button">
        <button class="right-button-item" @click="handleComfirm">确定</button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
@import "@/assets/css/Login.css";
</style>


