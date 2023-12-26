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
let page = ref(1)
let form = ref<PostListForm>({
    data: '1',
    page: '1',
    limit: '5',
    tagId: ''
})
getPostType().then(res => {
    let data = ref<RvcCommunicationPostType[]>(res.data)
    for(let i=0;i<data.value.length;i++){
        tags.value.push({
            id:data.value[i].id,
            name:data.value[i].tagName
        })
    }
})
const load = function () {
    disabled.value = true
    // setTimeout(function(){
    //     disabled.value = false
    // },5000)
    getPosts(form.value).then((res:any) => {
        console.log(res)
        
        let data = ref<PostVo[]>([
        {
            "postId": "1",
            "author": {
                "uid": "1738852810807115778",
                "username": "KoYAflwQ",
                "birthday": "2023-12-01",
                "nickname": "Genius",
                "followNum": "0",
                "fansNum": "0",
                "sex": "男",
                "avatar": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/user/avatar/3eea3ce13d035905c493f0cf7ef22652.jpg",
                "description": "准备跑路"
            },
            "postType": {
                "id": "1",
                "tagImg": "https://p1.ssl.qhmsg.com/t01da032a5036754f87.jpg",
                "tagName": "谈天说地"
            },
            "title": "大家今晚晚上吃的什么",
            "content": "<h1>大家好</h1><blockquote>大家今晚吃的是什么</blockquote>",
            "cover": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/image3/32b305bdd4b1b1eff9256f4b171450ba.jpg",
            "commentNum": 0,
            "likeNum": 0,
            "collectNum": 0,
            "watchNum": 3,
            "createAt": "2023-12-25T14:26:46",
            "updateAt": "2023-12-25T14:26:46",
            "like": false,
            "collect": false
        },
        {
            "postId": "2",
            "author": {
                "uid": "1738886620986802178",
                "username": "OnrIkvMG",
                "birthday": null,
                "nickname": "OnrIkvMG",
                "followNum": "0",
                "fansNum": "0",
                "sex": null,
                "avatar": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/user/avatar/50e7e1b31d1d33188dc0717ba1956923.png",
                "description": null
            },
            "postType": {
                "id": "1",
                "tagImg": "https://p1.ssl.qhmsg.com/t01da032a5036754f87.jpg",
                "tagName": "谈天说地"
            },
            "title": "皮卡丘万岁！！",
            "content": "<p>寻找妙蛙种子</p><p><img src=\"https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/image3/dfb49e297ff8245058cf8c807ee57365.jpg\" alt=\"\" data-href=\"\" style=\"\"/></p><p><br></p><p><br></p>",
            "cover": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/image3/219900c3e6a1ce66d8ffd1f06799c92d.jpg",
            "commentNum": 0,
            "likeNum": 0,
            "collectNum": 0,
            "watchNum": 2,
            "createAt": "2023-12-25T14:52:07",
            "updateAt": "2023-12-25T14:52:07",
            "like": false,
            "collect": false
        },
        {
            "postId": "3",
            "author": {
                "uid": "1738841730227699714",
                "username": "aFerHEIH",
                "birthday": "2023-12-24",
                "nickname": "我就是lxc",
                "followNum": "0",
                "fansNum": "0",
                "sex": "男",
                "avatar": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/user/avatar/a0b06619f78d0879d5497266d2305e79.jpg",
                "description": "一个成分复杂的农批"
            },
            "postType": {
                "id": "1",
                "tagImg": "https://p1.ssl.qhmsg.com/t01da032a5036754f87.jpg",
                "tagName": "谈天说地"
            },
            "title": "【原神】活动你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏",
            "content": "<p>说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。.......................................... 作者：不想说话的33 https://www.bilibili.com/read/cv21234240/ 出处：bilibili</p>",
            "cover": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/image3/7b13de2231ea16c182bf7e3cdaacc267.jpg",
            "commentNum": 0,
            "likeNum": 2,
            "collectNum": 1,
            "watchNum": 6,
            "createAt": "2023-12-25T14:56:12",
            "updateAt": "2023-12-25T14:56:12",
            "like": true,
            "collect": true
        },
        {
            "postId": "4",
            "author": {
                "uid": "1738852810807115778",
                "username": "KoYAflwQ",
                "birthday": "2023-12-01",
                "nickname": "Genius",
                "followNum": "0",
                "fansNum": "0",
                "sex": "男",
                "avatar": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/user/avatar/3eea3ce13d035905c493f0cf7ef22652.jpg",
                "description": "准备跑路"
            },
            "postType": {
                "id": "3",
                "tagImg": "https://img0.baidu.com/it/u=835765349,4058962119&fm=253&fmt=auto&app=138&f=PNG?w=875&h=450",
                "tagName": "炼丹心得"
            },
            "title": "大家有什么好模型分享吗",
            "content": "<h1>大家有什么好模型分享嘛</h1><p>i<code>nt main(){</code></p><p><code>print(\"hello\");</code></p><p><code>}</code></p>",
            "cover": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/image3/28d6d57cb9d48ab7317737db08d33964.jpg",
            "commentNum": 0,
            "likeNum": 0,
            "collectNum": 1,
            "watchNum": 3,
            "createAt": "2023-12-26T07:53:07",
            "updateAt": "2023-12-26T07:53:07",
            "like": false,
            "collect": true
        },
        {
            "postId": "5",
            "author": {
                "uid": "1738852810807115778",
                "username": "KoYAflwQ",
                "birthday": "2023-12-01",
                "nickname": "Genius",
                "followNum": "0",
                "fansNum": "0",
                "sex": "男",
                "avatar": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/user/avatar/3eea3ce13d035905c493f0cf7ef22652.jpg",
                "description": "准备跑路"
            },
            "postType": {
                "id": "3",
                "tagImg": "https://img0.baidu.com/it/u=835765349,4058962119&fm=253&fmt=auto&app=138&f=PNG?w=875&h=450",
                "tagName": "炼丹心得"
            },
            "title": "大家有什么好模型分享吗",
            "content": "<h1>大家有什么好模型分享嘛</h1><p>i<code>nt main(){</code></p><p><code>print(\"hello\");</code></p><p><code>}</code></p>",
            "cover": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/image3/28d6d57cb9d48ab7317737db08d33964.jpg",
            "commentNum": 0,
            "likeNum": 0,
            "collectNum": 1,
            "watchNum": 3,
            "createAt": "2023-12-26T07:53:07",
            "updateAt": "2023-12-26T07:53:07",
            "like": false,
            "collect": true
        },
        {
            "postId": "6",
            "author": {
                "uid": "1738852810807115778",
                "username": "KoYAflwQ",
                "birthday": "2023-12-01",
                "nickname": "Genius",
                "followNum": "0",
                "fansNum": "0",
                "sex": "男",
                "avatar": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/user/avatar/3eea3ce13d035905c493f0cf7ef22652.jpg",
                "description": "准备跑路"
            },
            "postType": {
                "id": "3",
                "tagImg": "https://img0.baidu.com/it/u=835765349,4058962119&fm=253&fmt=auto&app=138&f=PNG?w=875&h=450",
                "tagName": "炼丹心得"
            },
            "title": "大家有什么好模型分享吗",
            "content": "<h1>大家有什么好模型分享嘛</h1><p>i<code>nt main(){</code></p><p><code>print(\"hello\");</code></p><p><code>}</code></p>",
            "cover": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/image3/28d6d57cb9d48ab7317737db08d33964.jpg",
            "commentNum": 0,
            "likeNum": 0,
            "collectNum": 1,
            "watchNum": 3,
            "createAt": "2023-12-26T07:53:07",
            "updateAt": "2023-12-26T07:53:07",
            "like": false,
            "collect": true
        },
        {
            "postId": "7",
            "author": {
                "uid": "1738852810807115778",
                "username": "KoYAflwQ",
                "birthday": "2023-12-01",
                "nickname": "Genius",
                "followNum": "0",
                "fansNum": "0",
                "sex": "男",
                "avatar": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/user/avatar/3eea3ce13d035905c493f0cf7ef22652.jpg",
                "description": "准备跑路"
            },
            "postType": {
                "id": "3",
                "tagImg": "https://img0.baidu.com/it/u=835765349,4058962119&fm=253&fmt=auto&app=138&f=PNG?w=875&h=450",
                "tagName": "炼丹心得"
            },
            "title": "大家有什么好模型分享吗",
            "content": "<h1>大家有什么好模型分享嘛</h1><p>i<code>nt main(){</code></p><p><code>print(\"hello\");</code></p><p><code>}</code></p>",
            "cover": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/image3/28d6d57cb9d48ab7317737db08d33964.jpg",
            "commentNum": 0,
            "likeNum": 0,
            "collectNum": 1,
            "watchNum": 3,
            "createAt": "2023-12-26T07:53:07",
            "updateAt": "2023-12-26T07:53:07",
            "like": false,
            "collect": true
        },
        {
            "postId": "8",
            "author": {
                "uid": "1738852810807115778",
                "username": "KoYAflwQ",
                "birthday": "2023-12-01",
                "nickname": "Genius",
                "followNum": "0",
                "fansNum": "0",
                "sex": "男",
                "avatar": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/user/avatar/3eea3ce13d035905c493f0cf7ef22652.jpg",
                "description": "准备跑路"
            },
            "postType": {
                "id": "3",
                "tagImg": "https://img0.baidu.com/it/u=835765349,4058962119&fm=253&fmt=auto&app=138&f=PNG?w=875&h=450",
                "tagName": "炼丹心得"
            },
            "title": "大家有什么好模型分享吗",
            "content": "<h1>大家有什么好模型分享嘛</h1><p>i<code>nt main(){</code></p><p><code>print(\"hello\");</code></p><p><code>}</code></p>",
            "cover": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/image3/28d6d57cb9d48ab7317737db08d33964.jpg",
            "commentNum": 0,
            "likeNum": 0,
            "collectNum": 1,
            "watchNum": 3,
            "createAt": "2023-12-26T07:53:07",
            "updateAt": "2023-12-26T07:53:07",
            "like": false,
            "collect": true
        },
        {
            "postId": "9",
            "author": {
                "uid": "1738852810807115778",
                "username": "KoYAflwQ",
                "birthday": "2023-12-01",
                "nickname": "Genius",
                "followNum": "0",
                "fansNum": "0",
                "sex": "男",
                "avatar": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/user/avatar/3eea3ce13d035905c493f0cf7ef22652.jpg",
                "description": "准备跑路"
            },
            "postType": {
                "id": "3",
                "tagImg": "https://img0.baidu.com/it/u=835765349,4058962119&fm=253&fmt=auto&app=138&f=PNG?w=875&h=450",
                "tagName": "炼丹心得"
            },
            "title": "大家有什么好模型分享吗",
            "content": "<h1>大家有什么好模型分享嘛</h1><p>i<code>nt main(){</code></p><p><code>print(\"hello\");</code></p><p><code>}</code></p>",
            "cover": "https://rvc1.oss-cn-beijing.aliyuncs.com/rvc/image3/28d6d57cb9d48ab7317737db08d33964.jpg",
            "commentNum": 0,
            "likeNum": 0,
            "collectNum": 1,
            "watchNum": 3,
            "createAt": "2023-12-26T07:53:07",
            "updateAt": "2023-12-26T07:53:07",
            "like": false,
            "collect": true
        }
    ])
        if(data.value.length == 0){
            disabled.value = true
            message.warning('没有更多数据了')
            return
        }
        for(let i =0 ;i<data.value.length;i++){
            posts.value.push(data.value[i])
        }
        page.value ++
        form.value.page = page.value as unknown as string
        disabled.value = false
    })
}
const getTag = function(index:number){    
    if(index == -1){
        form.value.tagId = ''
    } else {
        form.value.tagId = tags.value[index]?.id
    }
    form.value.page = '1'
    posts.value = []
    load()
}
const getSort  = function(index:number){
    if((index as unknown as string) == form.value.data)return
    else{
        form.value.data = (index as unknown as string)
    }
    form.value.page = '1'
    posts.value = []
    load()
}
// const load = function () {
//     console.log('load');
    
// }
let disabled = ref(false)
</script>
<template>
    <div class="communicationView">
        <div class="filter-container">
            <filterComponent @getTag="getTag" @getSort="getSort" style="font-family: 'ZCool';" :tags="tags"></filterComponent>
        </div>
        <div class="post-list">
            <waterFallComponent :minWidth="320" v-infinite-scroll="load" infinite-scroll-distance="100" :infinite-scroll-disabled="disabled"
                :infinite-scroll-immediate="true">
                <postCardComponentB v-for="(post, index) in posts" :post="post" :key="index" ></postCardComponentB>
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