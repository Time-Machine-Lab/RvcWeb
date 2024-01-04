<!--
 * @Author: Dhx
 * @Date: 2023-12-23 19:53:26
 * @Description: 
 * @FilePath: \RvcWeb\src\components\rvcModel\modelCommentsComponent.vue
-->
<script setup lang="ts">
import { CommentAddForm, GetCommentForm, ModelComment } from '@/api/rvcModel/modelType'
import { ref } from 'vue'
import WaterFallComponent from '@/components/layout/waterFallComponent.vue'
import modelCommentComponent from '@/components/rvcModel/modelCommentComponent.vue'
import { getRootComments, commentAdd } from '@/api/rvcModel/commentApi.ts'
import { message } from '@/utils/message'
const props = defineProps<{
    modelId: string
}>()
let sendCommentDialogVisible = ref(false)
let comments = ref<ModelComment[]>([])
let page = ref(1)
let getCommentsForm = ref<GetCommentForm>({
    id: '',
    page: '',
    limit: '10',
    sortType: '1'
})
let sendCommentForm = ref<CommentAddForm>({
    replyId: '',
    modelId: '',
    content: ''
})
let disabled = ref(false)
const load = function () {
    if (disabled.value) return
    disabled.value = true
    getCommentsForm.value.page = (page as unknown as string)
    getCommentsForm.value.id = props.modelId
    getRootComments(getCommentsForm.value).then((res: any) => {
        if (res.code == 200) {
            let data = ref<ModelComment[]>(res.data.records)
            if (data.value.length != 0) disabled.value = false
            else {
                disabled.value = true
                message.warning('没有更多评论了')
            }
            for (let i = 0; i < data.value.length; i++) {
                comments.value.push(data.value[i])
            }
            page.value++
        } else {
            disabled.value = false
            message.error(res.msg)
        }
    })
}

const commentAddFunc = function () {
    sendCommentDialogVisible.value = false
    sendCommentForm.value.modelId = props.modelId
    commentAdd(sendCommentForm.value).then((res: any) => {
        if (res.code == 200) {
            message.success('发表成功')
        } else {
            message.error(res.msg)
        }
    })
}
const getLength = function(str:string){
    return str.length
}
</script>
<template>
    <div class="model-comments">
        <el-dialog v-model="sendCommentDialogVisible" style="background-color: rgba(26,27,30);border-radius: 5px;" width="20%">
            <div class="dialog-title">
                添加评论
            </div>
            <div class="dialog-input">
                <input class="input" v-model="sendCommentForm.content" maxlength="200">
                <div style="text-align: right;">
                    <span>{{ getLength(sendCommentForm.content) }}/200</span>

                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <div @click="sendCommentDialogVisible = false" class="dialog-footer__cancel">取消</div>
                    <div type="primary" class="dialog-footer__confirm" @click="commentAddFunc">
                        发表
                    </div>
                </span>
            </template>
        </el-dialog>
    
        <div class="model-comments__title">
            <span>评论</span>
            <div class="add-comment" @click="sendCommentDialogVisible = true">
                发表评论
            </div>
        </div>
        <div class="model-comments__content">
            <WaterFallComponent>
                <modelCommentComponent style="visibility: hidden;" v-for="(comment, index) in comments" :key="index" :comment="comment">
                </modelCommentComponent>
            </WaterFallComponent>
            <div class="model-comments__content__more" @click="load">加载更多</div>
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

.dialog-input {
    width: 100%;
}

.input {
    outline: none;
    width: calc(100% - 30px);
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    background-color: rgba(26, 27, 30);
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
    min-height: 300px;
    left: 50%;
    transform: translate(-50%);
    padding-bottom: 50px;
}

.model-comments__content__more {
    cursor: pointer;
    color: white;

}
</style>