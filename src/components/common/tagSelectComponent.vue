<!--
 * @Author: Dhx
 * @Date: 2023-12-13 20:54:35
 * @Description: 
 * @FilePath: \RvcWeb\src\components\common\tagSelectComponent.vue
-->
<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { ELSelect } from 'element-plus'
let props = defineProps<{
    options:Array<{
    value:string
    label:string
}>
}>()
const selectValue = ref('')
const dynamicTags = ref<string[]>([])
const selectVisible = ref(false)
const SelectRef = ref<InstanceType<typeof ELSelect>>()
let typeOptions = ref(props.options)
let typeSelectvisibility = ref(false)
let clickType = ref(false)
let currentTypeIndex = ref(0)
const handleClickSort = function () {
    clickType.value = true
    typeSelectvisibility.value = !typeSelectvisibility.value
    setTimeout(function () {
        clickType.value = false
    }, 200)
}
const handleBlur = function () {
    setTimeout(function () {
        typeSelectvisibility.value = false
    }, 200)
    handleSelectConfirm(-1)
}
const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showSelect = () => {
    selectVisible.value = true
    nextTick(() => {
        // SelectRef.value!.focus()
    })

}

const handleSelectConfirm = (index:number) => {
    if(index==-1)return
    if(dynamicTags.value.includes(typeOptions.value[index].value))return
    dynamicTags.value.push(typeOptions.value[index].value)
    selectVisible.value = false
    selectValue.value = ''
}
</script>
<template style="display:flex">
    <el-tag v-for="tag in dynamicTags" :key="tag" style="margin-right: 2px;"
        :style="{ backgroundColor: 'rgba(37, 38, 43)', border: 'rgba(55,58,64) 1px solid' }" closable
        :disable-transitions="false" @close="handleClose(tag)">
        {{ tag }}
    </el-tag>
    <div class="select" v-if="selectVisible" ref="SelectRef" >
            <div tabindex="-1" class="type-selecter"
                :style="{ border: typeSelectvisibility ? 'rgba(24,100,171) 1px solid' : '' }"
                :class="clickType ? 'dither-animation' : ''" @click="handleClickSort" @blur="handleBlur">
                <div class="horizontal-center" style="width:100%;display: flex;">
                    <span style="position: relative;left:0%;line-height: 20px;width:97%;text-align: left;">{{
                        typeOptions[currentTypeIndex].value }}</span>
                    <span style="position: relative;right:0%;">
                        <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                            :class="typeSelectvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                    </span>
                </div>

            </div>
            <div class="type-select" v-show="typeSelectvisibility">
                <div class="type-select__item" v-for="(tag, index) in typeOptions" :key="index"
                    @click="handleSelectConfirm(index);currentTypeIndex = index; typeSelectvisibility = false;"
                    :style="{ backgroundColor: currentTypeIndex == index ? 'rgba(24,100,171)' : '' }">
                    {{ tag.value }}
                </div>
            </div>

        </div>
    <!-- <el-select v-if="selectVisible"  v-model="selectValue"
        :style="{ width: '100px', backgroundColor: 'rgba(40,40,40)', border: 'rgba(70,70,70) 1px solid' }" size="small"
        @change="handleSelectConfirm" @blur="handleSelectConfirm" placeholder="选择标签">
        <el-option
            v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select> -->
    <el-button v-else class="button-new-tag"
        :style="{ backgroundColor: 'rgba(37, 38, 43)', border: 'rgba(55,58,64) 1px solid' }" size="small" @click="showSelect">
        + New Tag
    </el-button>
</template>
  
<style scoped>
/* :deep(.el-input__inner) {
    background-color: rgba(40, 40, 40);
    border: none;
} */

:deep(.el-input__wrapper) {
    background-color: rgba(40, 40, 40);
}
.type-selecter {
    width: calc(100% - 20px);
    height: 21px;
    padding: 0 15px;
    transform: translate(0,1px);
    border-radius: 5px;
    font-size: 14px;
    background-color: rgba(37, 38, 43);
    cursor: pointer;
    display: flex;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s;
    user-select: none;
    border: rgba(55, 58, 64) 1px solid;
}

.type-select {
    position: absolute;
    top: 35px;
    /* left: 10px; */
    width: 100%;
    border-radius: 5px;
    border: rgba(55, 58, 64) 1px solid;
    background-color: rgba(37, 38, 43);
    padding: 5px;
    z-index: 10;
    user-select: none;
}

.type-select__item {
    padding-left: 15px;
    width: calc(100% - 15px);
    height: 21px;
    line-height: 21px;
    font-size: 14px;
    text-align: left;
    border-radius: 5px;
    color: rgba(255, 255, 255, 0.7);
}

.type-select__item:hover {
    background-color: rgba(56, 58, 64);
    cursor: pointer;
}

.select {
    position: relative;
    width: 60px;
    text-align: left;
    display: inline-block;
    
}
.revolve-animation {
    transform: rotateZ(180deg);
    transform-origin: 6px 2px;
}
</style>

  