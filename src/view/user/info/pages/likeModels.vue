<!--
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\pages\likeModels.vue
-->
<script setup lang="ts">
import modelCard from '@/components/rvcModel/modelCardComponent.vue'
// import { getModels } from '@/api/rvcModel/modelApi'
import { RvcModelVo } from '@/api/rvcModel/modelType'
import { ref } from 'vue'
let scrollDisabled = ref<boolean>(false)
const models = ref<RvcModelVo[]>([{
  
}])
const scroll = function () {
  scrollDisabled.value = true
  // getModels(models.value.length, models.value.length + 5).then((res) => {
  //   for (let i = 0; i < res.data.length; i++) {
  //     models.value.push(res.data[i])
  //   }
  //   scrollDisabled.value = false
  // })
}

</script>
<template>
  <ul class="models-list infinite-list" v-infinite-scroll="scroll" :infinite-scroll-disabled="scrollDisabled" infinite-scroll-immediate="ture"
    infinite-scroll-distance="30" style="overflow: auto;">
    <li class="models-list__card" v-for="model in models" :key="model.id">
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
