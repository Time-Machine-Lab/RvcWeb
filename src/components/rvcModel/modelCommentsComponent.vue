<!--
 * @Author: Dhx
 * @Date: 2023-12-23 19:53:26
 * @Description: 
 * @FilePath: \RvcWeb\src\components\rvcModel\modelCommentsComponent.vue
-->
<script setup lang="ts">
import { ModelComment } from '@/api/rvcModel/modelType';
import { ref } from 'vue';
import WaterFallComponent from '@/components/layout/waterFallComponent.vue';
import modelCommentComponent from '@/components/rvcModel/modelCommentComponent.vue'
let dialogVisible = ref(false)
let comments = ref<ModelComment[]>([
    {
        "id": "1737173011389861889",
        "uid": "1735662165315596290",
        "nickname": "蔡徐坤",
        "picture": "",
        "content": "袁总能带我打瓦吗,我想学Java!!!",
        "likesNum": "0",
        "commentTime": "2023-12-19 18:08:15",
        "modelId": "1735910925897834498",
        "isLikes": "0"
    },
    {
        "id": "1737049447585087489",
        "uid": "1735662165315596290",
        "nickname": "蔡徐坤",
        "picture": "",
        "content": "袁总能带我打瓦吗!!!",
        "likesNum": "0",
        "commentTime": "2023-12-19 09:57:15",
        "modelId": "1735910925897834498",
        "isLikes": "0"
    },
    {
        "id": "1737025261651165185",
        "uid": "1735662165315596290",
        "nickname": "蔡徐坤",
        "picture": "",
        "content": "袁总能带我打瓦吗",
        "likesNum": "0",
        "commentTime": "2023-12-19 08:21:09",
        "modelId": "1735910925897834498",
        "isLikes": "0"
    },
    {
        "id": "1736285491279269890",
        "uid": "1735662165315596290",
        "nickname": "蔡徐坤",
        "picture": "",
        "content": "学长太帅了",
        "likesNum": "2",
        "commentTime": "2023-12-17 15:21:34",
        "modelId": "1735910925897834498",
        "isLikes": "0"
    }
])
</script>
<template>
    <div class="model-comments">
        <el-dialog v-model="dialogVisible" style="background-color: rgba(26,27,30);border-radius: 5px;" width="20%">
            <div class="dialog-title">
                添加评论
            </div>
            <div class="dialog-input">
                <input class="input">
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <div @click="dialogVisible = false" class="dialog-footer__cancel">取消</div>
                    <div type="primary" class="dialog-footer__confirm" @click="dialogVisible = false">
                        发表
                    </div>
                </span>
            </template>
        </el-dialog>
        <div class="model-comments__title">
            <span>评论</span>
            <div class="add-comment" @click="dialogVisible = true">
                发表评论
            </div>
        </div>
        <div class="model-comments__content">
            <WaterFallComponent>
                <modelCommentComponent v-for="(comment, index) in comments" :key="index" :comment="comment">
                </modelCommentComponent>
            </WaterFallComponent>
        </div>
    </div>
</template>
<style scoped>
.model-comments {
    width: 100%;
    background-color: rgba(26, 27, 30);
}

.dialog-title {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 14px;
    color: rgba(193, 194, 197);
}
.dialog-input{
    width: 100%;
}
.input{
    outline: none;
    width: calc(100% - 30px);
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    background-color: rgba(26,27,30);
    color: white;
    font-size: 16px;
    border-radius: 5px;
    margin-top: 10px;
    border: rgba(55, 58, 64) 1px solid;
}
.dialog-footer {
    display: flex;
}

.dialog-footer__cancel {
    color: white;
    height: 35px;
    padding: 0 20px;
    line-height: 35px;
    border-radius: 5px;
    border: rgba(55, 58, 64) 1px solid;
    background-color: rgba(37, 38, 43);
    cursor: pointer;
}

.dialog-footer__cancel:hover {
    background-color: rgba(44, 46, 51);
}

.dialog-footer__confirm {
    position: absolute;
    right: 20px;
    color: white;
    height: 35px;
    padding: 0 20px;
    line-height: 35px;
    border-radius: 5px;
    background-color: rgba(25, 113, 194);
    cursor: pointer;
}

.dialog-footer__confirm:hover {
    background-color: rgba(24, 100, 171);
}

.add-comment {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 35px;
    padding: 0 15px;
    border: rgba(51, 154, 240) 1px solid;
    font-size: 16px;
    line-height: 35px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    color: rgba(51, 154, 240);
}

.add-comment:hover {
    background-color: rgba(28, 34, 40);
}

.model-comments__title {
    position: relative;
    width: 75%;
    height: 70px;
    left: 50%;
    transform: translate(-50%);
    color: rgba(193, 194, 197);
    font-size: 30px;
    line-height: 70px;
    text-align: left;
    display: flex;
}

.model-comments__content {
    position: relative;
    width: 75%;
    min-height: 430px;
    left: 50%;
    transform: translate(-50%);
}</style>