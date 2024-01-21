<script lang="ts" setup>
import TagSelectComponent from '@/components/common/tagSelectComponent.vue';
import ModelEditorComponent from '@/components/editor/modelEditorComponent.vue';
import { ModelAddForm } from '@/api/rvcModel/modelType'
import { getModelDetails, getModelLabel, modelAdd } from '@/api/rvcModel/modelApi'
import { uploadImages } from '@/api/rvcModel/fileApi.ts'
import { ref } from 'vue';
import { message } from '@/utils/message';
import router from '@/router';
// import { UploadInstance } from 'element-plus/es/components/upload/src/upload';
let typeOptions = ref(['RVC'])
let typeSelectvisibility = ref(false)
let clickType = ref(false)
let currentTypeIndex = ref(0)
let coverBase64 = ref('')
let uploadModelLoading = ref(false)
let uploadCoverLoading = ref(false)
let modelAddForm = ref<ModelAddForm>({
    description: '',
    label: [],
    name: '',
    note: '',
    picture: '',
    typeId: 'RVC',
    fileUrl: ''
})
let process = ref<{
    current: number
}>({
    current: 1
})
let options = ref<{
    value: string,
    label: string
}[]>([])
let submitDisabled = ref(false)
let isEdit = ref(false)
if (router.currentRoute.value.path == '/editModel')
    isEdit.value = true
else
    modelAddForm.value.description = ' '
if (isEdit.value) {
    getModelDetails(router.currentRoute.value.query.id as string).then((res: any) => {
        if (res.code == 200) {
            modelAddForm.value = res.data
        } else {
            message.error(res.msg)
        }
    })
}
getModelLabel({
    page: '1',
    limit: '20'
}).then((res: any) => {
    if (res.code == 200) {
        let data: any = res.data
        for (let i = 0; i < data.length; i++) {
            options.value.push({
                value: data[i].id,
                label: data[i].name
            })
        }
    } else {
        message.error(res.msg)
    }
})
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
}
const getContent = function (html: string) {
    modelAddForm.value.description = html
}
const nextStep = function () {
    if (process.value.current == 1) {
        if (modelAddForm.value.name != '' && modelAddForm.value.typeId != '' && modelAddForm.value.description != '' && modelAddForm.value.label.length != 0 && modelAddForm.value.note != '') {
            process.value.current = process.value.current + 1
        } else {
            message.warning('请填写以上信息')
        }
    } else if (process.value.current == 2) {
        process.value.current = process.value.current + 1
    }

}
const lastStep = function () {
    if (process.value.current != 0) {
        process.value.current = process.value.current - 1
    }
}
// const handleModelFileSuccess = function () { };
// const beforeModelFileUpload = function (rawFile: File) {
//     modelFiles.push(rawFile)
//     if (modelFiles.length == 2)
//         // uploadModelFile()
//     return false
// };

const handleCoverSuccess = function () { };
const beforeCoverUpload = function (rawFile: File) {
    uploadModelLoading.value = true
    uploadImages(rawFile).then((res: any) => {
        if (res.code == 200) {
            const reader = new FileReader()
            reader.readAsDataURL(rawFile);
            reader.onload = function () {
                coverBase64.value = String(reader.result)
            }
            modelAddForm.value.picture = res.data.url
            message.success('封面上传成功')
        } else {
            message.error(res.msg)
        }
        uploadModelLoading.value = false
    })
    return false
};
// const uploadModelRef = ref<UploadInstance>()
// const handleUpload = function () {
//     modelFiles = []
//     uploadModelRef?.value?.submit()
// }
const getValue = function (value: string[]) {
    console.log(value);

    modelAddForm.value.label = []
    for (let i = 0; i < value.length; i++) {
        modelAddForm.value.label.push(value[i])
    }

}
const uploadFinish = function () {
    return modelAddForm.value.fileUrl != ""
    // return modelAddForm.value.fileId.length == 2 && modelAddForm.value.audioId != ""
}
const handleExceed = function () {
    message.warning('超出数量上限')
}
const beforeRemove = function () {
    return true
}
const submit = function () {
    if (submitDisabled.value) return
    submitDisabled.value = true
    modelAddForm.value.typeId = "1734224118915072002"
    modelAdd(modelAddForm.value).then((res: any) => {
        if (res.code == 200) {
            console.log(modelAddForm);
            message.success('发布成功')
            router.back()
        } else {
            submitDisabled.value = false
            message.error(res.message)
        }
    })
}
// let modelFiles: any = []
</script>
<template>
    <div class="scroll-container">
        <div class="new-model">
            <div class="new-model__title">
                上传模型
            </div>
            <div class="new-model__process">
                <div class="new-model__process__ball"
                    :style="{ border: process.current == 1 ? 'rgba(25,113,194) 2px solid' : '', backgroundColor: process.current > 1 ? 'rgba(25,113,194)' : '' }">
                    1</div>
                <div class="new-model__process__desc">
                    模型信息
                </div>
                <div class="new-model__process__dash"></div>
                <div class="new-model__process__ball"
                    :style="{ border: process.current == 2 ? 'rgba(25,113,194) 2px solid' : '', backgroundColor: process.current > 2 ? 'rgba(25,113,194)' : '' }">
                    2</div>
                <div class="new-model__process__desc">
                    上传文件
                </div>
                <div class="new-model__process__dash"></div>
                <div class="new-model__process__ball"
                    :style="{ border: process.current == 3 ? 'rgba(25,113,194) 2px solid' : '', backgroundColor: process.current > 3 ? 'rgba(25,113,194)' : '' }">
                    3</div>
                <div class="new-model__process__desc">
                    提交
                </div>
            </div>
            <div v-show="process.current == 1">
                <div class="new-model__title">
                    模型信息
                </div>
                <span class="label">模型名称<span class="important">*</span></span>
                <input class="input" placeholder="模型名称" v-model="modelAddForm.name">

                <span class="label">模型类型<span class="important">*</span></span>
                <div class="select">
                    <div tabindex="-1" class="type-selecter"
                        :style="{ border: typeSelectvisibility ? 'rgba(24,100,171) 1px solid' : '' }"
                        :class="clickType ? 'dither-animation' : ''" @click="handleClickSort" @blur="handleBlur">
                        <div class="horizontal-center" style="width:100%;display: flex;">
                            <span style="position: relative;left:0%;line-height: 35px;width:97%;text-align: left;">{{
                                typeOptions[currentTypeIndex] }}</span>
                            <span style="position: relative;right:0%;">
                                <img width="14" height="14" class="vertical-center" style="transition: all 0.2s;"
                                    :class="typeSelectvisibility ? 'revolve-animation' : ''" src="/icon/arrow-down.svg">
                            </span>
                        </div>

                    </div>
                    <div class="type-select" v-show="typeSelectvisibility">
                        <div class="type-select__item" v-for="(tag, index) in typeOptions" :key="index"
                            @click="currentTypeIndex = index; typeSelectvisibility = false; modelAddForm.typeId = tag"
                            :style="{ backgroundColor: currentTypeIndex == index ? 'rgba(24,100,171)' : '' }">
                            {{ tag }}
                        </div>
                    </div>

                </div>
                <span class="label">标签<span class="important">*</span></span>
                <TagSelectComponent :options="options" :get-value="getValue" :value="modelAddForm.label">
                </TagSelectComponent>
                <span class="label" style="margin-top: 20px;">介绍<span class="important">*</span></span>
                <div style="margin-bottom: 50px;">
                    <ModelEditorComponent :get-content="getContent" v-if="!isEdit && modelAddForm.description"
                        :editorContent="modelAddForm.description"></ModelEditorComponent>
                </div>

                <span class="label">注意事项<span class="important">*</span></span>
                <input class="input" placeholder="注意事项" v-model="modelAddForm.note">
                <div class="button-group">
                    <div class="button-group__item" @click="lastStep"
                        :style="{ visibility: process.current > 1 ? 'visible' : 'hidden' }">
                        上一步
                    </div>
                    <div class="button-group__item" @click="nextStep">
                        下一步
                    </div>
                </div>
            </div>
            <div v-show="process.current >= 2">
                <span class="label">模型下载链接<span class="important">*</span></span>
                <input class="input" placeholder="模型下载链接" v-model="modelAddForm.fileUrl">
                <!-- <div class="new-model__title">
                上传模型文件
            </div>
            <el-upload ref="uploadModelRef" class="upload-demo" drag :auto-upload="true" :limit="2"
                :on-success="handleModelFileSuccess" :before-upload="beforeModelFileUpload" :before-remove="beforeRemove"
                multiple>
                <div class="loadding" v-if="uploadModelLoading"></div>

                <div class="success" v-else-if="modelAddForm.fileId.length == 2">✓</div>
                <div class="error" v-else>×</div>
                <div class="el-upload__text">
                    将文件拖拽到此处或点击上传
                </div>
                <div class="el-upload__text">
                    提示：上传.pth与.index文件
                </div>
            </el-upload>

            <div class="new-model__title">
                上传试听音频
            </div>
            <el-upload ref="uploadAudioRef" class="upload-demo" drag :auto-upload="true" :limit="1"
                :on-exceed="handleExceed" :on-success="handleAudioFileSuccess" :before-upload="beforeAudioFileUpload"
                :before-remove="beforeRemove" multiple>
                <div class="loadding" v-if="uploadAudioLoading"></div>
                <div class="success" v-else-if="modelAddForm.picture">✓</div>
                <div class="error" v-else>×</div>
                <div class="el-upload__text">
                    将文件拖拽到此处或点击上传
                </div>
                <div class="el-upload__text">
                    最多可上传1个文件
                </div>
            </el-upload> -->

                <el-upload ref="uploadCoverRef" class="upload-demo" drag :auto-upload="true" :limit="1"
                    :on-exceed="handleExceed" :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload"
                    :before-remove="beforeRemove" multiple>
                    <div class="loadding" v-if="uploadCoverLoading"></div>
                    <img :src="coverBase64" style="width: 100%;">
                    <div class="el-upload__text">
                        将文件拖拽到此处或点击上传
                    </div>
                    <div class="el-upload__text">
                        最多可上传1个封面
                    </div>
                </el-upload>
                <div class="button-group">
                    <div class="button-group__item" @click="lastStep"
                        :style="{ visibility: process.current > 1 ? 'visible' : 'hidden' }">
                        上一步
                    </div>
                    <div class="button-group__item" v-if="uploadFinish()" @click="nextStep">
                        下一步
                    </div>
                </div>
            </div>
            <div v-show="process.current == 3">
                <div style="width: 60%;margin-top: 20px;position: relative;left:50%;transform: translate(-50%);">
                    <div class="button-group__item" style="text-align: center;" @click="submit">
                        提交
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
:deep(.upload-demo *) {
    background-color: transparent;
}

.loadding {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height: 34px;
    width: 34px;
    border-radius: 17px;
    background-color: rgba(44, 46, 51);
    font-size: 20px;
    line-height: 36px;
    color: white;
    font-weight: 700;
    border-top: rgba(25, 113, 194) 1px solid;
    margin-bottom: 20px;
    animation: roll 1s linear infinite;
}

@keyframes roll {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.success {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height: 36px;
    width: 36px;
    border-radius: 18px;
    background-color: rgba(103, 194, 58);
    font-size: 20px;
    line-height: 36px;
    color: white;
    font-weight: 700;
    margin-bottom: 20px;
}

.error {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height: 36px;
    width: 36px;
    border-radius: 18px;
    background-color: rgba(44, 46, 51);
    font-size: 20px;
    line-height: 36px;
    color: white;
    font-weight: 700;
    margin-bottom: 20px;
}

.scroll-container {
    position: relative;
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    overflow: scroll;
    margin: 30px 0;
}

.new-model {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 40%;
    /* height: 100%; */
    text-align: left;
    margin: 30px 0;
    /* height: 90vh; */
    /* overflow: scroll; */
}

.new-model__title {
    position: relative;
    height: 70px;
    width: 100%;
    line-height: 70px;
    font-weight: 700;
    font-size: 30px;
    color: rgba(193, 194, 197);
}

.new-model__process {
    position: relative;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.new-model__process__ball {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 36px;
    width: 36px;
    border-radius: 18px;
    background-color: rgba(44, 46, 51);
    text-align: center;
    color: rgba(193, 194, 197);
    line-height: 36px;
}

.new-model__process__desc {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    color: rgba(193, 194, 197);
}

.new-model__process__dash {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    width: 30px;
    height: 2px;
    background-color: rgba(44, 46, 51);
    margin-right: 10px;

}

.label {
    font-size: 14px;
    display: block;
    width: 100%;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 700;
    text-align: left;
    margin-bottom: 5px;
}

.important {
    color: rgba(224, 49, 49);
}

.input {
    position: relative;
    display: block;
    width: 100%;
    float: left;
    height: 35px;
    border: rgba(55, 58, 64) 1px solid;
    outline: none;
    border-radius: 5px;
    background-color: rgba(37, 38, 43);
    color: rgba(255, 255, 255, 0.7);
    padding-left: 10px;
    margin-bottom: 20px;
}

.type-selecter {
    width: calc(100% - 20px);
    height: 35px;
    padding: 0 15px;
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
    top: 45px;
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
    height: 35px;
    line-height: 35px;
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
    width: 100%;
    text-align: left;
    display: block;
    margin-bottom: 20px;
}

.revolve-animation {
    transform: rotateZ(180deg);
    transform-origin: 6px 2.5px;
}

.button-group {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.button-group__item {
    position: relative;
    height: 35px;
    padding: 0 20px;
    background-color: rgba(25, 113, 194);
    top: 50%;
    transform: translate(0, -50%);
    font-size: 14px;
    color: white;
    line-height: 35px;
    border-radius: 5px;
    cursor: pointer;
}

.button-group__item:hover {
    background-color: rgba(24, 100, 171);
}
</style>