<!--
 * @Author: Dhx
 * @Date: 2023-12-06 19:12:20
 * @Description: 
 * @FilePath: \RvcWeb\src\view\rvcModel\pages\modelPageView.vue
-->

<script lang="ts" setup>
import userCardComponent from '@/components/user/userCardComponent.vue'
import suggestedModelsComponent from '@/components/rvcModel/suggestedModelsComponent.vue'
import modelCommentsComponent from '@/components/rvcModel/modelCommentsComponent.vue'
import "@/assets/css/post/postContent.css"
import { getModelDetails } from "@/api/rvcModel/modelApi"
import { favoriteModel, collectModel } from '@/api/rvcModel/modelApi'
import { ref } from "vue";
import router from "@/router";
import { FavoriteAndCollectionForm, ModelVo } from "@/api/rvcModel/modelType";
import { message } from "@/utils/message";
import { storage } from "@/utils/storage";
import { UserInfoVO } from '@/api/user/userTypes';
// import { useUserStore } from '@/view/user/info/userStore.js'
// const userStore = useUserStore()
// let userProfile = userStore.getProfile
getModelDetails((router.currentRoute.value.query.id as string)).then((res: any) => {
    if (res.code == 200) {
        localModel.value = res.data
        user.value = {
            avatar: localModel.value.avatar,
            nickname: localModel.value.nickname,
        }
    }

})
let user = ref<UserInfoVO>({

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
    createTime: ''
})
// let inputContent = ref<string>('')

let likeDisabled = ref(true)
let collectDisabled = ref(true)
let detailsvisibility = ref(false)
let modelFilesvisibility = ref(false)
let audiosvisibility = ref(false)
const collect = function () {
    if (!collectDisabled.value) return
    collectDisabled.value = false
    if (localModel.value.uid == storage.get<string>('uid')) {
        message.warning('这是你的贴子哦')
        return
    }
    setTimeout(function () {
        collectDisabled.value = true
    }
        , 2000)
    let form = <FavoriteAndCollectionForm>{
        modelId: (router.currentRoute.value.query.id as string),
        status: localModel.value.isCollection ? '0' : '1'
    }
    collectModel(form).then((res: any) => {
        if (res.code == 200) {
            localModel.value.isCollection = localModel.value.isCollection == '0' ? '1' : '0'
            localModel.value.collectionNum = localModel.value.collectionNum + (localModel.value.isCollection == '1' ? 1 : -1)
            message.success('')
        } else {
            message.error(res.msg)
        }

    })
}
const like = function () {
    if (!likeDisabled.value) return
    likeDisabled.value = false
    if (localModel.value.uid == storage.get<string>('uid')) {
        message.warning('这是你的贴子哦')
        return
    }
    setTimeout(function () {
        likeDisabled.value = true
    }, 2000)
    let form = <FavoriteAndCollectionForm>{
        modelId: (router.currentRoute.value.query.id as string),
        status: localModel.value.isLike ? '0' : '1'
    }
    favoriteModel(form).then((res: any) => {
        if (res.code == 200) {
            localModel.value.isLike = localModel.value.isLike == '0' ? '1' : '0'
            localModel.value.likesNum = localModel.value.likesNum + (localModel.value.isLike == '1' ? 1 : -1)
            message.success('')
        } else {
            message.error(res.msg)
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
}
const handleClickAudiosFiles = function () {
    audiosvisibility.value = !audiosvisibility.value
}
calcNum(1000)
// const sendComment = function () {
//     if (inputContent.value == '') {
//         return
//     }
//     let form = ref<CommentForm>({
//         content: inputContent.value,
//         modelId: (router.currentRoute.value.query.id as string),
//         rootCommentId: "",
//         toCommentId: "",
//         toUserId: ""
//     })
//     commentAdd(form.value).then((res: any) => {
//         if (res.code == 200) {
//             message.success('发送成功，等待审核')
//         } else {
//             message.error(res.msg)
//         }
//         inputContent.value = ""
//     })

// }
</script>
<template>
    <div class="model-page">

        <div class="model-page__model">
            <el-breadcrumb :separator="'>'">
                <el-breadcrumb-item :to="{ path: '/rvc/models' }">模型区</el-breadcrumb-item>
                <el-breadcrumb-item>模型</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="model-page__model__title">
                <span class="scroll-text">
                    {{ localModel?.name }}
                </span>
            </div>
            <div class="model-page__model__info">
                <div class="model-page__model__info__createAt">
                    {{ localModel?.createTime }}
                </div>
                <div v-for="(label, index) in localModel.label" :key="index" class="model-page__model__info__tags">
                    <span>{{ label }}</span>
                </div>
            </div>
            <div class="model-content model-page__model__content" v-html="localModel?.description">

            </div>
            <!-- <div class="model-page__model__footer">
                <div class="model-page__model__footer__editTime">
                    最后编辑于:{{ localModel?.updateAt }}
                </div>
                <div class="model-page__model__footer__operation">
                    <div class="operation-item" @click="collect">
                        <div class="vertical-center" style="height: 20px;width: 20px;background-repeat: no-repeat;background-size: contain;"
                        :style="{ backgroundImage: localModel.collect ? 'url(\'/icon/mark-fill.svg\')' : 'url(\'/icon/mark.svg\')' }">
                    </div>
                    <span>{{ calcNum(localModel.collectNum) }}</span>
                    </div>
                    <div class="operation-item" @click="like">
                        <div class="vertical-center" style="height: 20px;width: 20px;background-repeat: no-repeat;background-size: contain;"
                        :style="{ backgroundImage: localModel.like ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                    </div>
                    <span>{{ calcNum(localModel.likeNum) }}</span>
                    </div>
                </div>
            </div> -->

        </div>
        <div class="model-page__sidebar">
            <div class="button-group">
                <div class="button-group__item">
                    <img class="vertical-center" src="/icon/download.svg" height="20" width="20">
                    <div class="button-group__item__msg">
                        下载模型
                    </div>
                </div>
                <div class="button-group__item" @click="message.warning('开发中')">
                    <img class="vertical-center" src="/icon/play.svg" height="30" width="30">
                    <div class="button-group__item__msg">
                        运行模型
                    </div>

                </div>
                <div class="button-group__item">
                    <img class="vertical-center" src="/icon/share.svg" height="20" width="20">
                    <div class="button-group__item__msg">
                        分享
                    </div>

                </div>
                <div class="button-group__item" @click="like">
                    <img class="vertical-center" src="/icon/heart.svg" height="20" width="20">
                    <div class="button-group__item__msg">
                        喜欢
                    </div>

                </div>
                <div class="button-group__item" @click="collect">
                    <img class="vertical-center" src="/icon/mark.svg" height="20" width="20">
                    <div class="button-group__item__msg">
                        收藏
                    </div>

                </div>
            </div>
            <div class="details">
                <div tabindex="-1" class="details-switch" @click="handleClickDetails">
                    <div style="width:100%;display: flex;padding-left: 10px;transition: all 0.3s;"
                        :style="{ backgroundColor: detailsvisibility ? 'rgba(26,27,30)' : '' }">
                        <span
                            style="position: relative;left:0%;line-height: 40px;width:90%;margin-left: 3px;text-align: left;">模型信息</span>
                        <span style="position: relative;right:0%;">
                            <img width="12" height="12" class="vertical-center" style="transition: all 0.2s;"
                                :class="detailsvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                        </span>
                    </div>
                </div>
                <div class="details-content" v-show="detailsvisibility">
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="details">
                <div tabindex="-1" class="details-switch" @click="handleClickModelFiles">
                    <div style="width:100%;display: flex;padding-left: 10px;transition: all 0.3s;"
                        :style="{ backgroundColor: modelFilesvisibility ? 'rgba(26,27,30)' : '' }">
                        <span
                            style="position: relative;left:0%;line-height: 40px;width:90%;margin-left: 3px;text-align: left;">模型文件</span>
                        <span style="position: relative;right:0%;">
                            <img width="12" height="12" class="vertical-center" style="transition: all 0.2s;"
                                :class="modelFilesvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                        </span>
                    </div>
                </div>
            </div>
            <div class="details">
                <div tabindex="-1" class="details-switch" @click="handleClickAudiosFiles">
                    <div style="width:100%;display: flex;padding-left: 10px;transition: all 0.3s;"
                        :style="{ backgroundColor: audiosvisibility ? 'rgba(26,27,30)' : '' }">
                        <span
                            style="position: relative;left:0%;line-height: 40px;width:90%;margin-left: 3px;text-align: left;">模型音频</span>
                        <span style="position: relative;right:0%;">
                            <img width="12" height="12" class="vertical-center" style="transition: all 0.2s;"
                                :class="audiosvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                        </span>
                    </div>
                </div>

            </div>
            <div class="author-box">
                <userCardComponent :user="user"></userCardComponent>
            </div>

        </div>

    </div>
    <suggestedModelsComponent></suggestedModelsComponent>
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

.model-page__model__info {
    position: relative;
    width: 100%;
    height: 20px;
    display: flex;
    padding-left: 10px;
}

.model-page__model__content {
    position: relative;
    width: calc(100% - 20px);
    padding: 10px;
    min-height: 600px;
    /* border-bottom: rgba(255, 255, 255, 0.2) 1px solid; */
}

.model-page__model__info__createAt {
    line-height: 20px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    text-align: left;
}

.model-page__model__info__tags {
    margin-left: 30px;
    line-height: 20px;
    font-size: 12px;
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
}
.details-content__item__value--time{
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
}</style>