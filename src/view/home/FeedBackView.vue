<script setup lang="ts">
import FeedBackComponent from "@/components/feedback/FeedBackComponent.vue";
import NewFeedback from '@/components/feedback/NewFeedbackComponent.vue'
import {onMounted, ref} from 'vue'
import {
  FeedbackItem,
  ListItems,
  StatesListItem,
  TypeListItem
} from '@/api/feedback/feedbackTypes.ts'
import {getList, getStatusList, getTypeList} from "@/api/feedback/feedbackAPI.ts";

// 新建反馈弹窗
const isNewOpen= ref(false)
const openNew = () => {
  isNewOpen.value = true
};

// 帖子详情弹窗
const selectedItem = ref<number | null>(null)
const isModalOpen = ref(false)
const open = (id: any) => {
  isModalOpen.value = true
  selectedItem.value = id
};
const close = () => {
  isModalOpen.value = false;
  isNewOpen.value = false;
};

// 数据获取
const Type = ref<TypeListItem[]>([{id:1,type:"所有"},{id:2,type:"功能请求"},{id:3,type:"bug"}])
const States = ref<StatesListItem[]>([])
const ListItems = ref<ListItems>(<ListItems>{page: "1", limit: "6", pageList: [{avatar: "",createAt:"2023-12-12 16:48:11",title:"111"}], total: "6"})
const Feedback = ref<FeedbackItem[]>([])
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
  // 获取列表
  getList(parseInt(ListItems.value.page), parseInt(ListItems.value.limit),"").then((res: any) => {
    console.log(res);
    ListItems.value.pageList = res.data.pageList;
    Feedback.value = ListItems.value.pageList
  });
}

// 分页获取feedback列表
import { computed } from 'vue'

const count = ref(10)
const loading = ref(false)
const noMore = computed(() => count.value >= 20)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
  loading.value = true
  setTimeout(() => {
    const nextPage = parseInt(ListItems.value.page) + 1;
    const total = parseInt(ListItems.value.total) + 6;
    getList(nextPage, parseInt(ListItems.value.limit),"").then((res: any) => {
      console.log(res);
      ListItems.value.pageList = res.data.pageList;
      Feedback.value = Feedback.value.concat(ListItems.value.pageList)
    });
    ListItems.value.page = nextPage.toString();
    ListItems.value.total = total.toString();
    loading.value = false
  }, 10000)
}

onMounted(() => {
  getData()
});
</script>

<template>
  <div class="home">
    <button @click="close()" v-if="isModalOpen || isNewOpen" class="close">X</button>
    <transition name="fade">
      <FeedBackComponent :data="selectedItem" v-if="isModalOpen"></FeedBackComponent>
    </transition>
    <transition name="fade">
      <NewFeedback v-if="isNewOpen"></NewFeedback>
    </transition>
    <div class="contain-choice">
      <div class="contain-choice__box flex">
        <div v-for="(item, index) in Type" :key="index" class="choice-item flex">{{ item.type }}</div>
      </div>
    </div>
    <div class="contain flex">
        <div class="contain-say flex">
          <h3 style="margin-bottom: 10px;color:#ffffff">有话要说吗？</h3>
          <p style="color:#ffffff">告诉 RVC 他们如何使产品对您更有用。</p>
        </div>
        <div class="contain-search flex">
          <button class="contain-search__item flex">最新</button>
          <button class="contain-search__item flex">最热</button>
<!--          <button class="contain-search__item flex">搜索</button>-->
          <button @click="openNew()" class="contain-search__item flex">+创建新帖子</button>
        </div>
        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
            <li @click="open(item.fbid)" v-for="(item, index) in Feedback" :key="index" class="contain-invitation__item flex">
              <div class="invitation__outline">
                <h3 style="margin-top:20px">{{item.title}}</h3>
                <div class="invitation__text">{{item.content}}</div>
              </div>
              <div class="invitation__message flex">
                <div class="invitation__edit flex">
                  <div class="img"></div>
                  <div class="edit flex"><h4>{{item.nickname}}</h4></div>
                </div>
                <div class="invitation__situation flex"><p>{{item.createAt}}</p></div>
              </div>
            </li>
          </ul>
          <p v-if="loading" style="color:#cccccc">Loading...</p>
          <p v-if="noMore" style="color:#cccccc">No more</p>
        </div>
    </div>
  </div>
</template>

<style scoped>
.infinite-list-wrapper {
  position: relative;
  text-align: center;
  height: 55vh;
  width:100%;
  background: rgba(56, 59, 73, 0.63);
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
.close{
  position: fixed;
  right:100px;
  top:70px;
  width:45px;
  height:45px;
  background: rgba(255, 255, 255, 0.47);
  z-index: 8;
  cursor: pointer;
  border: solid 1px #cccccc;
  border-radius: 10px;
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
  z-index: 5;
  background: rgb(33, 36, 42);
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
  height:80vh;
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
    padding: 10px 20px;
    border-radius: 8px;
    background: #3a3a3a;
    margin-right: 10px;
    color: #a8a8a8;
    border:solid 1px #7191a9;
  }
}

.contain-invitation__item{
  flex-direction: column;
  text-align: left;
  margin-left: 3%;
  width:94%;
  height:150px;
  border-bottom:solid 1px #d8d9e0;
  cursor: pointer;
}
.invitation__outline{
  width:100%;
  height:70%;
  color:#ffffff;
}
.invitation__message{
  justify-content: space-between;
  width:100%;
  height:30%;
  .invitation__edit{
    width:30%;
    height:100%;

    .img{
      width:30px;
      height:30px;
      border-radius: 50%;
      overflow: hidden;
      background: #79bbff;
    }
    .edit{
      width:130px;
      height:100%;
      color: #a1a1a1;
    }
  }
  .invitation__situation{
    width:30%;
    height:100%;
    color: #a1a1a1;
  }
}
.invitation__text{
  margin-top: 5px;
  width:100%;
  height:50%;
  text-overflow: ellipsis;
  overflow: scroll;
}

</style>