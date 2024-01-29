<script lang="ts" setup>
import { PostVo, FavoriteAndCollectionForm, DeletePostForm } from '@/api/post/postType'
import { favoritePost, collectPost, postDelete } from '@/api/post/postApi'
import { ref } from 'vue';
import { message } from '@/utils/message';
import { storage } from '@/utils/storage';
import router from '@/router';
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
    if (!collectDisabled.value) {
        message.warning('请稍后再试')
        return
    }
    localPost.value.collect = !localPost.value.collect
    localPost.value.collectNum = localPost.value.collectNum + (localPost.value.collect ? 1 : -1)

    collectDisabled.value = false
    setTimeout(function () {
        collectDisabled.value = true
    }, 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.collect ? '1' : '0'
    }
    collectPost(form).then((res: any) => {
        if (res.code == 200) {
            //
        } else {
            message.error(res.msg)
        }
    })
}
const like = function () {
    if (!likeDisabled.value) {
        message.warning('请稍后再试')
        return
    }
    localPost.value.like = !localPost.value.like
    localPost.value.likeNum = localPost.value.likeNum + (localPost.value.like ? 1 : -1)

    likeDisabled.value = false
    setTimeout(function () {
        likeDisabled.value = true
    }
        , 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.like ? '1' : '0'
    }
    favoritePost(form).then((res: any) => {
        if (res.code == 200) {
            //
        } else {
            message.error(res.msg)
        }

    })
}
// const getimg = function (index: number) {
//     const img = [
//         "/testPic/1.jpeg",
//         "/testPic/2.jpeg",
//         "/testPic/3.jpeg",
//         "/testPic/4.jpeg",
//         "/testPic/5.jpeg",
//         "/testPic/6.jpeg",
//         "/testPic/7.jpeg",
//         "/testPic/8.jpeg",
//         "/testPic/9.jpeg",
//     ]
//     return img[index % 9]
// }
const postDeleteFunc = function () {
    let form = ref<DeletePostForm>({
        postId: localPost.value.postId
    })
    postDelete(form.value).then((res: any) => {
        if (res.code == 200) {
            message.success('删除成功')
        }
    })
}
const editPost = function () {
    router.push('/editPost?postId=' + localPost.value.postId)
}
</script>
<template>
    <div class="post-card">
        <div style="position: absolute;width: 100%;height: 100%;" @click="$router.push('/post?id=' + localPost.postId)"></div>
        <img :src="localPost.cover!" @click="$router.push('/post?id=' + localPost.postId)"
            style="min-height:400px;object-fit: cover;position:relative;left:50%;transform:translate(-50%);width:100%;margin: 0;padding: 0;">
        <!-- style="min-height:400px;object-fit: cover;position:relative;left:50%;transform:translate(-50%);width:100%;margin: 0;padding: 0;"> -->
        <div tabindex="-1" class="more" @click="handleClickMore" @blur="handleBlur"
            :class="clickMore ? 'dither-animation' : ''">
            <div
                style="height: 20px;width:20px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
            </div>
        </div>
        <div class="more-window" v-show="moreVisibility">
            <div class="more-window__item" @click="message.warning('开发中')">
                举报
            </div>
            <div class="more-window__item" v-show="storage.get<string>('uid') == localPost.author?.uid"
                @click="postDeleteFunc">
                删除贴子
            </div>
            <div class="more-window__item" v-show="storage.get<string>('uid') == localPost.author?.uid" @click="editPost">
                编辑贴子
            </div>
        </div>
        <div class="post-card__user">
            <div class="user-info" @click="$router.push('/user?id=' + localPost.author.uid)">

                <div class="user-info__avatar" :style="{ backgroundImage: 'url(' + localPost.author?.avatar + ')' }">

                </div>
                <div class="user-info__text">

                    <div class="user-info__text__usename">
                        {{ localPost.author?.nickname }}
                    </div>
                    <div class="user-info__text__creatAt" @click="$router.push('/post?id=' + localPost.postId)">
                        {{ localPost.createAt }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tag">
            {{ localPost.postType.tagName }}
        </div>
        <div class="post-card__info">
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
<style scoped>
.post-card {
    font-family: 'ZCool';
    position: relative;
    min-height: 200px;
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
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    left: 10px;
    top: 70px;
    font-size: 12px;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.4);
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
    position: relative;
    padding-left: 15px;
    width: calc(100% - 0px);
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
    top: 20px;
    right: 10px;
    z-index: 20;
}

.dither-animation {
    top: 21px;
}
</style>