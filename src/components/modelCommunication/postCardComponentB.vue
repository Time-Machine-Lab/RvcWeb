<script lang="ts" setup>
import { PostVo, FavoriteAndCollectionForm, DeletePostForm } from '@/api/post/postType'
import { favoritePost, collectPost, postDelete } from '@/api/post/postApi'
import { ref } from 'vue';
import { message } from '@/utils/message';
import { storage } from '@/utils/storage';
let props = defineProps<{
    post: PostVo
}>()
let localPost = ref<PostVo>(props.post)
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
    if (!collectDisabled.value) return

    collectDisabled.value = false
    if (localPost.value.author.uid == storage.get<string>('uid')) {
        message.warning('这是你的贴子哦')
        return
    }
    setTimeout(function () {
        collectDisabled.value = true
    }, 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.collect ? '0' : '1'
    }
    collectPost(form).then((res: any) => {
        if (res.code == 200) {
            localPost.value.collect = !localPost.value.collect
            localPost.value.collectNum = localPost.value.collectNum + (localPost.value.collect ? 1 : -1)
        } else {
            message.error(res.msg)
        }
    })
}
const like = function () {
    if (!likeDisabled.value) return

    likeDisabled.value = false
    if (localPost.value.author.uid == storage.get<string>('uid')) {
        message.warning('这是你的贴子哦')
        return
    }
    setTimeout(function () {
        likeDisabled.value = true
    }
        , 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.like ? '0' : '1'
    }
    favoritePost(form).then((res: any) => {
        if (res.code == 200) {
            localPost.value.like = !localPost.value.like
            localPost.value.likeNum = localPost.value.likeNum + (localPost.value.like ? 1 : -1)
        } else {
            message.error(res.msg)
        }

    })
}
const getimg = function (index: number) {
    const img = [
        "/testPic/1.jpeg",
        "/testPic/2.jpeg",
        "/testPic/3.jpeg",
        "/testPic/4.jpeg",
        "/testPic/5.jpeg",
        "/testPic/6.jpeg",
        "/testPic/7.jpeg",
        "/testPic/8.jpeg",
        "/testPic/9.jpeg",
    ]
    return img[index % 9]
}
const postDeleteFunc = function () {
    let form = ref<DeletePostForm>({
        postId: localPost.value.postId
    })
    postDelete(form.value).then((res: any) => {
        if (res.code == 200){
            message.success('删除成功')
        }
    })
}
</script>
<template>
    <div class="post-card">
        <img :src="props.post.cover ? props.post.cover : getimg(localPost.postId as unknown as number)"
            @click="$router.push('/post?id=' + localPost.postId)"
            style="min-height:100px;width: 100%;margin: 0;padding: 0;">
        <div class="tag">
            {{ localPost.postType.tagName }}
        </div>
        <div tabindex="-1" class="more" @click="handleClickMore" @blur="handleBlur"
            :class="clickMore ? 'dither-animation' : ''">
            <div
                style="height: 20px;width:20px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
            </div>
        </div>
        <div class="more-window" v-show="moreVisibility">
            <div class="more-window__item" @click="message.warning('敬请期待')">
                举报
            </div>
            <div class="more-window__item" v-show="storage.get<string>('uid') == localPost.author.uid" @click="postDeleteFunc">删除贴子</div>
        </div>
        <div class="post-card__info">
            <div class="user-info" @click="$router.push('/user?id=' + localPost.author.uid)">

                <div class="user-info__avatar"
                    :style="{ backgroundImage: 'url(' + localPost.author?.avatar ? localPost.author?.avatar : '/teamPic/default.png' + ')' }">

                </div>
                <div class="user-info__usename">
                    {{ localPost.author?.nickname }}
                </div>

            </div>
            <div class="post-card__info__creatAt" @click="$router.push('/post?id=' + localPost.postId)">
                {{ localPost.createAt }}
            </div>
            <div class="post-card__info__title" @click="$router.push('/post?id=' + localPost.postId)">
                {{ localPost.title }}
            </div>

            <div class="other-info">
                <div class="other-info__stats__item">
                    <div style="height: 16px;width: 16px;" :style="{ backgroundImage: 'url(\'/icon/eye.svg\')' }">
                    </div>
                    <span>{{ localPost.watchNum }}</span>
                </div>
                <div class="other-info__stats__item" @click="collect()">
                    <div style="height: 16px;width: 16px;"
                        :style="{ backgroundImage: localPost.collect ? 'url(\'/icon/star-fill.svg\')' : 'url(\'/icon/star.svg\')' }">
                    </div>
                    <span>{{ localPost.collectNum }}</span>
                </div>
                <div class="other-info__stats__item" @click="like()">
                    <div style="height: 16px;width: 16px;"
                        :style="{ backgroundImage: localPost.like ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                    </div>
                    <span>{{ localPost.likeNum }}</span>
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
    border: rgba(255, 255, 255, 0.1) 1px solid;
}

.post-card:hover>img {
    transition: all 0.5s;
    scale: 1.02;
}

.tag {
    padding: 0 10px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    z-index: 30;
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

    color: rgba(255, 255, 255, 0.7);
}

.more-window__item:hover {
    background-color: rgba(56, 58, 64);
    cursor: pointer;
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
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
}

.post-card__info__title {
    position: relative;
    width: calc(100% - 10px);
    height: 30px;
    line-height: 30px;
    color: white;
    margin-left: 10px;
    text-overflow: ellipsis;
    font-size: 20px;
    text-align: left;
    z-index: 1;
}

.post-card__info__creatAt {
    position: relative;
    width: calc(100% - 10px);
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    margin-left: 10px;
    color: rgba(255, 255, 255, 1);
    z-index: 1;
    text-align: left;

}

.user-info {
    position: relative;
    height: 40px;
    width: 100%;
    transition: all 0.3s;
    display: flex;
    margin-left: 15px;
    /* background-color: rgba(0, 0, 0, 0.8); */

}

.user-info__avatar {
    height: 30px;
    min-width: 30px;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 10px;
    /* background-image: url("/public/teamPic/dhx.jpg"); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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
    color: rgba(255, 255, 255, 0.7);
}

.more {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 10px;
    right: 10px;
}

.dither-animation {
    top: 11px;
}
</style>