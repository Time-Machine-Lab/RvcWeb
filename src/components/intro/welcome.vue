<script setup lang="ts">

</script>

<template>
  <div class="welcome">
    <div class="welcome-back">
      <div class="overlay"></div>
    </div>
    <div class="welcome-card flex">
      <router-link to="/rvc" target="_blank" class="welcome-card__title flex"> 进入RVC </router-link>
      <div class="welcome-card__contain flex">
        RVC模型交流社区<br />2022-2023<br />一起探索声音变换的无限可能,你梦想的声音从现在开始!
      </div>
      <div class="welcome-card__btn flex">
        <router-link to="/login" target="_blank" class="welcome-card__register flex"> 立即注册 </router-link>
      </div>

    </div>

  </div>
</template>

<style scoped>
/*欢迎板块*/
.welcome {
  position: relative;
  top: 0;
  width: 100%;
  height: 500px;
  color: #ffffff;
  background: rgb(250, 242, 240);

  .welcome-back {
    position: absolute;
    left: -150px;
    height: 100%;
    width: 80%;
    background: url("https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg");
    background-size: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 500px;
    /* 调整为图片右侧的宽度 */
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgb(250, 242, 240));
    /* 渐变背景 */
  }

  .welcome-card {
    position: absolute;
    flex-direction: column;
    right: 1%;
    bottom: 20%;
    width: 500px;
    height: 400px;
    color: #383838;

    .welcome-card__title {
      background-image: url("https://s2.loli.net/2023/12/11/pckeYmvE9z2tHxu.gif");
      background-size: contain;
      text-decoration-line: none;
      width: 200px;
      height: 50%;
      font-weight: bold;
      cursor: pointer;
      color: #6b6b6b;
      font-size: 20px;
      transition-duration: 0.2s;
    }

    .welcome-card__title:hover {
      transform: scale(1.1);
      color: #181818;
    }

    .welcome-card__title img {
      height: 100%;
    }

    .welcome-card__contain {
      width: 100%;
      height: 30%;
      color: #868585;
    }

    .welcome-card__btn {
      width: 100%;
      height: 20%;

      .welcome-card__register {
        box-shadow: 4px 4px 1px #f9d0ce;
        background: #fce6e5;
        width: 150px;
        height: 50px;
        border-radius: 5px;
        cursor: pointer;
        text-decoration-line: none;
        color: #F4A5A0;
        transition-duration: .2s;
      }

      .welcome-card__register:hover {
        box-shadow: none;
        margin-top: 5px;
        margin-left: 5px;
      }
    }
  }

}

@media screen and (min-width:1200px) {
  .welcome {
    height: 700px;
  }
}</style>
