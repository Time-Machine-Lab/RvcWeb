<script lang="ts" setup>
import editorComponent from '@/components/editor/editorComponent.vue'
import "@/assets/css/post/postContent.css"
import { PostForm, RvcCommunicationPostType } from '@/api/post/postType'
import { getPostType, postAdd } from '@/api/post/postApi'
import { ref } from 'vue'
import { storage } from '@/utils/storage'
import { message } from '@/utils/message'
let tagsOption = ref<{
  value: string | undefined
  label: string | undefined
}[]>([])
let content = ref('')
let postForm = ref<PostForm>({
  title: '',
  content: '',
  coverId: '',
  tagId: ''
})
let draft = ref<{
  title: string,
  content: string,
  coverId: string,
  coverBase64: string,
  tagId: string,
  tagName: string
}>()
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
let currentTypeIndex = ref(-1)
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
  postForm.value.content = content.value
  postAdd(postForm.value).then(res => {
    console.log(res);
  })
  storage.remove('postDraft')
}
const handleCoverSuccess = function () { }
const beforeCoverUpload = function () { }
const getContent = function (html: string) {
  content.value = html
}
const saveDraft = function () {
  postForm.value.content = content.value
  storage.set("postDraft", {
    title: postForm.value?.title,
    content: postForm.value?.content,
    coverId: postForm.value?.coverId,
    coverBase64: '',
    tagId: postForm.value?.tagId,
    tagName: tagsOption.value[currentTypeIndex.value]?.label
  })
  message.success('保存成功')
}
const loadDraft = function () {
  draft.value = storage.get<{
    title: string,
    content: string,
    coverId: string,
    coverBase64: string,
    tagId: string,
    tagName: string
  }>("postDraft")!
  postForm.value.title = draft.value.title
  postForm.value.content = draft.value.content
  postForm.value.tagId = draft.value.tagId
  postForm.value.coverId = draft.value.coverId
}
loadDraft()

</script>
<template>
  <div class="newPost-page">
    <div class="newPost-page__center">
      <div class="newPost-page__center__left">
        <el-breadcrumb :separator="'>'">
          <el-breadcrumb-item :to="{ path: '/rvc/posts' }">交流区</el-breadcrumb-item>
          <el-breadcrumb-item>新建贴子</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="label">
          标题
        </div>
        <div style="width: 100%;height: 30px;">
          <input class="input" placeholder="标题" v-model="postForm.title">
        </div>
        <div class="label">
          内容
        </div>
        <div style="width: 90%;">
          <editorComponent :getContent="getContent" :content="postForm.content"></editorComponent>
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
        <div class="button-group__submit" @click="submitPost">
          发表
        </div>
      </div>
      <div class="label">
        封面
      </div>
      <div>
        <el-upload class="cover-uploader" action="/communication/post/cover
" :show-file-list="false" :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload">
          <img v-if="postForm.cover" :src="postForm.cover" class="cover" />
          <el-icon v-else class="cover-uploader-icon"> + </el-icon>
        </el-upload>
      </div>
      <div class="label">
        标签
      </div>
      <div style="text-align: left;">
        <div tabindex="-1" class="type-selecter"
             :style="{ border: typeSelectvisibility ? 'rgba(24,100,171) 1px solid' : '' }"
             :class="clickType ? 'dither-animation' : ''" @click="handleClickSort" @blur="handleBlur">
          <div class="horizontal-center" style="display: flex;">
                        <span style="line-height: 40px;margin-left: 3px;width: 300px;">{{
                            currentTypeIndex != -1 ? tagsOption[currentTypeIndex]?.label : draft?.tagName }}</span>
            <span>
                            <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                                 :class="typeSelectvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                        </span>
          </div>

        </div>
        <div class="type-select" v-show="typeSelectvisibility">
          <div class="type-select__item" v-for="(tag, index) in tagsOption" :key="index"
               @click="currentTypeIndex = index; typeSelectvisibility = false; postForm.tagId = tagsOption[currentTypeIndex].value!">
            {{ tag.label }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped>
.newPost-page {
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: rgba(26, 27, 30);
}

.newPost-page__center {
  position: relative;
  width: 60%;
  height: 95%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

.newPost-page__center__left {
  height: 100%;
  width: 70%;
}

.newPost-page__center__right {
  height: 100%;
  width: 350px;
  position: fixed;
  top: 100px;
  right: 15%;

}

.newPost-page__center :deep(.el-breadcrumb__inner) {
  color: white;
}

.cover-uploader .cover {
  width: 100%;
  height: 178px;
  display: block;
}

.cover-uploader {
  display: flex;
  justify-content: left;
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
  margin-top: 30px;
  margin-bottom: 5px;
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
  border: rgba(55, 58, 64) 1px solid;
  background-color: rgba(37, 38, 43);
  padding: 5px;
  z-index: 10;
  user-select: none;
}

.type-select__item {
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
  border: rgba(100, 100, 100) 1px solid;
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
  margin-top: 15px;
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
  transform-origin: 6px 3.5px;
}

.button-group__submit:hover {
  background-color: rgba(20, 142, 224);
}
</style>