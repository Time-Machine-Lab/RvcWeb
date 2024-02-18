<script lang="ts" setup>
import editorComponent from '@/components/editor/editorComponent.vue'
import "@/assets/css/post/postContent.css"
import { GetPostDetailsForm, PostForm, RvcCommunicationPostType } from '@/api/post/postType'
import { getPostType, postAdd, getPostDetails, uploadPicture } from '@/api/post/postApi'
import { ref } from 'vue'
import router from '@/router'
import "@/view/modelCommunication/style/editPost.css"
import { message } from '@/utils/message'
let tagsOption = ref<{
    value: string | undefined
    label: string | undefined
}[]>([])
let postForm = ref<PostForm>({
    title: '',
    content: '',
    coverId: '',
    coverUrl: '',
    tagId: ''
})
let oldPost = ref<{
    title: string,
    content: string,
    coverId: string | null,
    coverUrl: string | null,
    tagId: string,
    tagName: string
}>({
    title: '',
    content: '',
    coverId: '',
    coverUrl: '',
    tagId: '',
    tagName: ''
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
let uploadCoverLoading = ref(false)
let typeSelectvisibility = ref(false)
let clickType = ref(false)
let currentTypeIndex = ref(-1)
let uploadFailed = ref(false)
let saveDisabled = ref(false)
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
const postHasChanged = function () {
    return !(postForm.value.content == oldPost.value.content && postForm.value.title == oldPost.value.title && postForm.value.tagId == oldPost.value.tagId && postForm.value.coverId == oldPost.value.coverId)
}
const savePost = function () {
    if (saveDisabled.value) {
        return
    }
    if (!postHasChanged()) {
        return
    }
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
    postForm.value.postId = (router.currentRoute.value.query.postId as string)
    saveDisabled.value = true
    postAdd(postForm.value).then((res: any) => {
        if (res.code == 200) {
            message.success('保存成功')
            router.back()
        } else {
            message.error(res.msg)
            saveDisabled.value = false
        }
    })
}
const check = function () {
    return postForm.value.title == '' || postForm.value.tagId == '' || postForm.value.content == '<p><br></p>' || postForm.value.coverId == ''
}
const handleCoverSuccess = function () { }
const beforeCoverUpload = function (rawFile: File) {
    if ((rawFile.size / (1024 * 1024)) > 10) {
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
}
const getContent = function (html: string) {
    postForm.value.content = html
}

const loadOldPost = function () {
    let form = ref<GetPostDetailsForm>({
        postId: (router.currentRoute.value.query.postId as string)
    })
    getPostDetails(form.value).then((res: any) => {
        if (res.code == 200) {
            let data = res.data
            oldPost.value.title = data.title
            oldPost.value.content = data.content
            oldPost.value.tagId = data.postType.id
            oldPost.value.coverUrl = data.cover
            oldPost.value.coverId = data.coverId
            oldPost.value.tagName = data.postType.tagName
            postForm.value.title = oldPost.value.title
            postForm.value.content = oldPost.value.content
            postForm.value.tagId = oldPost.value.tagId
            postForm.value.coverUrl = oldPost.value.coverUrl
            postForm.value.coverId = oldPost.value.coverId
            postForm.value.tagName = oldPost.value.tagName
        } else {
            message.error(res.msg)
        }

    })

}
loadOldPost()

</script>
<template>
    <div class="editPost-page">
        <div class="editPost-page__center">
            <div class="editPost-page__center__left">
                <div class="label">
                    标题
                </div>
                <div style="width: 100%;height: 30px;">
                    <input class="input" placeholder="标题" :class="formWarning.title ? 'formWarning' : 'formDefault'"
                        v-model="postForm.title">
                </div>
                <div class="label">
                    内容
                </div>
                <div style="width: 90%; border-radius: 10px;" :class="formWarning.content ? 'formWarning' : 'formDefault'">
                    <editorComponent v-if="postForm.content" :getContent="getContent" :editorContent="postForm.content">
                    </editorComponent>
                </div>
            </div>

        </div>
        <div class="editPost-page__center__right">
            <!-- <div class="label">
              预览
          </div>
          <div class="post-content editPost-page__center__right__Preview" v-html="content">

          </div> -->
            <div class="button-group">
                <div class="button-group__submit" @click="savePost"
                    :style="{ cursor: !postHasChanged() ? 'not-allowed' : 'pointer' }">
                    保存
                </div>
            </div>
            <div class="label">
                封面
            </div>
            <div>
                <el-upload ref="uploadAudioRef" class="upload-demo"
                    :class="formWarning.tag ? 'el-formWarning' : 'el-formDefault'" drag :auto-upload="true"
                    :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload">
                    <div class="loadding" v-if="uploadCoverLoading"></div>
                    <div class="error" v-if="uploadFailed && !postForm.coverUrl">×</div>
                    <img v-if="postForm.coverUrl" style="width: 100%;" :src="postForm.coverUrl" />
                    <div class="el-upload__text">
                        将文件拖拽到此处或点击上传
                    </div>
                    <div class="el-upload__text">
                        最多可上传小于20M的图片
                    </div>
                </el-upload>
            </div>
            <div class="label">
                标签
            </div>
            <div style="text-align: left;">
                <div tabindex="-1" class="type-selecter"
                    :style="{ border: typeSelectvisibility ? 'rgba(24,100,171) 1px solid' : '' }"
                    :class="[clickType ? 'dither-animation' : '', formWarning.tag ? 'formWarning' : 'formDefault']"
                    @click="handleClickSort" @blur="handleBlur">
                    <div class="horizontal-center" style="display: flex;">
                        <span style="line-height: 40px;margin-left: 3px;width: 300px;">{{
                            currentTypeIndex != -1 ? tagsOption[currentTypeIndex]?.label : oldPost?.tagName }}</span>
                        <span>
                            <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                                :class="typeSelectvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                        </span>
                    </div>

                </div>
                <div class="type-select" v-show="typeSelectvisibility">
                    <el-scrollbar>
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