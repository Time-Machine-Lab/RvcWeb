<!--
 * @Author: Dhx
 * @Date: 2023-12-14 17:34:48
 * @Description: 
 * @FilePath: \RvcWeb\src\view\modelCommunication\pages\postPageCommentsView.vue
-->
<script lang="ts" setup>
import { GetCommentListForm, CommentVo } from '@/api/post/postType';
import { getCommentList } from '@/api/post/postApi'
import commentsComponent from '@/components/modelCommunication/commentsComponent.vue';
import { ref } from 'vue';
import { message } from '@/utils/message';
const commentsComponentRef = ref<any>(null)
let props = defineProps<{
    post_id: string
}>()

let scrollDisabled = ref(false)
let limit = ref('10')
let page = ref(1)
let disalbed = ref(false)

const load = function () {
    if (disalbed.value) {
        return
    }
    disalbed.value = true
    let form = ref<GetCommentListForm>({
        data: props.post_id,
        page: page as unknown as string,
        limit: limit.value
    })
    getCommentList(form.value).then(res => {
        if (res.data.length == 0) {
            message.warning('没有更多评论了')
            disalbed.value = true
            return
        }
        disalbed.value = false
        let data = ref<CommentVo[]>(res.data)
        for (let i = 0; i < data.value.length; i++) {
            if (!commentList.value.some((item: CommentVo) => {                
                return item.postCommentId == data.value[i].postCommentId
            })) {
                data.value[i].childrenComment = []
                commentList.value.push(data.value[i])
                if (commentsComponentRef.value.hasInit) {
                    commentsComponentRef.value.showChildComments.push(false)
                    commentsComponentRef.value.hasChildComments.push(true)
                    commentsComponentRef.value.childForm.push({
                        data: data.value[i].postCommentId,
                        limit: '10',
                        page: '1'
                    })
                }
            }
        }
        page.value++
    })
}
let commentList = ref<CommentVo[]>([

])
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pushComment = function (comment: CommentVo) {
    commentList.value = [comment].concat(commentList.value)
    commentsComponentRef.value.pushComment(comment)
}
defineExpose({
    pushComment,
})
</script>
<template>
    <commentsComponent ref="commentsComponentRef" style="position: relative;" v-infinite-scroll="load"
        infinite-scroll-distance="20" :infinite-scroll-disabled="scrollDisabled" :infinite-scroll-immediate="false"
        :comment-list="commentList" :key="commentList.length">
    </commentsComponent>
</template>
<style></style>