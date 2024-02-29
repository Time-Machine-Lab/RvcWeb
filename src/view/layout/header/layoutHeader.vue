<!--
 * @Author: Dhx
 * @Date: 2023-11-30 18:48:48
 * @Description: 导航栏
 * @FilePath: \RvcWeb\src\view\layout\header\layoutHeader.vue
-->
<script lang="ts" setup>
import userStatus from "@/components/user/userStatus.vue"
import searchComponent from "@/components/common/searchComponent.vue"
import { ref } from "vue";
import router from "@/router";
let clickBell = ref(false)
let msgVisibility = ref(false)
let clickSelect = ref(false)
let selectVisibility = ref(false)
let routes = ref([{ name: '新建贴子', to: '/newPost', svg: '<svg t="1709125003011" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1293" width="25" height="25"><path d="M287 962h530.35714248c45 0 80.35714248-35.35714248 80.35714336-80.35714248V576.28571416H158.42857168v257.14285752c0 70.71428584 57.85714248 128.57142832 128.57142832 128.57142832z" fill="#BAE7FF" p-id="1294"></path><path d="M647 962H238.78571416C193.78571416 962 158.42857168 926.64285752 158.42857168 881.64285752v-739.28571504C158.42857168 97.35714248 193.78571416 62 238.78571416 62h575.35714336C862.35714248 62 897.71428584 97.35714248 897.71428584 142.35714248v572.14285752L647 962z" fill="#69C0FF" p-id="1295"></path><path d="M650.21428584 962v-186.42857168c0-32.14285752 25.71428584-61.07142832 61.07142832-61.07142832H897.71428584L650.21428584 962z" fill="#1890FF" p-id="1296"></path><path d="M319.14285752 640.57142832h417.85714248c19.28571416 0 32.14285752-12.85714248 32.14285752-32.14285664s-12.85714248-32.14285752-32.14285752-32.14285752H319.14285752c-19.28571416 0-32.14285752 12.85714248-32.14285752 32.14285752s12.85714248 32.14285752 32.14285752 32.14285664zM576.28571416 479.85714248h160.71428584c19.28571416 0 32.14285752-12.85714248 32.14285752-32.14285664s-12.85714248-32.14285752-32.14285752-32.14285752h-160.71428584c-19.28571416 0-32.14285752 12.85714248-32.14285664 32.14285752s12.85714248 32.14285752 32.14285664 32.14285664z" fill="#BAE7FF" p-id="1297"></path><path d="M319.14285752 479.85714248h128.57142832c19.28571416 0 32.14285752-12.85714248 32.14285664-32.14285664V287c0-19.28571416-12.85714248-32.14285752-32.14285664-32.14285752H319.14285752c-19.28571416 0-32.14285752 12.85714248-32.14285752 32.14285752v160.71428584c0 19.28571416 12.85714248 32.14285752 32.14285752 32.14285664z" fill="#BAE7FF" p-id="1298"></path><path d="M576.28571416 319.14285752h160.71428584c19.28571416 0 32.14285752-12.85714248 32.14285752-32.14285752s-12.85714248-32.14285752-32.14285752-32.14285752h-160.71428584c-19.28571416 0-32.14285752 12.85714248-32.14285664 32.14285752s12.85714248 32.14285752 32.14285664 32.14285752z" fill="#BAE7FF" p-id="1299"></path></svg>' },
{ name: '新建模型', to: '/newModel', svg: '<svg t="1709124894427" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3497" width="25" height="25"><path d="M154.68661162 328.42831573l-1.28709316 0.64354657v364.89095508l357.81194092 188.23739678V506.36896719L154.68661162 328.42831573z" fill="#FFFFFF" p-id="3498"></path><path d="M868.37985459 328.75008945L511.21145938 140.83446552 168.52286445 321.02752959l-13.83625283 7.40078613 356.52484775 177.94065147 4.18305323-1.93064063 353.95066143-175.04469052V329.0718623l-0.96531944-0.32177285zM515.3945126 504.43832656l-4.18305323 1.93064063 4.18305323-1.93064063z" fill="#91D5FF" p-id="3499"></path><path d="M939.8135331 294.32034336a59.84983916 59.84983916 0 0 0-25.42009307-26.70718623L538.56219219 68.75723955a58.88451885 58.88451885 0 0 0-54.70146563 0L108.35125244 266.32606396a58.24097227 58.24097227 0 0 0-15.44511973 13.83625284 64.35466612 64.35466612 0 0 0-9.65320049 12.54915966 59.84983916 59.84983916 0 0 0-6.43546581 25.7418668v386.12799405a59.20629258 59.20629258 0 0 0 32.17733261 52.1272793l375.50947413 197.56882352a59.20629258 59.20629258 0 0 0 26.70718622 7.72255987h4.50482696a56.31033252 56.31033252 0 0 0 22.84590586-6.11369297l375.509475-197.56882441a59.20629258 59.20629258 0 0 0 32.17733261-52.12727842V318.45334326a56.63210625 56.63210625 0 0 0-6.4354667-24.1329999z m-70.46835908 35.07329268l-353.95066142 175.04469052-4.18305323 2.25241348v375.50947412L153.07774472 693.96281739V329.0718623l13.83625284-7.40078613 344.29746182-180.83661064 357.16839521 187.91562392z" fill="#40A9FF" p-id="3500"></path></svg>' }])
const handleClickSort = function () {
  clickBell.value = true
  msgVisibility.value = !msgVisibility.value
  setTimeout(function () {
    clickBell.value = false
  }, 200)
}
const handleClickSelect = function () {
  clickSelect.value = true
  selectVisibility.value = !selectVisibility.value
  setTimeout(function () {
    clickSelect.value = false
  }, 500)
}
const handleBlur = function () {
  setTimeout(function () {
    msgVisibility.value = false
    selectVisibility.value = false
  }, 200)
}

</script>
<template>
  <div class="header flex">
    <!--    RVC标志，可以跳转到首页-->
    <RouterLink to="/" class="logo">
      <img src="/logo/rvc.png">
    </RouterLink>
    <!--    切换分区-->
    <div class="header__link flex">
      <div class="header__link__item" :style="{
        backgroundColor: $router.currentRoute.value.path == '/rvc/posts' ? 'rgba(255,255,255,0.1)' : 'transparent',
        boxShadow: $router.currentRoute.value.path == '/rvc/posts' ? '2px 2px 1px 1px black' : ''
      }">
        <router-link to="/rvc/posts" style="display: block;height: 100%;width: 100%;">
          <span class="img_back"
            :style="{ backgroundColor: $router.currentRoute.value.path == '/rvc/posts' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
            <img width="12" height="12" src="/icon/post.svg" class="vh-center">
          </span>
          <span class="tab">交流</span>
        </router-link>
      </div>
      <div class="header__link__item" :style="{
        backgroundColor: $router.currentRoute.value.path == '/rvc/models' ? 'rgba(255,255,255,0.1)' : 'transparent',
        boxShadow: $router.currentRoute.value.path == '/rvc/models' ? '2px 2px 1px 1px black' : ''
      }">
        <router-link to="/rvc/models" style="display: block;height: 100%;width: 100%;">
          <span class="img_back"
            :style="{ backgroundColor: $router.currentRoute.value.path == '/rvc/models' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
            <img width="12" height="12" src="/icon/model.svg" class="vh-center">
          </span>
          <span class="tab">模型</span>
        </router-link>
      </div>
      <div class="header__link__item" :style="{
        backgroundColor: $router.currentRoute.value.path == '/feedback' ? 'rgba(255,255,255,0.1)' : 'transparent',
        boxShadow: $router.currentRoute.value.path == '/feedback' ? '2px 2px 1px 1px black' : ''
      }">
        <router-link to="/feedback" style="display: block;height: 100%;width: 100%;">
          <span class="img_back"
            :style="{ backgroundColor: $router.currentRoute.value.path == '/feedback' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
            <img width="12" height="12" src="/icon/bulb.svg" class="vh-center">
          </span>

          <span class="tab">反馈</span>
        </router-link>
      </div>
    </div>
    <!--    搜索栏-->
    <div class="search flex">
      <searchComponent></searchComponent>
    </div>
    <!--    用户中心-->
    <div class="header__right">
      <div class="button-group">
        <router-link to="/rvc/chat" style="display: block;height: 100%;width: 50px;">
          <span style="font-size: 20px;color:red;line-height: 70px;">
            🔞
          </span>
        </router-link>
        <div tabindex="-1" class="new" @click="handleClickSelect" @blur="handleBlur">
          <img width="30" height="30" src="/icon/plus.svg" style="position:absolute;left:0;transition: all 0.3s;"
            :class="selectVisibility ? 'roll-animation' : ''">
        </div>
        <div class="select-window" v-show="selectVisibility">
          <div class="select-window__item" v-for="(route, index) in routes" :key="index" @click="router.push(route.to)">

            <div class="horizontal-center" style="display: flex;">
              <img width="10" height="10" class="vertical-center" src="/icon/write.svg">
              <span style="line-height: 40px;margin-left: 15px;margin-right: 7px;">{{ route.name }}</span>

            </div>
            <!--        新建按钮-->
            <div class="new flex">
              <div tabindex="-1" class="new-btn" @click="handleClickSelect" @blur="handleBlur">
                <img src="/icon/plus.svg">
              </div>
              <div class="select-window" v-show="selectVisibility">
                <div class="select-window__item flex" v-for="(route, index) in routes" :key="index"
                  @click="router.push(route.to)">
                  <div v-html="route.svg"></div>
                  <span>{{ route.name }}</span>
                </div>
              </div>
            </div>
            <!--        通知按钮-->
            <div class="notice flex">
              <div tabindex="-1" @click="handleClickSort" @blur="handleBlur" class="notice-btn">
                <img src="/icon/bell.svg">
              </div>
              <div class="msg-window" v-show="msgVisibility">
                <div class="msg-window__title">
                  <svg t="1709128794905" class="icon" viewBox="0 0 1061 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1452" width="25" height="25">
                    <path
                      d="M195.33333359 162.0000002h666.66666622a133.33333359 133.33333359 0 0 1 133.33333359 133.33333271v583.3333336a83.33333349 83.33333349 0 0 1-83.3333335 83.33333349H195.33333359a133.33333359 133.33333359 0 0 1-133.33333359-133.33333359V295.33333291a133.33333359 133.33333359 0 0 1 133.33333359-133.33333271z"
                      fill="#BAE7FF" p-id="1453"></path>
                    <path
                      d="M195.33333359 162.0000002h666.66666622a133.33333359 133.33333359 0 0 1 133.33333359 133.33333271v416.66666748l-133.33333359 120.33333281-1.99999952 2.00000039L728.66666709 962H195.33333359a133.33333359 133.33333359 0 0 1-133.33333359-133.33333359V295.33333291a133.33333359 133.33333359 0 0 1 133.33333359-133.33333271z"
                      fill="#1890FF" p-id="1454"></path>
                    <path
                      d="M195.33333359 162.0000002h666.66666622a133.33333359 133.33333359 0 0 1 133.33333359 133.33333271v416.66666748h-182.3333335a83.33333349 83.33333349 0 0 0-83.33333349 83.33333261v166.666667H195.33333359a133.33333359 133.33333359 0 0 1-133.33333359-133.33333359V295.33333291a133.33333359 133.33333359 0 0 1 133.33333359-133.33333271z"
                      fill="#69C0FF" p-id="1455"></path>
                    <path
                      d="M361.99999971 62a33.33333339 33.33333339 0 0 1 33.33333339 33.33333339v152.33333292a33.33333339 33.33333339 0 0 1-33.33333339 33.3333334 33.33333339 33.33333339 0 0 1-33.3333334-33.3333334V95.3333334a33.33333339 33.33333339 0 0 1 33.3333334-33.3333334zM695.33333369 62a33.33333339 33.33333339 0 0 1 33.3333334 33.33333339v152.33333292a33.33333339 33.33333339 0 0 1-33.3333334 33.3333334 33.33333339 33.33333339 0 0 1-33.3333334-33.3333334V95.3333334a33.33333339 33.33333339 0 0 1 33.3333334-33.3333334z"
                      fill="#BAE7FF" p-id="1456"></path>
                    <path
                      d="M345.33333301 495.3333333m-50.0000001 0a50.0000001 50.0000001 0 1 0 100.00000019 0 50.0000001 50.0000001 0 1 0-100.00000019 0Z"
                      fill="#BAE7FF" p-id="1457"></path>
                    <path
                      d="M528.6666667 461.9999999h200.00000039a33.33333339 33.33333339 0 0 1 33.33333252 33.3333334 33.33333339 33.33333339 0 0 1-33.33333252 33.3333334h-200.00000039a33.33333339 33.33333339 0 0 1-33.3333334-33.3333334 33.33333339 33.33333339 0 0 1 33.3333334-33.3333334zM528.6666667 628.6666669h200.00000039a33.33333339 33.33333339 0 0 1 33.33333252 33.33333339 33.33333339 33.33333339 0 0 1-33.33333252 33.3333334h-200.00000039a33.33333339 33.33333339 0 0 1-33.3333334-33.3333334 33.33333339 33.33333339 0 0 1 33.3333334-33.33333339z"
                      fill="#BAE7FF" p-id="1458"></path>
                    <path
                      d="M345.33333301 662.00000029m-50.0000001 0a50.0000001 50.0000001 0 1 0 100.00000019 0 50.0000001 50.0000001 0 1 0-100.00000019 0Z"
                      fill="#BAE7FF" p-id="1459"></path>
                  </svg>
                  <span>通知</span>
                </div>
                <div class="msg-window__content">
                  <div class="msg-window__content__item ">
                    <span class="scroll-text">欢迎来到RVC！--2023/12/31</span>
                  </div>
                  <div class="msg-window__content__item ">
                    <span class="scroll-text">欢迎来到RVC！--2023/12/31</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--      用户菜单组件-->
          <div class="user-status">
            <userStatus></userStatus>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  position: relative;
  width: 100vw;
  height: 70px;
  background-color: rgba(26, 27, 30);
  flex-direction: row;
  z-index: 20;
  border-bottom: rgba(255, 255, 255, 0.1) 1px solid;
}

.logo {
  height: 80%;
  width: 10%;
  cursor: pointer;

  img {
    height: 100%;
  }
}

.header__link {
  width: 30%;
  height: 80%;

  .header__link__item {
    position: relative;
    height: 40px;
    width: 80px;
    padding: 0 8px;
    cursor: pointer;
    border-radius: 5px;
  }
}

.search {
  height: 80%;
  width: 30%;
}

.header__right {
  height: 80%;
  width: 30%;
  display: flex;
  justify-content: right;

  .button-group {
    height: 100%;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: right;

    .new {
      position: relative;

      .new-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        transition: all 0.3s;

        img {
          background-color: rgba(25, 113, 194);
          width: 30px;
          height: 30px;
          border-radius: 10px;
          cursor: pointer;
        }

        img:hover {
          background-color: rgba(24, 100, 171);
        }
      }

      .select-window {
        position: absolute;
        top: 40px;
        width: 160px;
        border-radius: 5px;
        border: rgb(86, 87, 89) 1px solid;
        box-shadow: #000000 2px 2px 10px;
        background-color: rgb(39, 40, 44);
        padding: 5px;

        .select-window__item {
          position: relative;
          width: 100%;
          height: 50px;
          font-size: 17px;
          font-family: ZCool;
          border-radius: 5px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          margin-bottom: 5px;
          margin-top: 5px;

          span {
            margin-bottom: 5px;
            margin-left: 20px;
          }
        }

        .select-window__item:hover {
          background-color: rgba(56, 58, 64);
        }
      }
    }

    .notice {
      position: relative;

      .notice-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 100%;

        img {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          cursor: pointer;
        }
      }

      .msg-window {
        position: absolute;
        top: 40px;
        width: 250px;
        border-radius: 5px;
        border: rgb(86, 87, 89) 1px solid;
        box-shadow: #000000 2px 2px 10px;
        background-color: rgb(39, 40, 44);
        padding: 5px 10px;

        .msg-window__title {
          display: flex;
          align-items: center;
          width: 100%;
          height: 45px;
          border-bottom: rgba(55, 58, 64) 1px solid;
          font-size: 16px;
          text-align: left;
          color: rgba(255, 255, 255, 0.7);
          font-family: 'ZCool';
          margin-left: 10px;

          span {
            padding-left: 10px;
          }
        }

        .msg-window__content {
          width: 100%;

          .msg-window__content__item {
            position: relative;
            width: 100%;
            height: 40px;
            font-size: 14px;
            font-family: ZCool;
            border-radius: 5px;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            margin-bottom: 5px;
            margin-top: 5px;
            overflow: hidden;

            span {
              display: flex;
              align-items: center;
            }
          }

          .msg-window__content__item:hover {
            background-color: rgba(56, 58, 64);
          }
        }
      }
    }
  }

  .user-status {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 30%;
    border-left: rgba(255, 255, 255, 0.1) 1px solid;
  }
}

.img_back {
  position: relative;
  display: block;
  top: 50%;
  transform: translate(0, -50%);
  height: 30px;
  width: 30px;
  margin-left: 10px;
  border-radius: 5px;
}

.header__link__item span {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  margin-left: 3px;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1);
  font-family: 'ZCool';
}

.header__link__item span:hover {
  color: rgba(255, 255, 255, 1);
}


.bell {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  width: 25px;
  height: 25px;
  margin-left: 15px;
  cursor: pointer;
}

.dither-animation {
  top: 36px;
}

.bell__point {
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: rgba(224, 49, 49);
  top: 1px;
  right: 1px;
}

.msg-window {
  position: absolute;
  top: 65px;
  width: 250px;
  border-radius: 5px;
  border: rgba(55, 58, 64) 1px solid;
  background-color: rgba(37, 38, 43);
  user-select: none;
}

.msg-window__title {
  width: 100%;
  height: 45px;
  border-bottom: rgba(55, 58, 64) 1px solid;
  font-size: 14px;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
  line-height: 45px;
  font-family: 'ZCool';
}

.msg-window__title span {
  padding-left: 15px;
}

.msg-window__content {
  width: calc(100% - 10px);
  padding: 5px;
}

.msg-window__content__item {
  position: relative;
  padding-left: 15px;
  overflow: hidden;
  width: calc(100% - 15px);
  /* height: 80px; */
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  display: flex;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-family: 'ZCool';
}

.msg-window__content__item:hover {
  background-color: rgba(56, 58, 64);
}


.msg-window__item:hover {
  background-color: rgba(56, 58, 64);
  cursor: pointer;
}

.newPost:hover {
  background-color: rgba(26, 52, 76);
}

.search {
  position: relative;
  height: 100%;
  width: 40%;
}

.header__right {
  position: absolute;
  width: calc(30% - 500px);
  right: 0;
  min-width: 300px;
  height: 100%;
  display: flex;
  justify-content: right;
}

.button-group {
  position: absolute;
  height: 100%;
  /* width: 70%; */
  width: 400px;
  right: 120px;
  display: flex;
  justify-content: end;
}

.new {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  background-color: rgba(25, 113, 194);
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: black;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
}

.new span {
  display: inline-block;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 30px;
  position: relative;
  text-align: center;
}

.new:hover {
  background-color: rgba(24, 100, 171);
}

.select-window {
  position: absolute;
  top: 60px;
  right: 10px;
  width: 120px;
  border-radius: 10px;
  border: rgba(55, 58, 64) 1px solid;
  background-color: rgba(37, 38, 43);
  padding: 5px;
  z-index: 30;
  user-select: none;
}

.select-window__item {
  position: relative;
  padding-left: 15px;
  width: calc(100% - 0px);
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  display: flex;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.select-window__item:hover {
  background-color: rgba(56, 58, 64);
}

.user-status {
  position: relative;
  height: 100%;
  width: 30%;
  min-width: 80px;
  margin-right: 10px;
}

.page-link {
  position: relative;
  height: 100%;
  display: flex;
}

.page-link__item {
  height: 100%;
  width: 80px;
  line-height: 50px;
  color: #fb7299;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  font-family: 'Zcool';
  text-align: center;
}

.roll-animation {
  transform: rotateZ(90deg);
  transform-origin: 52% 50%;
}
</style>
