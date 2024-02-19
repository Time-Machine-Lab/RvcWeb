<script lang="ts" setup>
import {
    GetChildCommentForm,
    LikeCommentForm,
    ModelComment,
    CommentAddForm,
    ModelChildComment
} from '@/api/rvcModel/modelType';
import userCardComponent from '../user/userCardComponent.vue';
import { UserInfoVO } from '@/api/user/userTypes';
import { message } from '@/utils/message';
import { ref } from 'vue';
import { getChildComments, likeComments, commentAdd } from '@/api/rvcModel/commentApi.ts';
import { useUserStore } from "@/view/user/info/userStore.js";
import modelCommentComponentWaterFall from './modelCommentComponent-waterFall.vue';
import { storage } from '@/utils/storage';
import "@/components/rvcModel/style/modelComment-common.css"
const userStore = useUserStore();
const props = defineProps<{
    comment: ModelComment
}>()
let userProfile = userStore.getProfile
let inputContent = ref('')
let localComment = ref<ModelComment>(props.comment)
let childComments = ref<ModelChildComment[]>([

])
let user = ref<UserInfoVO>({
    avatar: props.comment.picture,
    nickname: props.comment.nickname,
    description: props.comment.commentTime,
    birthday: '',
    fansNum: '',
    followNum: '',
    sex: '',
    uid: '',
    username: ''
})
let clickMore = ref(false)
let dialogClickMore = ref(false)
let showCommentDialogVisible = ref(false)
let moreVisibility = ref(false)
let dialogMoreVisibility = ref(false)
let page = ref(1)
let childCommentDisabled = ref(false)
let getChildCommentForm = ref<GetChildCommentForm>({
    id: '',
    page: String(page.value),
    limit: '5',
    sortType: ''
})
let commentAddForm = ref<CommentAddForm>({
    replyId: '',
    modelId: '',
    content: ''
})
let likeDisabled = ref("")
likeDisabled.value = localComment.value.likes
const like = function () {
    let form = <LikeCommentForm>{
        id: localComment.value.id,
        type: '0'
    }
    if (likeDisabled.value == "1") {
        likeDisabled.value = "0"
        localComment.value.likes = "0"
        let likesNumString = localComment.value.likesNum;
        let likesNum = parseInt(likesNumString);
        likesNum -= 1;
        localComment.value.likesNum = likesNum.toString();
        form.type = '1'
    } else if (likeDisabled.value == "0") {
        likeDisabled.value = "1"
        localComment.value.likes = "1"
        let likesNumString = localComment.value.likesNum;
        let likesNum = parseInt(likesNumString);
        likesNum += 1;
        localComment.value.likesNum = likesNum.toString();
        form.type = '0'
    }
    likeComments(form).then((res: any) => {
        if (res.code == 200) {
            // message.success('操作成功')
        } else {
            message.error(res.message)
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
const loadChildComment = function () {
    if (childCommentDisabled.value == true) return
    childCommentDisabled.value = true
    getChildCommentForm.value.id = localComment.value.id
    getChildCommentForm.value.page = String(page.value)
    getChildComments(getChildCommentForm.value).then((res: any) => {
        if (res.code == 200) {
            let data = res.data.records
            if (data.length == 0) {
                childCommentDisabled.value = true
                return
            }
            for (let i = 0; i < data.length; i++) {
                if (!childComments.value.some((item: ModelChildComment) => {
                    return item.id == data[i].id
                })) {
                    childComments.value.push(data[i])
                }
            }
            childCommentDisabled.value = false
            page.value++
        } else {
            message.error
        }
    })
}
const sendComment = function () {
    if (inputContent.value == '') return
    commentAddForm.value.content = inputContent.value
    commentAddForm.value.modelId = localComment.value.modelId
    commentAddForm.value.replyId = localComment.value.id
    commentAdd(commentAddForm.value).then((res: any) => {
        if (res.code == 200) {
            message.success('评论成功')
            inputContent.value == ''
            let newComment = ref<ModelChildComment>({
                id: res.data,
                uid: storage.get<string>('uid')!,
                nickname: userStore.getProfile.nickname,
                picture: userStore.getProfile.avatar,
                content: commentAddForm.value.content,
                likesNum: '0',
                commentTime: '刚刚',
                parentId: localComment.value.id,
                isLikes: '0'
            })
            childComments.value = [newComment.value].concat(childComments.value)
        } else {
            message.error('评论失败')
        }
    })
    refresh()
}
const refresh = () => {
    inputContent.value = ""
    childCommentDisabled = ref(false)
    page = ref(1)
    childComments.value = []
    setTimeout(() => {
        loadChildComment()
    }, 500);

}
</script>
<template>
    <div class="model-comment">
        <el-dialog v-model="showCommentDialogVisible" :append-to-body="true"
            style="background-color: rgba(26,27,30);border-radius: 5px;" width="600px">
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
            <div class="comment-buttons">
                <div class="status-item" @click="like">
                    <span class="vertical-center"
                        style="height: 12px;width: 12px;background-repeat: no-repeat;background-size: contain;"
                        :style="{ backgroundImage: localComment.likes = '1' ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                    </span>
                    <span>{{ calcNum(comment.likesNum as unknown as number) }}</span>
                </div>
            </div>

            <div class="dialog-input">
                <div style="display: flex;">
                    <img width="50" height="50" :src="userProfile.avatar!"
                        style="border-radius: 20px;margin-right: 20px;object-fit: cover;">
                    <input class="input" v-model="inputContent" maxlength="300">
                </div>
                <div style="text-align: right;">
                    <span>{{ getLength(inputContent) }}/300</span>
                </div>
                <div class="button-group">
                    <div class="button-group__item" @click="sendComment">
                        发送
                    </div>
                </div>
            </div>
            <div class="child-comments" v-infinite-scroll="loadChildComment" infinite-scroll-distance="20"
                :infinite-scroll-disabled="childCommentDisabled" :infinite-scroll-immediate="true">
                <modelCommentComponentWaterFall v-for="(comment, index) in childComments" :key="comment.id" :comment="comment"
                    :index="index"></modelCommentComponentWaterFall>
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
                    <span class="vertical-center"
                        style="height: 12px;width: 12px;background-repeat: no-repeat;background-size: contain;"
                        :style="{ backgroundImage: likeDisabled == '1' ? 'url(\'/icon/heart-fill.svg\')' : 'url(\'/icon/heart.svg\')' }">
                    </span>
                    <span>{{ calcNum(comment.likesNum as unknown as number) }}</span>
                </div>
                <div class="status-item" @click="showChildComment" style="position: absolute;right: 25px;">
                    <div class="vertical-center"
                        style="height: 12px;width: 12px;background-repeat: no-repeat;background-size: contain;background-image: url('/icon/chat.svg');">
                    </div>
                    <span>回复</span>
                </div>
            </div>
        </div>
    </div>
</template>