<script setup lang="ts">
import modelCard from '@/components/rvcModel/modelCardComponent.vue'
import { getModels } from '@/api/model/modelApi'
import { RvcModelVo } from '@/view/rvcModel/modelType'
import { ref } from 'vue'
let scrollDisabled = ref<boolean>(false)
const models = ref<RvcModelVo[]>([{
  model_id: '111',
  uid: '1',
  username: '1',
  nickname: '1',
  avatar: '1',
  model_name: '1',
  model_type: '1',
  model_label: '1',
  model_image: '1',
  model_desc: '1',
  model_note: '1',
  watch_num: 1,
  like_num: 1,
  collection_num: 1,
  create_at: '1',
  has_like: false,
  has_collection: false,
}])
const scroll = function () {
  scrollDisabled.value = true
  getModels(models.value.length, models.value.length + 5).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      models.value.push(res.data[i])
    }
    scrollDisabled.value = false
  })
}

</script>
<template>
  <ul class="models-list infinite-list" v-infinite-scroll="scroll" :infinite-scroll-disabled="scrollDisabled" infinite-scroll-immediate="ture"
    infinite-scroll-distance="30" style="overflow: auto;">
    <li class="models-list__card" v-for="model in models" :key="model.model_id">
      <modelCard :model="model" style="width: 100%;height: 100%;"></modelCard>
    </li>
  </ul>
</template>



<style scoped>
.models-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 0;

}

.models-list__card {
  position: relative;
  display: inline-block;
  width: 280px;
  height: 400px;
  margin: 10px;
}
</style>
