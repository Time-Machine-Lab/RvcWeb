<script lang="ts" setup>
import { PostVo } from '@/api/post/postType'
let props = defineProps<{
    post: PostVo
}>()
</script>
<template>
    <div class="post-card" @click="$router.replace('/post?id=')">
        <img :src="props.post.cover" style="width: 100%;margin: 0;padding: 0;">
        <div class="post-card__title">
            {{ props.post.title }}
        </div>
        <div class="post-card__creatAt">
            {{ props.post.create_at }}
        </div>
        <div class="post-card__info">
            <div class="user-info" @click="$router.replace('/user?id=' + props.post.uid)">

                <div class="user-info__avatar" :style="{ backgroundImage: 'url(' + props.post.avatar + ')' }">

                </div>
                <div class="user-info__usename">
                    {{ props.post.nickname }}
                </div>

            </div>
            <div class="other-info">
                    <div class="other-info__stats__item">
                        <img src="/public/icon/eye.svg">
                        <span>{{ props.post.watch_num }}</span>
                    </div>
                    <div class="other-info__stats__item" v-if="!props.post.has_collect">
                        <img src="/public/icon/star.svg">
                        <span>{{ props.post.collect_num }}</span>
                    </div>
                    <div class="other-info__stats__item" v-if="props.post.has_collect">
                        <img src="/public/icon/star-fill.svg">
                        <span>{{ props.post.collect_num }}</span>
                    </div>
                    <div class="other-info__stats__item" v-if="!props.post.has_like">
                        <img src="/public/icon/heart.svg">
                        <span>{{ props.post.collect_num }}</span>
                    </div>
                    <div class="other-info__stats__item" v-if="props.post.has_like">
                        <img src="/public/icon/heart-fill.svg">
                        <span>{{ props.post.collect_num }}</span>
                    </div>
                    <div class="other-info__stats__item">
                        <img src="/icon/chat.svg">
                        <span>{{ props.post.comment_num }}</span>
                    </div>
                </div>
        </div>
    </div>
</template>
<style>
.post-card {
    position: relative;
    width: 380px;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
}

.post-card:hover>img {
    transition: all 0.5s;
    scale: 1.02;
}

.post-card__title {
    position: absolute;
    top: 0;
    width: calc(100% - 10px);
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    color: white;
    text-overflow: ellipsis;
    font-size: 16px;
    text-align: left;
    z-index: 1;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
}

.post-card__creatAt {
    position: absolute;
    top: 30px;
    width: calc(100% - 10px);
    padding-left: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.7);
    z-index: 1;
    text-align: left;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));

}

.post-card__info {
    position: absolute;
    bottom: 10px;
    width: 95%;
    height: 30px;
    left: 50%;
    transform: translate(-50%);
    z-index: 1;
    background-color: rgba(0,0,0,0.8);
    border-radius: 5px;

    display: flex;
}
.user-info {
    position: relative;
    height: 30px;
    width: 40%;
    transition: all 0.3s;
    display: flex;
    margin-left: 5px;
}

.user-info__avatar {
    height: 20px;
    min-width: 20px;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 10px;
    background-image: url("/public/teamPic/dhx.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.user-info__avatar:hover {
    scale: 1.1;
}

.user-info__usename {
    height: 30px;
    line-height: 30px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    text-align: left;
    padding-left: 5px;
}

.user-info__usename:hover {
    color: white;
}
.other-info {
    position: relative;
    height: 100%;
    width: 60%;
    display: flex;
    justify-content: end;
}

.other-info__stats__item {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 16px;
    display: flex;
    margin-right: 5px;
}
.other-info__stats__item span {
    display: inline-block;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    margin-left: 4px;
    color: rgba(255, 255, 255, 0.7);
}

</style>