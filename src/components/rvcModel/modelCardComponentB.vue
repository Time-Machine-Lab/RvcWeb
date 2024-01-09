<script lang="ts" setup>
import { RvcModelVo, FavoriteAndCollectionForm } from '@/api/rvcModel/modelType'
import { favoriteModel, collectModel } from '@/api/rvcModel/modelApi'
import { ref } from 'vue';
import { message } from '@/utils/message';
let props = defineProps<{
    model: RvcModelVo
}>()
let localModel = ref<RvcModelVo>(props.model)
let likeDisabled = ref(true)
let collectDisabled = ref(true)
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
const collect = function () {
    if (!collectDisabled.value){
        message.warning('请稍后再试')    
        return
    }
    collectDisabled.value = false
    setTimeout(function () {
        collectDisabled.value = true
    }
        , 2000)
    let form = <FavoriteAndCollectionForm>{
        modelId: (localModel.value.id as unknown as string),
        status: localModel.value.isCollection == 'true' ? '1' : '0'
    }
    collectModel(form).then((res:any) => {
        if (res.code == 200) {
            localModel.value.isCollection = localModel.value.isCollection == 'true'?'false':'true'
            let num:number = Number(localModel.value.collectionNum)
            num += localModel.value.isCollection=='true'?1:-1
            localModel.value.collectionNum = String(num)
            message.success((localModel.value.isCollection=='true'?'':'取消')+'收藏成功')
        }
        else{
            message.error('收藏失败，请稍后再试')
        }
        
    })
}
const like = function () {
    if (!likeDisabled.value){
        message.warning('请稍后再试')    
        return
    }
    likeDisabled.value = false
    setTimeout(function () {
        likeDisabled.value = true
    }
        , 2000)
    let form = <FavoriteAndCollectionForm>{
        modelId: (localModel.value.id as unknown as string),
        status: localModel.value.isLike == 'true' ? '1' : '0'
    }
    favoriteModel(form).then((res:any) => {
        if (res.code == 200) {
            localModel.value.isLike = localModel.value.isLike == 'true'?'false':'true'
            let num:number = Number(localModel.value.likesNum)
            num += localModel.value.isLike == 'true'?1:-1
            localModel.value.likesNum = String(num)
            message.success((localModel.value.isLike == 'true'?'':'取消')+'点赞成功')
        }
        else{
            message.error('点赞失败，请稍后再试')
        }

    })
}
</script>
<template>
    <div class="model-card">
        <img  :src="localModel.picture!" class="model-card__cover" 
            @click="$router.push('/model?id=' + localModel.id)" style="min-height:400px;object-fit: cover;position:relative;left:50%;transform:translate(-50%);width:100%;margin: 0;padding: 0;">
        <div tabindex="-1" class="more" @click="handleClickMore" @blur="handleBlur"
            :class="clickMore ? 'dither-animation' : ''" style="z-index: 10;">
            <div
                style="height: 20px;width:20px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
            </div>
        </div>
        <div class="more-window" v-show="moreVisibility">
            <div class="more-window__item" @click="message.warning('开发中')">
                举报
            </div>
        </div>
        <div class="post-card__user">
            <div class="user-info" @click="$router.push('/user?id=' + localModel.uid)">

                <div class="user-info__avatar" :style="{ backgroundImage: 'url(' + localModel.avatar + ')' }">

                </div>
                <div class="user-info__text">

                    <div class="user-info__text__usename">
                        {{ localModel.nickname }}
                    </div>
                    <div class="user-info__text__creatAt" @click="$router.push('/post?id=' + localModel.id)">
                        {{ localModel.createTime }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tag">
            {{ localModel.type }}
        </div>
        <div class="post-card__info">
            <div class="post-card__info__title" @click="$router.push('/post?id=' + localModel.id)">
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
                        :style="{ backgroundImage: localModel.isCollection == 'true' ? 'url(\'/icon/star-fill.svg\')' : 'url(\'/icon/star.svg\')' }">
                    </div>
                    <span>{{ localModel.collectionNum }}</span>
                </div>
                <div class="other-info__stats__item" @click="like()">
                    <div style="height: 16px;width: 16px;"
                        :style="{ backgroundImage: localModel.isLike == 'true' ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
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
<style>
.model-card {
    position: relative;
    width: 380px;
    min-height: 200px;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    border: rgba(255, 255, 255, 0.1) 1px solid;
}
.model-card__cover{
    width: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.model-card:hover>img {
    transition: all 0.5s;
    scale: 1.02;
}
.tag {
    padding: 0 15px;
    height: 25px;
    line-height: 25px;
    position: absolute;
    left: 10px;
    top: 70px;
    font-size: 12px;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    z-index: 30;
    font-family: 'ZCool';
}
.more {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 20px;
    right: 10px;
    z-index: 20;
}

.more-window {
    position: absolute;
    right: 40px;
    top: 40px;
    width: 120px;
    border-radius: 10px;
    border: rgba(55, 58, 64) 1px solid;
    background-color: rgba(37, 38, 43);
    padding: 5px;
    z-index: 10;
    user-select: none;
}

.more-window__item {
    padding-left: 15px;
    width: calc(100% - 15px);
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: left;
    border-radius: 5px;
    font-family: 'ZCool';
    color: rgba(255, 255, 255, 0.7);
}

.more-window__item:hover {
    background-color: rgba(56, 58, 64);
    cursor: pointer;
}



.post-card__user {
    position: absolute;
    top: 0;
    width: 100%;
    /* height: 150px; */
    left: 50%;
    transform: translate(-50%);
    z-index: 1;
    border-radius: 5px;
    padding: 5px 0;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    gap: 20px;
    border-radius: 0px;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.046);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
    border: 0px rgba(255, 255, 255, 0.4) solid;
    border-bottom: 0px rgba(40, 40, 40, 0.35) solid;
    border-right: 0px rgba(40, 40, 40, 0.35) solid;
}

.post-card__info {
    position: absolute;
    bottom: 0;
    width: 100%;
    /* height: 150px; */
    left: 50%;
    transform: translate(-50%);
    z-index: 1;
    border-radius: 5px;
    padding-top: 10px;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    gap: 20px;
    border-radius: 0px;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.046);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
    border: 0px rgba(255, 255, 255, 0.4) solid;
    border-bottom: 0px rgba(40, 40, 40, 0.35) solid;
    border-right: 0px rgba(40, 40, 40, 0.35) solid;
}

.post-card__info__title {
    position: relative;
    width: calc(100% - 20px);
    height: 30px;
    line-height: 30px;
    color: white;
    padding: 0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
    text-align: left;
    z-index: 1;
    font-family: 'ZCool';
}


.user-info {
    position: relative;
    height: 50px;
    width: 100%;
    transition: all 0.3s;
    display: flex;
    margin-left: 10px;
    /* background-color: rgba(0, 0, 0, 0.8); */

}

.user-info__avatar {
    height: 40px;
    min-width: 40px;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 20px;
    /* background-image: url("/public/teamPic/dhx.jpg"); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.user-info__text {
    height: 50px;
    padding-left: 15px;
    width: calc(100% - 65px);

}

.user-info__text__usename {
    height: 25px;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    text-align: left;
    font-family: 'ZCool';
}

.user-info__text__creatAt {
    position: relative;
    width: calc(100% - 10px);
    height: 25px;
    line-height: 25px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    z-index: 1;
    text-align: left;
    font-family: 'ZCool';
}



.user-info__usename:hover {
    color: white;
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
    height: 16px;
    display: flex;
    margin-right: 15px;
}

.other-info__stats__item span {
    display: inline-block;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    margin-left: 4px;
    font-family: 'ZCool';
    color: rgba(255, 255, 255, 0.7);
}

.dither-animation {
    top: 21px;
}
</style>