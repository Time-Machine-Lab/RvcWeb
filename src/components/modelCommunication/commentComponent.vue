<script setup lang="ts">
import { ref } from 'vue';
import { CommentVo, CommentForm } from '@/api/post/postType'
import {commentAdd} from '@/api/post/postApi'
let props = defineProps<{
  comment: CommentVo,
  showReply: (index: number) => boolean,
  index: number
}
>()
let commentStyle = ref(props.comment.rootCommentId == '' ? 'root-comment' : 'child-comment');
let showReplyText = ref('查看回复')
let inputVisibility = ref(false)
let inputContent = ref('')
const input = ref<any>(null)
const handleReply = function () {
  inputVisibility.value = true
  setTimeout(function () { input!.value!.focus() }, 500)
}
const handleBlur = function () {
  setTimeout(function(){inputVisibility.value = false},100)
}
const sendComment = function () {
  let form = ref<CommentForm>({
    content: inputContent.value,
    postId: props.comment.postId,
    rootCommentId: props.comment.rootCommentId,
    toCommentId: props.comment.postCommentId,
    toUserId: props.comment.userId
  })
  commentAdd(form.value).then(res=>{
    console.log(res);
    inputContent.value = ""

  })

}
</script>
<template>
  <div style="width: 100%;position: relative">
    <div :class="commentStyle">
      <div class="comment-left">
        <router-link :to="'/user?id=' + props.comment.userId">
          <div class="avatar-border">
            <img height="40" width="40" :src="props.comment?.user?.avatar" alt="commenter-avatar">
          </div>
        </router-link>
      </div>
      <div class="comment-right">
        <router-link :to="'/user?id=' + props.comment.userId">
          <div class="commenter-nickName">
            {{ props.comment?.user?.nickname }}:
          </div>
        </router-link>

        <div class="comment-content">
          <span
            style="display: inline-block;background-color: rgba(102,102,102,0.2);height: 80%;border-radius: 5px;padding: 1px">
            {{ props.comment?.replayUser ? '@' + props.comment?.replayUser?.nickname : '' }}
          </span>
          {{ props.comment?.content }}
        </div>
        <div class="comment-status">
          {{ props.comment?.createAt }}
          <span style="margin-left: 20px;cursor: pointer" @click="handleReply">
            回复
          </span>
          <span style="margin-left: 20px;cursor: pointer" @click="showReplyText = showReply(index) ? '收起' : '查看回复'"
            v-show="props.comment.rootCommentId == '' ? true : false">
            {{ showReplyText }}
          </span>
        </div>
        <div v-show="inputVisibility" class="reply">
          <span>{{ props.comment.user?.nickname }}:</span>
          <input class="input" placeholder="" v-model="inputContent" @blur="handleBlur" ref="input">
          <button :style="{ cursor: inputContent != '' ? 'pointer' : 'not-allowed' }" @click="sendComment()">发送</button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  text-align: left;
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
  background-color: rgba(40, 40, 40);
  color: rgba(255, 255, 255, 0.7);
  padding-left: 10px;
  margin-left: 10px;
}

.root-comment {
  position: relative;
  width: 100%;
  display: flex;
  scale: 1 1;
  margin-bottom: 10px;
}

.child-comment {
  position: relative;
  width: 100%;
  display: flex;
  scale: 0.8;
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
  font-size: 18px;
  font-family: 'standard5', serif;
  color: rgba(255, 255, 255, 0.5);
}

.comment-content {
  width: 95%;
  margin: auto;
  font-size: 18px;
  padding: 5px;
  text-align: left;
  line-height: 30px;
  letter-spacing: 2px;
  font-family: 'standard2', serif;
  color: white;
}

.comment-status {
  height: 20px;
  width: 95%;
  margin: auto;
  font-size: 12px;
  line-height: 25px;
  color: rgba(255, 255, 255, 0.5);
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
  background-color: #fb7299;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
  letter-spacing: 3px;
}

.reply span {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  line-height: 30px;
}
</style>
