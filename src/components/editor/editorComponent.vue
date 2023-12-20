<!--
 * @Author: Dhx
 * @Date: 2023-12-13 13:27:46
 * @Description: 
 * @FilePath: \RvcWeb\src\components\editor\editorComponent.vue
-->
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
let props = defineProps<{
  content:string,
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
let html = ref(props.content)
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/api/notePicture/upload',
      maxFileSize: 5 * 1024 * 1024,
      maxNumberOfFiles: 20,
      allowedFileTypes: ['image/*'],
      meta: {},
      metaWithUrl: false,
      headers: {
        token: import.meta.env.VITE_APP_TOKEN, // Assuming VITE_APP_TOKEN is available in your environment variables
      },
      withCredentials: true,
      timeout: 10 * 1000,
      // onSuccess(file, res) {
      //   // Handle success
      // },
      // onFailed(file, res) {
      //   // Handle failure
      // },
      // onError(file, err, res) {
      //   // Handle error
      // },
    },
    color: {

    }
  },
};
const mode = 'default';

const onCreated = (createdEditor:any) => {
  editor.value = Object.seal(createdEditor);
  setInterval(() => {
    props.getContent(html.value)
  }, 2000);

};

const computedContent = ref(html);

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

</script>
<template>
  <div style="border-radius:10px;overflow:hidden;border:rgba(100,100,100) 1px solid">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="min-height:200px; overflow-y: hidden" v-model="computedContent" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="onCreated" />
  </div>
</template>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
* {
  --w-e-textarea-bg-color: #fff;
  --w-e-textarea-color: #black;
}

:deep(.w-e-toolbar) {
  background-color: transparent
}

:deep(.w-e-text-container) {
  background-color: transparent;
  text-align: left;
}
</style>
