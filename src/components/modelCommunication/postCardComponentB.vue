<script lang="ts" setup>
import { PostVo, FavoriteAndCollectionForm } from '@/api/post/postType'
import { favoritePost, collectPost } from '@/api/post/postApi'
import { ref } from 'vue';
import { message } from '@/utils/message';
let props = defineProps<{
    post: PostVo
}>()
let localPost = ref<PostVo>(props.post)
let likeDisabled = ref(true)
let collectDisabled = ref(true)
const collect = function () {
    if (!collectDisabled.value) return
    collectDisabled.value = false
    setTimeout(function(){
        collectDisabled.value = true
    }
    ,2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.has_collect ? '0' : '1'
    }
    collectPost(form).then(res => {
        if (res.status == 200) {
            localPost.value.has_collect = !localPost.value.has_collect
            localPost.value.collectNum = ((localPost.value.collectNum as unknown as number)+1)as unknown as string
        }
        message.error('收藏失败，请稍后再试')
    })
}
const like = function () {
    if (!likeDisabled.value) return
    likeDisabled.value = false
    setTimeout(function(){
        likeDisabled.value = true
    }
    ,2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.has_like ? '0' : '1'
    }
    favoritePost(form).then(res => {
        if (res.status == 200) {
            localPost.value.has_like = !localPost.value.has_like
            localPost.value.likeNum = ((localPost.value.likeNum as unknown as number)+1)as unknown as string
        }
        message.error('点赞失败，请稍后再试')
        
    })
}
</script>
<template>
    <div class="post-card">
        <img :src="props.post.cover?props.post.cover:'/'" @click="$router.push('/post?id='+localPost.postId)" style="min-height:100px;width: 100%;margin: 0;padding: 0;">
        <div class="post-card__title" @click="$router.push('/post?id='+localPost.postId)">
            {{ localPost.title }}
        </div>
        <div class="post-card__creatAt" @click="$router.push('/post?id='+localPost.postId)">
            {{ localPost.createAt }}
        </div>
        <div class="post-card__info">
            <div class="user-info" @click="$router.push('/user?id=' + localPost.uid)">

                <div class="user-info__avatar" :style="{ backgroundImage: 'url(' + localPost.avatar + ')' }">

                </div>
                <div class="user-info__usename">
                    {{ localPost.nickname }}
                </div>

            </div>
            <div class="other-info">
                <div class="other-info__stats__item">
                    <div style="height: 16px;width: 16px;" :style="{ backgroundImage: 'url(\'/icon/eye.svg\')' }">
                    </div>
                    <span>{{ localPost.watchNum }}</span>
                </div>
                <div class="other-info__stats__item" @click="collect()">
                    <div style="height: 16px;width: 16px;"
                        :style="{ backgroundImage: localPost.has_collect ? 'url(\'/icon/star-fill.svg\')' : 'url(\'/icon/star.svg\')' }">
                    </div>
                    <span>{{ localPost.collectNum }}</span>
                </div>
                <div class="other-info__stats__item" @click="like()">
                    <div style="height: 16px;width: 16px;"
                        :style="{ backgroundImage: localPost.has_like ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                    </div>
                    <span>{{ localPost.collectNum }}</span>
                </div>
                <div class="other-info__stats__item">
                    <div style="height: 16px;width: 16px;" :style="{ backgroundImage: 'url(\'/icon/chat.svg\')' }">
                    </div>
                    <span>{{ localPost.commentNum }}</span>
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
    background-color: rgba(0, 0, 0, 0.8);
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