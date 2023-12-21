<script lang="ts" setup>
import modelCardComponentB from '@/components/rvcModel/modelCardComponentB.vue'
import waterFallComponent from '@/components/layout/waterFallComponent.vue'
import filterComponent from '@/components/common/filterComponent.vue'
import { getModels } from '@/api/rvcModel/modelApi'
import { RvcModelVo, ModelListForm } from '@/api/rvcModel/modelType'
import { ref } from 'vue';
import { message } from '@/utils/message'
const models = ref<RvcModelVo[]>([])
models.value = [
    {
        "id": "1735908399119151106",
        "name": "C罗超越梅西",
        "type": "RVC",
        "label": [
            "lol"
        ],
        "picture": "https://rvc1.oss-cn-beijing.aliyuncs.com/model//a0524982b9dca73d1a3896e7a035ea9a.png",
        "description": "2024欧洲杯",
        "note": "小心内马尔",
        "viewNum": "1",
        "likesNum": "0",
        "collectionNum": "0",
        "isLike": "0",
        "isCollection": "0",
        "uid": "1735662165315596290",
        "username": "MZyTahcp",
        "nickname": "welsir",
        "avatar": ""
    }
]


let tags = ref<{
    id: string | undefined
    name: string | undefined
}[]>([])
let page = ref(0)
let form = ref<ModelListForm>({
    sortType: '1',
    page: '0',
    size: '5',
})
// getModelType().then(res => {
//     let data = ref<RvcCommunicationPostType[]>(res.data)
//     for(let i=0;i<data.value.length;i++){
//         tags.value.push({
//             id:data.value[i].tagId,
//             name:data.value[i].tagName
//         })
//     }
// })
const load = function () {
    disabled.value = true
    // setTimeout(function(){
    //     disabled.value = false
    // },5000)
    getModels(form.value).then(res => {
        let data = res.data
        if (data.length == 0) {
            disabled.value = true
            message.warning('没有更多数据了')
            return
        }
        for (let i = 0; i < data.length; i++) {
            models.value.push(data[i])
        }
        page.value++
        form.value.page = page.value as unknown as string
        disabled.value = false
    })
}

// const load = function () {
//     console.log('load');

// }
let disabled = ref(false)
</script>
<template>
    <div class="modellistView">
        <div class="filter-container">
            <filterComponent :tags="tags"></filterComponent>
        </div>
        <div class="model-list">
            <waterFallComponent v-infinite-scroll="load" infinite-scroll-distance="100" :infinite-scroll-disabled="disabled"
                :infinite-scroll-immediate="true">
                <modelCardComponentB v-for="(model, index) in models" :model="model" :key="index"></modelCardComponentB>
            </waterFallComponent>
        </div>
    </div>
</template>
<style scoped>
:deep(.el-scrollbar__wrap) {
    background-color: transparent;
}

.modellistView {
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


.model-list {
    position: relative;
    height: 100%;
    width: 100%;
    left: 50%;
    margin-top: 5px;
    transform: translate(-50%);
}
</style>@/api/rvcModel/modelApi@/api/rvcModel/modelType