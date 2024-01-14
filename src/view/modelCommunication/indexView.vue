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

let tags = ref<{
    id: string | undefined
    name: string | undefined
}[]>([])
let page = ref(1)
let form = ref<PostListForm>({
    data: '1',
    page: '1',
    limit: '10',
    tagId: ''
})
let disabled = ref(false)

getPostType().then((res: any) => {
    if (res.code == 200) {
        let data = ref<RvcCommunicationPostType[]>(res.data)
        for (let i = 0; i < data.value.length; i++) {
            tags.value.push({
                id: data.value[i].id,
                name: data.value[i].tagName
            })
        }
    } else {
        message.error('服务器异常')
    }

})

const load = function () {
    // if(disabled.value)return
    disabled.value = true
    setTimeout(()=>{
        disabled.value = false
    },5000)
    getPosts(form.value).then((res: any) => {
        if (res.code == 200) {
            let data = ref<PostVo[]>(res.data)
            if (data.value.length == 0) {
                disabled.value = true
                message.warning('已经滑倒底部了')
                return
            }
            for (let i = 0; i < data.value.length; i++) {
                posts.value.push(data.value[i])
            }
            page.value++
            form.value.page = page.value as unknown as string
            disabled.value = false
        } else {
            message.error('服务器异常')
        }

    })
}
load()
const getTag = function (index: number) {
    if (index == -1) {
        form.value.tagId = ''
    } else {
        form.value.tagId = tags.value[index]?.id
    }
    form.value.page = '1'
    posts.value = []
    load()
}
const getSort = function (index: number) {
    if ((index as unknown as string) == form.value.data) return
    else {
        form.value.data = (index as unknown as string)
    }
    form.value.page = '1'
    posts.value = []
    load()
}
// const load = function () {
//     console.log('load');

// }
</script>
<template>
    <div class="communicationView">
        <div class="filter-container">
            <filterComponent @getTag="getTag" @getSort="getSort" style="font-family: 'ZCool';" :tags="tags">
            </filterComponent>
        </div>
        <div class="post-list">
            <el-empty :image-size="200" v-if="posts?.length == 0" style="font-family: 'ZCool';" description="这里空空如也~"
                image="/icon/empty.svg" />
            <waterFallComponent :minWidth="320" v-infinite-scroll="load" infinite-scroll-distance="100"
                :infinite-scroll-disabled="disabled" :infinite-scroll-immediate="false">
                <postCardComponentB  v-for="(post, index) in posts" :post="post" :key="index"></postCardComponentB>
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