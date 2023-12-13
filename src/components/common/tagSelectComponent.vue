<!--
 * @Author: Dhx
 * @Date: 2023-12-13 20:54:35
 * @Description: 
 * @FilePath: \RvcWeb\src\components\common\tagSelectComponent.vue
-->
<template>
    <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
        @close="handleClose(tag)">
        {{ tag }}
    </el-tag>
    <el-select v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
        @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
    </el-select>
    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
        + New Tag
    </el-button>
</template>
  
<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { ELSelect } from 'element-plus'

const inputValue = ref('')
const dynamicTags = ref<string[]>([])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ELSelect>>()

const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}
</script>
  