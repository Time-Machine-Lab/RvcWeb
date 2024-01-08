<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:33:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-08 14:25:02
 * @FilePath: \RvcWeb\src\view\home\LoginView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script lang="ts">
import { defineComponent } from "vue";
import "@/assets/css/Login.css";
import {
  login,
  getCode,
  register,
  getPreCode,
  updatePassword,
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
        time: 60,
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
      if (this.LoginStatus == true) {
        this.form.password = "";
        this.LoginStatus = false;
        this.emailType = 0;
        return;
      }
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
    Back() {
      this.form.repeatPassword = "";
      this.form.password = "";
      this.LoginStatus = true;
    },
    ForgetPassword() {
      this.DialogTitle = "Forget Password";
      this.centerDialogVisible = true;
    },
    loadImage() {
      this.loadingStatus = false;
    },
    sendCode(values: any) {
      if (this.form.email == "") {
        message.warning("请输入邮箱");
        return;
      }
      if (!this.checkEmain(this.form.email)) {
        message.warning("邮箱格式错误");
        return;
      }
      this.emailType = values == "Forget Password" ? 2 : 0;
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
            if (this.emailType == 2) {
              this.ForgetPassword();
            }
          } else {
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
        updatePassword(form).then((res: any) => {
          if (res.code == 200) {
            message.success("修改成功");
            this.centerDialogVisible = false;
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
      if (that.preCode.time >= 0) {
        that.preCode.time--;
      }
    }, 1000)
    if(storage.get<string>('token')){
      this.$router.replace('/rvc/posts')
    }
  },
});
</script>

<template>
  <div class="login flex">
    <div class="contain flex">
      <div class="left flex">
        <div class="title">Welcome!</div>
        <div class="discover">Register to discover us</div>
      </div>
      <div class="right">
        <div class="flex right-top">
          <TransitionGroup name="list">
            <div v-if="!LoginStatus" @click="Back()" :key="1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                class="bi bi-arrow-left Back"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </div>
            <div class="right-title">
              <Transition :key="2" mode="out-in">
                <span v-if="LoginStatus">LOGIN</span>
                <span v-else>Register</span>
              </Transition>
            </div>
          </TransitionGroup>
        </div>
        <form>
          <TransitionGroup name="list">
            <TransitionGroup
              name="list"
              tag="div"
              class="flex"
              :key="1"
              style="flex-direction: column"
            >
              <TransitionGroup
                name="list"
                tag="div"
                class="flex"
                style="display: flex; width: 100%"
              >
                <input
                  class="right-input"
                  type="email"
                  v-model="form.email"
                  placeholder="Email address"
                  :style="{ width: LoginStatus ? '' : '50%' }"
                  :key="3"
                />
                <div v-if="!LoginStatus" class="GetCode" :key="4">
                  <Transition name="Register" mode="out-in">
                    <span v-if="!hasSendCode" @click="sendCode"
                      >发送验证码</span
                    >
                    <input
                      class="right-input"
                      v-else
                      v-model="form.code"
                      placeholder="验证码"
                      style="margin-top: 0"
                    />
                  </Transition>

                  <span style="margin-right: 12px" v-show="hasSendCode">{{
                    preCode.time
                  }}</span>
                </div>
              </TransitionGroup>

              <input
                class="right-input"
                type="password"
                placeholder="Password"
                :key="2"
                v-model="form.password"
              />
            </TransitionGroup>

            <Transition name="list" :key="3">
              <input
                v-if="!LoginStatus"
                class="right-input"
                type="password"
                placeholder="Confirm Password"
                :key="2"
                v-model="form.repeatPassword"
              />
            </Transition>

            <Transition name="Register" :key="4" mode="out-in">
              <div
                v-if="LoginStatus"
                class="Forget-password"
                @click="ForgetPassword"
              >
                忘记密码?
              </div>
              <div v-else class="Forget-password">
                <input
                  type="checkbox"
                  v-model="isChecked"
                  class="codestatus"
                  style="transform: scale(1.4)"
                />
                <span class="myCheckbox">同意用户协议</span>
              </div>
            </Transition>
            <TransitionGroup
              name="list"
              tag="div"
              class="right-button"
              :key="5"
            >
              <button
                v-if="LoginStatus"
                class="right-button-item"
                @click="loginFunc"
              >
                登录
              </button>
              <button class="right-button-item" @click="registerFunc()">
                注册
              </button>
            </TransitionGroup>
          </TransitionGroup>
        </form>
      </div>
    </div>
  </div>
  <el-dialog v-model="centerDialogVisible" width="30%" align-center>
    <template #header>
      <span class="Dialog-header">{{ DialogTitle }}</span>
    </template>
    <div
      class="flex"
      v-loading="loadingStatus"
      :element-loading-text="`R\nV\nC`"
    >
      <div v-if="DialogTitle == '验证码'">
        <div class="flex" style="width: 100%">
          <img
            :src="'data:image/png;base64,' + preCode.base64"
            style="cursor: pointer; height: 6vh; width: 30%; margin-right: 6%"
            @load="loadImage"
            @click="getPreCodeFunc"
          />
          <input
            class="right-input loading-input"
            type="text"
            v-model="preCode.inputCode"
            placeholder="验证码"
            style="margin-top: 0; width: 50%"
          />
        </div>
      </div>
      <div v-else style="width: 100%">
        <div class="flex">
          <input
            class="right-input loading-input"
            type="text"
            placeholder="Email address"
            style="width: 50%"
            v-model="form.email"
          />
          <div class="GetCode loading-input">
            <Transition name="Register" mode="out-in">
              <span v-if="!hasSendCode" @click="sendCode('Forget Password')"
                >发送验证码</span
              >
              <input
                class="right-input loading-input"
                v-else
                v-model="form.code"
                placeholder="验证码"
                style="margin-top: 0"
              />
            </Transition>
            <span style="margin-right: 12px" v-show="hasSendCode">{{
              preCode.time
            }}</span>
          </div>
        </div>

        <input
          class="right-input loading-input"
          type="password"
          placeholder="Password"
          v-model="form.password"
        />
      </div>
    </div>

    <template #footer>
      <span class="dialog-button">
        <button class="right-button-item" @click="handleComfirm">确定</button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.active {
  color: #000000;
}
.right-title {
  font-size: 66px;
  color: #ed82c9;
  text-shadow: 4.2px 3px 0 #3328ea;
  font-weight: bold;
  transition: 0.8s;
}

.right-input {
  width: 80%;
  padding: 0 2vh;
  border: none;
  height: 6vh;
  font-size: 22px;
  border-radius: 6px;
  margin-top: 2vh;
  /* transition: 0.8s; */
}
.right-input:focus {
  outline: none;
}
.right-input:first-child {
  margin-top: 2vh;
}
.Forget-password {
  color: #929493;
  display: flex;
  justify-content: flex-end;
  margin: 1.4vh 4vh;
  transition: 0.8s;
  text-align: center;
}
.Forget-password:hover {
  font-weight: bold;
}
.right-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vh;
  margin-top: 2vh;
}
.right-button-item {
  border: none;
  background-color: #d7ebff;
  color: #fff;
  font-size: 22px;
  border-radius: 6px;
  /* width: 50; */
  flex: 1;
  height: 8vh;
  margin: 0 4vh;
  transition: 0.8s;
}
.right-button-item:hover {
  background-color: #eac2e6;
  color: #7370a3;
  font-weight: bold;
}

.GetCode {
  width: 26%;
  height: 6vh;
  margin-left: 4%;
  margin-top: 2vh;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 20px;
  color: #757575;
}
.GetCode :hover {
  color: #000;
}
.right-top {
  justify-content: center;
  transition: 0.8s;
}
.Back {
  margin-right: 8vw;
  transition:
    height 0.8s,
    width 0.8s;
}
.Back:hover {
  height: 46px;
  width: 46px;
}
.myCheckbox {
  margin-left: 4px;
  font-size: 18px;
}
.Dialog-header {
  color: #303133;
  font-size: 46px !important;
  font-weight: bold;
}

/* 弹窗input样式 */
.loading-input {
  background-color: #eceff7 !important;
}

.dialog-button {
  display: flex;
  margin-bottom: 2vh;
}
/* 列表过度动画 */
.Register-enter-active,
.Register-leave-active {
  transition:
    opacity 0.5s,
    max-height 0.5s,
    transform 0.3s ease-out;
}

.Register-enter-from,
.Register-leave-to {
  transform: translateX(20px);
  opacity: 0;
  overflow: hidden;
}
/* 列表过度动画 */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

/* 定义户隐私同意选中时的动画效果 */
@keyframes scaleUp {
  0% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1.4);
  }
}

/* 添加用户隐私同意动画效果 */
.codestatus:checked {
  animation: scaleUp 0.3s ease; /* 设置动画效果，可以根据需要调整动画时长和缓动函数 */
}
/* 登录页Loading样式 */
:deep .el-loading-spinner .circular {
  display: none !important;
}
/* 登录页Loading字体样式 */
:deep .el-loading-spinner .el-loading-text {
  color: #eea1d7 !important;
  font-size: 36px;
  font-weight: bold;
  display: inline-block;
  animation: jump 1s infinite;
  text-shadow: 2px 6px 0px rgba(130, 179, 243, 0.5);
}
/* 登录页Loading动画样式 */
@keyframes jump {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}
</style>
