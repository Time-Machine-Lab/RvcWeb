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
import { message } from "@/utils/message";
// import { storage } from "@/utils/storage";
import { UserInfoVO } from '@/api/user/userTypes';
// import { storage } from "@/utils/storage.ts";
// import { useUserStore } from '@/view/user/info/userStore.js'
// const userStore = useUserStore()
// let userProfile = userStore.getProfile
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
            uid: '',
            username: ''
        }
        if (localModel.value.nickname == null) {
            user.value.nickname = "匿名"
        }
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
    createTime: ''
})
let fileList = ref<{
    fileName: string
    id: string
    url: string
}[]>([])
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
  if (collectDisabled.value == "true"){
    collectDisabled.value = "false"
    localModel.value.isCollection = "false"
    form.status = '1'
  }else if (collectDisabled.value == "false"){
    collectDisabled.value = "true"
    localModel.value.isCollection = "true"
    form.status = '0'
  }
  collectModel(form).then((res:any) => {
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
    }
    else if (isLike.value == "false") {
        isLike.value = "true"
        localModel.value.isLike = "true"
        form.status = '0'
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
// const handleClickModelFiles = function () {
//     modelFilesvisibility.value = !modelFilesvisibility.value
//     getModelFilesFunc()
// }
// const handleClickAudiosFiles = function () {
//     audiosvisibility.value = !audiosvisibility.value
// }
calcNum(1000)
const getModelFilesFunc = function () {
    modelFilesvisibility.value = false
    setTimeout(function () {
        modelFilesvisibility.value = true
    }, 1000)
    if (fileList.value.length != 0) return

    getModelFiles((router.currentRoute.value.query.id as string)).then((res: any) => {
        if (res.code == 200) {
            let data = res.data
            if (data.length == 0) {
                message.warning('模型文件为空')
                return
            }
            for (let i = 0; i < data.length; i++) {
                fileList.value.push({
                    fileName: localModel.value.name + data[i].fileName,
                    id: data[i].id,
                    url: data[i].url
                })
            }

        }
    })
}
// const download = function(index:number){
//     if(fileList.value[index].url == null||fileList.value[index].url == ""){
//         message.warning('文件失效')
//         return
//     }
//     let file = fileList.value[index]
//     const link = document.createElement('a');
//   link.href = file.url;
//
//   if (file.fileName) {
//     link.download = file.fileName;
//   }
//
//   document.body.appendChild(link);
//
//   link.click();
//
//   document.body.removeChild(link);
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
            <div class="model-content model-page__model__content">
                <a href="localModel?.description" target="_blank">
                    <img :src=localModel.picture>
                </a>
            </div>

        </div>
        <div class="model-page__sidebar">
            <div class="button-group">
                <div class="button-group__item" @click="getModelFilesFunc">
                    <img class="vertical-center" src="/icon/download.svg" height="20" width="20">
                    <div class="button-group__item__msg">
                        下载模型
                    </div>
                </div>
                <div class="button-group__item">
                    <img class="vertical-center" src="/icon/play.svg" height="30" width="30">
                    <div class="button-group__item__msg">
                        试听音频
                    </div>
                </div>
                <div class="button-group__item">
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--            <div class="details">-->
            <!--                <div tabindex="-1" class="details-switch" @click="handleClickModelFiles">-->
            <!--                    <div :style="{ backgroundColor: modelFilesvisibility ? 'rgba(26,27,30)' : '' }">-->
            <!--                        <span>模型文件</span>-->
            <!--                        <span>-->
            <!--                            <img width="12" height="12" class="vertical-center" style="transition: all 0.2s;"-->
            <!--                                :class="modelFilesvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">-->
            <!--                        </span>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--                <div class="details-content" v-show="modelFilesvisibility">-->
            <!--                    <div class="details-content__item" v-for="(file,index) in fileList" :key="index">-->
            <!--                        <div class="details-content__item__label">-->
            <!--                            文件{{index + 1}}-->
            <!--                        </div>-->
            <!--                        <div class="details-content__item__value">-->
            <!--                            <span class="fileName vertical-center">-->
            <!--                                {{ file.fileName}}-->
            <!--                            </span>-->
            <!--                            <spna class="button vertical-center" @click="download(index)">-->
            <!--                                下载-->
            <!--                            </spna>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                    -->
            <!--                </div>-->
            <!--            </div>-->
            <!--            <div class="details">-->
            <!--                <div tabindex="-1" class="details-switch" @click="handleClickAudiosFiles">-->
            <!--                    <div :style="{ backgroundColor: audiosvisibility ? 'rgba(26,27,30)' : '' }">-->
            <!--                        <span>模型音频</span>-->
            <!--                        <span>-->
            <!--                            <img width="12" height="12" class="vertical-center" style="transition: all 0.2s;"-->
            <!--                                :class="audiosvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">-->
            <!--                        </span>-->
            <!--                    </div>-->
            <!--                </div>-->

            <!--            </div>-->
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

.model-page__model__info {
    position: relative;
    width: 100%;
    height: 20px;
    display: flex;
    padding-left: 10px;
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
}</style>