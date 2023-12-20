<!--
 * @Author: Dhx
 * @Date: 2023-12-12 01:47:21
 * @Description: 
 * @FilePath: \RvcWeb\src\view\modelCommunication\indexView.vue
-->
<script lang="ts" setup>
import postCardComponentB from '@/components/modelCommunication/postCardComponentB.vue'
import waterFallComponent from '@/components/layout/waterFallComponent.vue'
import filterComponent from '@/components/common/filterComponent.vue'
import { getPostType, getPosts } from '@/api/post/postApi'
import { PostVo, RvcCommunicationPostType, PostListForm } from '@/api/post/postType'
import { ref } from 'vue';
import { message } from '@/utils/message'
const posts = ref<PostVo[]>([])
posts.value = [

]


let tags = ref<{
    id:string|undefined
    name:string|undefined
}[]>([])
let page = ref(0)
let form = ref<PostListForm>({
    data: '1',
    page: '0',
    limit: '5',
    tagId: '1'
})
getPostType().then(res => {
    let data = ref<RvcCommunicationPostType[]>(res.data)
    for(let i=0;i<data.value.length;i++){
        tags.value.push({
            id:data.value[i].tagId,
            name:data.value[i].tagName
        })
    }
})
const load = function () {
    disabled.value = true
    setTimeout(function(){
        disabled.value = false
    },5000)
    getPosts(form.value).then(res => {
        let data = res.data
        if(data.length == 0){
            disabled.value = true
            message.warning('没有更多数据了')
            return
        }
        for(let i =0 ;i<data.length;i++){
            posts.value.push(data[i])
        }
        page.value ++
        form.value.page = page.value as unknown as string
        disabled.value = false
    })
}

// const load = function () {
//     console.log('load');
    
// }
let disabled = ref(false)
</script>
<template>
    <div class="communicationView">
        <div class="filter-container">
            <filterComponent :tags="tags"></filterComponent>
        </div>
        <div class="post-list">
            <waterFallComponent v-infinite-scroll="load" infinite-scroll-distance="100" :infinite-scroll-disabled="disabled"
                :infinite-scroll-immediate="true">
                <postCardComponentB v-for="(post, index) in posts" :post="post" style="" :key="index"></postCardComponentB>
            </waterFallComponent>
        </div>
    </div>
</template>
<style scoped>
:deep(.el-scrollbar__wrap) {
    background-color: transparent;
}

.communicationView {
    position: relative;
    width: 100%;
    height: 100%;
}

.filter-container {
    position: relative;
    /* min-height: 100px; */
    width: 100%;
    display: flex;
}


.post-list {
    position: relative;
    height: 100%;
    width: 100%;
    left: 50%;
    margin-top: 5px;
    transform: translate(-50%);
}

</style>