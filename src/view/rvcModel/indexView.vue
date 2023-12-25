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

]


let tags = ref<{
    id: string | undefined
    name: string | undefined
}[]>([])
let page = ref(1)
let form = ref<ModelListForm>({
    sortType: '1',
    page: '1',
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
    if (disabled.value) {
        return
    }
    disabled.value = true

    // setTimeout(function(){
    //     disabled.value = false
    // },5000)
    getModels(form.value).then((res: any) => {
        if (res.code == 200) {
            let data = res.data.records
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
        } else {
            message.error('网络异常')
        }

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
            <waterFallComponent :minWidth="240" v-infinite-scroll="load" infinite-scroll-distance="100" :infinite-scroll-disabled="disabled"
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