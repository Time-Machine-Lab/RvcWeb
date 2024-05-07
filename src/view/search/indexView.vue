<script setup lang="ts">
import filtersComponent from '@/components/top100/filtersComponent.vue'
import { ref } from 'vue'

const isCollapse = ref(true)
</script>

<template>
  <div class="top flex">
<!--    筛选器-->
    <div class="filters" :class="{'collapsed': !isCollapse}">
      <div class="filters-navigation flex">
        <button class="flex" @click="isCollapse = false">
          <svg t="1709303556726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3798" width="40" height="40"><path d="M560.3328 571.6992m-316.4672 0a316.4672 316.4672 0 1 0 632.9344 0 316.4672 316.4672 0 1 0-632.9344 0Z" fill="#F1ACB3" p-id="3799"></path><path d="M516.1472 986.2144c-247.9104 0-449.5872-201.6768-449.5872-449.5872 0-171.9808 95.744-326.3488 249.856-402.8928a30.71488 30.71488 0 0 1 41.1648 13.8752c7.5264 15.2064 1.3312 33.6384-13.8752 41.1648C210.688 254.8736 128 388.1472 128 536.6272c0 214.016 174.1312 388.1472 388.1472 388.1472 214.016 0 388.1472-174.1312 388.1472-388.1472 0-149.0432-83.1488-282.5728-216.9344-348.4672-15.2064-7.4752-21.504-25.9072-13.9776-41.1136 7.4752-15.2064 25.9072-21.504 41.1136-13.9776 154.9824 76.288 251.2384 230.912 251.2384 403.5584 0 247.9104-201.6768 449.5872-449.5872 449.5872z" fill="#ffffff" p-id="3800"></path><path d="M516.1472 556.2368c-16.9472 0-30.72-13.7728-30.72-30.72v-453.632c0-16.9472 13.7728-30.72 30.72-30.72s30.72 13.7728 30.72 30.72v453.632c0 16.9984-13.7728 30.72-30.72 30.72z" fill="#ffffff" p-id="3801"></path></svg>
        </button>
        <span>Filters & sorting</span>
      </div>
      <div class="filters-content">
        <filtersComponent></filtersComponent>
      </div>
    </div>

<!--    搜索结果-->
    <div class="results flex">
      <div class="results-number flex">
        <span>超过 1,000 个结果用于“5”</span>
      </div>
      <div class="results-tabs flex">
        <button @click="isCollapse=!isCollapse">筛选</button>
      </div>
      <div class="results-content"></div>
    </div>
  </div>
</template>

<style scoped>
div{
  border: solid 1px #c0c0c0;
}
button{
  background-color: rgba(84, 84, 84, 0.33);
}
span{
  color: #b6b6b6;
}
.flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
.top{
  width:100%;
  height:100%;
}
.filters{
  width:400px;
  height:100%;
  transition-duration: 0.3s;
  .filters-navigation{
    justify-content: space-around;
    width:100%;
    height:70px;
    button{
      width:50px;
      height:50px;
    }
  }
  .filters-content{
    padding: 10px;
    overflow: hidden;
  }
}
.collapsed {
  margin-left:-400px;
}
.results{
  flex-direction: column;
  height:100%;
  width:100%;
  .results-number{
    width:100%;
    height:70px;
  }
  .results-tabs{
    width:100%;
    height:70px;
  }
  .results-content{
    height:100%;
    width:100%;
  }
}
</style>