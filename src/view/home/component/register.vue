<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'register-page',
  data() {
    return {
      isChecked: false, // 初始化为未勾选
    }
  },
})
</script>

<template>
  <div class="contain">
    <form class="contain">
      <div class="center">
        <input placeholder="Email address" type="email" name="email" class="item">
        <div class="item-box flex">
          <input placeholder="password" type="password" name="password" class="item-1">
          <input placeholder="confirm password" type="password" name="password" class="item-1">
        </div>

      </div>
      <div class="bottom flex">
        <div class="forget flex">
          <input type="checkbox" v-model="isChecked" id="myCheckbox">同意用户协议
        </div>
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
  width:99%;
  height: 50px;
  background: #ffffff;
  margin-top:13px;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px #dbddfd;
}
.item-box{
  justify-content: space-between;
  width:100%;
  height: 50px;
  margin-top:13px;
}
.item-1{
  width:48%;
  height: 50px;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px #dbddfd;
}
.item::placeholder{
  padding-left: 15px;
}
.item-1::placeholder{
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