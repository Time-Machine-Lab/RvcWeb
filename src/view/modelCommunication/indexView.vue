<script lang="ts" setup>
import postCardComponentB from '@/components/modelCommunication/postCardComponentB.vue'
import waterFallComponent from '@/components/layout/waterFallComponent.vue'
import {getPostType,getPosts} from '@/api/post/postApi'
import { PostVo,RvcCommunicationPostType,PostListForm } from '@/api/post/postType'
import { ref } from 'vue';
const posts = ref<PostVo[]>([])
posts.value = [
  {
    avatar: "/teamPic/default.png",
    collect: "true",
    collectNum: "42",
    commentNum: "28",
    content: "这是帖子内容 1。",
    cover: "/backPic/welcome.png",
    createAt: "2023-01-01T12:00:00Z",
    like: "false",
    likeNum: "15",
    nickname: "用户昵称1",
    postId: "1",
    tagId: "101",
    title: "帖子标题 1",
    uid: "1001",
    updateAt: "2023-01-02T14:30:00Z",
    username: "用户1",
    watchNum: "78",
  },
  {
    avatar: "/teamPic/dhx.jpg",
    collect: "false",
    collectNum: "15",
    commentNum: "10",
    content: "这是帖子内容 2。",
    cover: "/teamPic/wangyoucao.jpg",
    createAt: "2023-02-05T09:45:00Z",
    like: "true",
    likeNum: "30",
    nickname: "用户昵称2",
    postId: "2",
    tagId: "102",
    title: "帖子标题 2",
    uid: "1002",
    updateAt: "2023-02-06T18:20:00Z",
    username: "用户2",
    watchNum: "42",
  },
  {
    avatar: "/teamPic/Genius.png",
    collect: "true",
    collectNum: "38",
    commentNum: "20",
    content: "这是帖子内容 3。",
    cover: "/teamPic/Genius.png",
    createAt: "2023-03-10T08:15:00Z",
    like: "true",
    likeNum: "25",
    nickname: "用户昵称3",
    postId: "3",
    tagId: "103",
    title: "帖子标题 3",
    uid: "1003",
    updateAt: "2023-03-12T11:10:00Z",
    username: "用户3",
    watchNum: "62",
  },
  {
    avatar: "/teamPic/daocaoren.jpg",
    collect: "false",
    collectNum: "12",
    commentNum: "18",
    content: "这是帖子内容 4。",
    cover: "/backPic/welcome.png",
    createAt: "2023-04-20T17:30:00Z",
    like: "false",
    likeNum: "18",
    nickname: "用户昵称4",
    postId: "4",
    tagId: "104",
    title: "帖子标题 4",
    uid: "1004",
    updateAt: "2023-04-22T22:40:00Z",
    username: "用户4",
    watchNum: "50",
  },
  {
    avatar: "/teamPic/huaerbuku.jpg",
    collect: "true",
    collectNum: "50",
    commentNum: "15",
    content: "这是帖子内容 5。",
    cover: "/teamPic/huaerbuku.jpg",
    createAt: "2023-05-15T13:20:00Z",
    like: "true",
    likeNum: "40",
    nickname: "用户昵称5",
    postId: "5",
    tagId: "105",
    title: "帖子标题 5",
    uid: "1005",
    updateAt: "2023-05-17T09:55:00Z",
    username: "用户5",
    watchNum: "55",
  },
  {
    avatar: "/teamPic/default.png",
    collect: "true",
    collectNum: "30",
    commentNum: "12",
    content: "这是帖子内容 6。",
    cover: "/teamPic/welsir.jpg",
    createAt: "2023-06-01T10:45:00Z",
    like: "false",
    likeNum: "22",
    nickname: "用户昵称6",
    postId: "6",
    tagId: "106",
    title: "帖子标题 6",
    uid: "1006",
    updateAt: "2023-06-02T15:20:00Z",
    username: "用户6",
    watchNum: "45",
  },
  {
    avatar: "/teamPic/dhx.jpg",
    collect: "false",
    collectNum: "18",
    commentNum: "25",
    content: "这是帖子内容 7。",
    cover: "/backPic/welcome.png",
    createAt: "2023-07-12T14:30:00Z",
    like: "true",
    likeNum: "35",
    nickname: "用户昵称7",
    postId: "7",
    tagId: "107",
    title: "帖子标题 7",
    uid: "1007",
    updateAt: "2023-07-14T20:10:00Z",
    username: "用户7",
    watchNum: "38",
  },
  {
    avatar: "/teamPic/Genius.png",
    collect: "true",
    collectNum: "25",
    commentNum: "30",
    content: "这是帖子内容 8。",
    cover: "/teamPic/lishiming.webp",
    createAt: "2023-08-05T09:15:00Z",
    like: "true",
    likeNum: "28",
    nickname: "用户昵称8",
    postId: "8",
    tagId: "108",
    title: "帖子标题 8",
    uid: "1008",
    updateAt: "2023-08-06T18:45:00Z",
    username: "用户8",
    watchNum: "42",
  },
  {
    avatar: "/teamPic/daocaoren.jpg",
    collect: "false",
    collectNum: "10",
    commentNum: "22",
    content: "这是帖子内容 9。",
    cover: "/teamPic/daocaoren.jpg",
    createAt: "2023-09-20T17:00:00Z",
    like: "false",
    likeNum: "15",
    nickname: "用户昵称9",
    postId: "9",
    tagId: "109",
    title: "帖子标题 9",
    uid: "1009",
    updateAt: "2023-09-22T22:20:00Z",
    username: "用户9",
    watchNum: "55",
  },
  {
    avatar: "/teamPic/huaerbuku.jpg",
    collect: "true",
    collectNum: "40",
    commentNum: "18",
    content: "这是帖子内容 10。",
    cover: "/teamPic/huaerbuku.jpg",
    createAt: "2023-10-15T12:30:00Z",
    like: "true",
    likeNum: "50",
    nickname: "用户昵称10",
    postId: "10",
    tagId: "110",
    title: "帖子标题 10",
    uid: "1010",
    updateAt: "2023-10-17T10:05:00Z",
    username: "用户10",
    watchNum: "48",
  },
]
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
    avatar: "/teamPic/dhx.jpg",
    collect: "false",
    collectNum: "18",
    commentNum: "25",
    content: "这是帖子内容 7。",
    cover: "/backPic/welcome.png",
    createAt: "2023-07-12T14:30:00Z",
    like: "true",
    likeNum: "35",
    nickname: "用户昵称7",
    postId: "7",
    tagId: "107",
    title: "帖子标题 7",
    uid: "1007",
    updateAt: "2023-07-14T20:10:00Z",
    username: "用户7",
    watchNum: "38",
  },
  {
    avatar: "/teamPic/Genius.png",
    collect: "true",
    collectNum: "25",
    commentNum: "30",
    content: "这是帖子内容 8。",
    cover: "/teamPic/xi.jpg",
    createAt: "2023-08-05T09:15:00Z",
    like: "true",
    likeNum: "28",
    nickname: "用户昵称8",
    postId: "8",
    tagId: "108",
    title: "帖子标题 8",
    uid: "1008",
    updateAt: "2023-08-06T18:45:00Z",
    username: "用户8",
    watchNum: "42",
  },
  {
    avatar: "/teamPic/daocaoren.jpg",
    collect: "false",
    collectNum: "10",
    commentNum: "22",
    content: "这是帖子内容 9。",
    cover: "/teamPic/daocaoren.jpg",
    createAt: "2023-09-20T17:00:00Z",
    like: "false",
    likeNum: "15",
    nickname: "用户昵称9",
    postId: "9",
    tagId: "109",
    title: "帖子标题 9",
    uid: "1009",
    updateAt: "2023-09-22T22:20:00Z",
    username: "用户9",
    watchNum: "55",
  },
  {
    avatar: "/teamPic/huaerbuku.jpg",
    collect: "true",
    collectNum: "40",
    commentNum: "18",
    content: "这是帖子内容 10。",
    cover: "/backPic/welcome.png",
    createAt: "2023-10-15T12:30:00Z",
    like: "true",
    likeNum: "50",
    nickname: "用户昵称10",
    postId: "10",
    tagId: "110",
    title: "帖子标题 10",
    uid: "1010",
    updateAt: "2023-10-17T10:05:00Z",
    username: "用户10",
    watchNum: "48",
  },{
    avatar: "/teamPic/default.png",
    collect: "true",
    collectNum: "42",
    commentNum: "28",
    content: "这是帖子内容 1。",
    cover: "/teamPic/default.png",
    createAt: "2023-01-01T12:00:00Z",
    like: "false",
    likeNum: "15",
    nickname: "用户昵称1",
    postId: "1",
    tagId: "101",
    title: "帖子标题 1",
    uid: "1001",
    updateAt: "2023-01-02T14:30:00Z",
    username: "用户1",
    watchNum: "78",
  },
  {
    avatar: "/teamPic/dhx.jpg",
    collect: "false",
    collectNum: "15",
    commentNum: "10",
    content: "这是帖子内容 2。",
    cover: "/teamPic/wangyoucao.jpg",
    createAt: "2023-02-05T09:45:00Z",
    like: "true",
    likeNum: "30",
    nickname: "用户昵称2",
    postId: "2",
    tagId: "102",
    title: "帖子标题 2",
    uid: "1002",
    updateAt: "2023-02-06T18:20:00Z",
    username: "用户2",
    watchNum: "42",
  },
  {
    avatar: "/teamPic/Genius.png",
    collect: "true",
    collectNum: "38",
    commentNum: "20",
    content: "这是帖子内容 3。",
    cover: "/teamPic/Genius.png",
    createAt: "2023-03-10T08:15:00Z",
    like: "true",
    likeNum: "25",
    nickname: "用户昵称3",
    postId: "3",
    tagId: "103",
    title: "帖子标题 3",
    uid: "1003",
    updateAt: "2023-03-12T11:10:00Z",
    username: "用户3",
    watchNum: "62",
  },)
    
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
                        <postCardComponentB v-for="(post, index) in posts" :post="post" style="" :key="index"></postCardComponentB>
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