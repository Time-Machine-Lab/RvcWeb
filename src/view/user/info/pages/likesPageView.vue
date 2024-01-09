<script lang="ts" setup>
import { ref } from 'vue'
import waterFallComponent from '@/components/layout/waterFallComponent.vue'
import postCardComponentB from '@/components/modelCommunication/postCardComponentB.vue';
import { PostVo, UserLikePostForm } from '@/api/post/postType';
import { getUserLikePosts } from '@/api/post/postApi';
import { message } from '@/utils/message';
import { RvcModelVo, UserLikeModelForm } from '@/api/rvcModel/modelType';
import { getUserLikeModels } from '@/api/rvcModel/userApi.ts';
import ModelCardComponentB from '@/components/rvcModel/modelCardComponentB.vue';
let selectOptions = ref(['贴子', '模型'])
let clickSelect = ref(false)
let selectVisibility = ref(false)
let currentSelectIndex = ref(0)
let posts = ref<PostVo[]>([])
let models = ref<RvcModelVo[]>([])
let page = ref(1)
let postForm = ref<UserLikePostForm>({
    data: '',
    limit: '10',
    page: page.value as unknown as string
})
let modelForm = ref<UserLikeModelForm>({
    page: page.value as unknown as string,
    limit: '10',
    order: '3'
})
let disabled = ref(false)
const handleClickSelect = function () {
    clickSelect.value = true
    selectVisibility.value = !selectVisibility.value
    setTimeout(function () {
        clickSelect.value = false
    }, 200)
}
const handleBlur = function () {
    setTimeout(function () {
        selectVisibility.value = false
    }, 200)
}
const handleOptionChange = function (index: number) {
    if(currentSelectIndex.value == index)return
    currentSelectIndex.value = index
    selectVisibility.value = false
    page.value = 1
    disabled.value = false
    if(currentSelectIndex.value == 0){
        posts.value = []
        loadPost()
    } else if(currentSelectIndex.value == 1){
        models.value = []
        loadModel()
    }
}
const loadPost = function () {
    if (disabled.value) return
    disabled.value = true
    postForm = ref<UserLikePostForm>({
        data: '',
        limit: '5',
        page: page.value as unknown as string
    })
    getUserLikePosts(postForm.value).then((res: any) => {
        if (res.code == 200) {
            let data = res.data
            if (data.length == 0) {
                message.warning('已滑到底部了')
                disabled.value = true
            }
            for (let i = 0; i < data.length; i++) {
                posts.value.push(data[i])
            }
            page.value++
            disabled.value = false
        } else {
            message.error(res.msg)
        }

    })
}
const loadModel = function () {
    if (disabled.value) return
    disabled.value = true
    modelForm = ref<UserLikeModelForm>({
        limit: '10',
        page: page.value as unknown as string,
        order: '3'
    })
    getUserLikeModels(modelForm.value).then((res: any) => {
        if (res.code == 200) {
            let data = res.data.records
            if (data.length == 0) {
                message.warning('已滑到底部了')
                disabled.value = true
            }
            for (let i = 0; i < data.length; i++) {
                models.value.push(data[i])
            }
            page.value++
            disabled.value = false
        } else {
            message.error(res.msg)
        }

    })
}
</script>
<template>
    <div class="like-pages">
        <div class="like-pages__filter">
            <div tabindex="-1" class="like-pages__filter__select" :class="clickSelect ? 'dither-animation' : ''"
                @click="handleClickSelect" @blur="handleBlur">
                <div class="horizontal-center" style="display: flex;">
                    <span style="line-height: 40px;margin-left: 3px;margin-right: 7px;">{{ selectOptions[currentSelectIndex]
                    }}</span>
                    <span>
                        <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                            :class="selectVisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                    </span>
                </div>

            </div>
            <div class="select-window" v-show="selectVisibility">
                <div class="select-window__item" v-for="(choice, index) in selectOptions" :key="index"
                    @click="handleOptionChange(index)">{{ choice }}
                </div>
            </div>
        </div>
        <div class="like-pages__content">
            <el-empty :image-size="200" v-if="posts.length == 0&&currentSelectIndex == 0||models.length ==0&&currentSelectIndex == 1" style="font-family: 'ZCool';" description="这里空空如也~" image="/icon/empty.svg" />
            <waterFallComponent v-infinite-scroll="loadPost" infinite-scroll-distance="100"
                :infinite-scroll-immediate="true" v-if="currentSelectIndex == 0">
                <postCardComponentB v-for="(post, index) in posts" :post="post" style="" :key="index"></postCardComponentB>
            </waterFallComponent>
            <waterFallComponent v-infinite-scroll="loadModel"  v-if="currentSelectIndex == 1"  infinite-scroll-distance="100"
                :infinite-scroll-immediate="true">
                <ModelCardComponentB v-for="(model, index) in models" :model="model" style="" :key="index"></ModelCardComponentB>
            </waterFallComponent>
        </div>
    </div>
</template>
<style scoped>
.like-pages {
    position: relative;
    height: 100%;
    width: 90%;
    left: 50%;
    transform: translate(-50%);
}

.like-pages__filter {
    position: absolute;
    top: -70px;
    height: 70px;
    width: 30%;
    right: 0;
}

.like-pages__filter__select {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0,-50%);
    height: 40px;
    padding: 0 5px;
    border-radius: 20px;
    margin-left: 10px;
    background-color: rgba(52, 58, 64);
    cursor: pointer;
    display: flex;
    color: white;
    transition: all 0.3s;
    /* text-shadow: 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1); */
    user-select: none;
    font-family: 'ZCool';
}

.like-pages__filter__select:hover {
    background-color: rgba(33, 37, 41);
}

.like-pages__filter__select {
    height: 40px;
    width: 100px;
}

.select-window {
    position: absolute;
    top: 60px;
    right: 10px;
    width: 100px;
    border-radius: 10px;
    border: rgba(55, 58, 64) 1px solid;
    background-color: rgba(37, 38, 43);
    padding: 5px;
    z-index: 30;
    user-select: none;
}

.select-window__item {
    padding-left: 15px;
    width: calc(100% - 15px);
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: left;
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    font-family: 'ZCool';
}

.select-window__item:hover {
    background-color: rgba(56, 58, 64);
}

.dither-animation {
    top: 36px;
}

.revolve-animation {
    transform: rotateZ(180deg);
    transform-origin: 6px 3.5px;
}

.like-pages__content {
    position: absolute;
    height: calc(100% - 70px);
    width: 100%;
    /* overflow: scroll; */
}
</style>