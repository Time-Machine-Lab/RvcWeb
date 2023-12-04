<script setup lang="ts">
import {RvcModelVo} from '@/view/rvcModel/ModelType'

const props = defineProps<{
    model:RvcModelVo
}>()
</script>
<template>
    <router-link to="">
        <div class="model-card">
        <div class="model-card__pic">

        </div>
        <div class="model-card__info">
            <div class="model-card__info__name">
                {{ props.model.model_name }}
            </div>
            <div class="model-card__info__creatAt">
                {{ props.model.create_at }}
            </div>
            <div class="model-card__info__userInfo">
                <div class="model-card__info__userInfo__avatar" :style="{backgroundImage:'url('+props.model.avatar+')'}">

                </div>
                <div class="model-card__info__userInfo__usename">
                    {{ props.model.nickname }}
                </div>
            </div>
            <div class="model-card__info__stats">
                <div class="model-card__info__stats__item">
                    <img src="/public/icon/eye.svg">
                    <span>{{ props.model.watch_num }}</span>
                </div>
                <div class="model-card__info__stats__item">
                    <img src="/public/icon/download.svg">
                    <span>{{ 0 }}</span>
                </div>
                <div class="model-card__info__stats__item" v-if="!props.model.has_like">
                    <img src="/public/icon/star.svg">
                    <span>{{ props.model.collection_num }}</span>
                </div>
                <div class="model-card__info__stats__item" v-if="props.model.has_like">
                    <img src="/public/icon/star-fill.svg">
                    <span>{{ props.model.like_num }}</span>
                </div>
                <div class="model-card__info__stats__item" v-if="!props.model.has_like">
                    <img src="/public/icon/heart.svg">
                    <span>{{ props.model.like_num }}</span>
                </div>
                <div class="model-card__info__stats__item" v-if="props.model.has_like">
                    <img src="/public/icon/heart-fill.svg">
                    <span>{{ props.model.like_num }}</span>
                </div>
            </div>
        </div>
    </div>
    </router-link>
    
</template>
<style scoped>
.model-card {
    position: relative;
    width: 100%;
    height: 100%;
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

.model-card__info__userInfo {
    height: 30px;
    width: 100%;
    display: flex;
    margin-top: 5px;
}

.model-card__info__userInfo__avatar {
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

.model-card__info__userInfo__usename {
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
}</style>