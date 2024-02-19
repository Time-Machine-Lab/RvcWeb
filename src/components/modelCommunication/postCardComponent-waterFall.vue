<script lang="ts" setup>
import { PostVo, FavoriteAndCollectionForm, DeletePostForm } from '@/api/post/postType'
import { favoritePost, collectPost, postDelete } from '@/api/post/postApi'
import { ref } from 'vue';
import { message } from '@/utils/message';
import { storage } from '@/utils/storage';
import router from '@/router';
import "@/components/modelCommunication/style/postCardComponent-waterFall.css"
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

    collectDisabled.value = false
    setTimeout(function () {
        collectDisabled.value = true
    }, 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.collect ? '0' : '1'
    }
    collectPost(form).then((res: any) => {
        if (res.code == 200) {
            //
        } else {
            message.error(res.msg)
        }
    })
    setTimeout(() => {
        localPost.value.collect = !localPost.value.collect
        localPost.value.collectNum = localPost.value.collectNum + (localPost.value.collect ? 1 : -1)
    }, 200)

}
const like = function () {
    if (!likeDisabled.value) {
        message.warning('请稍后再试')
        return
    }


    likeDisabled.value = false
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
            //
        } else {
            message.error(res.msg)
        }

    })
    setTimeout(() => {
        localPost.value.like = !localPost.value.like
        localPost.value.likeNum = localPost.value.likeNum + (localPost.value.like ? 1 : -1)
    }, 200)

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
    router.push('/rvc/editPost?postId=' + localPost.value.postId)
}
</script>
<template>
    <div class="post-card">
        <div style="position: absolute;width: 100%;height: 100%;" @click="$router.push('/rvc/post?id=' + localPost.postId)">
        </div>
        <img :src="localPost.cover!" @click="$router.push('/rvc/post?id=' + localPost.postId)"
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
                    <div class="user-info__text__creatAt" @click="$router.push('/rvc/post?id=' + localPost.postId)">
                        {{ localPost.createAt }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tag">
            {{ localPost.postType.tagName }}
        </div>
        <div class="post-card__info">
            <div class="post-card__info__title" @click="$router.push('/rvc/post?id=' + localPost.postId)">
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