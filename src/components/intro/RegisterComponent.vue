<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:33:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-24 16:16:09
 * @FilePath: \RvcWeb\src\components\intro\RegisterComponent.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script lang="ts">
import { message } from "@/utils/message";
import { getCode, register, getPreCode } from '@/api/user/userApi'
import { EmailCodeForm, RegisterForm } from '@/api/user/userTypes'
import { defineComponent, ref } from "vue";
import { storage } from "@/utils/storage";

export default defineComponent({
  name: "register-page",
  data() {
    return {
      isChecked: false, // 初始化为未勾选
      hasSendCode: false,
      form: {
        email: '',
        code: '',
        password: '',
        repeatPassword: ''
      },
      preCode: {
        uuid: '',
        base64: '',
        inputCode: '',
        time: 60,
      },
      preCodeDisabled: false,
      centerDialogVisible: false
    };
  },
  methods: {
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
    handleComfirm() {
      if (this.preCode.inputCode == '') {
        message.warning('请输入图片验证码')
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let that = this
      let form = ref<EmailCodeForm>({
        email: this.form.email,
        type: 0,
        uuid: this.preCode.uuid,
        code: this.preCode.inputCode
      })
      getCode(form.value).then((res: any) => {
        if (res.code == 200) {
          message.success('发送成功')
          this.hasSendCode = true
          this.preCode.time = 60
          setTimeout(function () {
            that.hasSendCode = false
          }, 60000)
          this.centerDialogVisible = false
          message.success('注册成功')
        } else {
          message.error(res.msg)
        }

      })
    },
    registerFunc() {
      if ((this.form.password == '' || this.form.repeatPassword == '')) { message.warning('请输入密码'); return; }
      if (this.form.password != this.form.repeatPassword) { message.warning('两次密码输入不一致'); return; }
      if ((this.form.code == '')) { message.warning('请输入验证码'); return; }
      if (!this.isChecked) { message.warning('请先勾选同意用户协议'); return; }
      let form = ref<RegisterForm>({
        email: this.form.email,
        emailCode: this.form.code,
        password: this.form.password
      })
      register(form.value).then(res => {
        storage.set('token', res.data.token)
      })
    },
    checkEmain(email: string) {
      return /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email);
    },
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
    }
  },
  mounted() {
    let that = this
    setInterval(
      function () {
        if (that.preCode.time >= 0) {
          that.preCode.time--
        }
      }, 1000)
  }
});
</script>

<template>
  <div class="contain">
    <el-dialog v-model="centerDialogVisible" title="验证" width="300px" destroy-on-close center>
      <div>
        <img height="50" width="130" :src="'data:image/png;base64,' + preCode.base64" style="cursor: pointer;"
          @click="getPreCodeFunc">

      </div>
      <div>
        <input v-model="preCode.inputCode" placeholder="图片验证码" type="text" name="password" style="margin-top: 20px;"
          class="item-1" />

      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" style="color: rgba(96,98,102);" @click="handleComfirm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <form class="contain">
      <div class="center">
        <div class="item-box flex">
          <input v-model="form.email" placeholder="邮箱" type="email" name="email" class="item-2" />
          <div class="item-3" :style="{ transform: !hasSendCode ? 'rotateY(180deg)' : 'rotateY(0)' }">
            <button type="button" style="transform: rotateY(180deg) translateZ(1px);" @click="sendCode">发送验证码</button>
            <input v-model="form.code" placeholder="验证码" />
          </div>
        </div>
        <span style="position: absolute;right: -20px;top:15px" v-show="hasSendCode">
          {{ preCode.time }}
        </span>
        <div class="item-box flex">
          <input v-model="form.password" placeholder="密码" type="password" name="password" class="item-1" />
          <input v-model="form.repeatPassword" placeholder="确认密码" type="password" name="password" class="item-1" />
        </div>

      </div>
      <div class="bottom flex">
        <div class="forget flex">
          <input type="checkbox" v-model="isChecked" id="myCheckbox" />同意用户协议
        </div>
        <button type="button" @click="registerFunc()">注册</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.contain {
  height: 100%;
  width: 100%;
}

.item {
  width: 100%;
  height: 50px;
  background: #ffffff;
  margin-top: 13px;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px #dbddfd;
}

.item-box {
  justify-content: space-between;
  width: 100%;
  height: 50px;
  margin-top: 13px;
}

.item-1 {
  width: 48%;
  height: 50px;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px #dbddfd;
}

.item-2 {
  width: 75%;
  height: 50px;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px #dbddfd;
}

.item-3 {
  position: relative;
  width: 20%;
  height: 50px;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.5s;
  transform-style: preserve-3d;

  box-shadow: 1px 1px 5px #dbddfd;
}

.item-3 * {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  transition: all 0.5s;
}

.item-3 button:hover {
  cursor: pointer;
  box-shadow: 1px 1px 25px #dbddfd;

}



.center {
  position: relative;
  width: 100%;
  height: 80%;
}

input::placeholder {}

input {
  text-align: center;
  color: black;
  font-size: 16px;
  border: none;
  outline: none;
}

input {
  outline: none;
}

.bottom {
  justify-content: space-between;
  width: 100%;
  height: 20%;
}

button {
  width: 100px;
  height: 100%;
  border-radius: 50px;
  border: none;
  background: #ffffff;
  box-shadow: 1px 1px 5px #dbddfd;
}

.forget {
  text-decoration-line: underline;
  font-family: 宋体, serif;
  font-size: 15px;
  color: #8c8c8c;
}
</style>
