<!--
 * @Author: Dhx
 * @Date: 2023-12-14 16:38:31
 * @Description: 
 * @FilePath: \RvcWeb\src\components\modelCommunication\commentsComponent.vue
-->
<script lang="ts" setup>
import comment from '@/components/modelCommunication/commentComponent.vue'
import { CommentVo } from '@/api/post/postType'
import { ref } from 'vue';
let props = defineProps<{
    commentList: CommentVo[]
}>()
let rootComments = ref<CommentVo[]>(props.commentList)


let showChildComments = ref<boolean[]>([
    false, false, false, false, false
])
const showReply = function (index: number) {
    showChildComments.value[index] = !showChildComments.value[index]
    return showChildComments.value[index]
}
</script>
<template>
    <div class="Comments">
        <div class="info">
            全部评论(3)
        </div>
        <div v-for="(comment, index) in rootComments" :key="index">
            <comment :show-reply="showReply" :index="index" :comment="comment"></comment>
            <div v-show="showChildComments[index]" v-for="(childComment, index2) in comment.childrenComment" :key="index2">

                <comment :show-reply="showReply" :index="-1" :comment="childComment"></comment>
            </div>

        </div>
        <!-- <el-scrollbar style="height: 100%;width: 100%">
            <div v-for="(comment, index) in rootComments" :key="index">
                <comment :show-reply="showReply" :index="index" :comment="comment"/>
                <div v-show="showChildComments[index]" v-for="(childComment, index2) in comment.childrenComment"
                    :key="index2">

                    <comment :show-reply="showReply" :index="-1" :comment="childComment" />
                </div>
                <div v-show="showChildComments[index]" class="showMore" 
                    :key="index">
                    查看更多
                </div>
            </div>
        </el-scrollbar> -->
    </div>
</template>
  
  
<style scoped>
* {
    text-align: left;
}

.Comments {
    height: 85%;
    width: 95%;
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
  