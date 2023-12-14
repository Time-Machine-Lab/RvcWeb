<!--
 * @Author: Dhx
 * @Date: 2023-12-14 17:34:48
 * @Description: 
 * @FilePath: \RvcWeb\src\view\modelCommunication\pages\postPageCommentsView.vue
-->
<script lang="ts" setup>
import { CommentVo } from '@/api/post/postType';
import commentsComponent from '@/components/modelCommunication/commentsComponent.vue';
import { ref } from 'vue';
let commentList = ref<CommentVo[]>([
    {
        "postCommentId": "1733403665420648448",
        "content": "咒术回战官方mods:https://legacy.curseforge.com/minecraft/mc-mods/sorceryfight/files（无汉化）汉化版整合包在爱发电搜索Fukasa超勇的（手机版也有哦)[doge]汉化教程:https://fast.uc.cn/s/744b760e1d104",
        "createAt": "2023-12-09T16:30:14",
        "userId": "1",
        "postId": "1",
        "commentLikeCount": 0,
        "rootCommentId": "",
        "toUserId": "",
        "updateAt": "2023-12-09T16:30:14",
        "user": {
            avatar: '/teamPic/dhx.jpg',
            birthday: '1990-01-01',
            description: 'I love coding!',
            fansNum: '1000',
            followNum: '500',
            nickname: 'Coder123',
            sex: 'male',
            uid: '123456',
            username: 'user1',
        },
        "replayUser": null,
        "childrenComment": [
            {
                "postCommentId": "1733404199359741952",
                "content": "你小子打广告是吧？",
                "createAt": "2023-12-09T16:32:21",
                "userId": "2",
                "postId": "1",
                "commentLikeCount": 0,
                "rootCommentId": "1733403665420648448",
                "toUserId": "1",
                "updateAt": "2023-12-09T16:32:21",
                "user": {
                    avatar: '/teamPic/dhx.jpg',
                    birthday: '1985-05-20',
                    description: 'Nature enthusiast and photographer',
                    fansNum: '1500',
                    followNum: '700',
                    nickname: 'NatureClicker',
                    sex: 'female',
                    uid: '789012',
                    username: 'user2',
                },
                "replayUser": null,
                "childrenComment": null
            },
            {
                "postCommentId": "1733404473763692544",
                "content": "这种人该死！！！",
                "createAt": "2023-12-09T16:33:26",
                "userId": "3",
                "postId": "1",
                "commentLikeCount": 0,
                "rootCommentId": "1733403665420648448",
                "toUserId": "2",
                "updateAt": "2023-12-09T16:33:26",
                "user": {
                    avatar: '/teamPic/dhx.jpg',
                    birthday: '1998-09-15',
                    description: 'Fitness freak and adventure seeker',
                    fansNum: '800',
                    followNum: '300',
                    nickname: 'FitExplorer',
                    sex: 'non-binary',
                    uid: '345678',
                    username: 'user3',
                },
                "replayUser": null,
                "childrenComment": null
            }
        ]
    }
])
</script>
<template>
    <div>
        <commentsComponent :comment-list="commentList"></commentsComponent>
    </div>
</template>
<style></style>