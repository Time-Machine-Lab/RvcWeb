<script lang="ts" setup>
import postCardComponent from '@/components/modelCommunication/postCardComponent.vue'
import { PostVo } from '@/view/post/postType'
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
let filter = ref(
    {
        tag:{
            tag_id:0,
            tag_name:'全部'
        },
        sortSwitch:true,
        sort: 'time'
    }
)
let options = ref<{
    label: string,
    value: string
}[]>([])
options.value = [
    {
        label: '全部',
        value: '全部'
    },
    {
        label: '讨论',
        value: '讨论'
    },
    {
        label: '提问',
        value: '提问'
    }

]
</script>
<template>
    <div class="communicationView">
        <div class="filter-container">
            <div class="tag-selecter">
                <el-select v-model="filter.tag.tag_name" class="m-2" placeholder="Select" size="large">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                        class="tag-selecter__button" />
                </el-select>
            </div>
            <div class="sort-selecter">
                <div :class="filter.sortSwitch?'sort-selecter__switch--on':'sort-selecter__switch--off'" @click="filter.sortSwitch = !filter.sortSwitch;filter.sort=''">
                    排序
                </div>
                <div :style="{cursor:filter.sortSwitch?'pointer':'not-allowed'}" :class="filter.sort == 'time'?'sort-selecter__button--selected':'sort-selecter__button--unselected'" @click="if(filter.sortSwitch)filter.sort='time';">
                    时间
                </div>
                <div :style="{cursor:filter.sortSwitch?'pointer':'not-allowed'}" :class="filter.sort == 'like'?'sort-selecter__button--selected':'sort-selecter__button--unselected'" @click="if(filter.sortSwitch)filter.sort='like';">
                    点赞
                </div>
                <div :style="{cursor:filter.sortSwitch?'pointer':'not-allowed'}" :class="filter.sort == 'view'?'sort-selecter__button--selected':'sort-selecter__button--unselected'" @click="if(filter.sortSwitch)filter.sort='view';">
                    浏览量
                </div>
            </div>
        </div>
        <div class="post-list">
            <postCardComponent v-for="(post, index) in posts" :key="index" :post="post"></postCardComponent>
        </div>
    </div>
</template>
<style scoped>
:deep(.el-scrollbar__wrap) {
    background-color: black;
}

.communicationView {
    width: 100%;
    min-height: 100vh;
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

:deep(.el-select){
    --el-select-border-color-hover: none;
    --el-select-input-focus-border-color: none;
    outline: none;
    border: none;
}

.sort-selecter {
    margin-left: 20px;
    position: relative;
    height: 50px;
    top: 100%;
    display: flex;
    transform: translate(0, -100%);
}

.sort-selecter span {
    color: white;
    font-size: 14px;
    line-height: 25px;
}
.sort-selecter div{
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
    border: grey 1px solid;
}

.sort-selecter__button--selected{
    border: #fb7299 1px solid;
}
.sort-selecter__button--unselected{
    border: grey 1px solid;
}

.post-list {
    height: calc(100% - 50px);
    width: 100%;
}</style>