<script setup lang="ts">
import { ref } from 'vue';
import { CommentVo, CommentForm, LikeCommentForm } from '@/api/post/postType'
import { commentAdd, likeComment } from '@/api/post/postApi'
import { message } from '@/utils/message';
import { storage } from '@/utils/storage';
let props = defineProps<{
  comment: CommentVo,
  showReply: (index: number) => boolean,
  index: number
}
>()
let currentComment = ref<CommentVo>(props.comment)
let commentStyle = ref(props.comment.rootCommentId == '-1' ? 'root-comment' : 'child-comment');
let showReplyText = ref('查看回复')
let inputVisibility = ref(false)
let inputContent = ref('')
const input = ref<any>(null)
const handleReply = function () {
  if(!storage.get<string>('token')){
    message.error('未登录')
    return
  }
  inputVisibility.value = true
  setTimeout(function () { input!.value!.focus() }, 500)
}
const handleBlur = function () {
  setTimeout(function () { inputVisibility.value = false }, 100)
}
const like = function () {
  let form = ref<LikeCommentForm>({
    id: currentComment.value.postCommentId,
    type: currentComment.value.like ? '0' : '1'
  })
  likeComment(form.value).then((res: any) => {
    if (res.code == 200) {
      currentComment.value.like = !currentComment.value.like
      currentComment.value.commentLikeCount = (currentComment.value.commentLikeCount as unknown as number) + (currentComment.value.like ? 1 : -1)
    } else {
      message.error(res.msg)
    }
  })
}
const sendComment = function () {
  let form = ref<CommentForm>({
    content: inputContent.value,
    postId: currentComment.value.postId,
    rootCommentId: currentComment.value.rootCommentId == '-1' ? currentComment.value.postCommentId : currentComment.value.rootCommentId,
    toCommentId: currentComment.value.rootCommentId == '-1' ? '' : currentComment.value.postCommentId,
    toUserId: currentComment.value.rootCommentId == '-1' ? '' : currentComment.value.user?.uid
  })
  commentAdd(form.value).then((res: any) => {
    if (res.code == 200) {
      message.success('发送成功')
    } else {
      message.error(res.msg)
    }
    inputContent.value = ""

  })

}
const calcNum = function (num: number) {
  return num < 1000 ? (num as unknown as string) : (num / 1000 + 'k' as string)
}
let clickMore = ref(false)
let moreVisibility = ref(false)
const handleClickMore = function () {
  clickMore.value = true
  moreVisibility.value = !moreVisibility.value
  setTimeout(function () {
    clickMore.value = false
  }, 200)
}
const handleBlur2 = function () {
  setTimeout(function () {
    moreVisibility.value = false
  }, 200)
}
const getUrl = function(url:string){
    inputContent.value = '<audio>'+url+'</audio>'
    sendComment()
}
const isAudio = function (str: string) {
  console.log(str);
  
  return str.includes('<audio>') && str.includes('</audio>')
}
const parseUrl = function (str: string) {
  return str.match(/<audio>(.*?)<\/audio>/)?.[1];
}
</script>
<template>
  <div style="width: 100%;position: relative;display: flex;justify-content: right;">
    <div :class="commentStyle">
      <div class="comment-left">
        <router-link :to="'/user?id=' + currentComment.user?.uid">
          <div class="avatar-border">
            <img height="40" width="40" style="object-fit: cover;" :src="currentComment?.user?.avatar!"
              alt="commenter-avatar">
          </div>
        </router-link>
      </div>
      <div class="comment-right">
        <router-link :to="'/user?id=' + currentComment.user?.uid">
          <div class="commenter-nickName">
            {{ currentComment?.user?.nickname }}
          </div>
        </router-link>

        <div class="comment-content">
          <span
            style="display: inline-block;background-color: rgba(102,102,102,0.2);height: 80%;border-radius: 5px;font-family: 'ZCool';">
            {{ currentComment?.replayUser ? '@' + currentComment?.replayUser?.nickname : '' }}
          </span>
          <span v-if="!isAudio(currentComment?.content)">
            {{ currentComment?.content }}
          </span>
          <div style="position: relative" v-else>
            <audioPlayerComponent :src="parseUrl(currentComment?.content)"></audioPlayerComponent>
          </div>
        </div>
        <div class="comment-status">
          {{ currentComment?.createAt }}
          <div class="status-item" @click="like">
            <div class="vertical-center"
              style="top:100%;transform:translate(0,-100%);height: 12px;width: 12px;background-repeat: no-repeat;background-size: contain;"
              :style="{ backgroundImage: currentComment.like ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
            </div>
            <span>{{ calcNum(currentComment.commentLikeCount) }}</span>
          </div>
          <span style="margin-left: 20px;cursor: pointer;font-family: 'ZCool';" @click="handleReply">
            回复
          </span>
          <span style="margin-left: 20px;cursor: pointer;font-family: 'ZCool';"
            @click="showReplyText = showReply(index) ? '收起' : '查看回复'"
            v-show="currentComment.rootCommentId == '-1' ? true : false">
            {{ showReplyText }}
          </span>
        </div>
        <div v-show="inputVisibility" class="reply">
          <span style="font-family: 'ZCool';">@{{ currentComment.user?.nickname }}:</span>
          <input class="input" placeholder="" v-model="inputContent" @blur="handleBlur" ref="input">
          <div style="width: 30px;height: 30px;">
            <recordingComponnent :getUrl="getUrl"></recordingComponnent>
          </div>
          <button :style="{ cursor: inputContent != '' ? 'pointer' : 'not-allowed' }" style="font-family: 'ZCool';"
            @click="sendComment()">发送</button>
        </div>
      </div>
      <div>
        <div tabindex="-1" class="more" @click="handleClickMore" @blur="handleBlur2"
          :class="clickMore ? 'dither-animation' : ''" style="z-index: 10;">
          <div
            style="height: 16px;width:16px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
          </div>
        </div>
      </div>
      <div class="more-window" v-show="moreVisibility">
        <div class="more-window__item" @click="message.warning('开发中')">
          举报
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  text-align: left;
}

.more {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  width: 30px;
  height: 30px;
  z-index: 20;
  cursor: pointer;
}

.more-window {
  position: absolute;
  right: 10px;
  top: 60px;
  width: 120px;
  border-radius: 10px;
  border: rgba(55, 58, 64) 1px solid;
  background-color: rgba(37, 38, 43);
  padding: 5px;
  z-index: 20;
  user-select: none;
}

.more-window__item {
  padding-left: 15px;
  width: calc(100% - 15px);
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  border-radius: 5px;

  color: rgba(255, 255, 255, 0.7);
}

.more-window__item:hover {
  background-color: rgba(56, 58, 64);
  cursor: pointer;
}

.comment {
  position: relative;
  width: 100%;
  background-color: white;
  display: flex;
}

.input {
  position: relative;
  width: 70%;
  float: left;
  height: 30px;
  border: rgba(100, 100, 100) 1px solid;
  outline: none;
  border-radius: 5px;
  background-color: rgba(26, 27, 30);
  color: rgba(255, 255, 255, 0.7);
  padding-left: 10px;
  margin-left: 10px;
}

.root-comment {
  position: relative;
  width: 100%;
  display: flex;
  scale: 1 1;
  margin-top: 40px;
}

.child-comment {
  position: relative;
  width: calc(100% - 70px);
  display: flex;
  scale: 1;
  margin-top: 20px;
  justify-content: right;
}

.comment-left {
  width: 40px;
  height: 40px;
  display: inline-block;
}

.comment-right {
  width: 100%;
  display: inline-block;
  font-size: 20px;
}

.avatar-border {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  overflow-x: hidden;
  color: white;
}

.commenter-nickName {
  height: 25px;
  width: 95%;
  margin: auto;
  line-height: 20px;
  font-size: 16px;
  font-family: 'ZCool';
  color: rgba(255, 255, 255, 0.5);
}

.comment-content {
  width: 95%;
  margin: auto;
  font-size: 14px;
  text-align: left;
  line-height: 20px;
  letter-spacing: 0px;
  font-family: '黑体';
  color: white;
}

.comment-status {
  height: 20px;
  width: 95%;
  margin: auto;
  font-size: 12px;
  line-height: 25px;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
}

.status-item {
  height: 20px;
  display: flex;
  margin-left: 15px;
  cursor: pointer;
}

.status-item span {
  display: inline-block;
  font-weight: 700;
  height: 20px;
  /* line-height: 20px; */
  font-size: 12px;
  margin-left: 4px;
  color: rgba(255, 255, 255, 0.7);
}

.reply {
  position: relative;
  height: 30px;
  width: 90%;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  margin-top: 10px;
}

.reply button {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin-left: 5px;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 3px;
  background-color: rgba(25, 113, 194);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  letter-spacing: 3px;
}

.reply span {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  line-height: 30px;
}

.dither-animation {
  top: 48px;
}
</style>
