<!--
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:33:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-24 17:15:27
 * @FilePath: \RvcWeb\src\view\home\LoginView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script lang="ts">
import { defineComponent } from "vue";
import "@/assets/css/Login.css";
export default defineComponent({
  name: "login-home",
  data() {
    return {
      loginClicked: true,
      registerClicked: false,
    };
  },
  methods: {
    login() {
      // 处理登录逻辑
      this.loginClicked = true;
      this.registerClicked = false;
    },
    register() {
      // 处理注册逻辑
      this.registerClicked = true;
      this.loginClicked = false;
    },
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
        <div class="top flex">
          <div class="top-contain">
            <div class="head flex">
              <router-link
                to="/login/login-page"
                class="login-title flex"
                @click="login()"
              >
                <div :class="{ active: $router.currentRoute.value.path == '/login/login-page'?'active':'' }">登录</div>
              </router-link>
              <router-link
                to="/login/register"
                class="login-title flex"
                @click="register()"
              >
                <div :class="{  active: $router.currentRoute.value.path == '/login/register'?'active':'' }">注册</div>
              </router-link>
            </div>
            <div class="center">
              <router-view></router-view>
            </div>
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
</style>

