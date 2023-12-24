<script lang="ts" setup>
import { LikeCommentForm, ModelComment } from '@/api/rvcModel/modelType';
import userCardComponent from '../user/userCardComponent.vue';
import { UserInfoVO } from '@/api/user/userTypes';
import { message } from '@/utils/message';
import { ref } from 'vue';
import { likeComments } from '@/api/rvcModel/modelApi';
import { useUserStore } from "@/view/user/info/userStore.js";
import ModelCommentComponentB from './modelCommentComponentB.vue';
const userStore = useUserStore();
const props = defineProps<{
    comment: ModelComment
}>()
let userProfile = userStore.getProfile
let inputContent = ref('')
let localComment = ref<ModelComment>(props.comment)
let childComments = ref<ModelComment[]>([
    {
        "id": "1736285491279269890",
        "uid": "1735662165315596290",
        "nickname": "蔡徐坤",
        "picture": "",
        "content": "学长太帅了",
        "likesNum": "2",
        "commentTime": "2023-12-17 15:21:34",
        "modelId": "1735910925897834498",
        "isLikes": "1"
    },
    {
        "id": "1736285491279269890",
        "uid": "1735662165315596290",
        "nickname": "蔡徐坤",
        "picture": "",
        "content": "学长太帅了",
        "likesNum": "2",
        "commentTime": "2023-12-17 15:21:34",
        "modelId": "1735910925897834498",
        "isLikes": "1"
    }
])
let user = ref<UserInfoVO>({
    avatar: props.comment.picture,
    nickname: props.comment.nickname,
    description: props.comment.commentTime
})
let clickMore = ref(false)
let dialogClickMore = ref(false)
let showCommentDialogVisible = ref(false)
let moreVisibility = ref(false)
let dialogMoreVisibility = ref(false)
let likeDisabled = ref(false)
const like = function () {
    if (likeDisabled.value) return
    likeDisabled.value = true
    let form = <LikeCommentForm>{
        id: localComment.value.id,
        type: localComment.value.isLikes == '0' ? '0' : '1'
    }
    likeComments(form).then((res: any) => {
        if (res.code == 200) {
            localComment.value.isLikes = localComment.value.isLikes == '0' ? '1' : '0'
            let num = Number(localComment.value.likesNum)
            num += (localComment.value.isLikes == '1' ? 1 : -1)
            localComment.value.likesNum = String(num)
            message.success('')
            likeDisabled.value = false
        } else {
            message.error(res.msg)
            likeDisabled.value = false
        }
    })
}
const calcNum = function (num: number) {
    return num < 1000 ? (num as unknown as string) : (num / 1000 + 'k' as string)
}
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
const showChildComment = function () {
    showCommentDialogVisible.value = true
}
const getLength = function (str: string) {
    return str.length
}
const handleDialogClickMore = function () {
    dialogClickMore.value = true
    dialogMoreVisibility.value = !dialogMoreVisibility.value
    setTimeout(function () {
        dialogClickMore.value = false
    }, 200)
}
</script>
<template>
    <div class="model-comment">
        <el-dialog v-model="showCommentDialogVisible" :append-to-body="true"
            style="background-color: rgba(26,27,30);border-radius: 5px;" width="40%">
            <div class="user-info">
                <userCardComponent :user="user"></userCardComponent>
            </div>
            <div tabindex="-1" class="more" style="right: 30px;" @click="handleDialogClickMore" @blur="handleBlur"
                :class="dialogClickMore ? 'dither-animation' : ''">
                <div
                    style="height: 12px;width:12px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
                </div>
            </div>

            <div class="more-window" v-show="dialogMoreVisibility">
                <div class="more-window__item" @click="message.warning('开发中')">
                    举报
                </div>
            </div>
            <div class="comment-content">
                {{ localComment.content }}
            </div>
            <div style="margin-top: 30px;">
                <div class="status-item" @click="like">
                    <div class="vertical-center"
                        style="height: 12px;width: 12px;background-repeat: no-repeat;background-size: contain;"
                        :style="{ backgroundImage: comment.isLikes == '1' ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                    </div>
                    <span>{{ calcNum(comment.likesNum as unknown as number) }}</span>
                </div>
            </div>

            <div class="dialog-input">
                <div style="display: flex;">
                    <img width="40" height="40" :src="userProfile.avatar" style="border-radius: 20px;margin-right: 20px;">
                    <input class="input" v-model="inputContent" maxlength="200">
                </div>
                <div style="text-align: right;">
                    <span>{{ getLength(inputContent) }}/200</span>

                </div>
            </div>
            <div class="child-comments">
                <ModelCommentComponentB v-for="(comment, index) in childComments" :key="index" :comment="comment"
                    :index="index"></ModelCommentComponentB>
            </div>
        </el-dialog>
        <div class="model-comment__center">
            <div class="model-comment__center__top">
                <div style="width: 90%;height: 40px;">
                    <userCardComponent :user="user"></userCardComponent>
                </div>
                <div style="width: 10%;height: 40px;">
                    <div tabindex="-1" class="more" @click="handleClickMore" @blur="handleBlur"
                        :class="clickMore ? 'dither-animation' : ''">
                        <div
                            style="height: 12px;width:12px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
                        </div>
                    </div>
                </div>

                <div class="more-window" v-show="moreVisibility">
                    <div class="more-window__item" @click="message.warning('开发中')">
                        举报
                    </div>
                </div>
            </div>
            <div class="model-comment__center__content">
                {{ props.comment.content }}
            </div>
            <div class="model-comment__center__bottom">
                <div class="status-item" @click="like">
                    <div class="vertical-center"
                        style="height: 12px;width: 12px;background-repeat: no-repeat;background-size: contain;"
                        :style="{ backgroundImage: comment.isLikes == '1' ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                    </div>
                    <span>{{ calcNum(comment.likesNum as unknown as number) }}</span>
                </div>
                <div class="status-item" @click="showChildComment" style="position: absolute;right: 25px;">
                    <div class="vertical-center"
                        style="height: 12px;width: 12px;background-repeat: no-repeat;background-size: contain;background-image: url('/icon/chat.svg');">
                    </div>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.model-comment {
    width: 280px;
    background-color: rgba(37, 38, 43);
    border-radius: 10px;
    border: rgba(55, 58, 64) 1px solid;
}

.user-info {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 100%;
    height: 80px;
}

.comment-content {
    width: calc(100%);
    word-break: break-all;
    color: rgba(193, 194, 197);
    font-size: 14px;
    margin-top: 20px;
    text-align: left;
}

.model-comment__center {
    margin: 15px;
}

.dialog-input {
    margin-top: 20px;
    width: 100%;
}

.input {
    outline: none;
    width: calc(100% - 30px);
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    background-color: rgba(26, 27, 30);
    color: white;
    font-size: 16px;
    border-radius: 5px;
    border: rgba(55, 58, 64) 1px solid;
}

.child-comments {
    width: 100%;
    margin-top: 20px;
}

.model-comment__center__top {
    height: 40px;
    width: 100%;
    display: flex;
}

.model-comment__center__content {
    width: calc(100% - 10px);
    padding: 10px 5px;
    word-wrap: break-word;
    text-align: left;
    font-size: 12px;
    color: rgba(193, 194, 197);
}

.model-comment__center__bottom {
    height: 20px;
    width: 100%;
    margin-top: 10px;
    display: flex;
}

.status-item {
    height: 20px;
    display: flex;
    margin-left: 20px;
    width: 25px;
    padding: 0 5px;
    cursor: pointer;
    border-radius: 10px;
    background-color: rgba(40, 42, 47);
}

.status-item:hover {
    background-color: rgba(46, 48, 54);
}

.status-item span {
    display: inline-block;
    font-weight: 700;
    height: 20px;
    /* line-height: 20px; */
    font-size: 12px;
    margin-left: 4px;
    color: rgba(255, 255, 255, 0.7);
}

.more {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 25px;
    right: 10px;
    cursor: pointer;
}

.more-window {
    position: absolute;
    right: 30px;
    top: 50px;
    width: 70px;
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

.dither-animation {
    top: 26px;
}</style>