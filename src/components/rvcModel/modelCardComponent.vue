<script lang="ts" setup>
import { RvcModelVo, FavoriteAndCollectionForm } from '@/api/rvcModel/modelType'
import { favoriteModel, collectModel, delModel } from '@/api/rvcModel/modelApi'
import { ref } from 'vue';
import { message } from '@/utils/message';
import { storage } from "@/utils/storage.ts";
import router from "@/router";
import "@/components/rvcModel/style/modelCard.css"
let props = defineProps<{
    model: RvcModelVo
}>()
let localModel = ref<RvcModelVo>(props.model)
let clickMore = ref(false)
let moreVisibility = ref(false)
const handleClickMore = function () {
    clickMore.value = true
    moreVisibility.value = !moreVisibility.value
    setTimeout(function () {
        clickMore.value = false
    }, 200)
}
const handleBlur = function () {
    setTimeout(function () {
        moreVisibility.value = false
    }, 200)
}
let collectDisabled = ref(false)
let likeDisabled = ref(false)
// 收藏
let isCollect = ref("")
isCollect.value = localModel.value.isCollection
const collect = function () {
    if (collectDisabled.value) {
        message.warning('请稍后再试')
        return
    }
    collectDisabled.value = true
    let form = <FavoriteAndCollectionForm>{
        modelId: localModel.value.id,
        status: '0'
    }

    setTimeout(() => {
        collectDisabled.value = false
    }, 5000)
    collectModel(form).then((res: any) => {
        if (res.code == 200) {
            //   message.success('操作成功')
        } else {
            message.error(res.message)
        }
    })
    setTimeout(() => {

        if (isCollect.value == "true") {
            isCollect.value = "false"
            localModel.value.isCollection = "false"
            form.status = '1'
            localModel.value.collectionNum = String(Number(localModel.value.collectionNum) - 1)
        } else if (isCollect.value == "false") {
            isCollect.value = "true"
            localModel.value.isCollection = "true"
            form.status = '0'
            localModel.value.collectionNum = String(Number(localModel.value.collectionNum) + 1)
        }
    }, 300)

}
// 点赞
let isLike = ref("")
isLike.value = localModel.value.isLike
const like = () => {
    if (likeDisabled.value) {
        message.warning('请稍后再试')
        return
    }
    likeDisabled.value = true
    let form = <FavoriteAndCollectionForm>{
        modelId: localModel.value.id,
        status: '0'
    }

    setTimeout(() => {
        likeDisabled.value = false
    }, 5000)
    favoriteModel(form).then((res: any) => {
        if (res.code == 200) {
            //   message.success('操作成功')
        } else {
            message.error(res.message)
        }
    })
    setTimeout(() => {

        if (isLike.value == "true") {
            isLike.value = "false"
            localModel.value.isLike = "false"
            form.status = '1'
            localModel.value.likesNum = String(Number(localModel.value.likesNum) - 1)
        } else if (isLike.value == "false") {
            isLike.value = "true"
            localModel.value.isLike = "true"
            form.status = '0'
            localModel.value.likesNum = String(Number(localModel.value.likesNum) + 1)
        }
    }, 300)

}
const modelDeleteFunc = function () {
    delModel(localModel.value.id).then((res: any) => {
        if (res.code == 200) {
            message.success('删除成功')
        }
    })
}
const editModel = function () {
    router.push('/rvc/editModel?id=' + localModel.value.id)
}
</script>
<template>
    <div class="model-card">
        <img :src="localModel.picture!" class="model-card__cover" @click="$router.push('/rvc/model?id=' + localModel.id)"
            style="min-height:400px;object-fit: cover;position:relative;left:50%;transform:translate(-50%);width:100%;margin: 0;padding: 0;">
        <div tabindex="-1" class="more" @click="handleClickMore" @blur="handleBlur"
            :class="clickMore ? 'dither-animation' : ''" style="z-index: 10;">
            <div
                style="height: 20px;width:20px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
            </div>
        </div>
        <div class="more-window" v-show="moreVisibility">
            <div class="more-window__item" @click="message.warning('敬请期待')">
                举报
            </div>
            <div class="more-window__item" v-show="storage.get<string>('uid') == localModel.uid" @click="modelDeleteFunc">
                删除模型
            </div>
            <div class="more-window__item" v-show="storage.get<string>('uid') == localModel.uid" @click="editModel">
                编辑模型
            </div>
        </div>
        <div class="post-card__user">
            <div class="user-info" @click="$router.push('/user?id=' + localModel.uid)">
                <div class="user-info__avatar" :style="{ backgroundImage: 'url(' + localModel.avatar + ')' }"></div>
                <div class="user-info__text">
                    <div class="user-info__text__usename">
                        {{ localModel.nickname }}
                    </div>
                    <div class="user-info__text__creatAt" @click="$router.push('/rvc/post?id=' + localModel.id)">
                        {{ localModel.createTime }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tag">
            {{ localModel.type }}
        </div>
        <div class="post-card__info">
            <div class="post-card__info__title" @click="$router.push('/rvc/post?id=' + localModel.id)">
                {{ localModel.name }}
            </div>

            <div class="other-info">
                <div class="other-info__stats__item">
                    <div style="height: 16px;width: 16px;" :style="{ backgroundImage: 'url(\'/icon/eye.svg\')' }">
                    </div>
                    <span>{{ localModel.viewNum }}</span>
                </div>
                <div class="other-info__stats__item" @click="collect()">
                    <div style="height: 16px;width: 16px;"
                        :style="{ backgroundImage: isCollect == 'true' ? 'url(\'/icon/mark-fill.svg\')' : 'url(\'/icon/mark.svg\')' }">
                    </div>
                    <span>{{ localModel.collectionNum }}</span>
                </div>
                <div class="other-info__stats__item" @click="like()">
                    <div style="height: 16px;width: 16px;"
                        :style="{ backgroundImage: isLike == 'true' ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                    </div>
                    <span>{{ localModel.likesNum }}</span>
                </div>
                <!-- <div class="other-info__stats__item">
                    <div style="height: 16px;width: 16px;" :style="{ backgroundImage: 'url(\'/icon/chat.svg\')' }">
                    </div>
                    <span>{{ localModel }}</span>
                </div> -->
            </div>
        </div>
    </div>
</template>