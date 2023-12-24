<script setup lang="ts">
import {ref, onMounted, computed } from "vue";
import {FeedbackItem, postComment, Comment, CommentList} from "@/api/feedback/feedbackTypes.ts";
import {getComment, getCommentAdd, getCommentLike, getFeedback, getLike} from "@/api/feedback/feedbackAPI.ts";


const emits = defineEmits();
const close = () => {
  emits('close');
};

// 获取的是帖子的fbid
const { data } = defineProps(['data']);
const FeedbackData = ref<FeedbackItem>(<FeedbackItem>{})
const Comment = ref<Comment>({page: "1", limit: "6",total:"7",pageList:[]})
let CommentList = ref<CommentList[]>([])
const loading = ref(true)
const noMore = ref(false)
const disabled = computed(() => loading.value || noMore.value)
let isLiked = 0
Comment.value.page = "1"

// 评论加载
const load = () => {
  loading.value = true
  setTimeout(() => {
    const total = parseInt(Comment.value.total);
    const loadedCommentsCount = CommentList.value.length;
    // 如果已加载数量小于总数量，继续加载评论
    if (loadedCommentsCount < total) {
      getComment(data, parseInt(Comment.value.page), parseInt(Comment.value.limit), "create_at")
          .then((res: any) => {
            console.log(res)
            Comment.value = res.data
            CommentList.value = CommentList.value.concat(Comment.value.pageList)
            // 更新当前页数
            Comment.value.page += 1
          })
          .finally(() => {
            loading.value = false;
          });
    } else {
      console.log('已加载完所有评论');
      loading.value = false;
      noMore.value = true;
    }
  }, 1000)
}

// 获取数据
const getData = () => {
  // 根据fb_id获取对应的feedback帖子
  getFeedback(data).then((res: any) => {
    console.log(res);
    FeedbackData.value = res.data.feedback;
    isLiked = FeedbackData.value.hasUp
  });
}

// 回复评论
let replyCmId= ref("")
let replying = ref(false)
const replyContent = ref('');
const reply = (id:any) =>{
  replying.value = true
  replyCmId.value = String(id)
}
const replyComment = () => {
  replying.value = false
  const form: postComment = {
    comment: replyContent.value,
    replyCmId: replyCmId.value,
    replyFbId: data  // 如果是添加新帖子，可以忽略这个属性
  };
  try {
    const response = getCommentAdd(form);
    console.log('表单提交成功', response);
    // 这里你可以处理提交成功后的逻辑，例如重定向到其他页面等
  } catch (error) {
    console.error('表单提交失败', error);
    // 这里你可以处理提交失败后的逻辑，例如显示错误消息等
  }
  refresh()
}

// 回复帖子
const postContent = ref('');
const submitForm = async () => {
  const formData: postComment = {
    comment: postContent.value,
    replyCmId: '',
    replyFbId: data  // 如果是添加新帖子，可以忽略这个属性
  };
  try {
    const response = await getCommentAdd(formData);
    postContent.value = ""
    console.log('表单提交成功', response);
    // 这里你可以处理提交成功后的逻辑，例如重定向到其他页面等
  } catch (error) {
    console.error('表单提交失败', error);
    postContent.value = ""
    // 这里你可以处理提交失败后的逻辑，例如显示错误消息等
  }
};

// 用户对帖子的点赞

const like = () => {
  if(FeedbackData.value.hasUp == 0){
    isLiked = 1
    FeedbackData.value.upNum += 1
  }
  else{
    isLiked = 0
    FeedbackData.value.upNum -= 1
  }
  FeedbackData.value.hasUp = isLiked
  getLike(data,isLiked).then((res: any) => {
    console.log(res);
  });
};

// 用户对评论的点赞
const CommentLike = (id:any) => {
  getCommentLike(id,1).then((res: any) => {
    console.log(res);
  });
  getComment(data,1, 6,"").then((res: any) => {
    console.log(res);
    Comment.value.pageList = res.data.pageList;
    CommentList.value = Comment.value.pageList
  });
};
const CommentUnlike = (id:any) => {
  getCommentLike(id,0).then((res: any) => {
    console.log(res);
  });
  getComment(data,1, 6,"").then((res: any) => {
    console.log(res);
    Comment.value.pageList = res.data.pageList;
    CommentList.value = Comment.value.pageList
  });
};
const refresh = () => {
  CommentList = ref<CommentList[]>([])
  Comment.value.page = "1"
  loading.value = true
  noMore.value = false
  load()
}
onMounted(() => {
  getData()
  load()
});

</script>

<template>
  <div class="box flex">
    <div class="box__center">
      <div class="box-contain flex">
        <button class="close" @click="close">X</button>
<!--        左半边-->
        <div class="box-contain-left">
          <!--帖子内容-->
          <div class="left-message">
            <h3>{{ FeedbackData.title }}</h3>
            <p>{{ FeedbackData.content }}</p>
          </div>
          <div class="left-login flex">
            <p>请进行身份验证以加入对话</p>
            <router-link to="/login" target="_blank" style="color:#3a3a3a;margin-right: 10px" class="flex">
              <p class="login">使用RVC帐户登录</p>
              <svg t="1703273172623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12021" width="20" height="20"><path d="M47.104 453.632q0-43.008 20.992-57.856t66.048-14.848q20.48 0 64.512 0.512t93.696 0.512 96.768 0.512 74.752 0.512q38.912 1.024 61.44-6.656t22.528-35.328q0-20.48 1.536-48.64t1.536-48.64q1.024-35.84 20.48-45.568t49.152 14.848q30.72 24.576 71.68 58.368t84.992 69.12 86.016 69.632 74.752 59.904q29.696 24.576 30.208 46.592t-28.16 45.568q-29.696 24.576-70.144 56.32t-83.968 65.536-85.504 67.072-74.752 58.88q-35.84 28.672-58.88 21.504t-22.016-44.032l0-24.576 0-29.696q0-15.36-0.512-30.208t-0.512-27.136q0-25.6-15.36-32.256t-41.984-6.656q-29.696 0-77.824-0.512t-100.352-0.512-101.376-0.512-79.872-0.512q-13.312 0-27.648-2.56t-26.112-9.728-18.944-20.992-7.168-37.376q0-27.648-0.512-53.248t0.512-57.344z" p-id="12022"></path></svg>
            </router-link>
          </div>
          <form @submit.prevent="submitForm">
            <div class="left-write" >
              <textarea v-model="postContent" style="width:100%;height:100%;resize: unset;border: none;outline: none;padding: 10px 0 15px 10px;"></textarea>
<!--              <md-editor :htmlPreview="false" :preview="false" v-model="postContent"  noMermaid  />-->
            </div>
            <button type="submit" class="submit" @click="refresh">发表评论</button>
          </form>
          <!--帖子评论-->
          <div class="left-review">
            <div class="left-review-tab">
              <p>评论</p>
            </div>
            <div class="left-review-contain">
              <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
<!--                评论内容-->
                <div v-for="(item, index) in CommentList" :key="index" class="left-review-item">
<!--                  <div v-if="item.hasShow" style="position:relative">-->
                  <div style="position:relative">
                    <img :src= item.avatar alt=""/>
                    <div class="left-review-edit flex">
                      <h4>{{ item.nickname }}</h4>
                      <h4 v-if="item.replyCmId" style="color:#208dfd">@{{item.replyNickname}}</h4>
                      <h4 v-if="item.replyCmId" style="color:#777777">{{item.replyComment}}</h4>
                    </div>
                    <div class="left-review-text">
                      <p>{{ item.comment }}</p>
                    </div>
                    <div class="left-review-reply flex">
                      <button v-if="item.hasLike" @click="CommentUnlike(item.cmid)" class="flex">
                        <svg t="1703323855943" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4032" width="20" height="20"><path d="M542.6688 85.333333c-74.325333 0-133.307733 58.026667-133.307733 133.393067 0 43.861333-37.922133 113.578667-80.093867 148.4288-30.754133 25.412267-98.013867 45.226667-200.055467 56.661333l-3.413333 0.4608a68.266667 68.266667 0 0 0-57.258667 67.328l-0.238933 374.442667-0.0512 0.256c-0.170667 1.194667-0.1024 2.269867 0.017067 3.822933l0.085333 3.413334a68.2496 68.2496 0 0 0 68.1984 64.853333l612.096 0.136533 0.341333 0.0512c0.836267 0.0512 1.6896 0.085333 2.542934 0.085334 25.463467 0 50.568533-7.168 72.430933-21.026134l4.693333-3.072a133.205333 133.205333 0 0 0 40.772267-45.2096l1.604267-3.072-1.6384 2.5088c4.642133-6.5024 8.021333-13.824 10.103466-21.6064l74.069334-326.894933 0.768-3.242667c0.9216-4.488533 1.365333-9.557333 1.2288-14.728533l-0.068267-1.092267-0.119467 2.474667a132.949333 132.949333 0 0 0-20.206933-81.271467l-2.6112-4.061866c-23.125333-34.577067-61.013333-56.081067-102.2976-59.204267l-2.679467-0.170667-1.024-0.136533a61.969067 61.969067 0 0 0-7.560533-0.4608l-145.442133-0.1024 1.8432-8.8576a393.728 393.728 0 0 0 7.185066-75.025067c0-28.501333-3.242667-56.951467-9.472-85.333333l-0.699733-2.696533a34.116267 34.116267 0 0 0-0.9216-2.628267l-0.477867-1.041067-0.682666-2.4576A133.4272 133.4272 0 0 0 542.6688 85.333333z m0 68.266667a65.160533 65.160533 0 0 1 62.5664 47.274667l1.553067 5.922133 0.6144 1.672533-0.955734-4.727466a323.703467 323.703467 0 0 1-10.120533 177.425066l-0.750933 2.389334a34.133333 34.133333 0 0 0 32.938666 42.973866L818.670933 426.666667l1.604267 0.238933 2.423467 0.187733a66.986667 66.986667 0 0 1 54.6304 31.573334 64.853333 64.853333 0 0 1 10.154666 35.84l-0.273066 6.877866 0.1024 2.525867-73.796267 325.700267-1.1264 1.7408-1.245867 2.269866a65.314133 65.314133 0 0 1-23.552 26.2656l-3.720533 2.2016a66.833067 66.833067 0 0 1-28.125867 8.192l-2.133333 0.0512-2.048-0.068266L136.533333 870.126933l0.256-378.4704c114.210133-12.782933 192.273067-35.7888 235.946667-71.867733 55.415467-45.806933 102.3488-130.594133 104.789333-195.822933l0.085334-5.239467c0-37.410133 28.16-65.1264 65.041066-65.1264z" fill="#d81e06" p-id="4033"></path><path d="M290.133333 580.266667v187.733333a34.133333 34.133333 0 0 1-34.133333 34.133333h-34.133333V546.133333h34.133333a34.133333 34.133333 0 0 1 34.133333 34.133334z" fill="#d81e06" p-id="4034"></path></svg>
                        <p>{{item.likeNum}}</p>
                      </button>
                      <button v-if="!item.hasLike" @click="CommentLike(item.cmid)" class="flex">
                        <svg t="1703323855943" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4032" width="20" height="20"><path d="M542.6688 85.333333c-74.325333 0-133.307733 58.026667-133.307733 133.393067 0 43.861333-37.922133 113.578667-80.093867 148.4288-30.754133 25.412267-98.013867 45.226667-200.055467 56.661333l-3.413333 0.4608a68.266667 68.266667 0 0 0-57.258667 67.328l-0.238933 374.442667-0.0512 0.256c-0.170667 1.194667-0.1024 2.269867 0.017067 3.822933l0.085333 3.413334a68.2496 68.2496 0 0 0 68.1984 64.853333l612.096 0.136533 0.341333 0.0512c0.836267 0.0512 1.6896 0.085333 2.542934 0.085334 25.463467 0 50.568533-7.168 72.430933-21.026134l4.693333-3.072a133.205333 133.205333 0 0 0 40.772267-45.2096l1.604267-3.072-1.6384 2.5088c4.642133-6.5024 8.021333-13.824 10.103466-21.6064l74.069334-326.894933 0.768-3.242667c0.9216-4.488533 1.365333-9.557333 1.2288-14.728533l-0.068267-1.092267-0.119467 2.474667a132.949333 132.949333 0 0 0-20.206933-81.271467l-2.6112-4.061866c-23.125333-34.577067-61.013333-56.081067-102.2976-59.204267l-2.679467-0.170667-1.024-0.136533a61.969067 61.969067 0 0 0-7.560533-0.4608l-145.442133-0.1024 1.8432-8.8576a393.728 393.728 0 0 0 7.185066-75.025067c0-28.501333-3.242667-56.951467-9.472-85.333333l-0.699733-2.696533a34.116267 34.116267 0 0 0-0.9216-2.628267l-0.477867-1.041067-0.682666-2.4576A133.4272 133.4272 0 0 0 542.6688 85.333333z m0 68.266667a65.160533 65.160533 0 0 1 62.5664 47.274667l1.553067 5.922133 0.6144 1.672533-0.955734-4.727466a323.703467 323.703467 0 0 1-10.120533 177.425066l-0.750933 2.389334a34.133333 34.133333 0 0 0 32.938666 42.973866L818.670933 426.666667l1.604267 0.238933 2.423467 0.187733a66.986667 66.986667 0 0 1 54.6304 31.573334 64.853333 64.853333 0 0 1 10.154666 35.84l-0.273066 6.877866 0.1024 2.525867-73.796267 325.700267-1.1264 1.7408-1.245867 2.269866a65.314133 65.314133 0 0 1-23.552 26.2656l-3.720533 2.2016a66.833067 66.833067 0 0 1-28.125867 8.192l-2.133333 0.0512-2.048-0.068266L136.533333 870.126933l0.256-378.4704c114.210133-12.782933 192.273067-35.7888 235.946667-71.867733 55.415467-45.806933 102.3488-130.594133 104.789333-195.822933l0.085334-5.239467c0-37.410133 28.16-65.1264 65.041066-65.1264z" fill="#8a8a8a" p-id="4033"></path><path d="M290.133333 580.266667v187.733333a34.133333 34.133333 0 0 1-34.133333 34.133333h-34.133333V546.133333h34.133333a34.133333 34.133333 0 0 1 34.133333 34.133334z" fill="#8a8a8a" p-id="4034"></path></svg>
                        <p>{{item.likeNum}}</p>
                      </button>
                      <button @click="reply(item.cmid)" class="flex">
                        <svg t="1703276653035" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6146" width="20" height="20"><path d="M434.18 290.746c0.46 0 0.66 0.702 0.66 2.473l0.03 0.002s-0.03 66.913 0.018 67.888c1.119 32.365 25.545 59.232 56.9 62.544l0.197 0.021c80.164 7.61 150.936 39.973 210.353 96.186 42.732 40.429 79.164 92.45 108.372 154.731 0.942 2.009 0.643 5.035-1.454 5.035-0.823 0-1.923-0.466-3.333-1.642-62.421-52.004-182.216-91.49-307.218-94.098l-0.004 0.052c-34.071 0.246-62.603 28.337-63.816 62.884-0.051 0.967-0.025 63.097-0.018 84.13 0 1.536-0.134 2.303-0.646 2.303-0.483 0-1.306-0.683-2.67-2.05-52.271-52.291-212.932-205.238-212.932-205.238-3.746-4.842-5.803-10.958-5.803-17.335 0-7.47 2.763-14.421 7.79-19.63l0.032-0.017s160.344-145.506 211.36-196.534c1.019-1.017 1.728-1.705 2.181-1.705m-0.021-49.119c-13.809 0.006-26.223 5.423-36.9 16.098-47.924 47.937-197.52 183.89-208.95 194.27a48.492 48.492 0 0 0-3.048 2.9c-13.907 14.41-21.565 33.493-21.565 53.738 0 17.163 5.706 33.99 16.068 47.388a49.051 49.051 0 0 0 4.984 5.523c1.603 1.525 160.818 153.123 212.06 204.385 10.906 10.91 23.494 16.443 37.412 16.443 22.714 0 42.504-15.465 48.124-37.61 1.47-5.793 1.64-10.657 1.64-13.83v-1.656c-0.008-18.566-0.027-73.815 0.008-81.137 0.499-8.027 7.442-15.029 15.06-15.084 0.275-0.002 0.55-0.006 0.823-0.012C624.66 636.09 727.6 676.66 774.481 715.72c12.918 10.763 26.04 13.021 34.774 13.021 17.503 0 33.561-8.822 42.953-23.598 9.613-15.121 10.752-34.82 2.973-51.409-31.821-67.854-71.887-124.902-119.087-169.557-33.498-31.692-70.751-57.03-110.727-75.309-39.964-18.273-83.173-29.736-128.426-34.066-6.873-0.728-12.489-7.265-12.943-14.976-0.025-5.802-0.019-43.282-0.007-66.584a49.515 49.515 0 0 0-0.131-3.627c-0.22-3.905-0.802-7.575-1.767-11.137-5.874-21.698-25.578-36.853-47.913-36.853l-0.022 0.001z" p-id="6147" fill="#8a8a8a"></path></svg>
                        <p>回复</p>
                      </button>
                      <p style="margin-left: 10px">{{item.createAt}}</p>
                    </div>
                  </div>
                </div>
              </ul>
              <p v-if="loading" style="color:#cccccc">Loading...</p>
              <p v-if="noMore" style="color:#cccccc">No more</p>
            </div>
          </div>
          <div v-show="replying" class="left-review-write flex">
            <div class="write flex">
              <textarea v-model="replyContent" type="text" class="write__input"></textarea>
            </div>
            <div class="reply-btn flex">
              <button @click="replyComment()" >回复</button>
            </div>
          </div>
        </div>
<!--        右半边-->
        <div class="box-contain-right">
          <div class="right-top flex">
            <div class="right-top-item flex">
              <p>点赞</p>
              <button v-show="isLiked" @click="like()" class="flex">
                <svg t="1703257965849" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2595" width="20" height="20"><path d="M691.2 870.4H422.912c-10.24 0-17.408-8.192-17.408-17.408 0-10.24 8.192-17.408 17.408-17.408h268.288c19.456 0 35.84-9.216 46.08-25.6 7.168-17.408 79.872-201.728 94.208-256 12.288-48.128-15.36-97.28-63.488-109.568-7.168-2.048-14.336-3.072-23.552-3.072H636.928c-6.144 0-11.264-3.072-14.336-8.192-3.072-5.12-4.096-11.264-2.048-16.384 10.24-27.648 16.384-92.16 16.384-173.056 0-29.696-24.576-53.248-53.248-53.248-29.696 0-53.248 24.576-53.248 53.248v17.408c0 118.784-96.256 215.04-215.04 215.04-10.24 0-17.408-8.192-17.408-17.408 0-10.24 8.192-17.408 17.408-17.408 98.304 0 179.2-79.872 179.2-179.2v-17.408c0-49.152 39.936-89.088 89.088-89.088 49.152 0 89.088 39.936 89.088 89.088 0 43.008-2.048 113.664-12.288 161.792h83.968c12.288 0 22.528 1.024 32.768 4.096 66.56 17.408 106.496 87.04 89.088 153.6-15.36 57.344-93.184 252.928-96.256 261.12 0 1.024-1.024 2.048-1.024 2.048-15.36 26.624-43.008 43.008-73.728 44.032-2.048-1.024-3.072-1.024-4.096-1.024z" fill="#d81e06" p-id="2596"></path><path d="M315.392 870.4H225.28c-39.936 0-71.68-31.744-71.68-71.68V512c0-39.936 31.744-71.68 71.68-71.68h89.088c10.24 0 17.408 8.192 17.408 17.408v394.24c1.024 10.24-7.168 18.432-16.384 18.432zM225.28 476.16c-19.456 0-35.84 16.384-35.84 35.84v286.72c0 19.456 16.384 35.84 35.84 35.84h71.68v-358.4h-71.68z" fill="#d81e06" p-id="2597"></path></svg>
                {{FeedbackData.upNum}}
              </button>
              <button v-show="!isLiked" @click="like()" class="flex" style="cursor: pointer">
                <svg t="1703258736020" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2980" width="20" height="20"><path d="M691.2 870.4H422.912c-10.24 0-17.408-8.192-17.408-17.408 0-10.24 8.192-17.408 17.408-17.408h268.288c19.456 0 35.84-9.216 46.08-25.6 7.168-17.408 79.872-201.728 94.208-256 12.288-48.128-15.36-97.28-63.488-109.568-7.168-2.048-14.336-3.072-23.552-3.072H636.928c-6.144 0-11.264-3.072-14.336-8.192-3.072-5.12-4.096-11.264-2.048-16.384 10.24-27.648 16.384-92.16 16.384-173.056 0-29.696-24.576-53.248-53.248-53.248-29.696 0-53.248 24.576-53.248 53.248v17.408c0 118.784-96.256 215.04-215.04 215.04-10.24 0-17.408-8.192-17.408-17.408 0-10.24 8.192-17.408 17.408-17.408 98.304 0 179.2-79.872 179.2-179.2v-17.408c0-49.152 39.936-89.088 89.088-89.088 49.152 0 89.088 39.936 89.088 89.088 0 43.008-2.048 113.664-12.288 161.792h83.968c12.288 0 22.528 1.024 32.768 4.096 66.56 17.408 106.496 87.04 89.088 153.6-15.36 57.344-93.184 252.928-96.256 261.12 0 1.024-1.024 2.048-1.024 2.048-15.36 26.624-43.008 43.008-73.728 44.032-2.048-1.024-3.072-1.024-4.096-1.024z" fill="#333333" p-id="2981"></path><path d="M315.392 870.4H225.28c-39.936 0-71.68-31.744-71.68-71.68V512c0-39.936 31.744-71.68 71.68-71.68h89.088c10.24 0 17.408 8.192 17.408 17.408v394.24c1.024 10.24-7.168 18.432-16.384 18.432zM225.28 476.16c-19.456 0-35.84 16.384-35.84 35.84v286.72c0 19.456 16.384 35.84 35.84 35.84h71.68v-358.4h-71.68z" fill="#333333" p-id="2982"></path></svg>
                {{FeedbackData.upNum}}
              </button>
            </div>
            <div class="right-top-item flex">
              <p>分类</p>
              <button>{{ FeedbackData.typeName }}</button>
            </div>
          </div>
          <div class="right-center flex">
            <div class="right-center-item flex">
              <p>日期</p>
              <p>{{FeedbackData.createAt}}</p>
            </div>
            <div class="right-center-item flex">
              <p>作者</p>
              <p>{{ FeedbackData.nickname }}</p>
            </div>
          </div>
          <div class="right-bottom ">
            <h4>订阅帖子</h4>
            <p>当有更改时，通过电子邮件收到通知。</p>
            <button>
              获得通知
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.close{
  position: absolute;
  right:-100px;
  top:20px;
  width:40px;
  height:40px;
  background: rgba(255, 255, 255, 0.47);
  cursor: pointer;
  border: solid 1px #cccccc;
  border-radius: 50%;
  font-size: 16px;
  transition-duration: 0.2s;
}
.close:hover{
  top:30px;
  color:#ffffff;
  background: #4d7a8f;
}
.submit{
  padding: 8px 30px;
  background: #4f7c94;
  color:#ffffff;
  position: relative;
  top:10px;
}
.left-write{
  margin-left: 5%;
  margin-top:20px;
  width:90%;
  height:150px;
  overflow: hidden;
}
button{
  padding: 8px;
  border: solid 1px #cccccc;
  background: transparent;
  border-radius: 8px;
  color: #646464;
  cursor: pointer;
  letter-spacing: 1px;
}
.box{
  position: fixed;
  backdrop-filter: blur(2px); /* 模糊效果 */
  width:100vw;
  height:100vh;
  z-index: 7;
  overflow: scroll;
  .box__center{
    position: absolute;
    top:0;
    width:1000px;
    height:80vh;
    z-index: 11;
    .box-contain{
      position: relative;
      top:10px;
      background: rgba(229, 229, 229, 0.91);
      width:100%;
      height:100%;
      border-radius: 10px;
    }
  }
}
.box-contain-left{
  overflow: scroll;
  width:70%;
  height:100%;
  border-right:solid 1px #e7e7e7;
  .left-message{
    width:90%;
    margin-left: 5%;
    padding: 30px 0 0 0;
    font-family: 华文中宋;
    text-align: left;
    p{
      color: #646464;
      font-size: 17px;
      letter-spacing: 1px;
      margin-top:10px;
    }
  }
  .left-login{
    font-family: 宋体, serif;
    justify-content: space-between;
    margin-left:5%;
    margin-top: 20px;
    width:90%;
    height:50px;
    box-shadow: 4px 4px 5px #cccccc;
    background: rgba(248, 248, 250, 0.94);
    border-radius: 8px;
    p{
      margin-left:20px;
    }
    button{
      border: none;
    }
    .login{
      margin-right:10px;
      transition-duration: 0.3s;
    }
    .login:hover{
      color:#000000;
      font-weight: bold;
    }
  }
}
.left-review{
  width:90%;
  margin-left:5%;
  position: relative;
  z-index:0;
  .left-review-tab{
    height:60px;
    width:100%;
    display: flex;
    align-items: end;
    font-family: 华文中宋;
    p{
      padding: 10px;
      border-bottom: solid 1px #cccccc;
    }
  }
  .left-review-contain{
    width:100%;
    .left-review-item{
      width:90%;
      margin-left: 5%;
      margin-top: 20px;
      position: relative;
      border-left:solid 1px #cccccc;
      img{
        position: absolute;
        top:-10px;
        left:-20px;
        width:40px;
        height:40px;
        border-radius: 50px;
      }
      .left-review-edit{
        justify-content: left;
        height:50px;
        width:90%;
        margin-left: 5%;
      }
      .left-review-text{
        text-align: left;
        padding: 0 30px 10px 30px;
      }
      .left-review-reply{
        justify-content: left;
        margin-left:5%;
        p{
          color: #545454;
          padding: 0 5px;
        }
        button{
          border: none;
        }
      }

    }
  }
}
.left-review-write{
  position: absolute;
  bottom:0;
  right:300px;
  justify-content: right;
  height:70px;
  width:400px;
  .write{
    width:80%;
    height:50%;
    .write__input{
      width:100%;
      height:70%;
      border: none;
      border-radius: 10px;
      outline: none;
      padding: 10px 0 15px 10px;
      resize: unset;
    }
  }
  .reply-btn{
    width:20%;
    height:100%;
    button{
      height:70%;
      width:90%;
      background: #00ae9e;
      color:#ffffff;
      font-family: Zcool;
      font-size: 18px;
    }
  }
}
.box-contain-right{
  font-family: OpenSans;
  width:30%;
  height:100%;
  p{
    color: #646464;
  }
  .right-top{
    justify-content: space-around;
    flex-direction: column;
    height:200px;
    border-bottom: solid 1px #e7e7e7;
    .right-top-item{
      justify-content: space-between;
      width:80%;
      height:20%;
    }
    .right-top-item button{
      border: 1px solid rgba(159, 183, 180, 0.87);
      background: rgba(207, 238, 238, 0.29);
      color: #949393;
    }
  }
  .right-center{
    justify-content: space-around;
    flex-direction: column;
    height:100px;
    border-bottom: solid 1px #e7e7e7;
    .right-center-item{
      justify-content: space-between;
      width:80%;
      height:50%;
    }
  }
  .right-bottom{
    padding: 30px;
    text-align: left;
    height:200px;
    p{
      margin-top:10px;
    }
    button{
      margin-top:10px;
      background: #4d7a8f;
      color: #ffffff;
      padding: 8px 30px;
    }
  }
}
</style>