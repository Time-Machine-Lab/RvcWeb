<script lang="ts" setup>
import modelCardComponent from '@/components/rvcModel/modelCardComponent.vue'
import waterFallComponent from '@/components/layout/waterFallComponent.vue'
import { getModels, getModelsByType, getModelType } from '@/api/rvcModel/modelApi'
import { RvcModelVo, ModelListForm, ModelType, ModelListType } from '@/api/rvcModel/modelType'
import { onActivated, ref } from 'vue';
import { message } from '@/utils/message'
const models = ref<RvcModelVo[]>([])
models.value = []
const waterFallComponentRef = ref<any>()
let loaded = ref(false)
defineOptions({
    name:'model-list'
})
let page = ref(1)
let form = ref<ModelListForm>({
  limit: 10, page: 1, sortType: ""
})
let formType = ref<ModelListType>({
  limit: 5, page: 1, sortType: "", typeId: ""
})
let disabled = ref(false)
let choose = ref("0")
let sortNumber = ref(0)
let showSort = ref(false)
const sortMethod = ref(["时间排序", "浏览量排序", "点赞数量排序"])
const Types = ref<ModelType[]>([{ createTime: "", id: "0", type: "全部" }])
getModelType().then((res: any) => {
  Types.value = Types.value.concat(res.data)
  // alert(Types.value[1].id)
})

const scrollbarRef = ref<any>()
let scrollTop = ref<number>(0)
const scroll = (position:any) => {  
  scrollTop.value = position.scrollTop
}
onActivated(()=>{
    waterFallComponentRef.value.sortElement()    
    scrollbarRef.value.setScrollTop(scrollTop.value)
})
const load = function () {
  // if (disabled.value) {
  //   return
  // }
  loaded.value = false
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
    loaded.value = true
  }, 5000)
  form.value.page = page.value
  getModels(form.value).then((res: any) => {
    if (res.code == 200) {
      let data = res.data.records
      disabled.value = false
      loaded.value = true
      if (data.length == 0) {
        disabled.value = true
        message.warning('已经滑倒底部了')
        return
      }
      models.value = models.value.concat(data)
      // for (let i = 0; i < data.length; i++) {
      //     models.value.push(data[i])
      // }
      page.value++
      disabled.value = false
    } else {
      message.error('网络异常')
    }
  })
}
load()
const loadType = function () {
  if (disabled.value) {
    return
  }
  loaded.value = false
  disabled.value = true
  formType.value.page = page.value
  getModelsByType(formType.value).then((res: any) => {
    if (res.code == 200) {
      let data = res.data.records
      if (data.length == 0) {
        disabled.value = true
        message.warning('没有更多数据了')
        return
      }
      models.value = models.value.concat(data)
      // for (let i = 0; i < data.length; i++) {
      //     models.value.push(data[i])
      // }
      page.value++
      disabled.value = false
    } else {
      message.error('网络异常')
    }
  })
}


const chooseType = function (index: any) {
  choose.value = index
  formType.value.typeId = String(index)
  refresh()
  if (choose.value == "0") {
    load()
  } else {
    loadType()
  }
}
const Show = function () {
  showSort.value = !showSort.value
}
const unShow = function () {
  showSort.value = false
}
const chooseSort = function (index: any) {
  sortNumber.value = index
  form.value.sortType = String(index + 1)
  refresh()
  load()
  unShow()
}
const refresh = () => {
  models.value = []
  page.value = 1
  disabled.value = false
}
</script>
<template>
  <el-scrollbar ref="scrollbarRef" @scroll="scroll" style="height: calc(100vh - 120px)">

    <div class="modellistView">
      <div class="filter-container">
        <div class="filter-box__tags">
          <div class="filter-box__tags__item" v-for="(type, index) in Types"
            :style="{ backgroundColor: choose == type.id ? 'rgba(33,37,41)' : '' }" :key="index"
            @click="chooseType(type.id)">
            {{ type.type }}
          </div>
        </div>
        <div class="filter-box__filter">
          <div class="filter-box__filter__sort" @click="Show()">
            <div class="horizontal-center" style="display: flex;">
              <span>
                <img width="16" height="16" class="vertical-center" src="/icon/sort-down.svg">
              </span>
              <span style="line-height: 40px;margin-left: 3px;margin-right: 7px;">{{ sortMethod[sortNumber] }}</span>
              <span>
                <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                  :class="showSort ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
              </span>
            </div>
          </div>
          <div class="sort-select" v-show="showSort">
            <div class="sort-select__item" v-for="(method, index) in sortMethod" :key="index" @click="chooseSort(index)">
              {{ method }}
              <span v-show="sortNumber == index" style="color: rgba(25,113,194);position:absolute;right: 15px;">✓</span>
            </div>
          </div>
        </div>
      </div>
      <div class="model-list">
        <el-empty :image-size="200" v-if="loaded && models.length == 0" style="font-family: 'ZCool';"
          description="这里空空如也~" image="/icon/empty.svg" />
        <waterFallComponent :minWidth="320" v-infinite-scroll="load" infinite-scroll-distance="100"
          :infinite-scroll-disabled="disabled" :infinite-scroll-immediate="false" ref="waterFallComponentRef">
          <modelCardComponent v-for="(model, index) in models" :model="model" :key="index"  v-show="waterFallComponentRef.visibility[index]"></modelCardComponent>
        </waterFallComponent>
        <div class="loading" v-if="disabled">

        </div>
      </div>
    </div>
  </el-scrollbar>
</template>
<style scoped>
@import "@/view/rvcModel/style/index.css";
</style>