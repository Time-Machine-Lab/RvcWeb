<script setup lang="ts">
import {ref,onMounted} from 'vue'
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
const emits = defineEmits(['close','login']);
const close = () => {
  emits('close');
};

let isChecked = ref(false);
let LoginStatus = ref(true);
let centerDialogVisible = ref(false);
let DialogTitle = ref("");
let hasSendCode = ref(false);
let form = {
  email: "",
  code: "",
  password: "",
  repeatPassword: "",
}
let preCode = {
  uuid: "",
  base64: "",
  inputCode: "",
  time: 0,
}
let emailType = ref(0);
let preCodeDisabled = ref(false);
// 登录
let loginFunc = () => {
  if (!form.email) {
    message.warning("请输入邮箱");
    return;
  }
  if (!checkEmail(form.email)) {
    message.warning("邮箱格式错误");
    return;
  }
  if (!form.password) {
    message.warning("请输入密码");
    return;
  }
  let loginData = {
    email: form.email,
    password: form.password,
  };
  login(loginData).then((res: any) => {
    if (res.code == 200) {
      storage.set("token", res.data.token as string);
      emits('login');
      message.success("登录成功");
      close()
    } else {
      message.error("登录失败");
    }
  });
};

let registerFunc = () => {
  if (!form.password || !form.repeatPassword) {
    message.warning("请输入密码");
    return;
  }
  if (form.password !== form.repeatPassword) {
    message.warning("两次密码输入不一致");
    return;
  }
  if (!form.code) {
    message.warning("请输入验证码");
    return;
  }
  if (!isChecked.value) {
    message.warning("请先勾选同意用户协议");
    return;
  }
  let registerData = {
    email: form.email,
    emailCode: form.code,
    password: form.password,
  };
  register(registerData).then((res: any) => {
    if (res.code === 200) {
      message.success("注册成功");
      storage.set("token", res.data.token);
      router.go(0);
    } else {
      message.error(res.msg);
    }
  });
};

let Return = () => {
  if (!LoginStatus.value) {
    form.repeatPassword = "";
    form.password = "";
    LoginStatus.value = true;
  } else {
    form.password = "";
    LoginStatus.value = false;
    emailType.value = 0;
  }
};

let ForgetPassword = () => {
  DialogTitle.value = "Forget";
  centerDialogVisible.value = true;
};


let sendCode = (values: any) => {
  if (preCode.time !== 0) return;
  if (!form.email) {
    message.warning("请输入邮箱");
    return;
  }
  if (!checkEmail(form.email)) {
    message.warning("邮箱格式错误");
    return;
  }
  emailType.value = values === "Forget Password" ? 3 : 0;
  preCode.inputCode = "";
  DialogTitle.value = "Get code";
  centerDialogVisible.value = true;
  getPreCodeFunc();
};

let checkEmail = (email: string) => {
  return /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email);
};

let getPreCodeFunc = () => {
  if (preCodeDisabled.value) {
    return;
  }
  getPreCode().then((res) => {
    preCode.uuid = res.data.uuid;
    preCode.base64 = res.data.base64;
    preCodeDisabled.value = false;
  });
};

const handleConfirm = () => {
  if (DialogTitle.value === "Get code") {
    if (!preCode.inputCode) {
      message.warning("请输入图片验证码");
      return;
    }
    let formData = {
      email: form.email,
      type: emailType.value,
      uuid: preCode.uuid,
      code: preCode.inputCode,
    };
    getCode(formData).then((res: any) => {
      if (res.code === 200) {
        message.success("发送成功");
        hasSendCode.value = true;
        preCode.time = 60;
        setTimeout(() => {
          hasSendCode.value = false;
        }, 60000);
        centerDialogVisible.value = false;
        if (emailType.value === 3) {
          ForgetPassword();
        }
      } else {
        getPreCodeFunc();
        if (res.code === 529) {
          preCode.inputCode = "";
          message.error(res.msg);
        } else {
          centerDialogVisible.value = false;
          message.error(res.msg);
        }
      }
    });
  } else {
    if (!form.code) {
      message.warning("请输入验证码");
      return;
    }
    if (!form.password) {
      message.warning("请输入密码");
      return;
    }
    let formData = {
      email: form.email,
      password: form.password,
      emailCode: form.code,
    };
    forgetPassword(formData).then((res: any) => {
      if (res.code === 200) {
        message.success("修改成功");
        centerDialogVisible.value = false;
        router.go(0);
      } else {
        message.error(res.msg);
      }
    });
  }
};

onMounted(() => {
  setInterval(() => {
    if (preCode.time !== 0) {
      preCode.time--;
    }
  }, 1000);
  if (storage.get<string>('token')) {
    router.replace('posts');
  }
})
</script>
<template>
  <div class="login flex">
    <div class="login-contain flex">
      <div class="flex right-top">
        <div @click="Return()" :key="1" class="return-btn">
          <svg xml:space="preserve" viewBox="0 0 100 100" y="0" x="0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><g class="ldl-scale" style="transform-origin: 50% 50%; transform: rotate(0deg) scale(0.8, 0.8);"><g class="ldl-ani"><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -0.740741s infinite normal forwards running breath-22a0af47-da9e-4e12-81ea-61c54fa6b026;"><circle stroke-miterlimit="10" stroke-width="8" stroke="#333" fill="none" r="40" cy="50" cx="50" style="stroke: rgba(161,164,196,0.96);"></circle></g></g><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -0.925926s infinite normal forwards running breath-22a0af47-da9e-4e12-81ea-61c54fa6b026;"><path fill="#77a4bd" d="M75 54.9l-7.8-8.2-8.2 7.7 4.5.1c-1.6 4.8-5.7 8.5-10.8 9.5-3.7.7-7.5 0-10.7-2.2l-3.7 5.5c3.5 2.3 7.5 3.6 11.6 3.6 1.3 0 2.7-.1 4-.4 8.1-1.6 14.4-7.7 16.3-15.7l4.8.1z" style="fill: rgb(255,182,182);"></path></g></g><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -1.11111s infinite normal forwards running breath-22a0af47-da9e-4e12-81ea-61c54fa6b026;"><path fill="#a0c8d7" d="M46 29.5c-8.1 1.6-14.4 7.7-16.3 15.7l-4.7-.1 7.8 8.2 8.2-7.8-4.5-.1c1.6-4.8 5.7-8.5 10.8-9.5 3.7-.7 7.5 0 10.7 2.2l3.7-5.5c-4.7-3-10.2-4.1-15.7-3.1z" style="fill: rgb(238,163,208);"></path></g></g></g></g></svg>
        </div>
        <div class="right-title">
          <Transition  mode="out-in">
            <span v-if="LoginStatus">Log in</span>
            <span v-else>Register</span>
          </Transition>
        </div>
        <button @click="close" class="close">
          <svg xml:space="preserve" viewBox="0 0 100 100" y="0" x="0" xmlns="http://www.w3.org/2000/svg" style="height: 100%; width: 100%" >
            <g class="ldl-scale" style="transform-origin: 50% 50%; transform: rotate(0deg) scale(0.8, 0.8);">
              <g class="ldl-ani"><g class="ldl-layer">
                <g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -0.740741s infinite normal forwards running breath-bd51d6b2-8380-4138-b059-097270229e31;">
                 </g></g><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -0.925926s infinite normal forwards running breath-bd51d6b2-8380-4138-b059-097270229e31;"><path fill="#e15b64" d="M29.4 70.8c-1.8-1.1-2.4-3.5-1.3-5.3 4.9-7.8 10.7-14.8 17-21.1 6.4-6.3 13.3-12 20.4-17.1 1.6-1.2 3.8-.8 5 .9 1.1 1.6.9 3.8-.6 5.1-6.5 5.5-12.6 11.4-18.1 17.8-5.4 6.3-10.1 13.1-13.9 20.3-1 1.8-3.2 2.5-4.9 1.5l-3.6-2.1z" style="fill: rgb(41, 38, 100);"></path></g></g><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -1.11111s infinite normal forwards running breath-bd51d6b2-8380-4138-b059-097270229e31;"><path fill="#e15b64" d="M66.8 69c-1.8 1.1-4.1.5-5.2-1.3-3.7-6-8.5-11.5-13.8-16.6-5.4-5.2-11.4-9.9-17.7-14.4a3.82 3.82 0 0 1-1-5.2l.7-1.1c1.1-1.8 3.5-2.3 5.3-1.2 6.8 4.2 13.4 8.7 19.7 13.9 6.2 5.2 12.1 11.1 17 17.9 1.3 1.8.8 4.4-1.2 5.6L66.8 69z" style="fill: rgb(41, 38, 100);"></path></g></g></g></g></svg>
        </button>
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
              <span class="myCheckbox">同意<router-link to="/service" target="_blank" class="service">《用户协议》</router-link></span>
            </div>
          </Transition>
          <TransitionGroup name="list" tag="div" class="login-btn" :key="5">
            <button v-if="LoginStatus" type="button" class="right-button" @click="loginFunc">
              Log in
            </button>
            <button v-else class="left-button" @click="registerFunc">
              Register
            </button>
          </TransitionGroup>
        </TransitionGroup>
      </form>
    </div>
    <el-dialog v-model="centerDialogVisible" width="30%" align-center>
      <template #header>
        <span class="Dialog-header">{{ DialogTitle }}</span>
      </template>
      <div class="flex">
<!--        验证码-->
        <div v-if="DialogTitle == 'Get code'">
          <div class="flex" style="width: 100%">
            <img :src="'data:image/png;base64,' + preCode.base64"
                 style="cursor: pointer; height: 6vh; width: 30%; margin-right: 6%"
                 @click="getPreCodeFunc" />
            <input class="right-input loading-input" type="text" v-model="preCode.inputCode" placeholder="验证码"
                   style="margin-top: 0; width: 50%" />
          </div>
        </div>
<!--        忘记密码-->
        <div v-else style="width: 100%">
          <div class="flex">
            <input class="right-input loading-input" type="text" placeholder="邮箱地址" style="width: 70%"
                   v-model="form.email" />
            <div class="GetCode">
              <Transition name="Register" mode="out-in">
                <span v-if="true" @click="sendCode('Forget')">{{preCode.time==0?'发送验证码':preCode.time}}</span>
              </Transition>
            </div>
          </div>
          <input class="right-input loading-input" v-model="form.code" placeholder="验证码" />
          <input class="right-input loading-input" type="password" placeholder="新密码" v-model="form.password" />
        </div>
      </div>

      <template #footer>
        <button class="right-btn" @click="handleConfirm">确定</button>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
@import "@/assets/css/LoginPage.css";
</style>


