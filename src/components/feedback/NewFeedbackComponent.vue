<script setup lang="ts">
import { ref } from 'vue'
import {MdEditor} from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import {Add} from '@/api/feedback/feedbackTypes.ts'
import {postAdd} from '@/api/feedback/feedbackAPI.ts'
// 富文本编辑器
const onUploadImg = (files: any) => {
  console.log(files)
}

// 交换按钮样式
const button1 = ref<HTMLButtonElement | null>(null);
const button2 = ref<HTMLButtonElement | null>(null);
const swapStyles = () => {
  if (button1.value && button2.value) {
    // 交换两个按钮的类名
    [button1.value.className, button2.value.className] = [button2.value.className, button1.value.className];
  }
};
// 提交表单
const postTitle = ref('');
const postContent = ref('');
const postType = ref<number | null>(2);
const setType = (type: number) => {
  swapStyles();
  postType.value = type;
};
const submitForm = async () => {
  const formData: Add = {
    title: postTitle.value,
    content: postContent.value,
    type: Number(postType.value),
    fbid: '1',  // 如果是添加新帖子，可以忽略这个属性
  };
  try {
    // postAdd(formData).then(res=>{
    //   console.log(res);
    // })
    const response = await postAdd(formData);
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
        <!--表单内容-->
        <form class="box-contain-form" @submit.prevent="submitForm">
          <h3>创建帖子</h3>
          <div class="box-contain-mention flex">
            <h6>已启用帖子审核。</h6>
            <p>您的帖子将被转发给团队，但在批准之前不会公开显示。</p>
          </div>
          <h4>标题</h4>
          <input v-model="postTitle" placeholder="帖子标题" class="box-contain-title">
          <h4>板</h4>
          <div class="box-contain-btn">
            <!--点击按钮交换样式-->
            <button ref="button1" @click="setType(1)" class="function">功能请求</button>
            <button ref="button2" @click="setType(2)" class="mistake">错误</button>
          </div>
          <h4>内容</h4>
          <div class="box-contain-editor">
            <md-editor v-model="postContent" @on-upload-img="onUploadImg" theme="dark" noMermaid/>
          </div>
          <button type="submit" class="submit">提交帖子</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

button{
  padding: 8px 15px;
  border: solid 1px #525252;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.66);
}
.box{
  position: fixed;
  backdrop-filter: blur(3px); /* 模糊效果 */
  width:100vw;
  height:100%;
  z-index: 7;
  overflow: scroll;
  .box__center{
    position: absolute;
    top:0;
    width:580px;
    height:100vh;
    z-index: 11;
    .box-contain{
      position: relative;
      top:50px;
      background: rgba(26, 32, 45, 0.82);
      width:100%;
      height:540px;
      border-radius: 10px;
      .box-contain-form{
        width:90%;
        height:92%;
      }
      h3{
        text-align: left;
        margin-bottom: 10px;
        color:#ffffff;
      }
      h4{
        text-align: left;
        margin-top: 10px;
        margin-bottom: 10px;
        color: rgba(231, 231, 231, 0.72);
      }
      .box-contain-mention{
        background: rgba(250, 213, 162, 0.24);
        justify-content: left;
        border-radius: 7px;
        border: solid 1px #866641;
        width:100%;
        height:35px;
        h6{
          color: #fcf1cc;
          margin-left: 10px;
        }
        p{
          color: #fcf1cc;
          font-size: 12px;
        }
      }
      .box-contain-title{
        background: rgba(252, 252, 252, 0.07);
        justify-content: left;
        border-radius: 8px;
        border: solid 1px #3b3b3b;
        width:100%;
        height:35px;
      }
      .box-contain-title::placeholder{
        position: relative;
        left:10px;
        color: #a6a6a6;
      }
      .box-contain-btn{
        display: flex;
        justify-content: space-between;
        width:30%;
        .function{
          background: rgba(255, 255, 255, 0.09);
        }
        .mistake{
          background: #3784da;
          color:#ffffff;
        }
      }
      .box-contain-editor{
        width:100%;
        height:180px;
        overflow-y: scroll;
      }
      .submit{
        background: #3784da;
        color:#ffffff;
        position: absolute;
        bottom: 20px;
        right:5%;
      }
    }
  }
}

</style>