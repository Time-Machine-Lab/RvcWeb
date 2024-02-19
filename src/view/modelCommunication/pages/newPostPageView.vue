<script lang="ts" setup>
import editorComponent from '@/components/editor/editorComponent.vue'
import "@/assets/css/post/postContent.css"
import { PostForm, RvcCommunicationPostType } from '@/api/post/postType'
import { getPostType, postAdd, uploadPicture } from '@/api/post/postApi'
import { ref } from 'vue'
import { storage } from '@/utils/storage'
import { message } from '@/utils/message'
import router from '@/router'
let tagsOption = ref<{
  value: string | undefined
  label: string | undefined
}[]>([])
let content = ref('')
let postForm = ref<PostForm>({
  title: '',
  content: '',
  coverId: '',
  tagId: '',
  coverUrl: ''
})
let draft = ref<{
  title: string,
  content: string,
  coverId: string,
  coverUrl: string,
  tagId: string,
  tagName: string
}>()
let formWarning = ref<{
  title: boolean,
  content: boolean,
  cover: boolean,
  tag: boolean
}>({
  title: false,
  content: false,
  cover: false,
  tag: false
})
getPostType().then(res => {
  let data = <RvcCommunicationPostType[]>(res.data)
  for (let i = 0; i < data.length; i++) {
    tagsOption.value.push({
      value: data[i].id,
      label: data[i].tagName
    })
  }
})
let typeSelectvisibility = ref(false)
let clickType = ref(false)
let uploadCoverLoading = ref(false)
let currentTypeIndex = ref(-1)
let uploadFailed = ref(false)
let submitDisabled = ref(false)
const handleClickSort = function () {
  clickType.value = true
  typeSelectvisibility.value = !typeSelectvisibility.value
  setTimeout(function () {
    clickType.value = false
  }, 200)
}
const handleBlur = function () {
  setTimeout(function () {
    typeSelectvisibility.value = false
  }, 200)
}
const submitPost = function () {
  if (submitDisabled.value) {
    return
  }
  postForm.value.content = content.value
  console.log(postForm.value);

  if (check()) {
    formWarning.value.content = postForm.value.content == '<p><br></p>'
    formWarning.value.title = postForm.value.title == ''
    formWarning.value.cover = postForm.value.coverUrl == ''
    formWarning.value.tag = postForm.value.tagId == ''
    setTimeout(function () {
      formWarning.value.content = false
      formWarning.value.title = false
      formWarning.value.cover = false
      formWarning.value.tag = false
    }, 300)
    return
  }
  submitDisabled.value = true
  postAdd(postForm.value).then((res: any) => {
    if (res.code == 200) {
      message.success('发布成功')
      router.back()
    } else {
      message.error(res.msg)
      submitDisabled.value = false
    }
  })
  storage.remove('postDraft')
}
const handleCoverSuccess = function () { };
const beforeCoverUpload = function (rawFile: File) {
  if ((rawFile.size / (1024 * 1024)) > 10) {
    message.warning('请上传小于10M的图片')
    return false
  }
  if (rawFile.type != 'image/jpeg' && rawFile.type != 'image/png') {
    message.error('文件不合法')
    return false
  }
  uploadCoverLoading.value = true
  setTimeout(function () {
    if (postForm.value.coverUrl == '') {
      uploadCoverLoading.value = false
      uploadFailed.value = true
    }
  }, 100000)
  uploadPicture(rawFile).then((res: any) => {
    if (res.code == 200) {
      uploadCoverLoading.value = false
      postForm.value.coverId = res.data.id
      postForm.value.coverUrl = res.data.url
      message.success('上传成功')
    } else if (res.code == 506) {
      message.error('不支持该图片类型')
    } else {
      uploadCoverLoading.value = false
      uploadFailed.value = true
      message.error('上传失败')
      message.error(res.msg)
    }
  })
  return false
};
const getContent = function (html: string) {
  content.value = html
}
const saveDraft = function () {
  postForm.value.content = content.value
  storage.set("postDraft", {
    title: postForm.value?.title,
    content: postForm.value?.content,
    coverId: postForm.value?.coverId,
    coverUrl: postForm.value?.coverUrl,
    tagId: postForm.value?.tagId,
    tagName: tagsOption.value[currentTypeIndex.value]?.label
  })
  message.success('保存成功')
}
const check = function () {
  return postForm.value.title == '' || postForm.value.tagId == '' || postForm.value.content == '<p><br></p>' || postForm.value.coverId == ''
}
const loadDraft = function () {
  draft.value = storage.get<{
    title: string,
    content: string,
    coverId: string,
    coverUrl: string,
    tagId: string,
    tagName: string
  }>("postDraft")!
  if (!draft.value) return

  postForm.value.title = draft.value?.title
  postForm.value.content = draft.value?.content
  postForm.value.tagId = draft.value?.tagId
  postForm.value.coverId = draft.value?.coverId
  postForm.value.coverUrl = draft.value?.coverUrl
}
loadDraft()

</script>
<template>
  <div class="newPost-page">
    <div class="newPost-page__center">
      <el-scrollbar>
        <div class="newPost-page__center__left">
        <div class="label">
          标题<span class="important">*</span>
        </div>
        <div style="width: 100%;height: 30px;">
          <input class="input" placeholder="标题" :class="formWarning.title ? 'formWarning' : 'formDefault'"
            v-model="postForm.title">
        </div>
        <div class="label">
          内容<span class="important">*</span>
        </div>
        <div style="width: 90%;border-radius: 10px;" :class="formWarning.content ? 'formWarning' : 'formDefault'">
          <editorComponent :getContent="getContent" st :editor-content="postForm.content"></editorComponent>
        </div>
      </div>
      </el-scrollbar>
      

    </div>
    <div class="newPost-page__center__right">
      <div class="button-group">
        <div class="button-group__save" @click="saveDraft">
          保存草稿
        </div>
        <div class="button-group__submit" :style="{ cursor: submitDisabled ? 'not-allowed' : 'pointer' }" @click="submitPost">
          发表
        </div>
      </div>
      <div class="label">
        封面<span class="important">*</span>
      </div>
      <div>
        <el-upload ref="uploadAudioRef" accept="image/*" class="upload-demo"
          :class="formWarning.cover ? 'el-formWarning' : 'el-formDefault'" drag :auto-upload="true"
          :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload">
          <div class="loadding" v-if="uploadCoverLoading"></div>
          <div class="error" v-if="uploadFailed && !postForm.coverUrl">×</div>
          <img v-if="postForm.coverUrl" style="width: 100%;" :src="postForm.coverUrl" />
          <div class="el-upload__text" v-if="postForm.coverUrl == ''">
            将文件拖拽到此处或点击上传
          </div>
          <div class="el-upload__text" v-if="postForm.coverUrl == ''">
            可上传小于10M的图片
            支持jpg、png格式
          </div>
        </el-upload>
      </div>
      <div class="label">
        标签<span class="important">*</span>
      </div>
      <div style="text-align: left;">
        <div tabindex="-1" class="type-selecter"
          :style="{ border: typeSelectvisibility ? 'rgba(24,100,171) 1px solid' : '' }"
          :class="[clickType ? 'dither-animation' : '', formWarning.tag ? 'formWarning' : 'formDefault']"
          @click="handleClickSort" @blur="handleBlur">
          <div class="horizontal-center" style="display: flex;width: 100%;justify-content: space-between;">
            <span style="line-height: 40px;margin-left: 3px;width: 100px;">{{
              currentTypeIndex != -1 ? tagsOption[currentTypeIndex]?.label : draft?.tagName }}</span>
            <span style="display:block;position: relative;right: 0;">
              <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                :class="typeSelectvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
            </span>
          </div>

        </div>
        <div class="type-select" v-show="typeSelectvisibility">
          <el-scrollbar style="height: 150px;">
            <div class="type-select__item" v-for="(tag, index) in tagsOption" :key="index"
              @click="currentTypeIndex = index; typeSelectvisibility = false; postForm.tagId = tagsOption[currentTypeIndex]?.value!">
              {{ tag.label }}
            </div>
          </el-scrollbar>

        </div>
      </div>

    </div>
  </div>
</template>
<style scoped>
@import "@/view/modelCommunication/style/newPost.css";
</style>