<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:33:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-08 14:19:48
 * @FilePath: \RvcWeb\src\components\intro\LoginComponent.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script lang="ts">
import { defineComponent, ref } from "vue";
import { LoginForm } from "@/api/user/userTypes";
import { login } from "@/api/user/userApi";
import { storage } from "@/utils/storage";
import { message } from "@/utils/message";
export default defineComponent({
  name: "login-page",
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginFunc() {
      let form = ref<LoginForm>({
        email: this.form.email,
        password: this.form.password
      })
      login(form.value).then((res: any) => {
        if (res.code == 200) {
          storage.remove('token')
          storage.set('token', res.data.token)
          message.success('登陆成功')
          setTimeout(()=>{
            this.$router.go(0)
          },4000)
        } else {
          message.error(res.msg)
        }
      })
    }
  },
  mounted(){
    if(storage.get<string>('token')!=''){
      this.$router.push('/rvc/posts')
    }
  }
});
</script>

<template>
  <div class="contain">
    <form class="contain">
      <div class="center">
        <input placeholder="Email address" type="email" name="email" class="item" v-model="form.email" />
        <input placeholder="password" type="password" name="password" class="item" v-model="form.password" />
      </div>
      <div class="bottom flex">
        <router-link to="/forget" class="forget flex">
          <p>忘记密码</p>
        </router-link>
        <button type="button" @click="loginFunc">登录</button>
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
  height: 80%;
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
  cursor: pointer;
}

.forget {
  text-decoration-line: underline;
  font-family: 宋体, serif;
  font-size: 15px;
  color: #8c8c8c;
}
</style>
