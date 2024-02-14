<script setup lang="ts">
import { ref } from 'vue'
import {MdEditor, ToolbarNames} from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import {FeedbackItem, TypeListItem, Update} from '@/api/feedback/feedbackTypes.ts'
import {getTypeList, postUpdate} from '@/api/feedback/feedbackAPI.ts'
import {onMounted} from "vue";
import {message} from "@/utils/message.ts";
import TurndownService from 'turndown'
// 关闭弹窗
const emits = defineEmits(['data','close']);
const close = () => {
  emits('close');
};
// 获取帖子fbid
const props = defineProps(['data','type']);
// 获取反馈帖子的所有类型
const Type = ref<TypeListItem[]>([])
Type.value = props.type
if(props.type){
  Type.value = props.type
}else{
  getTypeList().then((res: any) => {
    console.log(res);
    Type.value = res.data.list;
  });
}
const FeedbackData = ref<FeedbackItem>(<FeedbackItem>{})
const selectedButtonIndex = ref(0);
const postTitle = ref("")
const postContent = ref("")
const postType = ref(0)
const getData = () => {
  FeedbackData.value = props.data
  let Service = new TurndownService();
  let markdown = Service.turndown( FeedbackData.value.content);
  FeedbackData.value.content = markdown

  selectedButtonIndex.value = FeedbackData.value.type
  postTitle.value = FeedbackData.value.title
  postContent.value = FeedbackData.value.content
  postType.value = FeedbackData.value.type
};
// 交换按钮样式
const setType = (index: number) => {
  selectedButtonIndex.value = index;
  postType.value = index;
};
// 提交表单
const submitForm = () => {
  if(!postTitle.value) {
    message.error("标题不能为空")
    return
  }
  if(!postContent.value){
    message.error("内容不能为空")
    return
  }
  const formData: Update = {
    title: postTitle.value,
    content: postContent.value,
    type: postType.value,
    fbid: props.data.fbid,  // 如果是添加新帖子，可以忽略这个属性
  };
  postUpdate(formData).then((res: any) => {
    if (res.code == 200) {
      message.success('修改成功')
      FeedbackData.value.title = postTitle.value
      FeedbackData.value.content = postContent.value
      FeedbackData.value.type = postType.value
      emits('data',FeedbackData.value)
    } else {
      message.error('修改失败')
    }
  });
  close()
};
onMounted(() => {
  getData()
});
const toolbars: ToolbarNames[] =
    ['bold', 'underline', 'italic',
      'quote', 'codeRow', 'code', 'link', 'pageFullscreen',
      'preview', 'htmlPreview']
const saveHtml = (h: string) => {
  postContent.value = h
}
</script>

<template>
  <div class="box flex">
    <div class="box flex" @click="close"></div>
    <div class="box__center">
      <div class="box-contain flex">
        <button @click="close" class="close flex">X</button>
        <!--表单内容-->
        <form class="box-contain-form" >
          <h3>编辑反馈</h3>
          <div class="box-contain-mention flex">
            <h6>已启用帖子审核。</h6>
            <p>您的帖子将被转发给团队，但在批准之前不会公开显示。</p>
          </div>
          <h4>标题</h4>
          <input v-model="postTitle" class="box-contain-title">
          <h4>板</h4>
          <div class="box-contain-btn">
            <!--点击按钮交换样式-->
            <button v-for="(item, index) in Type" :key="index" @click="setType(index)" :class="{ 'function': index !== selectedButtonIndex, 'mistake': index === selectedButtonIndex }">
              {{ item.type }}
            </button>
          </div>
          <h4>内容</h4>
          <div class="box-contain-editor">
            <md-editor v-model="FeedbackData.content" :toolbars="toolbars" @onHtmlChanged="saveHtml" :max-length="500" noMermaid/>
          </div>
          <button @click="submitForm" type="submit" class="submit">提交反馈</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.close{
  position: absolute;
  right:20px;
  top:10px;
  width:40px;
  height:40px;
  background: #919191;
  cursor: pointer;
  border: solid 1px #cccccc;
  border-radius: 50%;
  font-size: 16px;
  transition-duration: 0.2s;
}
.close:hover{
  color:#ffffff;
  background: #777777;
}
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
  height:100vh;
  z-index: 7;
  overflow: scroll;
  .box__center{
    position: absolute;
    top:0;
    width:580px;
    height:80vh;
    z-index: 11;
    .box-contain{
      position: relative;
      top:10px;
      background: rgba(243, 243, 243, 0.98);
      width:100%;
      height:560px;
      border-radius: 10px;
      .box-contain-form{
        width:90%;
        height:92%;
      }
      h3{
        text-align: left;
        margin-bottom: 10px;
        color: #646464;
      }
      h4{
        text-align: left;
        margin-top: 10px;
        margin-bottom: 10px;
        color: #646464;
      }
      .box-contain-mention{
        background: rgba(250, 213, 162, 0.24);
        justify-content: left;
        border-radius: 7px;
        border: solid 1px #f6d9b7;
        width:100%;
        height:35px;
        h6{
          color: #9b7d16;
          margin-left: 10px;
        }
        p{
          margin-top: 8px;
          color: #bd9d34;
          font-size: 12px;
        }
      }
      .box-contain-title{
        background: rgba(252, 252, 252, 0.07);
        justify-content: left;
        border-radius: 8px;
        border: solid 1px #9d9d9d;
        width:100%;
        height:35px;
        padding-left:15px;
      }
      .box-contain-title::placeholder{
        position: relative;
        color: #949494;
      }
      .box-contain-btn{
        height:40px;
        display: flex;
        justify-content: left;
        width:100%;
        button{
          width:130px;
          margin-right:10px;
        }
        .function{
          border: solid 1px #9d9d9d;
          background: rgba(255, 255, 255, 0.09);
          color:#72767b;
        }
        .mistake{
          border: solid 1px #9d9d9d;
          background: #6e6f70;
          color:#ffffff;
        }
      }
      .box-contain-editor{
        width:100%;
        height:180px;
        overflow-y: scroll;
      }
      .submit{
        margin-top: 10px;
        border: solid 1px #9d9d9d;
        background: #6e6f70;
        color: rgba(255, 255, 255, 0.98);
        transition-duration: 0.1s;
      }
      .submit:hover{
        background: #fcfcfc;
        color: #101010;
      }
    }
  }
}

</style>