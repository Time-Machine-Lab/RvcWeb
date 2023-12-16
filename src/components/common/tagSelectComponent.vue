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
let Options = ref(props.options)
const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showSelect = () => {
    selectVisible.value = true
    nextTick(() => {

        SelectRef.value!.focus()
    })

}

const handleSelectConfirm = () => {
    if (selectValue.value && !dynamicTags.value.includes(selectValue.value)) {
        dynamicTags.value.push(selectValue.value)
    }
    selectVisible.value = false
    selectValue.value = ''
}
</script>
<template>
    <el-tag v-for="tag in dynamicTags" :key="tag"
        :style="{ backgroundColor: 'rgba(40,40,40)', border: 'rgba(70,70,70) 1px solid' }" closable
        :disable-transitions="false" @close="handleClose(tag)">
        {{ tag }}
    </el-tag>
    <el-select v-if="selectVisible" ref="SelectRef" v-model="selectValue"
        :style="{ width: '100px', backgroundColor: 'rgba(40,40,40)', border: 'rgba(70,70,70) 1px solid' }" size="small"
        @change="handleSelectConfirm" @blur="handleSelectConfirm" placeholder="选择标签">
        <el-option
            v-for="item in Options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button v-else class="button-new-tag"
        :style="{ backgroundColor: 'rgba(40,40,40)', border: 'rgba(70,70,70) 1px solid' }" size="small" @click="showSelect">
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
/* 
:deep(.el-select-dropdown) {
    background-color: rgba(40, 40, 40);
}

:deep(.el-select-dropdown__wrap) {
    background-color: rgba(40, 40, 40);
    border: none
} */
</style>

  