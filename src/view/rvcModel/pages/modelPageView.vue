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
import "@/view/rvcModel/style/modelPage.css"
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

    collectModel(form).then((res: any) => {
        if (res.code == 200) {
            message.success('操作成功')
        } else {
            message.error('操作失败')
        }
    })
    setTimeout(() => {

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
    }, 200)

}
const like = () => {
    let form = <FavoriteAndCollectionForm>{
        modelId: (router.currentRoute.value.query.id as string),
        status: '0'
    }

    console.log(isLike.value)
    favoriteModel(form).then((res: any) => {
        if (res.code == 200) {
            message.success('操作成功')
        } else {
            message.error('操作失败')
        }
    })
    setTimeout(() => {

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
    }, 200)

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

</script>
<template>
    <el-scrollbar>
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
                        <div :style="{ backgroundImage: 'url(\'/icon/eye.svg\')' }">
                        </div>
                        <span>{{ localModel.viewNum }}</span>
                    </div>
                    <div class="other-info__stats__item" @click="collect()">
                        <div :style="{ backgroundImage: collectDisabled == 'true' ? 'url(\'/icon/mark-fill.svg\')' : 'url(\'/icon/mark.svg\')' }">
                        </div>
                        <span>{{ localModel.collectionNum }}</span>
                    </div>
                    <div class="other-info__stats__item" @click="like()">
                        <div :style="{ backgroundImage: isLike == 'true' ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                        </div>
                        <span>{{ localModel.likesNum }}</span>
                    </div>
                </div>
                <div class="model-page__model__info">
                    <div class="model-page__model__info__author__avatar" @click="router.push('/user?id=' + localModel?.uid)"
                        :style="{ backgroundImage: 'url(\'' + localModel?.avatar + '\')' }">

                    </div>
                    <div class="model-page__model__info__author__username"
                        @click="router.push('/user?id=' + localModel?.uid)">
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
                        <img class="vertical-center"
                            :src="collectDisabled == 'true' ? '/icon/mark-fill.svg' : '/icon/mark.svg'" height="20"
                            width="20">
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
    </el-scrollbar>
</template>
