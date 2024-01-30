<!--
 * @Author: Dhx
 * @Date: 2023-12-06 19:12:20
 * @Description: 
 * @FilePath: \RvcWeb\src\view\rvcModel\pages\modelPageView.vue
-->

<script lang="ts" setup>
import userCardComponent from '@/components/user/userCardComponent.vue'
// import suggestedModelsComponent from '@/components/rvcModel/suggestedModelsComponent.vue'
import modelCommentsComponent from '@/components/rvcModel/modelCommentsComponent.vue'
import "@/assets/css/post/postContent.css"
import { getModelDetails } from "@/api/rvcModel/modelApi"
import { getModelFiles } from "@/api/rvcModel/fileApi.ts"
import { favoriteModel, collectModel } from '@/api/rvcModel/modelApi'
import { ref } from "vue";
import router from "@/router";
import { FavoriteAndCollectionForm, ModelVo } from "@/api/rvcModel/modelType";
import "@/assets/css/post/postContent.css"
import { message } from "@/utils/message";
import { ElMessageBox } from 'element-plus'
import { UserInfoVO } from '@/api/user/userTypes';
import { onBeforeRouteLeave } from 'vue-router'
import { Editor } from '@wangeditor/editor-for-vue'
onBeforeRouteLeave((to, _from, next) => {
    setTimeout(() => {
        if (to.fullPath.substring(1) == location.origin + '/' || to.matched.length != 0) {
            next()
            return
        }
        ElMessageBox.confirm(
            '您即将离开RVC,去往:' + fileUrl.value,
            '请注意您的账号和财产安全',
            {
                confirmButtonText: '前往',
                cancelButtonText: '取消'
            }
        ).then(() => {
            setTimeout(() => {
                console.log(to);
                location.href = to.fullPath.substring(1)
            }, 500)
        }).catch(() => {
            next(false)
        })
    }, 200);
})
let user = ref<UserInfoVO>({
    avatar: '',
    birthday: '',
    description: '',
    fansNum: '',
    followNum: '',
    nickname: '',
    sex: '',
    uid: '',
    username: ''
})
let isLike = ref("")
let errorRander = ref(false)
let collectDisabled = ref("")
getModelDetails((router.currentRoute.value.query.id as string)).then((res: any) => {
    if (res.code == 200) {
        localModel.value = res.data
        isLike.value = localModel.value.isLike
        collectDisabled.value = localModel.value.isCollection
        user.value = {
            avatar: localModel.value.avatar,
            nickname: localModel.value.nickname,
            birthday: '',
            description: '',
            fansNum: '',
            followNum: '',
            sex: '',
            uid: localModel.value.uid,
            username: ''
        }
        if (localModel.value.nickname == null) {
            user.value.nickname = "匿名"
        }
        handlePicture(localModel.value.description)
    }
})

let localModel = ref<ModelVo>({
    fileId: '',
    name: '',
    type: '',
    label: [],
    picture: '',
    description: '',
    note: '',
    viewNum: '',
    likesNum: '',
    collectionNum: '',
    isLike: '',
    isCollection: '',
    uid: '',
    username: '',
    nickname: '',
    avatar: '',
    createTime: '',
    updateTime: ''
})
let descriptionContent = ref('')
let fileUrl = ref('')
// let inputContent = ref<string>('')


let detailsvisibility = ref(false)
let modelFilesvisibility = ref(false)
// let audiosvisibility = ref(false)
// 收藏
const collect = function () {
    let form = <FavoriteAndCollectionForm>{
        modelId: (router.currentRoute.value.query.id as string),
        status: '0'
    }
    if (collectDisabled.value == "true") {
        collectDisabled.value = "false"
        localModel.value.isCollection = "false"
        form.status = '1'
        localModel.value.collectionNum = String(Number(localModel.value.collectionNum) - 1)
    } else if (collectDisabled.value == "false") {
        collectDisabled.value = "true"
        localModel.value.isCollection = "true"
        form.status = '0'
        localModel.value.collectionNum = String(Number(localModel.value.collectionNum) + 1)
    }
    collectModel(form).then((res: any) => {
        if (res.code == 200) {
            message.success('操作成功')
        } else {
            message.error('操作失败')
        }
    })
}
const like = () => {
    let form = <FavoriteAndCollectionForm>{
        modelId: (router.currentRoute.value.query.id as string),
        status: '0'
    }
    if (isLike.value == "true") {
        isLike.value = "false"
        localModel.value.isLike = "false"
        form.status = '1'
        localModel.value.likesNum = String(Number(localModel.value.likesNum) - 1)
    }
    else if (isLike.value == "false") {
        isLike.value = "true"
        localModel.value.isLike = "true"
        form.status = '0'
        localModel.value.likesNum = String(Number(localModel.value.likesNum) + 1)
    }
    console.log(isLike.value)
    favoriteModel(form).then((res: any) => {
        if (res.code == 200) {
            message.success('操作成功')
        } else {
            message.error('操作失败')
        }
    })
}
const calcNum = function (num: number) {
    return num < 1000 ? (num as unknown as string) : (num / 1000 + 'k' as string)
}
const handleClickDetails = function () {
    detailsvisibility.value = !detailsvisibility.value
}
const handleClickModelFiles = function () {
    modelFilesvisibility.value = !modelFilesvisibility.value
    getModelFilesFunc()
}
// const handleClickAudiosFiles = function () {
//     audiosvisibility.value = !audiosvisibility.value
// }
calcNum(1000)
const getModelFilesFunc = function () {
    if (fileUrl.value)
        modelFilesvisibility.value = false
    setTimeout(function () {
        modelFilesvisibility.value = true
    }, 1000)
    if (fileUrl.value) return

    getModelFiles((router.currentRoute.value.query.id as string)).then((res: any) => {
        if (res.code == 200) {
            let data = res.data
            if (!data || data.length == 0) {
                // message.warning('模型文件为空')
                return
            }
            fileUrl.value = data

        }
    })
}
const download = function () {
    if (fileUrl.value == null || fileUrl.value == "") {
        message.warning('链接失效')
        return
    }
    router.replace(fileUrl.value)
}
const handleShare = function () {
    var input = document.createElement("input");
    var body = document.body;
    body.appendChild(input);
    input.value = window.location.href;
    input.select();
    document.execCommand("copy");
    body.removeChild(input);
    message.success("已复制链接")
}
const handlePicture = function (htmlString: string) {
    const imgRegex = /<img[^>]*\ssrc\s*=\s*['"]([^'"]*)['"][^>]*\sstyle\s*=\s*['"][^'"]*width\s*:\s*([^'";]*)[^'"]*['"][^>]*>/g;
    const imgInfoArray: { src: string; width: string; }[] = [];

    let match;
    while ((match = imgRegex.exec(htmlString)) !== null) {
        const [, src, width] = match;
        imgInfoArray.push({ src, width });
    }
    let replacedHtml = htmlString;

    imgInfoArray.forEach(imgInfo => {
        const imgTagRegex = new RegExp(
            `<img[^>]*\\ssrc\\s*=\\s*['"]${imgInfo.src}['"][^>]*\\sstyle\\s*=\\s*['"][^'"]*width\\s*:\\s*${imgInfo.width}[^'"]*['"][^>]*>`,
            'g'
        );

        // const vImgTag = `<v-img src="${imgInfo.src}" lazy-src="${imgInfo.src}" width="${imgInfo.width}" class="bg-grey-lighten-2">
        //               <template v-slot:placeholder>
        //                   <v-row class="fill-height ma-0" align="center" justify="center">
        //                       <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
        //                   </v-row>
        //               </template>
        //             </v-img>`;
        const vImgTag = `<img data-src=${imgInfo.src} style="width:${imgInfo.width};height:100px" v-lazy-container="{ selector: 'img' }">`
        replacedHtml = replacedHtml.replace(imgTagRegex, vImgTag);
    });
    descriptionContent.value = replacedHtml
}
const editor = ref<any>(null)

</script>
<template>
    <div class="model-page">

        <div class="model-page__model">
            <!-- <el-breadcrumb :separator="'>'">
                <el-breadcrumb-item :to="{ path: '/rvc/models' }">模型区</el-breadcrumb-item>
                <el-breadcrumb-item>模型</el-breadcrumb-item>
            </el-breadcrumb> -->
            <div class="model-page__model__title">
                <span class="scroll-text">
                    {{ localModel?.name }}
                </span>
            </div>
            <div class="other-info">
                <div class="other-info__stats__item">
                    <div style="height: 16px;width: 16px;" :style="{ backgroundImage: 'url(\'/icon/eye.svg\')' }">
                    </div>
                    <span>{{ localModel.viewNum }}</span>
                </div>
                <div class="other-info__stats__item" @click="collect()">
                    <div style="height: 16px;width: 16px;"
                        :style="{ backgroundImage: collectDisabled == 'true' ? 'url(\'/icon/mark-fill.svg\')' : 'url(\'/icon/mark.svg\')' }">
                    </div>
                    <span>{{ localModel.collectionNum }}</span>
                </div>
                <div class="other-info__stats__item" @click="like()">
                    <div style="height: 16px;width: 16px;"
                        :style="{ backgroundImage: isLike == 'true' ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                    </div>
                    <span>{{ localModel.likesNum }}</span>
                </div>
            </div>
            <div class="model-page__model__info">
                <div class="model-page__model__info__author__avatar" @click="router.push('/user?id=' + localModel?.uid)"
                    :style="{ backgroundImage: 'url(\'' + localModel?.avatar + '\')' }">

                </div>
                <div class="model-page__model__info__author__username" @click="router.push('/user?id=' + localModel?.uid)">
                    <div class="model-page__model__info__author__text__username">
                        {{ localModel?.nickname }}
                    </div>
                </div>
                <span class="line">|</span>
                <div class="model-page__model__info__createAt">
                    {{ localModel?.createTime }}
                </div>
                <span class="line">|</span>
                <div class="model-page__model__info__tags" v-for="(label, index) in localModel?.label" :key="index">
                    <span>{{ label.name }}</span>
                </div>
            </div>
            <div class="post-content model-page__model__content" v-if="localModel.description != '' && !errorRander"
                v-html="descriptionContent" v-lazy-container="{ selector: 'img' }">
            </div>
            <!-- <div class="post-content model-page__model__content" v-if="localModel.description != '' && errorRander"
                id="postRander">
                <Editor style="width: 100%;height: 100%;background-color: transparent;" v-model="localModel.description" :defaultConfig="{ readOnly: true }" :mode="'default'"
                    @onCreated="(createdEditor: any) => {
                        editor = Object.seal(createdEditor);
                    }" />
            </div> -->
        </div>
        <div class="model-page__sidebar">
            <div class="button-group">
                <div class="button-group__item" @click="getModelFilesFunc">
                    <img class="vertical-center" src="/icon/download.svg" height="20" width="20">
                    <div class="button-group__item__msg">
                        下载模型
                    </div>
                </div>
                <div class="button-group__item" @click="message.warning('开发中')">
                    <img class="vertical-center" src="/icon/play.svg" height="30" width="30">
                    <div class="button-group__item__msg">
                        试听音频
                    </div>
                </div>
                <div class="button-group__item" @click="handleShare">
                    <img class="vertical-center" src="/icon/share.svg" height="20" width="20">
                    <div class="button-group__item__msg">
                        分享
                    </div>
                </div>
                <div class="button-group__item" @click="like">
                    <img class="vertical-center" :src="isLike == 'true' ? '/icon/heart-fill.svg' : '/icon/heart.svg'"
                        height="20" width="20">
                    <div class="button-group__item__msg">
                        喜欢
                    </div>
                </div>
                <div class="button-group__item" @click="collect">
                    <img class="vertical-center" :src="collectDisabled == 'true' ? '/icon/mark-fill.svg' : '/icon/mark.svg'"
                        height="20" width="20">
                    <div class="button-group__item__msg">
                        收藏
                    </div>
                </div>
            </div>
            <div class="details">
                <div tabindex="-1" class="details-switch" @click="handleClickDetails">
                    <div :style="{ backgroundColor: detailsvisibility ? 'rgba(26,27,30)' : '' }">
                        <span>模型信息</span>
                        <span>
                            <img width="12" height="12" class="vertical-center" style="transition: all 0.2s;"
                                :class="detailsvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                        </span>
                    </div>
                </div>
                <div class="details-content" v-show="!detailsvisibility">
                    <div class="details-content__item">
                        <div class="details-content__item__label">
                            类型
                        </div>
                        <div class="details-content__item__value">
                            <span class="model_type">
                                {{ localModel?.type }}
                            </span>
                        </div>
                    </div>
                    <div class="details-content__item">
                        <div class="details-content__item__label">
                            上传时间
                        </div>
                        <div class="details-content__item__value">
                            <div class="details-content__item__value--time">
                                {{ localModel.createTime }}
                            </div>
                        </div>
                    </div>
                    <div class="details-content__item">
                        <div class="details-content__item__label">
                            更新时间
                        </div>
                        <div class="details-content__item__value">
                            <div class="details-content__item__value--time">
                                {{ localModel.updateTime }}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="details">
                <div tabindex="-1" class="details-switch" @click="handleClickModelFiles">
                    <div :style="{ backgroundColor: modelFilesvisibility ? 'rgba(26,27,30)' : '' }">
                        <span>下载链接</span>
                        <span>
                            <img width="12" height="12" class="vertical-center" style="transition: all 0.2s;"
                                :class="modelFilesvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                        </span>
                    </div>
                </div>
                <div class="details-content" v-show="modelFilesvisibility">
                    <div class="details-content__item">
                        <!-- <div class="details-content__item__label">
                            文件
                        </div>
                        <div class="details-content__item__value">
                            <span class="fileName vertical-center">
                                {{ file.fileName }}
                            </span>
                            <spna class="button vertical-center" @click="download()">
                                <a>fileUrl</a>
                            </spna>
                        </div> -->
                        <a v-if="fileUrl != ''" class="fileUrl" @click="download()">{{ fileUrl }}</a>
                        <div v-else class="loading"></div>
                    </div>

                </div>
            </div>
            <!-- <div class="details">
                <div tabindex="-1" class="details-switch" @click="handleClickAudiosFiles">
                    <div :style="{ backgroundColor: audiosvisibility ? 'rgba(26,27,30)' : '' }">
                        <span>模型音频</span>
                        <span>
                            <img width="12" height="12" class="vertical-center" style="transition: all 0.2s;"
                                :class="audiosvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                        </span>
                    </div>
                </div>

            </div> -->
            <div class="author-box">
                <userCardComponent :user="user"></userCardComponent>
            </div>

        </div>

    </div>
    <!-- <suggestedModelsComponent></suggestedModelsComponent> -->
    <modelCommentsComponent :model-id="(router.currentRoute.value.query.id as string)"></modelCommentsComponent>
</template>
<style scoped>
.model-page {
    width: 75%;
    /* overflow: auto; */
    min-height: 80vh;
    position: relative;
    left: 50%;
    display: flex;
    margin-top: 20px;
    transform: translate(-50%);
}

.model-page__model {
    position: relative;
    width: 70%;
    min-width: 450px;
    /* background-color: rgba(0,0,0,0.1); */
}

.model-page__model :deep(.el-breadcrumb__inner) {
    color: white;
}

.model-page__sidebar {
    width: 30%;
    min-width: 250px;
    /* background-color: rgba(0,0,0,0.1); */
    margin-left: 10px;
}

.button-group {
    width: 100%;
    height: 50px;
    margin-top: 100px;
    display: flex;
}

.button-group__item {
    position: relative;
    margin: 0 5px;
    top: 50%;
    transform: translate(0, -50%);
    height: 40px;
    width: 40px;
    border-radius: 3px;
    background-color: rgba(52, 58, 64);
    cursor: pointer;
}

.button-group__item__msg {
    position: absolute;
    top: -40px;
    font-size: 16px;
    line-height: 30px;
    padding: 0 5px;
    width: 80px;
    color: white;
    background-color: rgba(37, 38, 43);
    border-radius: 5px;
    visibility: hidden;
}

.button-group__item:nth-child(1) {
    background-color: rgba(26, 45, 63);
}

.button-group__item:nth-child(2) {
    background-color: rgba(30, 54, 38);
}

.button-group__item:nth-child(1):hover {
    background-color: rgba(26, 52, 76);
}

.button-group__item:nth-child(2):hover {
    background-color: rgba(33, 65, 41);
}

.button-group__item:hover {
    background-color: rgba(33, 37, 41);
}

.button-group__item:hover>.button-group__item__msg {
    visibility: visible;
}

.model-page__model__title {
    position: relative;
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 48px;
    white-space: nowrap;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
}

.other-info {
    position: relative;
    height: 40px;
    width: calc(100% - 10px);
    display: flex;
    margin-left: 10px;
    justify-content: start;
    border-radius: 5px;
    /* background-color: rgba(0, 0, 0, 0.8); */

}

.other-info__stats__item {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 25px;
    display: flex;
    margin-right: 15px;
    border-radius: 5px;
    background-color: rgba(52, 58, 64);
    padding: 5px 5px;
    cursor: pointer;
}

.other-info__stats__item:hover>span {
    color: rgba(77, 122, 143);

}

.other-info__stats__item span {
    display: inline-block;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    margin-left: 4px;
    color: rgba(255, 255, 255, 0.7);
}

.model-page__model__info {
    position: relative;
    width: 100%;
    /* height: 30px; */
    display: flex;
    flex-flow: wrap;
    justify-content: flex-start;
    flex-grow: 15;
    padding-left: 10px;
}

.model-page__model__info__author__avatar {
    height: 30px;
    min-width: 30px;
    /* margin: 10px; */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 15px;
    overflow: hidden;
    background-image: url('/public/teamPic/default.png');
    cursor: pointer;
}

.model-page__model__info__author__username {
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.7);
}

.model-page__model__info__author__text__username {
    height: 30px;
    line-height: 30px;
    width: 100%;
    margin-left: 5px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    cursor: pointer;
    font-family: 'ZCool';
}

.model-page__model__info__createAt {
    line-height: 30px;
    font-size: 14px;
    font-family: 'ZCool';
    color: rgba(255, 255, 255, 0.4);
    text-align: left;
}

.model-page__model__info__tags {
    margin-left: 5px;
    line-height: 25px;
    height: 25px;
    font-size: 14px;
    font-family: 'ZCool';
    color: rgba(255, 255, 255, 1);
    text-align: left;
    padding: 0 8px;
    border-radius: 5px;
    background-color: rgba(52, 58, 64);
}

.model-page__model__info__tags span:hover {
    cursor: pointer;
    color: rgb(77, 122, 143);
}

.model-page__model__content {
    position: relative;
    width: calc(100% - 40px);
    padding: 10px;
    min-height: 600px;

    /* border-bottom: rgba(255, 255, 255, 0.2) 1px solid; */
    img {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
}

.details {
    position: relative;
    width: 90%;
    background-color: rgba(37, 38, 43);
    border: rgba(55, 58, 64) 1px solid;
    margin-top: 20px;
    border-radius: 5px;
    min-height: 45px;
    transition: all 0.5s;

}

.details-switch {
    width: 100%;
    height: 45px;
    border-radius: 5px;
    font-size: 14px;
    background-color: rgba(37, 38, 43);
    cursor: pointer;
    display: flex;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s;
    user-select: none;
    /* border-bottom: rgba(55, 58, 64) 1px solid; */
}

.details-switch span:nth-child(1) {
    position: relative;
    left: 0%;
    line-height: 40px;
    width: 90%;
    margin-left: 3px;
    text-align: left;
}

.details-switch span:nth-child(2) {
    position: relative;
    right: 0%;
}

.details-switch div {
    width: 100%;
    display: flex;
    padding-left: 10px;
    transition: all 0.3s;
}

.details-content {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.details-content__item {
    width: 100%;
    height: 40px;
    display: flex;
    border-top: rgba(55, 58, 64) 1px solid;
}

.details-content__item__label {
    width: 30%;
    height: 100%;
    background-color: rgba(37, 38, 43);
    border-right: rgba(55, 58, 64) 1px solid;
    color: rgba(193, 194, 197);
    text-align: left;
    font-size: 14px;
    padding-left: 15px;
    line-height: 40px;

}

.details-content__item__value {
    position: relative;
    width: 70%;
    height: 100%;
    text-align: left;
    background-color: rgba(26, 27, 30);
    display: flex;
    justify-content: space-around;
}

.fileName {
    position: relative;
    display: inline-block;
    height: 20px;
    padding: 0 10px;
    color: white;
    font-size: 12px;
    line-height: 20px;
}

.button {
    position: relative;
    display: inline-block;
    height: 20px;
    padding: 0 10px;
    color: white;
    font-size: 12px;
    line-height: 20px;
    border-radius: 5px;
    cursor: pointer;
    background-color: rgba(51, 154, 240);
}

.button:hover {
    background-color: rgba(24, 100, 171);
}

.details-content__item__value--time {
    line-height: 40px;
    color: white;
    text-align: left;
    font-size: 14px;
    padding-left: 15px;
}

.model_type {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    border-radius: 6px;
    color: rgba(165, 216, 255);
    background-color: rgba(26, 45, 63);
    top: 50%;
    left: 10%;
    transform: translate(0, -50%);
}

.author-box {
    position: relative;
    width: calc(90% - 20px);
    height: 50px;
    /* left: 50%;
    transform: translate(-50%); */
    background-color: rgba(37, 38, 43);
    padding: 10px 10px;
    /* height: 150px; */
    /* box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 1px; */
    border-radius: 5px;
    margin-top: 10px;
    overflow: hidden;
    border: rgba(55, 58, 64) 1px solid;
}

.revolve-animation {
    transform: rotateZ(180deg);
    transform-origin: 6px 2px;
}

.fileUrl {
    width: 100%;
    /* height: 100%; */
    min-height: 40px;
    line-height: 40px;
    text-decoration: underline rgba(25, 113, 193) 1px;
    color: rgba(25, 113, 193);
    text-align: left;
    margin: 0 20px;
    text-overflow: clip;
    word-wrap: break-word;
    word-break: break-all;
    /* white-space: nowrap; */
}

.loading {
    position: relative;
    left: 50%;
    top: 5px;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    background-color: rgba(44, 46, 51);
    font-size: 14px;
    line-height: 30px;
    color: white;
    font-weight: 700;
    /* border: transparent 2px solid; */
    /* border-top: rgba(25, 113, 194) 1px solid; */
    border-left: rgba(25, 113, 194) 1px solid;
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

.line {
    margin: 0 5px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 16px;
    line-height: 30px;
}
</style>