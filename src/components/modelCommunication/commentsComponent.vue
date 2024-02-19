<!--
 * @Author: Dhx
 * @Date: 2023-12-14 16:38:31
 * @Description: 
 * @FilePath: \RvcWeb\src\components\modelCommunication\commentsComponent.vue
-->
<script lang="ts" setup>
import commentComponent from '@/components/modelCommunication/commentComponent.vue'
import { CommentVo, CommentChildrenListForm } from '@/api/post/postType'
import { ref } from 'vue';
import { message } from '@/utils/message';
import { getChildComments } from '@/api/post/postApi';
let props = defineProps<{
    commentList: CommentVo[]
}>()
let rootComments = ref<CommentVo[]>(props.commentList)
let showChildComments = ref<boolean[]>([])
let hasChildComments = ref<boolean[]>([])
let childForm = ref<CommentChildrenListForm[]>([])
let disalbed = ref(false)

let hasInit = ref(false)
const pushComment = function (comment: CommentVo) {
    if (!hasInit.value) {
        for (let i = 0; i < rootComments.value.length; i++) {
            // rootComments.value[i].childrenComment = []
            showChildComments.value.push(false)
            hasChildComments.value.push(true)
            childForm.value.push({
                data: rootComments.value[i].postCommentId,
                limit: '10',
                page: '1'
            })
        }
        hasInit.value = true
    }
    if (comment.rootCommentId == "-1") { //根评论
        rootComments.value = [comment].concat(rootComments.value)
        showChildComments.value = [false].concat(showChildComments.value)
        hasChildComments.value = [false].concat(hasChildComments.value)
        childForm.value = [{
            data: comment.postCommentId,
            limit: '10',
            page: '1'
        }].concat(childForm.value)
    } else { //子评论
        for (let i = 0; i < rootComments.value.length; i++) {
            if (rootComments.value[i].postCommentId == comment.rootCommentId) {
                rootComments.value[i].childrenComment = [comment].concat(rootComments.value[i].childrenComment!)
                showChildComments.value[i] = false
                showReply(i)
            }
        }
    }
}
const showReply = function (index: number) {
    if (!hasInit.value) {
        for (let i = 0; i < rootComments.value.length; i++) {
            // rootComments.value[i].childrenComment = []
            showChildComments.value.push(false)
            hasChildComments.value.push(true)
            childForm.value.push({
                data: rootComments.value[i].postCommentId,
                limit: '10',
                page: '1'
            })
        }
        hasInit.value = true
    }
    if (rootComments.value[index].childrenComment?.length == 0) {

        getChildCommentsFunc(index)
    }

    showChildComments.value[index] = !showChildComments.value[index]
    return showChildComments.value[index]
}
const getChildCommentsFunc = function (index: number) {
    if (disalbed.value) {
        return
    }
    disalbed.value = true
    setTimeout(function () {
        disalbed.value = false

    }, 5000)
    getChildComments(childForm.value[index]).then((res: any) => {
        if (res.code == 200) {
            if (res.data.length == 0) {
                message.warning('没有更多评论了')
                hasChildComments.value[index] = false
                return
            }
            disalbed.value = false
            let data = ref<any>(res.data)
            for (let i = 0; i < data.value.length; i++) {
                if (!rootComments.value[index].childrenComment?.some((item: CommentVo) => {                    
                    return item.postCommentId == data.value[i].postCommentId
                })) {
                    rootComments.value[index].childrenComment?.push(data.value[i])
                }
            }
            let page = Number(childForm.value[index].page)
            page++
            childForm.value[index].page = String(page)
        }
    })
}
defineExpose({
    pushComment,
    showChildComments,
    hasChildComments,
    childForm,
    hasInit,
    rootComments
})
</script>
<template>
    <div class="Comments">
        <div v-for="(comment, index) in rootComments" :key="comment.postCommentId">
            <commentComponent @push-comment="pushComment" :show-reply="showReply" :index="index" :comment="comment">
            </commentComponent>
            <div v-show="showChildComments[index]" v-for="(childComment) in comment.childrenComment"
                :key="childComment.postCommentId">
                <commentComponent @push-comment="pushComment" :show-reply="showReply" :index="-1" :comment="childComment">
                </commentComponent>
            </div>
            <div style="color: white;cursor:pointer;font-size: 14px;text-align: center;font-family: 'ZCool';"
                @click="getChildCommentsFunc(index)" v-show="showChildComments[index] && hasChildComments[index]">加载更多</div>
        </div>
    </div>
</template>
<style scoped>
@import "@/components/modelCommunication/style/comments.css";
</style>