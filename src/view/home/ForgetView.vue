<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:33:46
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:45:48
 * @FilePath: \RvcWeb\src\view\home\LoginView.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div class="login flex">
    <div class="contain flex">
      <div class="left flex">
        <div class="title">No problem</div>
        <div class="discover">Retrieve password</div>
      </div>
      <div class="right">
        <div class="top flex">
          <div class="top-contain">
            <form class="contain">
              <div class="center">
                <input
                    placeholder="Email address"
                    type="email"
                    name="email"
                    class="item-1"
                    v-model="form.email"
                />
                <button type="button" class="item-2" @click="sendCode">发送验证码</button>
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    class="item-3"
                    v-model="form.code"
                />
              </div>
              <div class="bottom flex">
                <button type="button" @click="forgetFunc">确认</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  color: #000000;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.contain {
  height: 100%;
  width: 100%;
}
.item-1 {
  text-align: center;
  width: 70%;
  height: 50px;
  background: #ffffff;
  margin-top: 13px;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px #dbddfd;
  outline: none;
}
.item-2 {
  cursor: pointer;
  text-align: center;
  width: 28%;
  margin-left:2%;
  height: 50px;
  background: #ffffff;
  margin-top: 13px;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px #dbddfd;
  outline: none;
}
.item-3 {
  text-align: center;
  width: 100%;
  height: 50px;
  background: #ffffff;
  margin-top: 13px;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px #dbddfd;
  outline: none;
}
.center {
  width: 100%;
  height: 60%;
  margin-top: 10%;
}
.bottom {
  justify-content: space-between;
  width: 100%;
  height: 20%;
  button {
    width: 100%;
    height: 50px;
    border-radius: 50px;
    border: none;
    background: #e2c5f8;
    box-shadow: 2px 2px 5px #dbddfd;
    cursor: pointer;
    color:#ffffff;
    transition-duration: 0.3s;
  }
  button:hover {
    color: #050505;
    background: #ffffff;
  }
}

.forget {
  text-decoration-line: underline;
  font-family: 宋体, serif;
  font-size: 15px;
  color: #8c8c8c;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import "@/assets/css/Login.css";
import {message} from "@/utils/message.ts";
// import {ref} from "vue";
import {getPreCode} from "@/api/user/userApi.ts";
// import {storage} from "@/utils/storage.ts";
export default defineComponent({
  name: "login-page",
  data(){
    return{
      isChecked: false, // 初始化为未勾选
      hasSendCode: false,
      form: {
        email: '',
        code: '',
      },
      preCode: {
        uuid: '',
        base64: '',
        inputCode: '',
        time: 60,
      },
      preCodeDisabled: false,
      centerDialogVisible: false
    }
  },
  methods:{
    getPreCodeFunc() {
      if (this.preCodeDisabled) {
        return
      }
      this.preCodeDisabled = true
      getPreCode().then(res => {
        this.preCode.uuid = res.data.uuid
        this.preCode.base64 = res.data.base64
        this.preCodeDisabled = false
      })
    },
    sendCode() {
      if (this.form.email == '') {
        message.warning('请输入邮箱')
        return
      }
      if (!this.checkEmain(this.form.email)) {
        message.warning('邮箱格式错误')
        return
      }
      this.centerDialogVisible = true
      this.getPreCodeFunc()

    },
    checkEmain(email: string) {
      return /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email);
    },
    forgetFunc(){

    }
  }
});
</script>
