<!--
 * @Author: Dhx
 * @Date: 2023-12-13 13:27:46
 * @Description: 
 * @FilePath: \RvcWeb\src\components\editor\editorComponent.vue
-->
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { storage } from '@/utils/storage';
import { ImageElement } from '@wangeditor/editor';
import { message } from '@/utils/message';
import { uploadImage } from '@/api/post/postApi';
let props = defineProps<{
  editorContent: string,
  getContent: (html: string) => void
}>()

const editor = ref<any>(null)
const toolbarConfig = {
  excludeKeys: [
    "insertVideo",
    "uploadVideo",
    "editVideoSize",
    "fullScreen", "codeBlock", "todo", "|", "group-video"
  ]
}
let html = ref(props.editorContent)

const editorConfig = {
  placeholder: '请输入内容...',
  autoFocus: true,
  scroll: false,
  MENU_CONF: {
    uploadImage: {
      server: '/rvcApi/communication/post/cover',
      maxFileSize: 5 * 1024 * 1024,
      maxNumberOfFiles: 20,
      uploadImgFmSize: 300,
      allowedFileTypes: ['image/*'],
      meta: {},
      metaWithUrl: false,
      headers: {
        token: storage.get<string>('token'), // Assuming VITE_APP_TOKEN is available in your environment variables
      },
      withCredentials: true,
      timeout: 10 * 1000,
      // onSuccess( ) {
      //   console.log(res);

      // },
      // onFailed(res:any) { //response格式不同，实际上这里是成功的
      //   console.log(res);
      // },
      // onError(file, err, res) {
      //   console.log(err,res);
      // },
      customInsert(res: any) {
        const node: ImageElement = {
              type: 'image',
              src: res.data.url,
              style: {
                width: '30%'
              },
              children: [{text: ''}]
            }
            editor.value.insertNode(node)
      },
      // 单个文件上传失败
      onFailed() {   // TS 语法
        // onFailed(file, res) {           // JS 语法
      },

      // 上传错误，或者触发 timeout 超时
      onError() {  // TS 语法
        // onError(file, err, res) {               // JS 语法
      },
    },
    color: {

    },
  }
};
const mode = 'default';

const onCreated = (createdEditor: any) => {
  editor.value = Object.seal(createdEditor);
  console.log(editor.value.getConfig());

  setInterval(() => {
    props.getContent(html.value)
  }, 2000);

};


onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

</script>
<template>
  <div style="border-radius:10px;border:rgba(100,100,100) 1px solid;">
    <Toolbar style="border-bottom: 1px solid #ccc;position: sticky;width: 100%;z-index: 10;top: 0" :editor="editor"
      :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="min-height:200px;" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
  </div>
</template>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
* {
  --w-e-textarea-bg-color: #fff;
  --w-e-textarea-color: #black;
}

:deep(.w-e-toolbar) {
  background-color: rgba(26, 27, 30);
}

:deep(.w-e-text-container) {
  background-color: transparent;
  text-align: left;
}
</style>