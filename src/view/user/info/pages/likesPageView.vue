<script lang="ts" setup>
import { ref } from 'vue'
import waterFallComponent from '@/components/layout/waterFallComponent.vue'
import postCardComponentWaterFall from '@/components/modelCommunication/postCardComponent-waterFall.vue';
import { PostVo, UserLikePostForm } from '@/api/post/postType';
import { getUserLikePosts } from '@/api/post/postApi';
import { message } from '@/utils/message';
import { RvcModelVo, UserLikeModelForm } from '@/api/rvcModel/modelType';
import { getUserLikeModels } from '@/api/rvcModel/userApi.ts';
import modelCardComponent from '@/components/rvcModel/modelCardComponent.vue';
import "@/view/user/info/style/likesPage.css"
const postWaterFallComponentRef = ref<any>()
const modelWaterFallComponentRef = ref<any>()
let selectOptions = ref(['贴子', '模型'])
let clickSelect = ref(false)
let selectVisibility = ref(false)
let currentSelectIndex = ref(0)
let posts = ref<PostVo[]>([])
let models = ref<RvcModelVo[]>([])
let page = ref(1)
let empty = ref(false)
let loading = ref(false)
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
    empty.value = false
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
    empty.value = false
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
    loading.value = true
    postForm = ref<UserLikePostForm>({
        data: '',
        limit: '10',
        page: page.value as unknown as string
    })
    getUserLikePosts(postForm.value).then((res: any) => {
        if (res.code == 200) {
            let data = res.data
            // if (data.length == 0) {
            //     message.warning('已滑到底部了')
            // }
            for (let i = 0; i < data.length; i++) {
                posts.value.push(data[i])
            }
            page.value++
            disabled.value = false
            empty.value = true
        } else if(res.code == 304){
            disabled.value = true
            loading.value = false
            empty.value = true
            message.warning('已滑到底部了')
            return
        } else {
            message.error('网络异常')
            setTimeout(()=>{
                disabled.value = false
            },30000)
        }
        loading.value = false
    })
}
const loadModel = function () {
    if (disabled.value) return
    disabled.value = true
    loading.value = true
    modelForm = ref<UserLikeModelForm>({
        limit: '10',
        page: page.value as unknown as string,
        order: '3'
    })
    getUserLikeModels(modelForm.value).then((res: any) => {
        if (res.code == 200) {
            let data = res.data.records
            
            for (let i = 0; i < data.length; i++) {
                models.value.push(data[i])
            }
            empty.value = true
            if (data.length != modelForm.value.limit) {
                message.warning('已滑到底部了')
                disabled.value = true
                loading.value = false
                return
            }
            page.value++
            disabled.value = false
        } else {
            message.error('网络异常')
            setTimeout(()=>{
                disabled.value = false
            },30000)
        }
        loading.value = false
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
            <el-empty :image-size="200" v-if="empty&&(posts.length == 0&&currentSelectIndex == 0||models.length ==0&&currentSelectIndex == 1)" style="font-family: 'ZCool';" description="这里空空如也~" image="/icon/empty.svg" />
            <waterFallComponent :min-width="280" v-infinite-scroll="loadPost" infinite-scroll-distance="100"
                :infinite-scroll-immediate="true" v-if="currentSelectIndex == 0" ref="postWaterFallComponentRef">
                <postCardComponentWaterFall v-for="(post, index) in posts" :post="post" style="" :key="index" v-show="postWaterFallComponentRef.visibility[index]"></postCardComponentWaterFall>
            </waterFallComponent>
            <waterFallComponent v-infinite-scroll="loadModel"  v-if="currentSelectIndex == 1"  infinite-scroll-distance="100"
                :infinite-scroll-immediate="true" ref="modelWaterFallComponentRef">
                <modelCardComponent v-for="(model, index) in models" :model="model" style="" :key="index" v-show="modelWaterFallComponentRef.visibility[index]"></modelCardComponent>
            </waterFallComponent>
            <div class="loading" v-if="loading"></div>
        </div>
    </div>
</template>
