<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'login-page'
})
</script>

<template>
  <div class="contain">
    <form class="contain">
      <div class="center">
        <input placeholder="Email address" type="email" name="email" class="item">
        <input placeholder="password" type="password" name="password" class="item">
      </div>
      <div class="bottom flex">
        <div class="forget flex">忘记密码</div>
        <button>登录</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.flex{
  display: flex;
  align-items: center;
  justify-content: center;
}
.contain{
  height:100%;
  width:100%;
}
.item{
  width:100%;
  height: 50px;
  background: #ffffff;
  margin-top:13px;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px #dbddfd;
}
.item::placeholder{
  padding-left: 15px;
}
.center{
  width:100%;
  height:80%;
}
.bottom{
  justify-content: space-between;
  width:100%;
  height:20%;
}
button{
  width:100px;
  height:100%;
  border-radius: 50px;
  border: none;
  background: #ffffff;
  box-shadow: 1px 1px 5px #dbddfd;
}
.forget{
  text-decoration-line: underline;
  font-family: 宋体, serif;
  font-size:15px;
  color: #8c8c8c;
}
</style>