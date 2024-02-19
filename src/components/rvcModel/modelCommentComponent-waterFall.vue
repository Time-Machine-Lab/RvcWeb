<script setup lang="ts">
import { ref } from 'vue';
import { ModelChildComment, CommentAddForm, LikeCommentForm } from '@/api/rvcModel/modelType'
import { commentAdd, likeComments } from '@/api/rvcModel/commentApi.ts'
import { message } from '@/utils/message';
let props = defineProps<{
    comment: ModelChildComment,
    index: number,
}
>()
let currentComment = ref<ModelChildComment>(props.comment)
let commentStyle = ref('root-comment');
let inputVisibility = ref(false)
let inputContent = ref('')
const input = ref<any>(null)
// const handleReply = function () {
//     inputVisibility.value = true
//     setTimeout(function () { input!.value!.focus() }, 500)
// }
const handleBlur = function () {
    setTimeout(function () { inputVisibility.value = false }, 100)
}
const like = function () {
    let form = ref<LikeCommentForm>({
        id: currentComment.value.id,
        type: currentComment.value.isLikes == '1' ? '1' : '0'
    })
    likeComments(form.value).then((res: any) => {
        if (res.code == 200) {
            currentComment.value.isLikes = currentComment.value.isLikes == '0' ? '1' : '0'
            let num = Number(currentComment.value.likesNum)
            num += (currentComment.value.isLikes == '1' ? 1 : -1)
            currentComment.value.likesNum = String(num)
            message.success((currentComment.value.isLikes == '1' ? '' : '取消') + '点赞成功')
        } else {
            message.error(res.msg)
        }
    })
}
const sendComment = function () {
    let form = ref<CommentAddForm>({
        content: inputContent.value,
        replyId: currentComment.value.id,
        modelId: currentComment.value.parentId //modelId
    })
    commentAdd(form.value).then((res: any) => {
        if (res.code == 200) {
            message.success('发送成功')
            
        } else {
            message.error(res.msg)
        }
        inputContent.value = ""

    })

}
const calcNum = function (num: number) {
    return num < 1000 ? (num as unknown as string) : (num / 1000 + 'k' as string)
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
const handleBlur2 = function () {
    setTimeout(function () {
        moreVisibility.value = false
    }, 200)
}
const isAudio = function (str: string) {
    return str.includes('<audio>') && str.includes('</audio>')
}
const parseUrl = function (str: string) {
    return str.match(/<audio>(.*?)<\/audio>/)?.[1];
}
</script>
<template>
    <div style="width: 100%;position: relative">
        <div :class="commentStyle">
            <div class="comment-left">
                <router-link :to="'/user?id=' + currentComment.uid">
                    <div class="avatar-border">
                        <img height="40" width="40" style="object-fit: cover;" :src="currentComment?.picture"
                            alt="commenter-avatar">
                    </div>
                </router-link>
            </div>
            <div class="comment-right">
                <router-link :to="'/user?id=' + currentComment.uid">
                    <div class="commenter-nickName">
                        {{ currentComment?.nickname }}
                    </div>
                </router-link>

                <div class="comment-content">
                    <!-- <span style="display: inline-block;background-color: rgba(102,102,102,0.2);height: 80%;border-radius: 5px;padding: 0 10px;">
                        {{ currentComment?.replayUser ? '@' + currentComment?.replayUser?.nickname : '' }}
                    </span> -->
                    <span v-if="!isAudio(currentComment?.content)">
                        {{ currentComment?.content }}
                    </span>
                    <div style="position: relative" v-else>
                        <audioPlayerComponent :src="parseUrl(currentComment?.content)"></audioPlayerComponent>
                    </div>
                </div>
                <div class="comment-status">
                    {{ currentComment?.commentTime }}
                    <div class="status-item" @click="like">
                        <span class="vertical-center"
                            style="top:100%;transform:translate(0,-100%);height: 12px;width: 12px;background-repeat: no-repeat;background-size: contain;"
                            :style="{ backgroundImage: currentComment.isLikes == '1' ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                        </span>
                        <span>{{ calcNum(currentComment.likesNum as unknown as number) }}</span>
                    </div>
                    <!-- <span style="margin-left: 20px;cursor: pointer" @click="handleReply">
                        回复
                    </span> -->
                </div>
                <div v-show="inputVisibility" class="reply">
                    <span>@{{ currentComment.nickname }}:</span>
                    <input class="input" placeholder="" v-model="inputContent" @blur="handleBlur" ref="input">
                    <button :style="{ cursor: inputContent != '' ? 'pointer' : 'not-allowed' }"
                        @click="sendComment()">发送</button>
                </div>

            </div>
            <div>
                <div tabindex="-1" class="more" @click="handleClickMore" @blur="handleBlur2"
                    :class="clickMore ? 'dither-animation' : ''" style="z-index: 10;">
                    <div
                        style="height: 16px;width:16px;background-image: url('/icon/more.svg');background-repeat: no-repeat;background-position: center center;background-size: contain;">
                    </div>
                </div>
            </div>
            <div class="more-window" v-show="moreVisibility">
                <div class="more-window__item" @click="message.warning('开发中')">
                    举报
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import "./style/modelComment-waterFall.css";
</style>