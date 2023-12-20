<script lang="ts" setup>
import { ref } from 'vue'
import waterFallComponent from '@/components/layout/waterFallComponent.vue'
import postCardComponentB from '@/components/modelCommunication/postCardComponentB.vue';
import { PostVo } from '@/api/post/postType';
let selectOptions = ref(['模型','贴子'])
let clickSelect = ref(false)
let selectVisibility = ref(false)
let currentSelectIndex = ref(0)
let postScrollDisabled = ref(false)
let posts = ref<PostVo[]>([])
const handleClickSelect = function(){
    clickSelect.value = true
    selectVisibility.value = !selectVisibility.value
    setTimeout(function(){
        clickSelect.value = false
    },200)
}
const handleBlur = function(){
    setTimeout(function(){
        selectVisibility.value = false
    },200)
}
const handleOptionChange = function(index:number){
    currentSelectIndex.value = index
    selectVisibility.value = false
}
const loadPost = function(){
    
}
</script>
<template>
    <div class="like-pages">
        <div class="like-pages__filter">
            <div tabindex="-1" class="like-pages__filter__select" :class="clickSelect ? 'dither-animation' : ''"
                @click="handleClickSelect" @blur="handleBlur">
                <div class="horizontal-center" style="display: flex;">
                    <span
                        style="line-height: 40px;margin-left: 3px;margin-right: 7px;">{{ selectOptions[currentSelectIndex] }}</span>
                    <span>
                        <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                            :class="selectVisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                    </span>
                </div>
                <div class="select-window" v-show="selectVisibility">
                <div class="select-window__item" v-for="(choice, index) in selectOptions" :key="index"
                    @click="handleOptionChange(index)">{{ choice }}
                </div>
            </div>
            </div>
        </div>
        <div class="like-pages__content">
            <waterFallComponent v-infinite-scroll="loadPost" infinite-scroll-distance="100" :infinite-scroll-disabled="postScrollDisabled"
                :infinite-scroll-immediate="true">
                <postCardComponentB v-for="(post, index) in posts" :post="post" style="" :key="index"></postCardComponentB>
            </waterFallComponent>
        </div>
    </div>
</template>
<style scoped>
.like-pages{
    height: 100%;
    width: 100%;
}
.like-pages__filter{
    height: 70px;
    width: 100%;
}
.like-pages__filter__select{
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 40px;
    padding: 0 5px;
    border-radius: 20px;
    margin-left: 10px;
    background-color: rgba(52, 58, 64);
    cursor: pointer;
    display: flex;
    color: white;
    transition: all 0.3s;
    /* text-shadow: 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1); */
    user-select: none;
}
.filter-pages__filter__select:hover {
    background-color: rgba(33, 37, 41);
}
.like-pages__filter__select{
    height: 40px;
    width: 100px;
}
.select-window {
    position: absolute;
    margin-top: 45px;
    width: 100px;
    border-radius: 10px;
    border: rgba(55, 58, 64) 1px solid;
    background-color: rgba(37, 38, 43);
    padding: 5px;
    z-index: 10;
    user-select: none;
}

.select-window__item {
    padding-left: 15px;
    width: calc(100% - 15px);
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: left;
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.7);
}

.select-window__item:hover {
    background-color: rgba(56, 58, 64);
    cursor: pointer;
}
.dither-animation {
    top: 36px;
}

.revolve-animation {
    transform: rotateZ(180deg);
    transform-origin: 6px 3.5px;
}

.like-pages__content{
    height: calc(100%-70px);
    width: 100%;
}
</style>