<script setup lang="ts">
import { PostVo } from '@/api/post/postType'

const props = defineProps<{
    post: PostVo
}>()
</script>
<template>
    <div class="post-card">
        <RouterLink to="/post">
            <div class="post-card__picture">
                <div class="post-card__picture--pic" :style="{ backgroundImage: 'url(' + props.post.cover + ')' }">

                </div>
            </div>
        </RouterLink>


        <div class="post-card__info">
            <RouterLink to="/post">

                <div class="post-card__info__title">
                    {{ props.post.title }}
                </div>
                <div class="post-card__info__content">
                    {{ props.post.content }}
                </div>
            </RouterLink>

            <div class="post-card__info__data">
                <div class="user-info" @click="$router.replace('/user?id=' + props.post.author.uid)">

                    <div class="user-info__avatar" :style="{ backgroundImage: 'url(' + props.post.author.avatar + ')' }">

                    </div>
                    <div class="user-info__usename">
                        {{ props.post.author.nickname }}
                    </div>

                </div>

                <div class="creatAt">
                    发布日期：{{ props.post.createAt }}
                </div>
                <div class="other-info">
                    <div class="other-info__stats__item">
                        <img src="/public/icon/eye.svg">
                        <span>{{ props.post.watchNum }}</span>
                    </div>
                    <div class="other-info__stats__item" v-if="!props.post.collect">
                        <img src="/public/icon/star.svg">
                        <span>{{ props.post.collectNum }}</span>
                    </div>
                    <div class="other-info__stats__item" v-else>
                        <img src="/public/icon/star-fill.svg">
                        <span>{{ props.post.collectNum }}</span>
                    </div>
                    <div class="other-info__stats__item" v-if="!props.post.like">
                        <img src="/public/icon/heart.svg">
                        <span>{{ props.post.likeNum }}</span>
                    </div>
                    <div class="other-info__stats__item" v-else>
                        <img src="/public/icon/heart-fill.svg">
                        <span>{{ props.post.likeNum }}</span>
                    </div>
                    <div class="other-info__stats__item">
                        <img src="/icon/chat.svg">
                        <span>{{ props.post.commentNum }}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style scoped>
.post-card {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 80%;
    height: 150px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    border-bottom: rgba(255, 255, 255, 0.1) 1px solid;
    cursor: pointer;
}

.post-card:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.post-card__picture {
    min-width: 220px;
    height: 100%;
}

.post-card__picture--pic {
    position: relative;
    height: 90%;
    left: 10px;
    width: 200px;
    top: 50%;
    transform: translate(0, -50%);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url('public/backPic/welcome.png');
}

.post-card__info {
    width: calc(100% - 200px);
    height: 100%;
    padding-left: 20px;
}

.post-card__info__title {
    width: 100%;
    height: 30%;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 45px;
    text-align: left;
    letter-spacing: 4px;
}

.post-card__info__content {
    width: 100%;
    height: 50%;
    font-size: 16px;
    text-align: left;
    color: rgba(255, 255, 255, 0.5);
    line-height: 25px;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.post-card__info__data {
    width: 100%;
    height: 20%;
    display: flex;
}

.user-info {
    height: 30px;
    width: 30%;
    transition: all 0.3s;
    display: flex;
}

.user-info__avatar {
    height: 20px;
    min-width: 20px;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 10px;
    background-image: url("public/teamPic/dhx.jpg");
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
    height: 100%;
    width: 30%;
    display: flex;
    justify-content: end;
}

.other-info__stats__item {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 16px;
    display: flex;
    margin-right: 10px;
}

.other-info__stats__item span {
    display: inline-block;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    margin-left: 4px;
    color: rgba(255, 255, 255, 0.7);
}

.creatAt {
    width: 40%;
    height: 100%;
    line-height: 30px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    text-align: left;
}
</style>@/api/post/postType