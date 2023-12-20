<script setup lang="ts">
import {MdEditor} from "md-editor-v3";
import {ref, onMounted, computed } from "vue";
import {FeedbackItem, postComment, Comment, CommentList} from "@/api/feedback/feedbackTypes.ts";
import {getComment, getCommentAdd, getFeedback} from "@/api/feedback/feedbackAPI.ts";

const { data } = defineProps(['data']);

const FeedbackData = ref<FeedbackItem>({
  avatar:"",
  commentNum:2,
  content:"设想一个平台，您可以在其中组建自己的 10-20 名用户团队。\n" +
      "创建团队涉及 10k buzz 或更少的象征性费用。形成后，您可以通过链接邀请创作者加入。团队可以是公共的，也可以是私人的;公共团队允许用户关注和接收新内容的通知，私人团队要求用户请求访问权限才能查看内容。\n" +
      "用户可以创建和加入多个团队。只有团队负责人可以邀请新成员，而团队中的其他成员可以为新闻文章、图像和团队仪表板的链接做出贡献。排行榜系统展示团队统计数据，包括每周/每月/每年的新成员、每周/每月/每年的观看次数以及单个成员指标。\n" +
      "这个想法鼓励一个更友好的环境，并让用户更好地与团队中的各种创作者互动。",
  createAt:"",
  fbid:2,
  hasShow:2,
  hasUp:"",
  nickname:"菲亚",
  status:2,
  statusName:"",
  title:"创建自己的团队",
  type:2,
  typeName:"",
  uid:"",
  upNum: 3})
const Comment = ref<Comment>(<Comment>{page: "1", limit: "6",total:"6",pageList:[]})
const CommentList = ref<CommentList[]>([])
const count = ref(10)
const loading = ref(false)
const noMore = computed(() => count.value >= 20)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
  loading.value = true
  setTimeout(() => {
    const nextPage = parseInt(Comment.value.page) + 1;
    const total = parseInt(Comment.value.total) + 6;
    getComment(data,nextPage, parseInt(Comment.value.limit),"").then((res: any) => {
      console.log(res);
      Comment.value.pageList = res.data.pageList;
      CommentList.value = CommentList.value.concat(Comment.value.pageList)
    });
    Comment.value.page = nextPage.toString();
    Comment.value.total = total.toString();
    loading.value = false
  }, 2000)
}
const getData = () => {
  // 根据fb_id获取对应的feedback帖子
  getFeedback(data).then((res: any) => {
    console.log(res);
    FeedbackData.value = res.data;
  });
  // 获取某个帖子的评论列表
  getComment(data,parseInt(Comment.value.page), parseInt(Comment.value.limit),"like_num").then((res: any) => {
    console.log(res);
    Comment.value.pageList = res.data.pageList;
    CommentList.value = Comment.value.pageList
  });
}
onMounted(() => {
  getData()
});

// 提交评论表单
const postContent = ref('');
const onUploadImg = (files: any) => {
  console.log(files)
}
const submitForm = async () => {
  const formData: postComment = {
    comment: postContent.value,
    replyCmId: '11',
    replyFbId: data,  // 如果是添加新帖子，可以忽略这个属性
  };
  try {
    const response = await getCommentAdd(formData);
    console.log('表单提交成功', response);
    // 这里你可以处理提交成功后的逻辑，例如重定向到其他页面等
  } catch (error) {
    console.error('表单提交失败', error);
    // 这里你可以处理提交失败后的逻辑，例如显示错误消息等
  }
};
</script>

<template>
  <div class="box flex">
    <div class="box__center">
      <div class="box-contain flex">
        <div class="box-contain-left">
          <div class="left-message">
            <h3>{{ FeedbackData.title }}</h3>
            <p>{{ FeedbackData.content }}</p>
          </div>
          <div class="left-login flex">
            <p>请进行身份验证以加入对话。</p>
            <router-link to="/rvc" target="_blank" style="color:#3a3a3a;margin-right: 10px"> 使用RVC帐户登录 </router-link>
          </div>
          <form @submit.prevent="submitForm" >
            <div class="left-write">
              <md-editor v-model="postContent" @on-upload-img="onUploadImg"  noMermaid/>
            </div>
            <button type="submit" class="submit">发表评论</button>
          </form>
          <div class="left-review">
            <div class="left-review-tab">
              <p>评论</p>
            </div>
            <div class="left-review-contain">
              <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
                <div v-for="(item, index) in CommentList" :key="index" class="left-review-item">
                  <img :src= item.avatar alt="头像"/>
                  <div class="left-review-edit flex">
                    <h4>{{ item.nickname }}</h4>
                    <p style="margin-left: 10px">{{item.createAt}}</p>
                  </div>
                  <div class="left-review-text">
                    <p>{{ item.comment }}</p>
                  </div>
                  <div class="left-review-reply flex">
                    <button><svg t="1702674109443" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1330" width="20" height="20"><path d="M897.6 315.2H707.2c-6.4 0-11.2-3.2-12.8-6.4-1.6-1.6-4.8-6.4-4.8-14.4l9.6-76.8c9.6-72-30.4-140.8-96-163.2-40-14.4-81.6-11.2-118.4 9.6-36.8 19.2-62.4 54.4-72 94.4-1.6 8-8 22.4-12.8 30.4l-16 30.4c-20.8 38.4-70.4 94.4-104 126.4-8 6.4-14.4 14.4-19.2 24H144c-67.2 0-121.6 54.4-121.6 121.6v364.8c0 67.2 54.4 121.6 121.6 121.6h145.6V438.4c0-20.8 8-41.6 24-54.4 38.4-35.2 91.2-94.4 115.2-139.2l16-30.4c4.8-8 14.4-27.2 17.6-41.6 6.4-27.2 24-49.6 48-62.4 24-12.8 52.8-16 78.4-6.4 43.2 14.4 68.8 60.8 62.4 110.4l-9.6 73.6c-3.2 19.2 3.2 38.4 16 52.8 12.8 14.4 30.4 22.4 49.6 22.4H896c40 0 72 32 73.6 70.4l-94.4 403.2v3.2c-6.4 32-30.4 88-121.6 88H483.2c-12.8 0-24 11.2-24 24s11.2 24 24 24h270.4c136 0 164.8-97.6 169.6-128l94.4-404.8v-4.8c0-68.8-54.4-123.2-120-123.2zM241.6 928H144c-40 0-73.6-32-73.6-73.6V491.2c0-40 32-73.6 73.6-73.6h97.6V928z" fill="" p-id="1331"></path></svg></button>
                    <p>{{ item.likeNum }}</p>
                    <!--                  <button><svg t="1702674227783" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1470" width="20" height="20"><path d="M1022.4 580.8L928 176c-6.4-30.4-35.2-128-169.6-128H488c-14.4 0-24 11.2-24 24S473.6 96 488 96h270.4c91.2 0 115.2 54.4 121.6 88v3.2l94.4 403.2c-1.6 40-33.6 70.4-73.6 70.4H712c-19.2 0-36.8 8-49.6 22.4-12.8 14.4-17.6 33.6-16 52.8l9.6 76.8c6.4 49.6-20.8 96-62.4 110.4-27.2 9.6-54.4 6.4-78.4-6.4-24-12.8-41.6-36.8-48-62.4-3.2-14.4-12.8-33.6-17.6-41.6l-16-30.4c-24-44.8-75.2-104-115.2-139.2-16-14.4-24-33.6-24-54.4V46.4H148.8c-67.2 0-121.6 54.4-121.6 121.6v364.8c0 67.2 54.4 121.6 121.6 121.6h118.4c4.8 8 11.2 16 19.2 24 35.2 32 83.2 86.4 104 126.4l16 30.4c4.8 9.6 11.2 22.4 12.8 30.4 9.6 40 36.8 75.2 72 94.4 36.8 19.2 78.4 22.4 118.4 9.6 64-22.4 104-91.2 96-163.2l-9.6-76.8c-1.6-6.4 1.6-11.2 4.8-14.4 1.6-1.6 6.4-6.4 12.8-6.4h188.8c67.2 0 121.6-54.4 121.6-121.6l-1.6-6.4z m-777.6 24h-96c-40 0-73.6-32-73.6-73.6V168C75.2 128 108.8 96 148.8 96h97.6v508.8z" fill="" p-id="1471"></path></svg></button>-->
                    <!--                  <p>1</p>-->
                    <button>回复</button>
                  </div>
                </div>
              </ul>
              <p v-if="loading" style="color:#cccccc">Loading...</p>
              <p v-if="noMore" style="color:#cccccc">No more</p>
            </div>
          </div>
        </div>
        <div class="box-contain-right">
          <div class="right-top flex">
            <div class="right-top-item flex">
              <p>点赞</p>
              <button>{{FeedbackData.upNum}}</button>
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
  height:200px;
  overflow: scroll;
}
button{
  padding: 8px;
  border: solid 1px #cccccc;
  background: transparent;
  border-radius: 8px;
  color: #646464;
  cursor: pointer;
}
.box{
  position: absolute;
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
      top:80px;
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
    padding: 30px 20px 20px 20px;
    text-align: left;
    p{
      color: #646464;
      margin-top:10px;
    }
  }
  .left-similar__btn{
    width:90%;
    height:50px;
  }
  .left-login{
    justify-content: space-between;
    margin-left:5%;
    margin-top: 20px;
    width:90%;
    height:50px;
    border: solid 1px #d6ddef;
    background: rgba(227, 239, 255, 0.68);
    border-radius: 8px;
    p{
      margin-left:20px;
    }
    button{
      border: none;
    }
  }
}
.left-review{
  width:90%;
  margin-left:5%;
  .left-review-tab{
    height:60px;
    width:100%;
    display: flex;
    align-items: end;
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
          padding: 0 5px;
        }
        button{
          border: none;
        }
      }
    }
  }
}
.box-contain-right{
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