<!--
 * @Author: Dhx
 * @Date: 2023-12-06 19:12:20
 * @Description: 
 * @FilePath: \RvcWeb\src\view\modelCommunication\pages\postPageView.vue
-->

<script lang="ts" setup>
import "@/assets/css/post/postContent.css"
import postPageCommentsView from "./postPageCommentsView.vue"
import { ref } from "vue";
const content = "<img src=\"https://s2.loli.net/2023/12/14/OFlkw3KranCL7bH.jpg\"><div class=\"pt-4\"><h1>RVC社区</h1><p>RVC社区是一个基于VITS语音合成系统的开源工具，可以实现实时的声音转换，适用于直播、视频录制等场景。RVC可以让用户将一个人的声音样本复制并转移到另一个人身上，或者自定义声音的特征，如音调、音色、语速等。RVC社区提供了模型分享下载、在线演示、教程指导等功能，让用户可以轻松上手和体验RVC的魅力。</p><p><a href=\"https://rvc.top/#/\">预览地址</a></p><h1>RVC社区</h1><p>RVC社区是一个基于VITS语音合成系统的开源工具，可以实现实时的声音转换，适用于直播、视频录制等场景。RVC可以让用户将一个人的声音样本复制并转移到另一个人身上，或者自定义声音的特征，如音调、音色、语速等。RVC社区提供了模型分享下载、在线演示、教程指导等功能，让用户可以轻松上手和体验RVC的魅力。</p><p><a href=\"https://rvc.top/#/\">预览地址</a></p><h1>RVC社区</h1><p>RVC社区是一个基于VITS语音合成系统的开源工具，可以实现实时的声音转换，适用于直播、视频录制等场景。RVC可以让用户将一个人的声音样本复制并转移到另一个人身上，或者自定义声音的特征，如音调、音色、语速等。RVC社区提供了模型分享下载、在线演示、教程指导等功能，让用户可以轻松上手和体验RVC的魅力。</p><p><a href=\"https://rvc.top/#/\">预览地址</a></p></div><h1 style=\"text-align: left;\"><span style=\"font-size: 48px; font-family: 华文楷体;\"><strong>标题1</strong></span></h1><div data-w-e-type=\"todo\" style=\"text-align: left;\"><input type=\"checkbox\" disabled=\"\">吃饭</div><div data-w-e-type=\"todo\" style=\"text-align: left;\"><input type=\"checkbox\" disabled=\"\">睡觉</div><p style=\"text-align: left;\">👊👊👊</p><p style=\"text-align: left;\">🤡🤡🤡</p><table style=\"width: auto;\"><tbody><tr><th colSpan=\"1\" rowSpan=\"1\" width=\"200\">1</th><th colSpan=\"1\" rowSpan=\"1\" width=\"auto\">2</th><th colSpan=\"1\" rowSpan=\"1\" width=\"auto\">3</th><th colSpan=\"1\" rowSpan=\"1\" width=\"auto\">4</th></tr><tr><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">a</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">ddd</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">b</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">ddd</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">ddd</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">c</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">ddd</td></tr><tr><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">d</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td></tr></tbody></table><p><br></p>"
let inputContext = ref<string>('')
const to = function (index: number) {
    let h1 = document.querySelectorAll(".post-content h1")

    window.scrollTo(0, h1[index].getBoundingClientRect().top)
}
let figures = ref([
    {
        desc: "关注",
        number: 11,
    },
    {
        desc: "贴子",
        number: 43,
    },
    {
        desc: "粉丝",
        number: 423,
    },
    {
        desc: "上传模型",
        number: 12,
    }
]);
</script>
<template>
    <div class="post-page">

        <div class="post-page__post" >
            <el-breadcrumb :separator="'>'">
                <el-breadcrumb-item :to="{ path: '/communication' }">交流区</el-breadcrumb-item>
                <el-breadcrumb-item>贴子</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="post-page__post__title">
                <span class="scroll-text">
                    标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
                </span>
            </div>
            <div class="post-page__post__info">
                <div class="post-page__post__info__createAt">
                    2019-01-01
                </div>
                <div class="post-page__post__info__tags">
                    <span>#MODEL</span>
                </div>
            </div>
            <div class="post-content post-page__post__content" v-html="content">

            </div>
            <div class="post-page__post__editTime">
                最后编辑于:2021-12-02
            </div>
            <div class="post-page__post__operation">
                <div class="post-page__post__operation__item">
                    <div class="post-page__post__operation__item__svg">
                        <img src="/icon/star.svg" width="40" height="40">
                    </div>
                    <div class="post-page__post__operation__item__num">
                        3.2K
                    </div>
                </div>
                <div class="post-page__post__operation__item">
                    <div class="post-page__post__operation__item__svg">
                        <img src="/icon/like.svg" width="40" height="40">
                    </div>
                    <div class="post-page__post__operation__item__num">
                        1K
                    </div>
                </div>
            </div>
            <div class="post-page__post__commentBox">
                <div class="post-page__post__commentBox--row1">
                    <span>回复</span>
                </div>
                <div class="post-page__post__commentBox--row2">
                    <textarea maxlength="300" v-model="inputContext"></textarea>
                </div>
                <div class="post-page__post__commentBox--row3">
                    <button :style="{ cursor: inputContext != '' ? 'pointer' : 'not-allowed' }">发送</button>
                </div>
            </div>
            <div style="height: 500px;">
                <postPageCommentsView></postPageCommentsView>
            </div>
        </div>
        <div class="post-page__sidebar">
            <div class="author-box">
                <div class="author-box__userInfo">
                    <div class="author-box__userInfo__baseInfo">
                        <div class="author-box__userInfo__baseInfo__avatar">

                        </div>
                        <div class="author-box__userInfo__baseInfo__username">
                            <div class="author-box__userInfo__baseInfo__text__username">
                                USERNAME
                            </div>
                            <div class="author-box__userInfo__baseInfo__text__createAt">
                                Joined 2021-01-01
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
                <div class="author-box__operation">
                    <button class="author-box__operation--follow">＋关注</button>
                    <button class="author-box__operation--contact">私信</button>
                </div>
            </div>
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
        </div>
    </div>
</template>
<style scoped>
.post-page {
    width: 80%;
    overflow: auto;
    position: relative;
    left: 50%;
    display: flex;
    transform: translate(-50%);
}

.post-page__post {
    width: 75%;
    min-width: 450px;
    /* background-color: rgba(0,0,0,0.1); */
}
.post-page__post :deep(.el-breadcrumb__inner){
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
    background-color: rgba(40, 40, 50);
    height: 220px;
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 1px;
    border-radius: 10px;
    margin-top: 10px;
    border: rgba(255, 255, 255, 0.2) 1px solid;
}

.author-box__userInfo {
    position: relative;
    width: 90%;
    height: 150px;
    border-bottom: rgba(255, 255, 255, 0.2) 1px solid;
    left: 50%;
    transform: translate(-50%);
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
    background-image: url('/public/teamPic/dhx.jpg');
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

.author-box__operation {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
    height: 70px;
    display: flex;
    justify-content: space-around;
}

.author-box__operation button {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 35px;
    width: 120px;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    border: none;
    letter-spacing: 5px;
    font-size: 16px;
    font-weight: 700;
    color: white;
    border: rgba(255, 255, 255, 0.2) 1px solid;
}

.author-box__operation--follow {
    background-color: #fb7299;
    transition: all 0.3s;
}

.author-box__operation--follow:hover {
    background-color: #f7638d;
}

.author-box__operation--contact {
    background-color: rgba(0, 0, 0, 0.1);
}

.target-box {
    position: relative;
    width: 95%;
    left: 50%;
    transform: translate(-50%);
    background-color: rgba(40, 40, 50);
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 1px;
    border-radius: 10px;
    margin-top: 10px;
    border: rgba(255, 255, 255, 0.2) 1px solid;
    padding: 10px 0;
}

.target-box__title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-weight: 700;
    font-size: 20px;
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
}
</style>