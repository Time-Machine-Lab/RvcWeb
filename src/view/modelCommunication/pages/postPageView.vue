<!--
 * @Author: Dhx
 * @Date: 2023-12-06 19:12:20
 * @Description: 
 * @FilePath: \RvcWeb\src\view\modelCommunication\pages\postPageView.vue
-->

<script lang="ts" setup>
import "@/assets/css/post/postContent.css"
import postPageCommentsView from "./postPageCommentsView.vue"
import { commentAdd, getPostById } from "@/api/post/postApi"
import { favoritePost, collectPost } from '@/api/post/postApi'
import { ref } from "vue";
import router from "@/router";
import { CommentForm, CommentVo, FavoriteAndCollectionForm, PostVo } from "@/api/post/postType";
import { message } from "@/utils/message";
import { storage } from "@/utils/storage";
import { useUserStore } from '@/view/user/info/userStore.js'
import { UserInfoVO } from "@/api/user/userTypes";
const userStore = useUserStore()
const postPageCommentsRef = ref<any>(null)
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
    console.log(DirectoryElements.value[index].getBoundingClientRect().top);

    document.querySelector('#appVue .main')!.scrollTo(0, DirectoryElements.value[index].getBoundingClientRect().top - 200)
}

const collect = function () {
    if (!collectDisabled.value) {
        message.warning('请稍后再试')
        return
    }
    collectDisabled.value = false
    localPost.value.collect = !localPost.value.collect

    setTimeout(function () {
        collectDisabled.value = true
    }
        , 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.collect ? '1' : '0'
    }
    collectPost(form).then((res: any) => {
        if (res.code == 200) {
            localPost.value.collectNum = localPost.value.collectNum + (localPost.value.collect ? 1 : -1)
            message.success((localPost.value.collect ? '' : '取消') + '收藏成功')
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
    likeDisabled.value = false
    setTimeout(function () {
        likeDisabled.value = true
    }, 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.like ? '1' : '0'
    }
    favoritePost(form).then((res: any) => {
        if (res.code == 200) {
            localPost.value.likeNum = localPost.value.likeNum + (localPost.value.like ? 1 : -1)
            message.success((localPost.value.like ? '' : '取消') + '点赞成功')
        } else {
            message.error(res.msg)
        }
    })
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
const getLength = function (str: string) {
    return str.length
}
const getUrl = function (url: string) {
    inputContent.value = '<audio>' + url + '</audio>'
    sendComment()
}
</script>
<template>
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

            <div class="post-content post-page__post__content" v-html="localPost?.content">

            </div>
            <div class="post-page__post__footer">
                <div class="post-page__post__footer__editTime">
                    最后编辑于:{{ localPost?.updateAt }}
                </div>
                <div class="post-page__post__footer__operation">
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
                </div>
            </div>

        </div>
        <div class="post-page__sidebar">
            <div class="target-box">
                <div class="target-box__title">
                    <img src="/icon/list.svg" width="28" height="28"
                        style="position: relative;top: 50%;transform: translate(0,-50%);">导航
                </div>
                <div class="target-box__target" v-for="(heading, index) in headings"
                    :style="{ paddingLeft: heading.level * 20 + 'px', width: 'calc(100%-' + heading.level * 20 + 'px)', fontSize: 19 - heading.level + 'px' }"
                    :key="index" @click="to(index)">
                    {{ heading.text }}
                </div>
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

        </div>

    </div>
    <div class="comment">评论</div>
    <div class="post-page__post__commentBox">
        <div class="post-page__post__commentBox--row1">
            <div class="post-page__post__commentBox--row1--login" v-if="storage.get<string>('token')">
                <img width="40" height="40" :src="userProfile.avatar!"
                    style="border-radius: 20px;margin-right: 20px;object-fit: cover;">
                <input maxlength="300" placeholder="发表你的评论" v-model="inputContent">
                <span style="position:absolute;color: rgba(255,255,255,0.4);left: calc(100% - 80px);line-height: 40px;">{{
                    getLength(inputContent) }}/300</span>
            </div>
            <div class="post-page__post__commentBox--row1--noLogin" v-else>
                <a @click="router.push('/login')" style="color: cornflowerblue;">登录</a>后发送评论
            </div>
        </div>
        <div class="post-page__post__commentBox--row2">
            <div style="width: 30px;height: 30px;" v-if="storage.get<string>('token')">
                <recordingComponnent :getUrl="getUrl"></recordingComponnent>
            </div>
            <button :style="{ cursor: inputContent != '' ? 'pointer' : 'not-allowed' }" v-if="storage.get<string>('token')"
                @click="sendComment">发送</button>
        </div>
    </div>
    <div style="padding-bottom:50px;width:70%;position: relative;left: 50%;transform: translate(-50%);">
        <postPageCommentsView :post_id="(router.currentRoute.value.query.id as string)" ref="postPageCommentsRef">
        </postPageCommentsView>
    </div>
</template>
<style scoped>
.post-page {
    width: 70%;
    /* overflow: auto; */
    /* min-height: 100vh; */
    position: relative;
    left: 50%;
    display: flex;
    margin-top: 20px;
    transform: translate(-50%);
}

.line {
    margin: 0 5px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 16px;
    line-height: 30px;
}

.post-page__post {
    position: relative;
    width: 65%;
    min-width: 450px;
    /* background-color: rgba(0,0,0,0.1); */
}

.post-page__post :deep(.el-breadcrumb__inner) {
    color: white;
}

.post-page__sidebar {
    width: 35%;
    min-width: 250px;
    /* background-color: rgba(0,0,0,0.1); */
    margin-left: 10px;
}

.post-page__header {
    position: relative;
    width: 70%;
    left: 15%;
    display: flex;

}

.post-page__header__title {
    position: relative;
    width: 70%;
    height: 80px;
    line-height: 80px;
    font-size: 32px;
    white-space: nowrap;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
}

.post-page__header__button {
    position: relative;
    width: 30%;
    height: 80px;
    line-height: 80px;
    font-size: 32px;
    white-space: nowrap;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;
    display: flex;
    justify-content: right;
    overflow: hidden;
    text-overflow: ellipsis;
}

.post-page__post__info {
    position: relative;
    width: 70%;
    left: 15%;
    height: 30px;
    display: flex;
    padding-left: 10px;
}

.post-page__post__content {
    position: relative;
    width: calc(100% - 30px);
    padding: 10px;
    min-height: 600px;
    border-bottom: rgba(255, 255, 255, 0.2) 1px solid;
}

.post-page__post__footer {
    height: 40px;
    width: 100%;
    display: flex;
}

.post-page__post__footer__editTime {
    position: relative;
    width: 60%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.2);
    text-align: left;
    padding-left: 10px;
    font-family: 'ZCool';
}

.post-page__post__footer__operation {
    position: relative;
    width: 40%;
    height: 40px;
    display: flex;
    justify-content: right;
}

.operation-item {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 30px;
    display: flex;
    background-color: rgba(31, 34, 37);
    border-radius: 5px;
    margin-right: 5px;
    padding: 0 10px;
    cursor: pointer;
}

.operation-item span {
    display: inline-block;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    margin-left: 4px;
    color: rgba(255, 255, 255, 0.7);
}

.more {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    width: 30px;
    height: 30px;
    z-index: 10;
    cursor: pointer;
}

.more-window {
    position: absolute;
    right: 10px;
    top: 60px;
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


.post-page__post__info__author__avatar {
    height: 30px;
    min-width: 30px;
    /* margin: 10px; */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 15px;
    overflow: hidden;
    background-image: url('/public/teamPic/default.png');
    cursor: pointer;
}

.post-page__post__info__author__username {
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.7);
}

.post-page__post__info__author__text__username {
    height: 30px;
    line-height: 30px;
    width: 100%;
    margin-left: 5px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    cursor: pointer;
    font-family: 'ZCool';
}

.post-page__post__info__createAt {
    line-height: 30px;
    font-size: 14px;
    font-family: 'ZCool';
    color: rgba(255, 255, 255, 0.4);
    text-align: left;
}

.post-page__post__info__tags {
    margin-left: 30px;
    line-height: 30px;
    font-size: 14px;
    font-family: 'ZCool';
    color: rgba(255, 255, 255, 1);
    text-align: left;
    padding: 0 8px;
    border-radius: 5px;
    background-color: rgba(52, 58, 64);
}

.post-page__post__info__tags span:hover {
    cursor: pointer;
    color: rgb(77, 122, 143);
}

.post-page__post__operation {
    position: relative;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
}

.post-page__post__operation__item {
    position: relative;
    top: 50%;
    height: 60px;
    width: 50px;
    transform: translate(0, -50%);
    margin: 0 40px;
}

.post-page__post__operation__item__svg {
    height: 50px;
    width: 50px;
}

.post-page__post__operation__item__num {
    width: 50px;
    height: 10px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    line-height: 10px;

}

.post-page__post__commentBox {
    user-select: none;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 70%;
    height: 100px;
    margin-top: 30px;
    border-radius: 5px;
    /* border: rgba(255, 255, 255, 0.2) 1px solid; */
}


.post-page__post__commentBox--row1 {
    height: 50px;
    width: 100%;
}

.post-page__post__commentBox--row1--login {
    height: 50px;
    width: 100%;
    display: flex;
}

.post-page__post__commentBox--row1--login input {
    width: calc(100% - 85px);
    height: 30px;
    border-radius: 5px;
    border: rgba(255, 255, 255, 0.2) 1px solid;
    resize: none;
    outline: none;
    background-color: rgba(26, 27, 30);
    transition: all 0.2s;
    padding: 5px;
    padding-right: 80px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
}

.post-page__post__commentBox--row1--login input::placeholder {
    font-family: 'ZCool';
}

.post-page__post__commentBox--row1--noLogin {
    width: 100%;
    height: 100%;
    background-color: rgba(26, 45, 63);
    line-height: 50px;
    text-align: center;
    color: white;
    font-family: 'ZCool';
    font-size: 14px;
}

.post-page__post__commentBox--row1 textarea:hover {
    border: rgba(255, 255, 255, 0.4) 1px solid;
}

.post-page__post__commentBox--row1 textarea:focus {
    border: #fb7299 1px solid;
}

.post-page__post__commentBox--row2 {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height: 40px;
    width: 100%;
    margin-top: 5px;
    display: flex;
    justify-content: right;
}

.post-page__post__commentBox--row2 button {
    /* position: absolute; */
    /* right: 10px; */
    bottom: 0;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3px;
    background-color: rgba(25, 113, 194);
    color: rgba(255, 255, 255, 0.7);
    font-weight: 700;
    letter-spacing: 3px;
}

.author-box {
    position: relative;
    width: 95%;
    left: 50%;
    transform: translate(-50%);
    background-color: rgba(37, 38, 43);
    /* height: 100px; */
    /* box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 1px; */
    border-radius: 5px;
    margin-top: 10px;
    overflow: hidden;
    border: rgba(55, 58, 64) 1px solid;
}

.comment {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height: 30px;
    width: 70%;
    line-height: 30px;
    font-size: 30px;
    text-align: left;
    /* padding-left: 10px; */
    font-weight: 700;
    color: white;
    font-family: 'ZCool';
}

.author-box__userInfo {
    position: relative;
    width: 100%;
    /* height: 149px; */
    background-color: rgba(37, 38, 43);
    /* border-bottom: rgba(55, 58, 64) 1px solid; */
    display: flex;
}

.author-box__userInfo__baseInfo {
    position: relative;
    width: 70%;
    /* height: 80px; */
    display: flex;
}

.author-box__userInfo__baseInfo__avatar {
    height: 30px;
    min-width: 30px;
    margin: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 15px;
    overflow: hidden;
    background-image: url('/public/teamPic/default.png');
    cursor: pointer;
}

.author-box__userInfo__baseInfo__username {
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.7);
}

.author-box__userInfo__baseInfo__text__username {
    height: 50px;
    line-height: 50px;
    width: 100%;
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    cursor: pointer;
    font-family: 'ZCool';
}

.author-box__userInfo__baseInfo__text__createAt {
    height: 40px;
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    text-align: left;
    color: rgba(255, 255, 255, 0.4);
}

.author-box__userInfo__button {
    position: relative;
    width: 30%;
    /* height: 80px; */
    display: flex;
    justify-content: right;
}

.author-box__userInfo__button--item {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 20px;
    padding: 1px 15px;
    margin: 0 10px;
    line-height: 20px;
    color: white;
    text-align: center;
    font-size: 12px;
    background-color: rgba(25, 113, 194);
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
}

.author-box__userInfo__button--item:hover {
    background-color: rgba(24, 100, 171);
}

.author-box__userInfo__data {
    position: relative;
    width: 100%;
    height: 70px;
    justify-content: space-around;
    display: flex;
    user-select: none;
    margin-top: 10px;
}

.author-box__userInfo__data__item {
    height: 50px;
}

.author-box__userInfo__data__item--number {
    height: 30px;
    width: 100%;
    font-size: 22px;
    line-height: 30px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 7px;
}

.author-box__userInfo__data__item--desc {
    height: 20px;
    width: 100%;
    line-height: 20px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 7px;
}

.target-box {
    position: relative;
    width: 95%;
    left: 50%;
    transform: translate(-50%);
    background-color: rgba(26, 27, 30);
    /* box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 1px; */
    border-radius: 5px;
    margin-top: 10px;
    border: rgba(55, 58, 64) 1px solid;
    padding: 0 0;
    max-height: 400px;
    overflow: scroll;
}

.target-box__title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-weight: 400;
    font-size: 20px;
    background-color: rgba(26, 27, 30);
    color: rgba(255, 255, 255, 0.8);
    text-align: left;
    font-family: 'ZCool';
}

.target-box__target {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    text-align: left;
    color: rgba(255, 255, 255, 0.8);
    user-select: none;
    cursor: pointer;
}

.target-box__target:hover {
    background-color: rgba(65, 68, 74);
}

.dither-animation {
    top: 41px;
}
</style>