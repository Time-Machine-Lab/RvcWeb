<script setup lang="ts">
import { ref } from 'vue';
import { ModelComment, CommentAddForm, LikeCommentForm } from '@/api/rvcModel/modelType'
import { commentAdd, likeComments } from '@/api/rvcModel/commentApi'
import { message } from '@/utils/message';
let props = defineProps<{
    comment: ModelComment,
    index: number,
}
>()
let currentComment = ref<ModelComment>(props.comment)
let commentStyle = ref('root-comment');
let inputVisibility = ref(false)
let inputContent = ref('')
const input = ref<any>(null)
const handleReply = function () {
    inputVisibility.value = true
    setTimeout(function () { input!.value!.focus() }, 500)
}
const handleBlur = function () {
    setTimeout(function () { inputVisibility.value = false }, 100)
}
const like = function () {
    let form = ref<LikeCommentForm>({
        id: currentComment.value.id,
        type: currentComment.value.likes?'1':'0'
    })
    likeComments(form.value).then((res: any) => {
        if (res.code == 200) {
            currentComment.value.likes = !currentComment.value.likes
            let num = Number(currentComment.value.likesNum)
            num += (currentComment.value.likes ? 1 : -1)
            currentComment.value.likesNum = String(num)
        } else {
            message.error(res.msg)
        }
    })
}
const sendComment = function () {
    let form = ref<CommentAddForm>({
        content: inputContent.value,
        replyId: currentComment.value.id,
        modelId: currentComment.value.modelId
    })
    commentAdd(form.value).then((res: any) => {
        if (res.code == 200) {
            message.success('发送成功，等待审核')
        } else {
            message.error(res.msg)
        }
        inputContent.value = ""

    })

}
const calcNum = function (num: number) {
    return num < 1000 ? (num as unknown as string) : (num / 1000 + 'k' as string)
}
</script>
<template>
    <div style="width: 100%;position: relative">
        <div :class="commentStyle">
            <div class="comment-left">
                <router-link :to="'/user?id=' + currentComment.uid">
                    <div class="avatar-border">
                        <img height="40" width="40" style="object-fit: cover;" :src="currentComment?.picture" alt="commenter-avatar">
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
                    <span style="display: inline-block;background-color: rgba(102,102,102,0.2);height: 80%;border-radius: 5px;padding: 0 10px;
  margin-right: 5px;">
                        <!-- {{ currentComment?.replayUser ? '@' + currentComment?.replayUser?.nickname : '' }} -->
                    </span>
                    <span>
                        {{ currentComment?.content }}
                    </span>
                </div>
                <div class="comment-status">
                    {{ currentComment?.commentTime }}
                    <div class="status-item" @click="like">
                        <div class="vertical-center"
                            style="top:100%;transform:translate(0,-100%);height: 12px;width: 12px;background-repeat: no-repeat;background-size: contain;"
                            :style="{ backgroundImage: currentComment.likes? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                        </div>
                        <span>{{ calcNum(currentComment.likesNum as unknown as number) }}</span>
                    </div>
                    <span style="margin-left: 20px;cursor: pointer" @click="handleReply">
                        回复
                    </span>
                </div>
                <div v-show="inputVisibility" class="reply">
                    <span>@{{ currentComment.nickname }}:</span>
                    <input class="input" placeholder="" v-model="inputContent" @blur="handleBlur" ref="input">
                    <button :style="{ cursor: inputContent != '' ? 'pointer' : 'not-allowed' }"
                        @click="sendComment()">发送</button>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    text-align: left;
}

.comment {
    position: relative;
    width: 100%;
    background-color: white;
    display: flex;
}

.input {
    position: relative;
    width: 70%;
    float: left;
    height: 30px;
    border: rgba(100, 100, 100) 1px solid;
    outline: none;
    border-radius: 5px;
    background-color: rgba(26, 27, 30);
    color: rgba(255, 255, 255, 0.7);
    padding-left: 10px;
    margin-left: 10px;
}

.root-comment {
    position: relative;
    width: 100%;
    display: flex;
    scale: 1 1;
    margin-top: 40px;
}

.child-comment {
    position: relative;
    width: 100%;
    display: flex;
    scale: 0.9;
    margin-top: 20px;
}

.comment-left {
    width: 40px;
    height: 40px;
    display: inline-block;
}

.comment-right {
    width: 100%;
    display: inline-block;
    font-size: 20px;
}

.avatar-border {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    overflow-x: hidden;
    color: white;
}

.commenter-nickName {
    height: 25px;
    width: 95%;
    margin: auto;
    line-height: 20px;
    font-size: 18px;
    font-family: 'standard5', serif;
    color: rgba(255, 255, 255, 0.5);
}

.comment-content {
    width: 95%;
    margin: auto;
    font-size: 18px;
    text-align: left;
    line-height: 30px;
    letter-spacing: 2px;
    font-family: '黑体';
    color: white;
}

.comment-status {
    height: 20px;
    width: 95%;
    margin: auto;
    font-size: 12px;
    line-height: 25px;
    color: rgba(255, 255, 255, 0.5);
    display: flex;
}

.status-item {
    height: 20px;
    display: flex;
    margin-left: 15px;
    cursor: pointer;
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

.reply {
    position: relative;
    height: 30px;
    width: 90%;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    margin-top: 10px;
}

.reply button {
    position: relative;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    margin-left: 5px;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3px;
    background-color: rgba(25, 113, 194);
    color: rgba(255, 255, 255, 0.7);
    font-weight: 700;
    letter-spacing: 3px;
}

.reply span {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    line-height: 30px;
}
</style>
