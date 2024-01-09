<script setup lang="ts">
import '@/assets/css/Feedback/FeedbackComponent.css'
import FeedBackComponent from "@/components/feedback/FeedBackComponent.vue";
import NewFeedback from '@/components/feedback/NewFeedbackComponent.vue'
import UpdateComponent from "@/components/feedback/UpdateComponent.vue";
import {onMounted, ref} from 'vue'
import {
  FeedbackItem,
  ListItems,
  StatesListItem,
  TypeListItem
} from '@/api/feedback/feedbackTypes.ts'
import {getList, getStatusList, getTypeList} from "@/api/feedback/feedbackAPI.ts";
import { computed } from 'vue'
import {storage} from "@/utils/storage.ts";


// 创建帖子弹窗的打开关闭
const isChildComponentVisible = ref(false);
const closeChildComponent = () => {
  isChildComponentVisible.value = false;
};
const openNew = () => {
  isChildComponentVisible.value = true;
};

// 帖子详情弹窗
const selectedItem = ref(0)
const isOpen = ref(false);
const closeFeedbackComponent = () => {
  isOpen.value = false;
};
const openFeedback = (id:any) => {
  isOpen.value = true;
  selectedItem.value = id
};

// 编辑帖子的弹窗
const update = ref(0)
const isUpdate = ref(false)
const openUpdate = (id:any) => {
  isUpdate.value = true;
  update.value = id
};
const closeUpdateComponent = () => {
  isUpdate.value = false;
};

// 数据获取
const Type = ref<TypeListItem[]>([{id:1,type:"所有"},{id:2,type:"功能请求"},{id:3,type:"bug"}])
const States = ref<StatesListItem[]>([])
const ListItems = ref<ListItems>(<ListItems>{page: 1, limit: 6, pageList: [{avatar: "",createAt:"2023-12-12 16:48:11",title:"111"}], total: 9})
let Feedback = ref<FeedbackItem[]>([])
const uid = storage.get<string>('uid')

const getData = () => {
  // 获取反馈帖子的所有类型
  getTypeList().then((res: any) => {
    console.log(res);
    Type.value = res.data.list;
  });
  // 获取反馈帖子的状态列表
  getStatusList().then((res: any) => {
    console.log(res);
    States.value = res.data.list;
  });
}

// 分页获取feedback列表
let loading = ref(true)
let noMore = ref(false)
const disabled = computed(() => loading.value || noMore.value)
ListItems.value.page = 1;
let order = ""
// 排序方法
const bgColor1 = ref('');
const bgColor2 = ref('');
const orderNew = () => {
  order = "create_at"
  bgColor1.value = '#8f8f8f';
  bgColor2.value = '';
  Feedback = ref<FeedbackItem[]>([])
  ListItems.value.page = 1
  loading.value = true
  noMore.value = false
  load()
}
const orderHot = () => {
  order = "up_num"
  bgColor2.value = '#8f8f8f';
  bgColor1.value = '';
  Feedback = ref<FeedbackItem[]>([])
  ListItems.value.page = 1
  loading.value = true
  noMore.value = false
  load()
}

const load = () => {
  loading.value = true
  setTimeout(() => {
    if (Feedback.value.length < ListItems.value.total) {
      // 获取分页信息
      getList(ListItems.value.page, ListItems.value.limit, order)
        .then((res: any) => {
          console.log(res)
          // 更新总数
          ListItems.value = res.data
          // 更新列表
          Feedback.value = Feedback.value.concat(ListItems.value.pageList)
          ListItems.value.page += 1
        })
        .finally(() => {
          loading.value = false
        })
    }
    else{
      // 如果当前总数超过或等于总数，停止获取
      console.log("已获取所有数据")
      loading.value = false
      noMore.value = true
    }
  }, 500);
};

onMounted(() => {
  getData()
  load()
});
</script>

<template>
  <div class="home">
    <!--打开帖子详情-->
    <FeedBackComponent :data="selectedItem" v-if="isOpen" @close="closeFeedbackComponent"></FeedBackComponent>
    <!--创建新帖子-->
    <NewFeedback v-if="isChildComponentVisible " @close="closeChildComponent"></NewFeedback>
    <UpdateComponent :data="update"  v-if="isUpdate " @close="closeUpdateComponent"></UpdateComponent>
    <!--反馈类型选项卡-->
    <div class="contain-choice">
      <div class="contain-choice__box flex">
        <div class="choice-item flex"><h3 style="color:#cccccc">社区开发建议</h3></div>
      </div>
    </div>
    <div class="contain flex">
        <div class="contain-say flex">
          <h3 style="margin-bottom: 10px;color:#ffffff">有话要说吗？</h3>
          <p style="color:#ffffff">告诉 RVC 他们如何使产品对您更有用。</p>
        </div>
        <!--排序-->
        <div class="contain-search flex">
          <button @click="orderNew" :style="{ backgroundColor: bgColor1 }" class="contain-search__item flex">
            <svg t="1703268766158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4201" width="20" height="20"><path d="M10.432 1024.064L6.4-0.128h935.872v1023.936l-468.544-245.696-463.296 245.952z m462.912-365.76l362.944 190.208V105.856H112.832l2.88 742.336 357.632-189.888z" fill="#F98064" p-id="4202"></path><path d="M199.104 304.704h46.528l47.296 90.944 18.624 42.176h1.28c-2.56-20.224-6.144-47.552-6.144-70.272v-62.848h43.392v190.08h-46.464l-47.04-91.712-18.624-41.728h-1.28c2.048 21.248 5.888 47.296 5.888 70.336v63.104h-43.456v-190.08zM394.176 304.704h120.64v37.76h-74.88v35.264h63.616v38.336h-63.616v40.384h77.696v38.336H394.176v-190.08zM536.64 304.704h46.72l12.032 86.592 7.68 60.288h1.024c3.648-20.16 7.424-40.64 11.264-60.288l19.392-86.592h38.4l19.968 86.592c3.84 19.392 7.104 39.872 10.944 60.288h1.344c2.304-20.416 4.8-40.64 7.104-60.288l12.288-86.592h43.392l-32.96 190.08h-57.472l-17.28-82.752a524.992 524.992 0 0 1-7.36-44.16h-1.28c-2.304 14.272-4.608 29.568-7.424 44.16L627.84 494.784h-56.448l-34.752-190.08z" fill="#FC632D" p-id="4203"></path></svg>
            <p>最新</p>
          </button>
          <button @click="orderHot" :style="{ backgroundColor: bgColor2 }" class="contain-search__item flex">
            <svg t="1703269076529" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5247" width="20" height="20"><path d="M383.278 54.764l-0.246 0.107-0.02 0.143 0.215-0.21 0.051-0.04z m0 0c0.164-0.072 0.092-0.062 0 0z m134.17 497.658c-19.139 0-34.228 7.122-45.21 21.32-11.013 14.208-16.502 32.6-16.502 55.199 0 22.287 5.371 40.504 16.108 54.666 10.772 14.152 25.508 21.238 44.267 21.238 19.134 0 34.053-6.79 44.693-20.347 10.644-13.578 15.974-31.8 15.974-54.697 0-23.854-5.181-42.732-15.544-56.597-10.337-13.86-24.965-20.782-43.786-20.782z" fill="#d81e06" p-id="5248"></path><path d="M945.536 323.548c-0.108-1.172-0.538-2.304-1.137-4.787-18.365 37.171-42.608 67.497-78.213 87.245-35.82 19.87-74.004 25.334-114.468 18.253 0.246-1.926 0.241-2.709 0.451-3.436 4.797-16.68 10.132-33.224 14.336-50.048 14.827-59.428 22.671-119.68 19.02-181.028-3.148-52.649-14.893-102.978-43.145-148.342-6.641-10.66-14.464-20.587-22.063-31.293-2.186 2.514-3.435 3.763-4.46 5.161-24.462 33.316-48.086 67.297-73.538 99.835-41.118 52.541-86.364 101.31-138.567 143.196-27.403 21.975-56.162 41.846-89.073 54.902-11.873 4.71-13.747 4.198-21.903-5.76-3.088-3.763-6.293-7.721-8.126-12.135-4.572-10.977-9.482-22-12.283-33.49-8.77-35.988-8.105-72.617-3.85-109.03 3.835-32.85 9.626-65.46 14.5-97.777-59.264 56.689-114.273 117.126-162.611 183.537-31.565 43.366-59.756 88.786-83.446 136.878-22.85 46.408-40.888 94.684-51.87 145.372-10.164 46.935-15.064 94.26-5.52 141.88 26.696 133.223 101.32 229.863 223.35 289.409 36.946 18.027 75.796 31.088 116.178 39.608 102.87 21.709 198.108 0.497 284.702-55.818 73.319-47.678 125.707-115.64 167.092-192.092 14.269-26.348 26.234-53.75 36.459-81.946a670.525 670.525 0 0 0 25.477-88.817c17.582-82.462 20.383-165.703 12.708-249.477z m-581.55 419.646h-48.84v-94.587h-97.664v94.587h-48.834V513.946h48.834v92.492h97.67v-92.492h48.839v229.248z m232.852-29.379c-20.787 22.226-47.984 33.357-81.618 33.357-32.86 0-59.53-10.783-80.056-32.328-20.516-21.55-30.776-49.305-30.776-83.23 0-35.922 10.47-65.153 31.442-87.711 20.961-22.523 48.65-33.803 83.087-33.803 32.743 0 59.12 10.911 79.104 32.717 19.994 21.806 29.967 49.803 29.967 84.045 0 35.707-10.378 64.712-31.15 86.953z m230.185-159.908H761.62V743.2h-48.983V553.907h-65.264v-39.961h179.65v39.961z" fill="#d81e06" p-id="5249"></path></svg>
            <p>最热</p>
          </button>
          <button @click="openNew" class="contain-search__item flex">
            <svg t="1703269152500" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6349" width="20" height="20"><path d="M946.8 217.2c-1.6-18.1-10.1-34.5-24-46.2L818.6 83.6c-13.9-11.7-31.6-17.2-49.7-15.7-18.1 1.6-34.5 10.1-46.2 24L402.4 473.8s0 0.1-0.1 0.1c-0.4 0.5-0.9 1.1-1.3 1.6-0.1 0.1-0.2 0.3-0.3 0.5-0.3 0.5-0.7 0.9-1 1.4-0.1 0.1-0.2 0.3-0.3 0.4-1.2 1.9-2.2 3.9-3 6v0.1c-0.8 2.2-1.5 4.4-1.9 6.7v0.1l-34.4 196.1c-2.2 12.6 2.5 25.5 12.3 33.8 6.6 5.5 14.8 8.5 23.2 8.5 4.1 0 8.2-0.7 12.2-2.1l187.7-67.5c0.1 0 0.1-0.1 0.2-0.1 0.6-0.2 1.3-0.5 1.9-0.8 0.1 0 0.1-0.1 0.2-0.1 2.1-0.9 4.1-2.1 6.1-3.4 0.1 0 0.1-0.1 0.2-0.1 0.5-0.4 1.1-0.8 1.6-1.2 0.1-0.1 0.2-0.2 0.4-0.3 0.4-0.4 0.9-0.7 1.3-1.1l0.4-0.4c0.4-0.4 0.8-0.8 1.2-1.1l0.4-0.4c0.4-0.4 0.8-0.9 1.2-1.3l0.3-0.3 320.4-381.8c11.5-14.2 17.1-31.8 15.5-49.9z m-368 357.6l-98.1-82.3 217.8-259.6 98.1 82.3-217.8 259.6z m-137.1 63.4l12.9-73.5 34.7 29.1 22.8 19.1-70.4 25.3z m401.2-378.1l-98.1-82.3 30.6-36.5 98.1 82.3-30.6 36.5z" fill="#1296db" p-id="6350"></path><path d="M835 519.1c-19.9 0-36 16.1-36 36v330.2H188.4V160.9h330.3c19.9 0 36-16.1 36-36s-16.1-36-36-36H187.9c-39.5 0-71.6 32.1-71.6 71.6v725.3c0 39.5 32.1 71.6 71.6 71.6h611.5c39.5 0 71.6-32.1 71.6-71.6V555.1c0-19.9-16.1-36-36-36z" fill="#1296db" p-id="6351"></path></svg>
            <p>创建新帖子</p>
          </button>
        </div>
        <!--帖子列表-->
        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
            <li  v-for="(item, index) in Feedback" :key="index" class="contain-invitation__item flex">
              <button class="update flex" v-if="item.uid == uid" @click="openUpdate(item.fbid)">
                <svg t="1703683064760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2361" width="30" height="30"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z" fill="#dbdbdb" p-id="2362"></path><path d="M512 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z" fill="#dbdbdb" p-id="2363"></path><path d="M341.333333 512m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" fill="#dbdbdb" p-id="2364"></path><path d="M682.666667 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" fill="#dbdbdb" p-id="2365"></path></svg>
              </button>
              <!--用于判断是否展示-->
<!--              <div v-if="item.hasShow" style="width:100%">-->
              <div style="width:100%" @click="openFeedback(item.fbid)">
                <!--帖子上部信息-->
                <div class="invitation__outline">
                  <div class="status flex">
                    <p>{{item.statusName}}</p>
                    <p>{{item.typeName}}</p>
                  </div>
                  <h3 style="margin-top:10px">{{item.title}}</h3>
                  <div class="invitation__text" v-html="item.content"></div>
                </div>
                <!--帖子底部信息-->
                <div class="invitation__message flex">
                  <div style="width:40%;" class="flex">
                    <!--帖子作者-->
                    <div class="invitation__edit flex">
                      <div class="img">
                        <img :src=item.avatar>
                      </div>
                      <div class="edit flex"><h4>{{item.nickname}}</h4></div>
                    </div>
                    <!--帖子创建时间-->
                    <div class="invitation__situation flex"><p>{{item.createAt}}</p></div>
                  </div>
                  <div style="width:10%;" class="flex">
                    <!--帖子评论数量-->
                    <div class="invitation__comment flex">
                      <svg t="1703270135296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7382" width="20" height="20"><path d="M847.36 107.52h-665.6c-69.12 0-125.44 56.32-125.44 125.44v401.92c0 69.12 56.32 125.44 125.44 125.44h38.4l15.36 181.76 158.72-181.76h453.12c69.12 0 125.44-56.32 125.44-125.44V232.96c0-69.12-56.32-125.44-125.44-125.44z m-563.2 376.32c-33.28 0-61.44-28.16-61.44-61.44 0-33.28 28.16-61.44 61.44-61.44 33.28 0 61.44 28.16 61.44 61.44 2.56 33.28-25.6 61.44-61.44 61.44z m230.4 0c-33.28 0-61.44-28.16-61.44-61.44 0-33.28 28.16-61.44 61.44-61.44 33.28 0 61.44 28.16 61.44 61.44 0 33.28-28.16 61.44-61.44 61.44z m227.84 0c-33.28 0-61.44-28.16-61.44-61.44 0-33.28 28.16-61.44 61.44-61.44 33.28 0 61.44 28.16 61.44 61.44 2.56 33.28-25.6 61.44-61.44 61.44z" fill="#8a8a8a" p-id="7383"></path></svg>
                      <p>{{item.commentNum}}</p>
                    </div>
                    <!--帖子点赞数量-->
                    <div class="invitation__comment flex">
                      <svg t="1703271814715" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9309" width="20" height="20"><path d="M773.6 912.7h-1.2c-37.2-0.4-74.5-0.4-111.8-0.4h-56.9c-38 0-76 0-114.1-0.5-21.1-0.6-41.9-5-61.5-13-33.3-13-52.3-42-52.2-79.7l0.1-141.4c0-78.3 0-156.7 0.7-235 0.1-21.3 13.8-41.3 25.5-51.8 45.3-41.4 94.5-93 115.1-162.6 5.7-19.4 7.9-40.8 10.2-63.4 4.6-45 33.8-74.3 72.8-74.3 15.3 0 30.6 4.6 45.6 13.5 30.1 18.1 50.2 46.5 61.3 87 17.8 64.3 8.7 126.7-1.3 180.2v0.2c-2.3 12.5 7.1 24.1 19.9 24.1h130c22.4 0 54.5 2.8 74.3 26.8 14.4 17.5 18.5 41.1 12.4 72.3-18.6 95.9-41.4 192.6-63.2 282.7-6.8 28.1-18.1 54.1-29 79.3l-4.7 10.8c-12.4 29.2-38 45.2-72 45.2zM216.1 903.3h-11.9c-43 0-78.2-35.2-78.2-78.2V476.6c0-43 35.2-78.2 78.2-78.2h11.9c43 0 78.2 35.2 78.2 78.2V825c0.1 43.1-35.1 78.3-78.2 78.3z" fill="#999a9a" p-id="9310"></path></svg>
                      <p >{{item.upNum}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <p v-if="loading" style="color:rgba(204,204,204,0.81);height:50px">Loading...</p>
          <p v-if="noMore" style="color:rgba(204,204,204,0.33);height:50px">No more</p>
        </div>
    </div>
  </div>
</template>

<style scoped>
.update{
  z-index: 8;
  font-size: 20px;
  position: absolute;
  right:0;
  top:10px;
  border: none;
  transition-duration: 0.3s;
}
.update:hover{
  transform: scale(1.1);
}
.infinite-list-wrapper {
  position: relative;
  text-align: center;
  width:100%;
  background: rgb(68, 69, 72);
  box-shadow:0 0 30px 1px #3f3f3f;
  border-radius: 10px;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
button{
  cursor: pointer;
}
.fade-leave-to {
  transition-duration: .3s;
  transform: scale(90%);
}

.home{
  width:100%;
  height:100%;
}
.contain-choice{
  top:70px;
  position: fixed;
  width:100%;
  height:80px;
  box-shadow: 6px 6px 10px #363638;
  z-index: 1;
  background: rgb(29, 29, 30);
  align-items: end;
}
.contain-choice__box{
  position: relative;
  align-items: end;
  bottom: 0;
  height:100%;
  justify-content: left;
}
.choice-item{
  background-color: rgb(66, 66, 68);
  width:150px;
  height:45px;
  border-radius: 10px 10px 0 0;
  color: #a4a4a4;
  margin-left:10px;
  cursor: pointer;
}
.contain{
  padding: 20px;
  position: relative;
  top:100px;
  flex-direction: column;
  margin:auto;
  width:1100px;
  z-index: 0;
}
.contain-choice__box{
  margin:auto;
  width:1100px;
}
.contain-say{
  flex-direction: column;
  width:100%;
  height:100px;
  background: rgba(44, 67, 108, 0.44);
  border-radius: 10px;
  border:solid 1px #7191a9;
}
.contain-search{
  width:100%;
  height:80px;
  justify-content: left;
  .contain-search__item{
    font-family: 方正粗黑宋简体;
    letter-spacing: 1px;
    padding: 5px 20px;
    border-radius: 8px;
    background: #3a3a3a;
    margin-right: 10px;
    color: #a8a8a8;
    border:solid 1px #7191a9;
    transition-duration: 0.2s;
  }
  .contain-search__item p{
    margin-top:8px;
    margin-left: 4px;
  }
  .contain-search__item:hover{
    background: #72767b;
    p{
      color:#ffffff;
    }
  }
}
.contain-invitation__item{
  position: relative;
  flex-direction: column;
  text-align: left;
  margin-left: 3%;
  width:94%;
  border-bottom:solid 1px #5e5e5e;
  cursor: pointer;
}
.invitation__outline{
  width:100%;
  color:#ffffff;
  .status{
    justify-content: left;
    margin-top: 10px;
  }
  .status p{
    padding: 3px 8px;
    font-size: 12px;
    border: solid 1px #4c80b6;
    background: rgba(59, 104, 164, 0.64);
    border-radius: 1px;
    margin-right: 10px;
    color: rgba(255, 255, 255, 0.89);
  }
  .invitation__text{
    margin-top: 5px;
    margin-bottom: 10px;
    width:100%;
    height:50%;
    text-overflow: ellipsis;
    overflow: scroll;
  }
  h3{
    color:#ffffff;
  }
}
.invitation__message{
  justify-content: space-between;
  width:100%;
  height:30px;
  color: #a1a1a1;
  margin-bottom: 10px;
  .invitation__edit{
    justify-content: left;
    width:60%;
    height:100%;
    .img{
      width:30px;
      height:30px;
      border-radius: 50%;
      overflow: hidden;
      background: #e1e1e1;
    }
    .edit{
      margin-left: 10px;
      height:100%;
      color: #a1a1a1;
    }
  }
  .invitation__situation{
    width:40%;
    height:100%;
  }
  .invitation__comment{
    width:50%;
    height:100%;
  }
  .invitation__comment p{
    margin-left: 3px;
    margin-top:7px;
  }
}
</style>