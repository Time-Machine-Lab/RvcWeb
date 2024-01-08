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

const showReply = function (index: number) {
    if (!hasInit.value) {
        for (let i = 0; i < rootComments.value.length; i++) {
            rootComments.value[i].childrenComment = []
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
        console.log(rootComments.value[index].childrenComment);

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
                rootComments.value[index].childrenComment?.push(data.value[i])
            }
            let page = Number(childForm.value[index].page)
            page++
            childForm.value[index].page = String(page)
        }
    })
}
</script>
<template>
    <div class="Comments">
        <div v-for="(comment, index) in rootComments" :key="index">
            <commentComponent :show-reply="showReply" :index="index" :comment="comment"></commentComponent>
            <div v-show="showChildComments[index]" v-for="(childComment, index2) in comment.childrenComment" :key="index2">
                <commentComponent :show-reply="showReply" :index="-1" :comment="childComment"></commentComponent>
            </div>
            <div style="color: white;cursor:pointer;font-size: 14px;text-align: center;"
                @click="getChildCommentsFunc(index)" v-show="showChildComments[index] && hasChildComments[index]">加载更多</div>
        </div>
    </div>
</template>
  
  
<style scoped>
* {
    text-align: left;
}

.Comments {
    /* height: 85%; */
    width: 100%;
    margin: auto;
    bottom: 0;
}

.info {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: white;
    text-align: left;
}

.showMore {
    position: relative;
    width: 90%;
    text-align: center;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    color: white;
}
</style>
  