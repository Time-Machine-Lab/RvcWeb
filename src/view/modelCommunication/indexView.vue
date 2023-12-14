<script lang="ts" setup>
import postCardComponentB from '@/components/modelCommunication/postCardComponentB.vue'
import waterFallComponent from '@/components/layout/waterFallComponent.vue'
import {getPostType,getPosts} from '@/api/post/postApi'
import { PostVo,RvcCommunicationPostType,PostListForm } from '@/api/post/postType'
import { ref } from 'vue';
const posts = ref<PostVo[]>([])
posts.value = [{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},
{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/welsir.jpg",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},
{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/xi.jpg",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/jq.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},
{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/welsir.jpg",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},
{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/xi.jpg",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/jq.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},
{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/welsir.jpg",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},
{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/xi.jpg",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/jq.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},]
getPostType().then(res=>{
    tags.value = res.data
})
let filter = ref(
    {
        tag: {
            tag_id: 0,
            tag_name: '全部'
        },
        sortSwitch: true,
        sort: 'time'
    }
)
let tags = ref<RvcCommunicationPostType[]>([])
let form = ref<PostListForm>({
data: '',
page: '',
limit: '20',
tagId: ''
})
const load2 = function(){
    getPosts(form.value).then(res=>{
        posts.value = res?.data
    })
}
load2()

const load = function(){
    posts.value.push({
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},
{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/welsir.jpg",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},
{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/xi.jpg",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/jq.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
}, {
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/backPic/welcome.png",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},
{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/welsir.jpg",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
},
{
    "post_id": 1,
    "uid": 1,
    "username": "author1",
    "nickname": "Author One",
    "avatar": "/teamPic/default.png",
    "tag_id": 101,
    "title": "Post Title 1",
    "content": "This is the content of post 1.",
    "cover": "/teamPic/xi.jpg",
    "comment_num": 15,
    "like_num": 20,
    "collect_num": 5,
    "watch_num": 100,
    "create_at": "2023-09-01",
    "has_collect": true,
    "has_like": false
})
    
}
let disabled = ref(false)
</script>
<template>
    <div class="communicationView">
        <div class="filter-container">
            <div class="tag-selecter">
                <el-select v-model="filter.tag.tag_id" class="m-2" placeholder="Select" size="large" @change="form.tagId=(filter.tag.tag_id as unknown as string)">
                    <el-option v-for="tag in tags" :key="tag.tag_id" :label="tag.tag_id" :value="tag.tag_name"
                        class="tag-selecter__button" />
                </el-select>
            </div>
            <div class="sort-selecter">
                <div :class="filter.sortSwitch ? 'sort-selecter__switch--on' : 'sort-selecter__switch--off'"
                    @click="filter.sortSwitch = !filter.sortSwitch; filter.sort = '';form.data = '';form.page = '0'">
                    排序
                </div>
                <div :style="{ cursor: filter.sortSwitch ? 'pointer' : 'not-allowed' }"
                    :class="filter.sort == 'time' ? 'sort-selecter__button--selected' : 'sort-selecter__button--unselected'"
                    @click="if (filter.sortSwitch) filter.sort = 'time';form.data = 'time';form.page = '0'">
                    时间
                </div>
                <div :style="{ cursor: filter.sortSwitch ? 'pointer' : 'not-allowed' }"
                    :class="filter.sort == 'like' ? 'sort-selecter__button--selected' : 'sort-selecter__button--unselected'"
                    @click="if (filter.sortSwitch) filter.sort = 'like';form.data = 'like';form.page = '0'">
                    点赞
                </div>
                <div :style="{ cursor: filter.sortSwitch ? 'pointer' : 'not-allowed' }"
                    :class="filter.sort == 'view' ? 'sort-selecter__button--selected' : 'sort-selecter__button--unselected'"
                    @click="if (filter.sortSwitch) filter.sort = 'view';form.data = 'view';form.page = '0'">
                    浏览量
                </div>
            </div>
            <div class="new-post">
                <div class="new-post__button" @click="$router.push('/newPost')">
                    + 新贴子
                </div>
            </div>
        </div>
        <div class="post-list">
            <el-scrollbar style="overflow: auto;height: 100%;background-color: transparent;">
                    <waterFallComponent v-infinite-scroll="load" infinite-scroll-distance="100" :infinite-scroll-disabled="disabled" :infinite-scroll-immediate="true">
                        <postCardComponentB v-for="(post, index) in posts" :post="post" style="visibility: hidden;" :key="index"></postCardComponentB>
                    </waterFallComponent>
            </el-scrollbar>

        </div>
    </div>
</template>
<style scoped>
:deep(.el-scrollbar__wrap) {
    background-color: transparent;
}

.communicationView {
    width: 100%;
    height: calc(100vh - 50px);
    overflow: hidden;
}

.filter-container {
    position: relative;
    height: 50px;
    width: 100%;
    margin-top: 20px;
    display: flex;
}

.tag-selecter {
    height: 100%;
    margin-left: 10%;
}

:deep(.el-input__wrapper) {
    background-color: transparent;
    border: #fb7299 1px solid;
    width: 90px;
    height: 40px;
    outline: none;
    font-size: 16px;
    letter-spacing: 4px;
    box-shadow: none;
}

:deep(.el-input__inner) {
    color: white;
}

:deep(.el-select) {
    --el-select-border-color-hover: none;
    --el-select-input-focus-border-color: none;
    outline: none;
    border: none;
}

.sort-selecter {
    margin-left: 20px;
    position: relative;
    height: 50px;
    display: flex;
}

.sort-selecter span {
    color: white;
    font-size: 14px;
    line-height: 25px;
}

.sort-selecter div {
    width: 100px;
    height: 42px;
    color: white;
    border-radius: 5px;
    line-height: 42px;
    margin-left: 2px;
    user-select: none;
    cursor: pointer;
}

.sort-selecter__switch--on {
    border: #fb7299 1px solid;
    background-color: #fb7299;
}

.sort-selecter__switch--off {
    border: rgba(255, 255, 255, 0.2) 1px solid;
    transition: all 0.3s;
}

.sort-selecter__switch--off:hover {
    border: rgba(255, 255, 255, 0.4) 1px solid;
}

.sort-selecter__button--selected {
    border: #fb7299 1px solid;
}

.sort-selecter__button--unselected {
    border: rgba(255, 255, 255, 0.2) 1px solid;
}

.sort-selecter__button--unselected:hover {
    border: rgba(255, 255, 255, 0.4) 1px solid;
}

.new-post {
    position: absolute;
    height: 50px;
    right: 10%;
}

.post-list {
    position: relative;
    height: calc(100% - 50px);
    width: 80%;
    left: 50%;
    transform: translate(-50%);
}

.new-post__button {
    width: 100px;
    height: 42px;
    color: white;
    border-radius: 5px;
    line-height: 42px;
    margin-left: 2px;
    user-select: none;
    cursor: pointer;
    border: #fb7299 1px solid;
    background-color: #fb7299;
    transition: all 0.3s;
}

.new-post__button:hover {
    background-color: #f85c88;
}
</style>@/api/post/postType