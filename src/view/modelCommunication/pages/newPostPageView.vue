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
  if(submitDisabled.value){
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
  if (rawFile.size / 1024 / 1024 > 10) {
    message.warning('请上传小于10M的图片')
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
    } else {
      uploadCoverLoading.value = false
      uploadFailed.value = true
      message.error('上传失败')
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

    </div>
    <div class="newPost-page__center__right">
      <!-- <div class="label">
              预览
          </div>
          <div class="post-content newPost-page__center__right__Preview" v-html="content">

          </div> -->
      <div class="button-group">
        <div class="button-group__save" @click="saveDraft">
          保存草稿
        </div>
        <div class="button-group__submit" :style="{cursor:submitDisabled?'not-allowed':'pointer'}" @click="submitPost">
          发表
        </div>
      </div>
      <div class="label">
        封面<span class="important">*</span>
      </div>
      <div>
        <el-upload ref="uploadAudioRef" class="upload-demo" :class="formWarning.tag ? 'el-formWarning' : 'el-formDefault'"
          drag :auto-upload="true" :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload">
          <div class="loadding" v-if="uploadCoverLoading"></div>
          <div class="error" v-if="uploadFailed && !postForm.coverUrl">×</div>
          <img v-if="postForm.coverUrl" style="width: 100%;" :src="postForm.coverUrl" />
          <div class="el-upload__text">
            将文件拖拽到此处或点击上传
          </div>
          <div class="el-upload__text">
            最多可上传1个封面
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
          <div class="type-select__item" v-for="(tag, index) in tagsOption" :key="index"
            @click="currentTypeIndex = index; typeSelectvisibility = false; postForm.tagId = tagsOption[currentTypeIndex]?.value!">
            {{ tag.label }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped>
:deep(.upload-demo *) {
  background-color: transparent;
}

.upload-demo {
  position: relative;
  width: 100%;
  max-height: 400px;
  overflow: scroll;
}

.newPost-page {
  position: relative;
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
  background-color: rgba(26, 27, 30);
}

.newPost-page__center {
  position: relative;
  width: 80%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

.newPost-page__center__left {
  position: relative;
  width: 60%;
  overflow: scroll;
  margin: 30px 0;
}

.newPost-page__center__right {
  height: 100%;
  width: 25%;
  max-width: 400px;
  position: fixed;
  top: 150px;
  left: calc(40% + 450px);
}

.newPost-page__center :deep(.el-breadcrumb__inner) {
  color: white;
}


.cover-uploader {
  display: flex;
  justify-content: left;
}

.loadding {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  height: 34px;
  width: 34px;
  border-radius: 17px;
  background-color: rgba(44, 46, 51);
  font-size: 20px;
  line-height: 36px;
  color: white;
  font-weight: 700;
  border-top: rgba(25, 113, 194) 1px solid;
  margin-bottom: 20px;
  animation: roll 1s linear infinite;
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.error {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background-color: rgba(44, 46, 51);
  font-size: 20px;
  line-height: 36px;
  color: white;
  font-weight: 700;
  margin-bottom: 20px;
}

:deep(.cover-uploader .el-upload) {
  border: 1px dashed grey;
  border-radius: 6px;
  width: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: rgba(37, 38, 43);
  transition: var(--el-transition-duration-fast);
}

:deep(.cover-uploader .el-upload:hover) {
  border-color: grey;
}

:deep(.el-icon.cover-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 178px;
  text-align: center;
}

.label {
  display: block;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 5px;
}

.important {
  color: rgba(224, 49, 49);
}

.type-selecter {
  height: 40px;
  padding: 0 20px;
  border-radius: 5px;
  background-color: rgba(37, 38, 43);
  cursor: pointer;
  display: flex;
  color: white;
  transition: all 0.3s;
  user-select: none;
  border: rgba(55, 58, 64) 1px solid;
}

.type-select {
  position: absolute;
  margin-top: 10px;
  width: 340px;
  border-radius: 10px;
  background-color: rgba(37, 38, 43);
  padding: 5px;
  z-index: 10;
  max-height: 100px;
  overflow: scroll;
  user-select: none;
}

.type-select__item {
  position:relative;
  padding-left: 15px;
  width: calc(100% - 15px);
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
}

.type-select__item:hover {
  background-color: rgba(56, 58, 64);
  cursor: pointer;
}

.input {
  position: relative;
  width: 90%;
  float: left;
  height: 30px;
  outline: none;
  border-radius: 5px;
  background-color: rgba(37, 38, 43);
  color: rgba(255, 255, 255, 0.7);
  padding-left: 10px;
}

.newPost-page__center__right__Preview {
  height: 700px;
  width: calc(100% - 20px);
  padding: 10px;
  border: rgba(255, 255, 255, 0.4) 1px solid;
  border-radius: 10px;
}

.button-group {
  position: relative;
  /* height: 50px; */
  width: 100%;
}

.button-group__save {
  position: relative;
  height: 40px;
  width: 100%;
  border-radius: 5px;
  top: 50%;
  left: 100%;
  transform: translate(-100%, -50%);
  background-color: rgba(37, 38, 43);
  color: white;
  font-size: 16px;
  /* font-weight: 700; */
  line-height: 40px;
  cursor: pointer;
  user-select: none;
  margin-top: 5px;
  transition: all 0.3s;
}

.button-group__submit {
  position: relative;
  height: 40px;
  width: 100%;
  border-radius: 5px;
  top: 50%;
  left: 100%;
  transform: translate(-100%, -50%);
  background-color: rgba(0, 122, 204);
  color: white;
  font-size: 16px;
  /* font-weight: 700; */
  line-height: 40px;
  cursor: pointer;
  user-select: none;
  margin-top: 15px;
  transition: all 0.3s;
}

.dither-animation {
  top: 36px;
}

.revolve-animation {
  transform: rotateZ(180deg);
  transform-origin: 6px 3px;
}

.button-group__submit:hover {
  background-color: rgba(20, 142, 224);
}

.formWarning {
  border: rgba(224, 49, 49) 1px solid;
}

:deep(.el-formWarning .el-upload-dragger) {
  border: rgba(224, 49, 49) 1px dashed;
}

.formDefault {
  border: rgba(55, 58, 64) 1px solid;
}

:deep(.el-formDefault .el-upload-dragger) {
  border: rgba(55, 58, 64) 1px dashed;
}</style>