<script lang="ts" setup>
import modelCardComponentB from '@/components/rvcModel/modelCardComponentB.vue'
import waterFallComponent from '@/components/layout/waterFallComponent.vue'
import { getModels, getModelsByType, getModelType } from '@/api/rvcModel/modelApi'
import { RvcModelVo, ModelListForm, ModelType, ModelListType } from '@/api/rvcModel/modelType'
import { ref } from 'vue';
import { message } from '@/utils/message'

const models = ref<RvcModelVo[]>([])
models.value = []
let loaded = ref(false)

let page = ref(1)
let form = ref<ModelListForm>({
  limit: 5, page: 1, sortType: ""
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
  <el-scrollbar style="height: calc(100vh - 120px)">

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
        <waterFallComponent :minWidth="240" v-infinite-scroll="load" infinite-scroll-distance="100"
          :infinite-scroll-disabled="disabled" :infinite-scroll-immediate="false">
          <modelCardComponentB v-for="(model, index) in models" :model="model" :key="index"></modelCardComponentB>
          <!-- <el-skeleton style="width: 240px;height: 400px;background-color: rgba(61,63,67);" :loading="disabled" animated>
            <template #template>
              <el-skeleton-item variant="image" style="width: 100%; height: 400px" />
            </template>
          </el-skeleton> -->
        </waterFallComponent>
        <div class="loading" v-if="disabled">

        </div>
      </div>
    </div>
  </el-scrollbar>
</template>
<style scoped>
:deep(.el-skeleton-item) {
  background-color: rgba(61, 63, 67);
}

.filter-box__filter {
  position: relative;
  height: 70px;
  width: 30%;
  display: flex;
  justify-content: right;
}

.filter-box__filter__sort {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  background-color: rgba(52, 58, 64);
  cursor: pointer;
  display: flex;
  color: white;
  transition: all 0.3s;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1);
  user-select: none;
}

.filter-box__filter__sort:hover {
  background-color: rgba(33, 37, 41);
}

.filter-box__filter__sort span {
  position: relative;
  display: inline-block;
  height: 40px;
  font-size: 14px;
}

.sort-select {
  position: absolute;
  margin-top: 60px;
  width: 200px;
  border-radius: 10px;
  border: rgba(55, 58, 64) 1px solid;
  background-color: rgba(37, 38, 43);
  padding: 5px;
  z-index: 10;
  user-select: none;
}

.sort-select__item {
  padding-left: 15px;
  width: calc(100% - 15px);
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
}

.sort-select__item:hover {
  background-color: rgba(56, 58, 64);
  cursor: pointer;
}

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
  height: 70px;
  width: 100%;
  display: flex;
}

.filter-box__tags {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  justify-content: left;
}

.filter-box__tags__item {
  padding: 0 8px;
  height: 30px;
  background-color: rgba(52, 58, 64);
  line-height: 30px;
  color: white;
  border-radius: 5px;
  margin: 3px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

.filter-box__tags__item:hover {
  background-color: rgba(33, 37, 41);
}

.model-list {
  position: relative;
  height: 100%;
  width: 100%;
  left: 50%;
  margin-top: 5px;
  transform: translate(-50%);
}

.loading {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: rgba(44, 46, 51);
  font-size: 20px;
  line-height: 60px;
  color: white;
  font-weight: 700;
  /* border: transparent 2px solid; */
  /* border-top: rgba(25, 113, 194) 1px solid; */
  border-left: rgba(25, 113, 194) 1px solid;
  margin-bottom: 20px;
  animation: roll 1s linear infinite;
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>