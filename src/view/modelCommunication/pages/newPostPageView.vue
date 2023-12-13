<script lang="ts" setup>
import editorComponent from '@/components/editor/editorComponent.vue'
import tagSelectComponent from '@/components/common/tagSelectComponent.vue'
import "@/assets/css/post/postContent.css"
import { PostForm } from '@/api/post/postType'
import { ref } from 'vue'
const handleCoverSuccess = function () { }
const beforeCoverUpload = function () { }
let content = ref('')
const getContent = function (html: string) {
    content.value = html
}
let post = ref<PostForm>({
    title: '',
    content: '',
    cover: ''
})
const submitPost = function () {
    post.value.content = content.value
}
</script>
<template>
    <div class="newPost-page">
        <div class="newPost-page__center">
            <div class="newPost-page__center__left">
                <el-breadcrumb :separator="'>'">
                    <el-breadcrumb-item :to="{ path: '/communication' }">交流区</el-breadcrumb-item>
                    <el-breadcrumb-item>新建贴子</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="label">
                    封面
                </div>
                <div>
                    <el-upload class="cover-uploader" action="http://124.71.107.76" :show-file-list="false"
                        :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload">
                        <img v-if="post.cover" :src="post.cover" class="cover" />
                        <el-icon v-else class="cover-uploader-icon"> + </el-icon>
                    </el-upload>
                </div>
                <div class="label">
                    标签
                </div>
                <div>
                    <tagSelectComponent></tagSelectComponent>
                </div>
                <div class="label">
                    标题
                </div>
                <div style="width: 100%;height: 30px;">
                    <input class="input" placeholder="标题">
                </div>
                <div class="label">
                    内容
                </div>
                <div style="width: 90%;">
                    <editorComponent :getContent="getContent"></editorComponent>
                </div>
            </div>
            <div class="newPost-page__center__right">
                <div class="label">
                    预览
                </div>
                <div class="post-content newPost-page__center__right__Preview" v-html="content">

                </div>
                <div class="button-group">
                    <div class="button-group__submit" @click="submitPost">
                        发表
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
    background-color: rgba(30, 30, 30);
}

.newPost-page__center {
    position: relative;
    width: 90%;
    height: 95%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
}

.newPost-page__center__left {
    height: 100%;
    width: 50%;
}

.newPost-page__center__right {
    margin-left: 30px;
    height: 100%;
    width: 50%;
}

.newPost-page__center :deep(.el-breadcrumb__inner) {
    color: white;
}

.cover-uploader .cover {
    width: 178px;
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
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: rgba(40, 40, 40);
    transition: var(--el-transition-duration-fast);
}

:deep(.cover-uploader .el-upload:hover) {
    border-color: grey;
}

:deep(.el-icon.cover-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
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

.input {
    position: relative;
    width: 90%;
    float: left;
    height: 30px;
    border: rgba(100, 100, 100) 1px solid;
    outline: none;
    border-radius: 5px;
    background-color: rgba(40, 40, 40);
    color: rgba(255, 255, 255, 0.7);
    padding-left: 10px;
}

.newPost-page__center__right__Preview {
    height: 600px;
    width: calc(100% - 20px);
    padding: 10px;
    border: rgba(255, 255, 255, 0.4) 1px solid;
    border-radius: 10px;
}

.button-group{
    position: relative;
    height: 50px;
    width: 100%;
}
.button-group__submit{
    position:relative;
    height: 30px;
    width: 70px;
    border-radius: 5px;
    top: 50%;
    left: 100%;
    transform: translate(-100%,-50%);
    background-color: rgba(0,122,204);
    color: white;
    font-size: 16px;
    font-weight: 700;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
}
.button-group__submit:hover{
    background-color: rgba(20,142,224);
}
</style>