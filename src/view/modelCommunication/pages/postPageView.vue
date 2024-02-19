<!--
 * @Author: Dhx
 * @Date: 2023-12-06 19:12:20
 * @Description: 
 * @FilePath: \RvcWeb\src\view\modelCommunication\pages\postPageView.vue
-->

<script lang="ts" setup>
import "@/assets/css/post/postContent.css"
import postPageCommentsView from "./postPageCommentsView.vue"
import backTopComponent from "@/components/common/backTopComponent.vue"
import { commentAdd, getPostById } from "@/api/post/postApi"
import { favoritePost, collectPost } from '@/api/post/postApi'
import { ref } from "vue";
import router from "@/router";
import { CommentForm, CommentVo, FavoriteAndCollectionForm, PostVo } from "@/api/post/postType";
import { message } from "@/utils/message";
import { storage } from "@/utils/storage";
import { useUserStore } from '@/view/user/info/userStore.js'
import { UserInfoVO } from "@/api/user/userTypes";
import { Editor } from '@wangeditor/editor-for-vue'
// import { onBeforeRouteLeave } from "vue-router"
const scrollbarRef = ref<any>()
const userStore = useUserStore()
const postPageCommentsRef = ref<any>(null)
// onBeforeRouteLeave((to,_from,next)=>{
//     if(to.path == '/rvc/posts'){
//         console.log(to.path);

//         to.meta.KeepAlive = true
//     } else {
//         to.meta.KeepAlive = false
//     }
//     next()
// })
getPostById((router.currentRoute.value.query.id as unknown as number)).then((res: any) => {
    if (res.code == 200) {
        localPost.value = res.data
    } else {
        message.error(res.msg)
    }
    setTimeout(() => {
        getDirectory()
    }, 1000)
})
let userProfile = ref<UserInfoVO>({
    avatar: '',
    birthday: '',
    description: '',
    fansNum: '',
    followNum: '',
    nickname: '',
    sex: '',
    uid: "",
    username: ""
})
let localPost = ref<PostVo>({
    postId: "",
    author: {
        avatar: '',
        birthday: '',
        description: '',
        fansNum: '',
        followNum: '',
        nickname: '',
        sex: '',
        uid: '',
        username: ''
    },
    postType: {
        id: "",
        tagName: "",
        tagImg: ""
    },
    title: "",
    content: "",
    cover: null,
    commentNum: 0,
    likeNum: 0,
    collectNum: 0,
    watchNum: 0,
    createAt: "",
    updateAt: "",
    like: false,
    collect: false
})
let inputContent = ref<string>('')
const editor = ref<any>(null)

let DirectoryElements = ref<Element[]>([])
let likeDisabled = ref(true)
let collectDisabled = ref(true)
let headings = ref<any[]>([])
const getDirectory = function () {

    // 获取页面中所有的标题元素 h1 到 h6
    const allHeadings = document.querySelectorAll('.post-page__post__content h1, h2, h3, h4, h5, h6');

    allHeadings.forEach((heading, index) => {
        DirectoryElements.value.push(heading)
        const tagName = heading.tagName.toLowerCase() // 获取标签名，例如 'h1', 'h2', ...
        const headingLevel = parseInt(tagName[1]) // 获取标题级别
        let currentLevel = headings.value
        currentLevel[index] = {
            level: headingLevel,
            text: heading.innerHTML.trim(),
        }
    })
    console.log(headings.value);

    userProfile.value = userStore.getProfile
}

const to = function (index: number) {
    scrollbarRef.value.scrollTo(0, DirectoryElements.value[index].getBoundingClientRect().top - 200)
    document.querySelector('#appVue .main')!.scrollTo()
}

const collect = function () {
    if (!collectDisabled.value) {
        message.warning('请稍后再试')
        return
    }
    collectDisabled.value = false

    setTimeout(function () {
        collectDisabled.value = true
    }
        , 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.collect ? '0' : '1'
    }
    collectPost(form).then((res: any) => {
        if (res.code == 200) {
            // message.success((localPost.value.collect ? '' : '取消') + '收藏成功')
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
    }, 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.like ? '0' : '1'
    }
    favoritePost(form).then((res: any) => {
        if (res.code == 200) {
            // message.success((localPost.value.like ? '' : '取消') + '点赞成功')
        } else {
            message.error(res.msg)
        }
    })
    setTimeout(() => {

        localPost.value.like = !localPost.value.like
        localPost.value.likeNum = localPost.value.likeNum + (localPost.value.like ? 1 : -1)
    }, 200)


}
const calcNum = function (num: number) {

    return num < 1000 ? (num as unknown as string) : (num / 1000 + 'k' as string)

}
const sendComment = function () {
    if (inputContent.value == '') {
        return
    }
    let form = ref<CommentForm>({
        content: inputContent.value,
        postId: (router.currentRoute.value.query.id as string),
        rootCommentId: "-1",
        toCommentId: "",
        toUserId: ""
    })
    commentAdd(form.value).then((res: any) => {
        if (res.code == 200) {
            message.success('发送成功')
            let newComment = ref<CommentVo>({
                postCommentId: res.data,
                content: form.value.content,
                createAt: '刚刚',
                userId: storage.get<string>('uid')!,
                postId: form.value.postId!,
                commentLikeCount: 0,
                rootCommentId: form.value.rootCommentId!,
                toUserId: form.value.toUserId!,
                updateAt: '刚刚',
                user: userStore.getProfile,
                replayUser: null,
                childrenComment: [],
                like: false
            })
            postPageCommentsRef.value!.pushComment(newComment.value)
        } else {
            message.error(res.msg)
        }
        inputContent.value = ""
    })

}
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
const handleShare = function () {
    var input = document.createElement("input");
    var body = document.body;
    body.appendChild(input);
    input.value = window.location.href;
    input.select();
    document.execCommand("copy");
    body.removeChild(input);
    message.success("已复制链接")
}
// const getLength = function (str: string) {
//     return str.length
// }
const getUrl = function (url: string) {
    inputContent.value = '<audio>' + url + '</audio>'
    sendComment()
}
</script>
<template>
    <el-scrollbar>
        <div class="post-page__header">
            <div class="post-page__header__title">
                <span class="scroll-text">
                    {{ localPost?.title }}
                </span>
            </div>
            <div class="post-page__header__button">
                <div class="operation-item" @click="collect">
                    <div class="vertical-center"
                        style="height: 20px;width: 20px;background-repeat: no-repeat;background-size: contain;"
                        :style="{ backgroundImage: localPost.collect ? 'url(\'/icon/mark-fill.svg\')' : 'url(\'/icon/mark.svg\')' }">
                    </div>
                    <span>{{ calcNum(localPost.collectNum) }}</span>
                </div>
                <div class="operation-item" @click="like">
                    <div class="vertical-center"
                        style="height: 20px;width: 20px;background-repeat: no-repeat;background-size: contain;"
                        :style="{ backgroundImage: localPost.like ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                    </div>
                    <span>{{ calcNum(localPost.likeNum) }}</span>
                </div>
                <div class="operation-item">
                    <div class="vertical-center"
                        style="height: 20px;width: 20px;background-repeat: no-repeat;background-size: contain;background-image: url('/icon/share.svg');"
                        @click="handleShare">
                    </div>
                </div>
                <div style="position: relative;display: flex;top: 50%;transform: translate(0,-50%);">
                    <div tabindex="-1" class="more" @click="handleClickMore" @blur="handleBlur"
                        :class="clickMore ? 'dither-animation' : ''" style="z-index: 10;">
                        <div
                            style="height: 26px;width:26px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="more-window" v-show="moreVisibility">
                <div class="more-window__item" @click="message.warning('开发中')">
                    举报
                </div>
            </div>
        </div>
        <div class="post-page__post__info">
            <div class="post-page__post__info__author__avatar" @click="router.push('/user?id=' + localPost?.author.uid)"
                :style="{ backgroundImage: 'url(\'' + localPost?.author.avatar + '\')' }">

            </div>
            <div class="post-page__post__info__author__username" @click="router.push('/user?id=' + localPost?.author.uid)">
                <div class="post-page__post__info__author__text__username">
                    {{ localPost?.author.nickname }}
                </div>
                <!-- <div class="author-box__userInfo__baseInfo__text__createAt">
                                注册于 {{ localPost? }}
                            </div> -->
            </div>
            <span class="line">|</span>
            <div class="post-page__post__info__createAt">
                {{ localPost?.createAt }}
            </div>
            <span class="line">|</span>
            <div class="post-page__post__info__tags">
                <span>{{ localPost?.postType?.tagName }}</span>
            </div>
        </div>
        <div class="post-page">
            <div class="post-page__post">

                <div class="post-content post-page__post__content">
                    <Editor style="width: 100%;background-color: transparent;" v-model="localPost.content"
                        :defaultConfig="{ readOnly: true, scroll: false }" :mode="'default'" @onCreated="(createdEditor: any) => {
                            editor = Object.seal(createdEditor);
                        }" />

                </div>
                <div class="post-page__post__footer">
                    <div class="post-page__post__footer__editTime">
                        最后编辑于:{{ localPost?.updateAt }}
                    </div>
                    <div class="post-page__post__footer__operation">
                        <div class="operation-item" @click="collect">
                            <div class="vertical-center"
                                :style="{ backgroundImage: localPost.collect ? 'url(\'/icon/mark-fill.svg\')' : 'url(\'/icon/mark.svg\')' }">
                            </div>
                            <span>{{ calcNum(localPost.collectNum) }}</span>
                        </div>
                        <div class="operation-item" @click="like">
                            <div class="vertical-center"
                                :style="{ backgroundImage: localPost.like ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                            </div>
                            <span>{{ calcNum(localPost.likeNum) }}</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div class="post-page__sidebar">
            <div class="target-box">

                <div class="target-box__title">
                    <img src="/icon/list.svg" width="28" height="28">导航
                </div>
                <el-scrollbar style="height:200px">
                    <div class="target-box__target" v-for="(heading, index) in headings"
                        :style="{ paddingLeft: heading.level * 20 + 'px', width: 'calc(100%-' + heading.level * 20 + 'px)', fontSize: 19 - heading.level + 'px' }"
                        :key="index" @click="to(index)" v-html="heading.text">
                    </div>
                </el-scrollbar>

            </div>
            <div class="author-box">
                <div class="author-box__userInfo">
                    <div class="author-box__userInfo__baseInfo">
                        <div class="author-box__userInfo__baseInfo__avatar"
                            @click="router.push('/user?id=' + localPost?.author.uid)"
                            :style="{ backgroundImage: 'url(\'' + localPost?.author.avatar + '\')' }">

                        </div>
                        <div class="author-box__userInfo__baseInfo__username"
                            @click="router.push('/user?id=' + localPost?.author.uid)">
                            <div class="author-box__userInfo__baseInfo__text__username">
                                {{ localPost?.author.nickname }}
                            </div>
                            <!-- <div class="author-box__userInfo__baseInfo__text__createAt">
                                注册于 {{ localPost? }}
                            </div> -->
                        </div>

                    </div>
                    <!-- <div class="author-box__userInfo__button">
                        <div class="author-box__userInfo__button--item">
                            关注
                        </div>
                    </div> -->
                    <!-- <div class="author-box__userInfo__data">
                        <div class="author-box__userInfo__data__item" v-for="(figure, index) in figures" :key="index">
                            <div class="author-box__userInfo__data__item--number">
                                {{ figure.number }}
                            </div>
                            <div class="author-box__userInfo__data__item--desc">
                                {{ figure.desc }}
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <backTopComponent class="backTop" @click="scrollbarRef.scrollTo(0, 0)"></backTopComponent>
        </div>
        <div class="comment">评论</div>
        <div class="post-page__post__commentBox">
            <div class="post-page__post__commentBox--row1">
                <div class="post-page__post__commentBox--row1--login" v-if="storage.get<string>('token')">
                    <img width="40" height="40" :src="userProfile.avatar!">
                    <input maxlength="300" placeholder="发表你的评论" v-model="inputContent">
                    <!-- <span style="position:absolute;color: rgba(255,255,255,0.4);left: calc(100% - 80px);line-height: 40px;">{{
                    getLength(inputContent) }}/300</span> -->
                </div>
                <div class="post-page__post__commentBox--row1--noLogin" v-else>
                    <a @click="router.push('/login')" style="color: cornflowerblue;">登录</a>后发送评论
                </div>
            </div>
            <div class="post-page__post__commentBox--row2">
                <div style="width: 30px;height: 30px;" v-if="storage.get<string>('token')">
                    <recordingComponnent :getUrl="getUrl"></recordingComponnent>
                </div>
                <button :style="{ cursor: inputContent != '' ? 'pointer' : 'not-allowed' }"
                    v-if="storage.get<string>('token')" @click="sendComment">发送</button>
            </div>
        </div>
        <div class="post-page__comments">
            <postPageCommentsView :post_id="(router.currentRoute.value.query.id as string)" ref="postPageCommentsRef">
            </postPageCommentsView>
        </div>
    </el-scrollbar>
</template>
<style scoped>
@import "@/view/modelCommunication/style/postPage.css";
</style>