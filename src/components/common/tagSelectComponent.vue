<!--
 * @Author: Dhx
 * @Date: 2023-12-13 20:54:35
 * @Description: 
 * @FilePath: \RvcWeb\src\components\common\tagSelectComponent.vue
-->
<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { ELSelect } from 'element-plus'
import { message } from '@/utils/message';
import { modelLabel } from '@/api/rvcModel/modelApi';
let props = defineProps<{
    options: Array<{
        value: string
        label: string
    }>,
    value: string[]
    getValue: (tags: string[]) => void
}>()
let dynamicTags = ref<{
    value: string
    label: string
}[]>([])
let selectVisible = ref(false)
const SelectRef = ref<InstanceType<typeof ELSelect>>()
let typeOptions = ref(props.options)
let typeSelectvisibility = ref(false)
let clickType = ref(false)
let currentTypeIndex = ref(0)
let newLabel = ref('')
const handleClickType = function () {
    clickType.value = true
    typeSelectvisibility.value = !typeSelectvisibility.value
    setTimeout(function () {
        clickType.value = false
    }, 200)
}
const handleBlur = function () {

    setTimeout(function () {
        typeSelectvisibility.value = false
        selectVisible.value = false

    }, 200)
    handleSelectConfirm(-1)
}
const handleClose = (tag: {
    value: string
    label: string
}) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    let tags: string[] = []
    for (let i = 0; i < dynamicTags.value.length; i++) {
        tags.push(dynamicTags.value[i].label)
    }
    props.getValue(tags)
}

const showSelect = () => {
    selectVisible.value = true
    nextTick(() => {
        // SelectRef.value!.focus()
    })

}
const addLabel = () => {
    modelLabel(newLabel.value).then((res: any) => {
        if (res.code == 200 || res.message == '标签已存在') {
            let tags: string[] = []
            for (let i = 0; i < dynamicTags.value.length; i++) {
                tags.push(dynamicTags.value[i].label)
            }
            if (tags.includes(newLabel.value)) return
            tags.push(newLabel.value)
            dynamicTags.value.push({
                value: '',
                label: newLabel.value
            })
            props.getValue(tags)
            newLabel.value = ''
        } else {
            message.error(res.message)
        }
    })
}
const handleSelectConfirm = (index: number) => {
    if (index == -1) {
        return
    }
    if (dynamicTags.value.includes(typeOptions.value[index])) return
    dynamicTags.value.push(typeOptions.value[index])
    let tags: string[] = []
    for (let i = 0; i < dynamicTags.value.length; i++) {
        tags.push(dynamicTags.value[i].label)
    }
    props.getValue(tags)
    selectVisible.value = false
}
</script>
<template style="display:flex">
    <el-tag v-for="tag in dynamicTags" :key="tag" style="margin-right: 2px;"
        :style="{ backgroundColor: 'rgba(37, 38, 43)', border: 'rgba(55,58,64) 1px solid' }" closable
        :disable-transitions="false" @close="handleClose(tag)">
        {{ tag.label }}
    </el-tag>
    <div class="select" v-if="selectVisible" ref="SelectRef" @blur="handleBlur">
        <div tabindex="-1" class="type-selecter"
            :style="{ border: typeSelectvisibility ? 'rgba(24,100,171) 1px solid' : '' }"
            :class="clickType ? 'dither-animation' : ''" @click="handleClickType">
            <div class="horizontal-center" style="width:100%;display: flex;">
                <span style="position: relative;left:0%;line-height: 20px;width:97%;text-align: left;">{{
                    typeOptions[currentTypeIndex].label }}</span>
                <span style="position: relative;right:0%;">
                    <img width="10" height="10" style="transition: all 0.2s;line-height: 16px;"
                        :class="typeSelectvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                </span>
            </div>

        </div>
        <div class="type-select" v-show="typeSelectvisibility">
            <div class="type-select__item">
                <input class="type-select__item--input" placeholder="自定义标签" v-model="newLabel" maxlength="8"
                    v-on:keyup.enter="addLabel">
            </div>
            <div class="type-select__item" v-for="(tag, index) in typeOptions" :key="index"
                @click="handleSelectConfirm(index); currentTypeIndex = index; typeSelectvisibility = false;"
                :style="{ backgroundColor: currentTypeIndex == index ? 'rgba(24,100,171)' : '' }">
                {{ tag.label }}
            </div>
        </div>

    </div>

    <el-button v-else class="button-new-tag"
        :style="{ backgroundColor: 'rgba(37, 38, 43)', border: 'rgba(55,58,64) 1px solid' }" size="small"
        @click="showSelect">
        + 添加标签
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
    height: 22px;
    padding: 0 15px;
    transform: translate(0, 1px);
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
    z-index: 20;
    user-select: none;
}

.type-select__item {
    position: relative;
    padding-left: 15px;
    width: calc(100% - 15px);
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    letter-spacing: 1px;
    margin-top: 2px;
    text-align: left;
    border-radius: 5px;
    z-index: 20;
    color: rgba(255, 255, 255, 0.7);
}

.type-select__item--input {
    left: 0;
    top: 0;
    position: absolute;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background-color: rgba(37, 38, 43);
    border: rgba(55, 58, 64) 1px solid;
    outline: none;
    color: white;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
}

.type-select__item--input::placeholder {
    font-size: 10px;
    text-align: center;
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
    transform-origin: 6px 5px;
}
</style>

  