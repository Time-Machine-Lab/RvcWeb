<!--
 * @Author: Dhx
 * @Date: 2023-12-06 19:12:20
 * @Description: 
 * @FilePath: \RvcWeb\src\view\modelCommunication\pages\postPage.vue
-->

<script lang="ts" setup>
import "@/assets/css/post/postContent.css"
const content = "<img src=\"/backPic/introduction.png\"><div class=\"pt-4\"><h1>RVC社区</h1><p>RVC社区是一个基于VITS语音合成系统的开源工具，可以实现实时的声音转换，适用于直播、视频录制等场景。RVC可以让用户将一个人的声音样本复制并转移到另一个人身上，或者自定义声音的特征，如音调、音色、语速等。RVC社区提供了模型分享下载、在线演示、教程指导等功能，让用户可以轻松上手和体验RVC的魅力。</p><p><a href=\"https://rvc.top/#/\">预览地址</a></p><h1>RVC社区</h1><p>RVC社区是一个基于VITS语音合成系统的开源工具，可以实现实时的声音转换，适用于直播、视频录制等场景。RVC可以让用户将一个人的声音样本复制并转移到另一个人身上，或者自定义声音的特征，如音调、音色、语速等。RVC社区提供了模型分享下载、在线演示、教程指导等功能，让用户可以轻松上手和体验RVC的魅力。</p><p><a href=\"https://rvc.top/#/\">预览地址</a></p><h1>RVC社区</h1><p>RVC社区是一个基于VITS语音合成系统的开源工具，可以实现实时的声音转换，适用于直播、视频录制等场景。RVC可以让用户将一个人的声音样本复制并转移到另一个人身上，或者自定义声音的特征，如音调、音色、语速等。RVC社区提供了模型分享下载、在线演示、教程指导等功能，让用户可以轻松上手和体验RVC的魅力。</p><p><a href=\"https://rvc.top/#/\">预览地址</a></p></div><h1 style=\"text-align: left;\"><span style=\"font-size: 48px; font-family: 华文楷体;\"><strong>标题1</strong></span></h1><div data-w-e-type=\"todo\" style=\"text-align: left;\"><input type=\"checkbox\" disabled=\"\">吃饭</div><div data-w-e-type=\"todo\" style=\"text-align: left;\"><input type=\"checkbox\" disabled=\"\">睡觉</div><p style=\"text-align: left;\">👊👊👊</p><p style=\"text-align: left;\">🤡🤡🤡</p><table style=\"width: auto;\"><tbody><tr><th colSpan=\"1\" rowSpan=\"1\" width=\"200\">1</th><th colSpan=\"1\" rowSpan=\"1\" width=\"auto\">2</th><th colSpan=\"1\" rowSpan=\"1\" width=\"auto\">3</th><th colSpan=\"1\" rowSpan=\"1\" width=\"auto\">4</th></tr><tr><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">a</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">ddd</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">b</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">ddd</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">ddd</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">c</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">ddd</td></tr><tr><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\">d</td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td><td colSpan=\"1\" rowSpan=\"1\" width=\"auto\"></td></tr></tbody></table><p><br></p>"


</script>
<template>
    <div class="post-page">
        <div class="post-page__post">
            <div class="post-page__title">
                <span class="scroll-text">
                    Characters, Clothing, Poses, Among Other Things: A Guide
                </span>
            </div>
            <div class="post-page__info">
                <div class="post-page__info__createAt">
                    2019-01-01
                </div>
                <div class="post-page__info__tags">
                    <span>#MODEL</span>
                </div>
            </div>
            <div class="post-content post-page__content" v-html="content">

            </div>
            <div class="post-page__editTime">
                最后编辑于:2021-12-02
            </div>
        </div>
        <div class="post-page__sidebar">
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
.post-page__post{
    width: 75%;
    min-width: 450px;
    background-color: rgba(0,0,0,0.1);
}
.post-page__sidebar{
    width: 25%;
    min-width: 250px;
    background-color: rgba(0,0,0,0.1);
    margin-left: 10px;
}
.post-page__title {
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
}
.post-page__info{
    position: relative;
    width: 100%;
    height: 20px;
    display: flex;
    padding-left: 10px;
}
.post-page__content{
    position: relative;
    width: calc(100% - 20px);
    padding: 10px;
}
.post-page__editTime{
    position: relative;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: rgba(255,255,255,0.2);
    text-align: left;
    padding-left: 10px;
}
.post-page__info__createAt{
    line-height: 20px;
    font-size: 16px;
    color: rgba(255,255,255,0.4);
    text-align: left;
}
.post-page__info__tags{
    margin-left: 30px;
    line-height: 20px;
    font-size: 16px;
    color: rgba(255,255,255,0.4);
    text-align: left;
}
.post-page__info__tags span:hover{
    cursor: pointer;
    color: rgb(77, 122, 143);
}
</style>