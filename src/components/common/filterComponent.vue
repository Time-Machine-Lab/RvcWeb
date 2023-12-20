<script lang="ts" setup>
import { ref } from 'vue';
const sortMethod = ref(["时间排序", "浏览量排序", "点赞数量排序"])
let props = defineProps<{
    tags:{
        id:string|undefined
        name:string|undefined
    }[]
}>()
let tags = ref<{
    id:string|undefined,
    name:string|undefined
}[]>(props.tags)
let sortSelectvisibility = ref(false)
let clickSort = ref(false)
let currentMethodIndex = ref(0)
let currentTagsIndex = ref(-1)
const handleClickSort = function () {
    clickSort.value = true
    sortSelectvisibility.value = !sortSelectvisibility.value
    setTimeout(function () {
        clickSort.value = false
    }, 200)
}
const handleBlur = function () {
    setTimeout(function () {
        sortSelectvisibility.value = false
    }, 200)
}
</script>
<template>
    <div class="filter-box">
        <div class="filter-box__filter">
            <div tabindex="-1" class="filter-box__filter__sort" :class="clickSort ? 'dither-animation' : ''"
                @click="handleClickSort" @blur="handleBlur">
                <div class="horizontal-center" style="display: flex;">
                    <span>
                        <img width="16" height="16" class="vertical-center" src="/icon/sort-down.svg">
                    </span>
                    <span
                        style="line-height: 40px;margin-left: 3px;margin-right: 7px;">{{ sortMethod[currentMethodIndex] }}</span>
                    <span>
                        <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                            :class="sortSelectvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                    </span>
                </div>

            </div>
            <div class="sort-select" v-show="sortSelectvisibility">
                <div class="sort-select__item" v-for="(method, index) in sortMethod" :key="index"
                    @click="currentMethodIndex = index; sortSelectvisibility = false">{{ method }}
                     <span v-show="currentMethodIndex == index" style="color: rgba(25,113,194);position:absolute;right: 15px;">
                        ✓
                    </span>
                </div>
            </div>
        </div>
        <div class="filter-box__tags">
            <div class="filter-box__tags__item" v-for="(tag, index) in tags"
                :style="{ backgroundColor: currentTagsIndex == index ? 'rgba(33,37,41)' : '' }" :key="index"
                @click="currentTagsIndex = currentTagsIndex!=index?index:-1;">
                {{ tag.name }}
            </div>
        </div>
    </div>
</template>
<style scoped>
.filter-box {
    /* min-height: 50px; */
    width: 100%;
    /* background-color: rgba(0, 0, 0, 0.1); */
}

.filter-box__filter {
    position: absolute;
    top: -70px;
    right: 0;
    right: 10px;
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

.dither-animation {
    top: 36px;
}

.revolve-animation {
    transform: rotateZ(180deg);
    transform-origin: 6px 3.5px;
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

.filter-box__tags {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
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
}</style>