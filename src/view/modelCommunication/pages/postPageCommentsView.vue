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
let props = defineProps<{
    post_id: string
}>()
let scrollDisabled = ref(false)
let limit = ref('10')
let page = ref(1)
let disalbed = ref(false)

const load = function () {
    if(disalbed.value){
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
        let data  = ref<any>(res.data)
        for(let i=0;i<data.value.length;i++){
            commentList.value.push(data.value[i])
        }
        page.value++
    })
}
load()
let commentList = ref<CommentVo[]>([

])
</script>
<template>
    <commentsComponent style="position: relative;" v-infinite-scroll="load" infinite-scroll-distance="20"
        :infinite-scroll-disabled="scrollDisabled" :infinite-scroll-immediate="false" :comment-list="commentList">
    </commentsComponent>
</template>
<style></style>