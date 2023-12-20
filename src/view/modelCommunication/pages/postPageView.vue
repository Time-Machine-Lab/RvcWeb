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
import { CommentForm, FavoriteAndCollectionForm, PostVo } from "@/api/post/postType";
import { message } from "@/utils/message";

getPostById((router.currentRoute.value.query.id as unknown as number)).then(res => {
    localPost.value = res.data
})
let localPost = ref<PostVo>({
    avatar: "",
    collect: "",
    collectNum: "",
    commentNum: "",
    content: "",
    cover: "",
    createAt: "",
    like: "",
    likeNum: "",
    nickname: "",
    postId: "",
    tagId: "",
    title: "",
    uid: "",
    updateAt: "",
    username: "",
    watchNum: ""
})
let inputContent = ref<string>('')
let figures = ref([
    {
        desc: "关注",
        number: 0,
    },
    {
        desc: "贴子",
        number: 0,
    },
    {
        desc: "粉丝",
        number: 0,
    },
    {
        desc: "上传模型",
        number: 0,
    }
]);
let likeDisabled = ref(true)
let collectDisabled = ref(true)
const to = function (index: number) {
    let h1 = document.querySelectorAll(".post-content h1")

    window.scrollTo(0, h1[index].getBoundingClientRect().top)
}
const collect = function () {
    if (!collectDisabled.value) return
    collectDisabled.value = false
    setTimeout(function () {
        collectDisabled.value = true
    }
        , 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.has_collect ? '0' : '1'
    }
    collectPost(form).then(res => {
        if (res.status == 200) {
            localPost.value.has_collect = !localPost.value.has_collect
            localPost.value.collectNum = ((localPost.value.collectNum as unknown as number) + 1) as unknown as string
        }
        else {
            message.error('收藏失败，请稍后再试')
        }
    })
}
const like = function () {
    if (!likeDisabled.value) return
    likeDisabled.value = false
    setTimeout(function () {
        likeDisabled.value = true
    }, 2000)
    let form = <FavoriteAndCollectionForm>{
        id: (localPost.value.postId as unknown as string),
        type: localPost.value.has_like ? '0' : '1'
    }
    favoritePost(form).then(res => {
        if (res.status == 200) {
            localPost.value.has_like = !localPost.value.has_like
            localPost.value.likeNum = ((localPost.value.likeNum as unknown as number) + 1) as unknown as string
        }
        message.error('点赞失败，请稍后再试')

    })
}
const calcNum = function (num: number) {
    return num < 1000 ? (num as unknown as string) : (num / 1000 + 'k' as string)
}
const sendComment = function () {
    let form = ref<CommentForm>({
        content: inputContent.value,
        postId: (router.currentRoute.value.query.id as string),
        rootCommentId: "",
        toCommentId: "",
        toUserId: ""
    })
    commentAdd(form.value).then(res => {
        console.log(res);
        inputContent.value = ""
    })

}
</script>
<template>
    <div class="post-page">

        <div class="post-page__post">
            <el-breadcrumb :separator="'>'">
                <el-breadcrumb-item :to="{ path: '/rvc/posts' }">交流区</el-breadcrumb-item>
                <el-breadcrumb-item>贴子</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="post-page__post__title">
                <span class="scroll-text">
                    {{ localPost?.title }}
                </span>
            </div>
            <div class="post-page__post__info">
                <div class="post-page__post__info__createAt">
                    {{ localPost?.create_at }}
                </div>
                <div class="post-page__post__info__tags">
                    <span>{{ localPost?.tagId }}</span>
                </div>
            </div>
            <div class="post-content post-page__post__content" v-html="localPost?.content">

            </div>
            <div class="post-page__post__editTime">
                最后编辑于:{{ localPost?.updateAt }}
            </div>
            <div class="post-page__post__operation">
                <div class="post-page__post__operation__item">
                    <div class="post-page__post__operation__item__svg">
                        <div @click="collect()"
                            style="cursor:pointer;position:relative;left:50%;top:50%;transform:translate(-50%,-50%);
                        height: 40px;width: 40px;background-size: 100% 100%;background-position: center center;background-repeat: no-repeat;"
                            :style="{ backgroundImage: localPost.has_collect ? 'url(\'/icon/star-fill.svg\')' : 'url(\'/icon/star.svg\')' }">
                        </div>
                    </div>
                    <div class="post-page__post__operation__item__num">
                        {{ calcNum(localPost?.collectNum as unknown as number) }}
                    </div>
                </div>
                <div class="post-page__post__operation__item">
                    <div class="post-page__post__operation__item__svg">
                        <div @click="like()"
                            style="cursor:pointer;position:relative;left:50%;top:50%;transform:translate(-50%,-50%);
                        height: 40px;width: 40px;background-size: 100% 100%;background-position: center center;background-repeat: no-repeat;"
                            :style="{ backgroundImage: localPost.has_like ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                        </div>
                    </div>
                    <div class="post-page__post__operation__item__num">
                        {{ calcNum(localPost?.likeNum as unknown as number) }}
                    </div>
                </div>
            </div>
            <!-- <div class="post-page__post__commentBox">
                <div class="post-page__post__commentBox--row1">
                    <span>回复</span>
                </div>
                <div class="post-page__post__commentBox--row2">
                    <textarea maxlength="300" v-model="inputContent"></textarea>
                </div>
                <div class="post-page__post__commentBox--row3">
                    <button :style="{ cursor: inputContent != '' ? 'pointer' : 'not-allowed' }"
                        @click="sendComment">发送</button>
                </div>
            </div> -->
            <div style="padding-bottom:50px;width:100%;position: absolute">
                <postPageCommentsView :post_id="localPost.postId"></postPageCommentsView>
            </div>
        </div>
        <div class="post-page__sidebar">
            <div class="target-box">
                <div class="target-box__title">
                    <img src="/icon/list.svg" width="28" height="28"
                        style="position: relative;top: 50%;transform: translate(0,-50%);">导航
                </div>
                <div class="target-box__target" @click="to(0)">
                    RVC社区
                </div>
                <div class="target-box__target" @click="to(1)">
                    RVC社区
                </div>
                <div class="target-box__target" @click="to(2)">
                    RVC社区
                </div>
            </div>
            <div class="author-box">
                <div class="author-box__userInfo">
                    <div class="author-box__userInfo__baseInfo">
                        <div class="author-box__userInfo__baseInfo__avatar"
                            :style="{ backgroundImage: 'url(\'' + localPost?.avatar + '\')' }">

                        </div>
                        <div class="author-box__userInfo__baseInfo__username">
                            <div class="author-box__userInfo__baseInfo__text__username">
                                {{ localPost?.nickname }}
                            </div>
                            <div class="author-box__userInfo__baseInfo__text__createAt">
                                <!-- 注册于 {{ localPost? }} -->
                            </div>
                        </div>
                    </div>
                    <div class="author-box__userInfo__data">
                        <div class="author-box__userInfo__data__item" v-for="(figure, index) in figures" :key="index">
                            <div class="author-box__userInfo__data__item--number">
                                {{ figure.number }}
                            </div>
                            <div class="author-box__userInfo__data__item--desc">
                                {{ figure.desc }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.post-page {
    width: 80%;
    /* overflow: auto; */
    min-height: 100vh;
    position: relative;
    left: 50%;
    display: flex;
    margin-top: 20px;
    transform: translate(-50%);
}

.post-page__post {
    position: relative;
    width: 75%;
    min-width: 450px;
    /* background-color: rgba(0,0,0,0.1); */
}

.post-page__post :deep(.el-breadcrumb__inner) {
    color: white;
}

.post-page__sidebar {
    width: 25%;
    min-width: 250px;
    /* background-color: rgba(0,0,0,0.1); */
    margin-left: 10px;
}

.post-page__post__title {
    position: relative;
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 32px;
    white-space: nowrap;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
}

.post-page__post__info {
    position: relative;
    width: 100%;
    height: 20px;
    display: flex;
    padding-left: 10px;
}

.post-page__post__content {
    position: relative;
    width: calc(100% - 20px);
    padding: 10px;
    border-bottom: rgba(255, 255, 255, 0.2) 1px solid;
}

.post-page__post__editTime {
    position: relative;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.2);
    text-align: left;
    padding-left: 10px;
}

.post-page__post__info__createAt {
    line-height: 20px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    text-align: left;
}

.post-page__post__info__tags {
    margin-left: 30px;
    line-height: 20px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    text-align: left;
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
    width: 95%;
    height: 220px;
    margin-top: 30px;
    background-color: rgba(40, 40, 50);
    border-radius: 5px;
    border: rgba(255, 255, 255, 0.2) 1px solid;
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 1px;
}

.post-page__post__commentBox--row1 {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height: 60px;
    width: 90%;
    text-align: left;
}

.post-page__post__commentBox--row1 span {
    line-height: 60px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
    font-weight: 700;
}

.post-page__post__commentBox--row2 {
    height: 100px;
    width: 100%;
}

.post-page__post__commentBox--row2 textarea {
    width: calc(90% - 10px);
    height: calc(100% - 10px);
    border-radius: 5px;
    border: rgba(255, 255, 255, 0.2) 1px solid;
    resize: none;
    outline: none;
    background-color: rgba(40, 40, 50);
    transition: all 0.2s;
    padding: 5px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
}

.post-page__post__commentBox--row2 textarea:hover {
    border: rgba(255, 255, 255, 0.4) 1px solid;
}

.post-page__post__commentBox--row2 textarea:focus {
    border: #fb7299 1px solid;
}

.post-page__post__commentBox--row3 {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height: 40px;
    width: 90%;
    margin-top: 5px;
}

.post-page__post__commentBox--row3 button {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3px;
    background-color: #fb7299;
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
    height: 150px;
    /* box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 1px; */
    border-radius: 5px;
    margin-top: 10px;
    overflow: hidden;
    border: rgba(55, 58, 64) 1px solid;
}

.author-box__userInfo {
    position: relative;
    width: 100%;
    height: 149px;
    border-bottom: rgba(55, 58, 64) 1px solid;
}

.author-box__userInfo__baseInfo {
    position: relative;
    width: 90%;
    height: 80px;
    display: flex;
}

.author-box__userInfo__baseInfo__avatar {
    height: 60px;
    min-width: 60px;
    margin: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 5px;
    overflow: hidden;
    background-image: url('/public/teamPic/default.png');
}

.author-box__userInfo__baseInfo__text {
    height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.7);
}

.author-box__userInfo__baseInfo__text__username {
    height: 40px;
    line-height: 40px;
    width: 100%;
    color: rgba(255, 255, 255, 0.7);
    font-size: 24px;
    font-weight: 700;
    text-align: left;
}

.author-box__userInfo__baseInfo__text__createAt {
    height: 40px;
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    text-align: left;
    color: rgba(255, 255, 255, 0.4);
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
    background-color: rgba(37, 38, 43);
    /* box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 1px; */
    border-radius: 5px;
    margin-top: 10px;
    border: rgba(55, 58, 64) 1px solid;
    padding: 0 0;
    overflow: hidden;
}

.target-box__title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-weight: 700;
    font-size: 20px;
    background-color: rgba(26, 27, 30);
    color: rgba(255, 255, 255, 0.8);
    text-align: left;
}

.target-box__target {
    width: calc(100% - 20px);
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    text-align: left;
    padding-left: 20PX;
    color: rgba(255, 255, 255, 0.8);
    user-select: none;
}

.target-box__target:hover {
    background-color: rgba(255, 255, 255, 0.2);
}</style>