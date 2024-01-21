<!--
 * @Author: Dhx
 * @Date: 2023-12-13 13:27:46
 * @Description: 
 * @FilePath: \RvcWeb\src\components\editor\modelEditorComponent.vue
-->
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { storage } from '@/utils/storage';
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
      fieldName: 'file',
      server: '/rvcApi/model/upload/image',
      maxFileSize: 5 * 1024 * 1024,
      maxNumberOfFiles: 20,
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
      customInsert(res: any, insertFn: any) {
        insertFn(res.data.url)
      },
    },
    color: {

    }
  },
};
const mode = 'default';

const onCreated = (createdEditor: any) => {
  editor.value = Object.seal(createdEditor);
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
  <div style="border-radius:10px;border:rgba(100,100,100) 1px solid;margin-bottom: 30px;">
    <Toolbar style="border-bottom: 1px solid #ccc;position: sticky;width: 100%;z-index: 10;top: 0" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="min-height:200px;" v-model="html" :defaultConfig="editorConfig"
      :mode="mode" @onCreated="onCreated"  />
  </div>
</template>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
* {
  --w-e-textarea-bg-color: #fff;
  --w-e-textarea-color: #black;
}

:deep(.w-e-toolbar) {
  background-color: rgba(26,27,30)
}

:deep(.w-e-text-container) {
  background-color: rgba(26,27,30);
  text-align: left;
}
</style>