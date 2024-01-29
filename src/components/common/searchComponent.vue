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
        <div tabindex="-1" class="search-box__select" @click="searchSelectVisibility = !searchSelectVisibility"
            @blur="handleBlur">
            <span style="line-height: 35px;margin-left: 8px;margin-right: 15px;">{{ searchType[currentTypeIndex] }}</span>
            <span>
                <img width="14" height="14" class="vertical-center" src="/icon/arrow-down.svg">
            </span>
        </div>
        <div class="search-select" v-show="searchSelectVisibility">
            <div class="search-select__item" v-for="(method, index) in searchType"
                :style="{ backgroundColor: currentTypeIndex == index ? 'rgba(24,100,171)' : '' }" :key="index"
                @click="currentTypeIndex = index; searchSelectVisibility = false">{{ method }}
            </div>
        </div>
        <div class="search-box__input" >
            <input :placeholder="'搜索'+searchType[currentTypeIndex]"  disabled class="input">
        </div>
        <div class="search-box__button">
            <img class="vh-center" @click="message.warning('开发中')" src="/icon/search.svg">
        </div>

    </div>
</template>
<style scoped>
.search-box {
    position: relative;
    height: 54%;
    width: 60%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background-color: rgba(52, 58, 64);
    display: flex;
    user-select: none;
    font-family: 'ZCool';
}

.search-box__select {
    position: relative;
    width: calc(15% - 2px);
    min-width: 70px;
    height: calc(100% - 2px);
    border: rgba(52, 58, 64) 1px solid;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    outline: none;
}

.search-box__select:focus {
    outline: none;
    border: rgba(25, 113, 194) 1px solid;
}

.search-box__select span {
    position: relative;
    display: inline-block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
}

.search-box__input {
    width: 80%;
    height: 100%;
}

.input {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: rgba(52, 58, 64) 1px solid;

    background-color: rgba(37, 38, 43);
    width: calc(100% - 32px);
    height: calc(100% - 2px);
    padding: 0 15px;
    font-size: 16px;
    color: white;
    outline: none;
    border: none;
}
input:hover{
    cursor:not-allowed
}
.input::placeholder{
    font-family: 'ZCool';
}

.input:focus {
    outline: none;
    border: rgba(25, 113, 194) 1px solid;
}

.search-box__button {
    position: relative;
    width: 5%;
    min-width: 35px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 100%;
    cursor: pointer;
}

.search-box__button:hover {
    background-color: rgba(73, 80, 87);
}

.search-select {
    position: absolute;
    margin-top: 60px;
    width: 100px;
    border-radius: 10px;
    border: rgba(55, 58, 64) 1px solid;
    background-color: rgba(37, 38, 43);
    padding: 5px;
    z-index: 10;
    user-select: none;
}

.search-select__item {
    padding-left: 15px;
    width: calc(100% - 0px);
    height: 40px;
    line-height: 40px;
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