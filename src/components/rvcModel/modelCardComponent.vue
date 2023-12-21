<script setup lang="ts">
import {RvcModelVo} from '@/api/rvcModel/modelType'

const props = defineProps<{
    model:RvcModelVo
}>()
</script>
<template>
        <div class="model-card">
        <div class="model-card__pic" :style="{backgroundImage:'url('+props.model.picture+')'}">

        </div>
        <div class="model-card__info">
            <div class="model-card__info__name">
                {{ props.model.name }}
            </div>
            <div class="model-card__info__creatAt">
                {{ props.model.avatar }}
            </div>
            <div class="user-info">
                <div class="user-info__avatar" :style="{backgroundImage:'url('+props.model.avatar+')'}">

                </div>
                <div class="user-info__usename">
                    {{ props.model.nickname }}
                </div>
            </div>
            <div class="model-card__info__stats">
                <div class="model-card__info__stats__item">
                    <img src="/public/icon/eye.svg">
                    <span>{{ props.model.viewNum }}</span>
                </div>
                <div class="model-card__info__stats__item">
                    <img src="/public/icon/download.svg">
                    <span>{{ 0 }}</span>
                </div>
                <div class="model-card__info__stats__item" v-if="!props.model.isCollection">
                    <img src="/public/icon/star.svg">
                    <span>{{ props.model.collectionNum }}</span>
                </div>
                <div class="model-card__info__stats__item" v-else>
                    <img src="/public/icon/star-fill.svg">
                    <span>{{ props.model.collectionNum }}</span>
                </div>
                <div class="model-card__info__stats__item" v-if="!props.model.isLike">
                    <img src="/public/icon/heart.svg">
                    <span>{{ props.model.likesNum }}</span>
                </div>
                <div class="model-card__info__stats__item" v-else>
                    <img src="/public/icon/heart-fill.svg">
                    <span>{{ props.model.likesNum }}</span>
                </div>
            </div>
        </div>
    </div>
    
</template>
<style scoped>
.model-card {
    position: relative;
    width: 100%;
    height: 100%;
    /* min-height: 300px; */
    overflow: hidden;
    cursor: pointer;
    border-radius: 10px;
    user-select: none;
}

.model-card__pic {
    width: 100%;
    height: 100%;
    background-image: url('/public/backPic/introduction.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    transition: all 0.5s;
    cursor: pointer;
}

.model-card:hover>.model-card__pic {
    scale: 1.1;
}

.model-card__info {
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}

.model-card__info__name {
    height: 30px;
    width: 100%;
    line-height: 30px;
    font-size: 24px;
    text-align: left;
    padding-left: 10px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1)
}

.model-card__info__creatAt {
    height: 10px;
    width: 100%;
    line-height: 10px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    text-align: left;
    padding-left: 10px;
}

.user-info {
    height: 30px;
    width: 100%;
    display: flex;
    margin-top: 5px;
}

.user-info__avatar {
    height: 20px;
    min-width: 20px;
    position: relative;
    top: 50%;
    margin-left: 10px;
    transform: translate(0, -50%);
    border-radius: 10px;
    /* background-image: url("/public/teamPic/dhx.jpg"); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

}

.user-info__usename {
    height: 30px;
    width: calc(100% - 30px);
    line-height: 30px;
    color: white;
    font-size: 14px;
    text-align: left;
    padding-left: 5px;
}

.model-card__info__stats {
    display: flex;
    margin-bottom: 2px;
    margin-left: 10px;
    height: 16px;
    width: 100%;
}

.model-card__info__stats__item {
    height: 16px;
    display: flex;
    margin-right: 10px;
}

.model-card__info__stats__item span {
    display: inline-block;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    margin-left: 4px;
    color: rgba(255, 255, 255, 0.7);
}</style>@/api/rvcModel/modelType