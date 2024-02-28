<!--顶部搜索栏组件-->
<script lang="ts" setup>
import { message } from '@/utils/message';
import { ref } from 'vue';
let searchType = ref(["模型", "用户", "贴子"])
let currentTypeIndex = ref(0)
let searchSelectVisibility = ref(false)
const handleBlur = function () {
    setTimeout(function () {
        searchSelectVisibility.value = false
    }, 200)
}
</script>
<template>
    <div class="search-box">
        <!--切换搜索按钮-->
        <div tabindex="-1" class="search-box__select" @click="searchSelectVisibility = !searchSelectVisibility" @blur="handleBlur">
          <span >{{ searchType[currentTypeIndex] }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="white" class="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
        <!--搜索项选择下拉框-->
        <div class="search-select" v-show="searchSelectVisibility">
            <div class="search-select__item flex" v-for="(method, index) in searchType"
                :style="{ backgroundColor: currentTypeIndex == index ? 'rgba(24,100,171)' : '' }" :key="index"
                @click="currentTypeIndex = index; searchSelectVisibility = false">{{ method }}
            </div>
        </div>
        <!--搜索内容输入框-->
        <div class="search-box__input" >
            <input :placeholder="'搜索'+searchType[currentTypeIndex]">
        </div>
        <!--搜索按钮-->
        <div class="search-box__button">
            <img class="vh-center" @click="message.warning('开发中')" src="/icon/search.svg">
        </div>
    </div>
</template>
<style scoped>
.search-box {
    position: relative;
    height: 40px;
    width: 100%;
    border-radius: 5px;
    display: flex;
    user-select: none;
    font-family: 'ZCool';
}

.search-box__select {
    position: relative;
    width: 20%;
    height: 100%;
    border: rgba(52, 58, 64) 1px solid;
    border-radius: 5px 0 0 5px;
    cursor: pointer;
    display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
    outline: none;
  background-color: rgb(58, 58, 58);
}

.search-box__select:focus{
    outline: none;
    border: rgba(25, 113, 194) 1px solid;
}

.search-box__select span {
  margin-right: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.search-box__input {
  position: relative;
  width: 80%;
  height: 100%;
  background-color: rgba(37, 38, 43);
  border: rgb(58, 58, 58) 2px solid;
  input {
    position: relative;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: white;
    outline: none;
  }
  input::placeholder{
    font-family: 'ZCool';
    padding-left: 10px;
  }

  input:focus {
    outline: none;
    border: rgba(25, 113, 194) 1px solid;
    padding-left: 10px;
  }

}
.search-box__button {
    position: relative;
    width: 10%;
    min-width: 35px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 100%;
    cursor: pointer;
  background-color: rgb(58, 58, 58);
}

.search-box__button:hover {
    background-color: rgba(73, 80, 87);
}

.search-select {
  display: flex;
  align-items: center;
  flex-direction: column;
    position: absolute;
    margin-top: 50px;
    width: 20%;
    border-radius: 5px;
    border: rgba(55, 58, 64) 1px solid;
    background-color: rgba(37, 38, 43);
    z-index: 10;
    user-select: none;
}

.search-select__item {
  margin-top:5px;
  margin-bottom: 5px;
    width: 90%;
    height: 35px;
    font-size: 14px;
    text-align: left;
    border-radius: 5px;
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
}

.search-select__item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>