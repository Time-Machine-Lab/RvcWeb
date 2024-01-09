<!-- eslint-disable @typescript-eslint/no-var-requires -->
<!--
 * @Author: Dhx
 * @Date: 2024-01-09 20:53:12
 * @Description: 
 * @FilePath: \RvcWeb\src\components\common\recordingComponnent.vue
-->
<script lang="ts" setup>
import { message } from '@/utils/message';
import { ref } from 'vue';
const lamejs = require('lamejs');
let props = defineProps<{
    getUrl: (url:string)=>void
}>()
let file = ref<File>()
let dialogVisible = ref(false)
let recordedChunks = ref<any[]>([]);
let mediaRecorder: MediaRecorder;
let startRecord = ref(false)
let src = ref<string>('')
const start = function startRecording() {
    startRecord.value = true
    recordedChunks.value = [];
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event: any) => {
                if (event.data.size > 0) {
                    recordedChunks.value.push(event.data);
                }
            };
            mediaRecorder.onstop = () => {
                const encoder = new lamejs.Mp3Encoder(1, 44100, 128);
                const buffer = mergeBuffers(recordedChunks.value);
                const mp3Data = encoder.encodeBuffer(buffer);

                const audioBlob = new Blob(mp3Data, { type: 'audio/mp3' });
                file.value = new File([audioBlob],'file.mp3',{ type: 'audio/mp3' })
                src.value = URL.createObjectURL(audioBlob);
                startRecord.value = false
            };
            mediaRecorder.start();
        })
        .catch(error => {
            console.error('获取用户媒体设备失败:', error);
            message.error('获取用户媒体设备失败')
        });
}
const stop = function () {
    mediaRecorder.stop();
    startRecord.value = false
}
const mergeBuffers = function(buffers:any[]) {
      let offset = 0;
      const length = buffers.reduce((acc, buffer) => acc + buffer.length, 0);
      const result = new Float32Array(length);

      buffers.forEach(buffer => {
        result.set(buffer, offset);
        offset += buffer.length;
      });

      return result;
    }
const send = function(){
    props.getUrl('https://media-1318544158.cos.ap-nanjing.myqcloud.com/merry%20christmas.mp3')
}

</script>
<template>
    <div class="recordButton" @click="dialogVisible = true">
        <img class="vhcenter" src="/icon/record.svg">
    </div>
    <el-dialog v-model="dialogVisible" title="发送语音" width="30%" style="background-color: rgba(26,27,30);"
        :append-to-body="true">
        <audioPlayerComponent :src="src"></audioPlayerComponent>
        <template #footer>
            <div class="footer">
                <div class="control-button" v-if="!startRecord" @click="start">
                    <div class="control-buuton__img">
                        <img width="16" height="16" class="vertical-center" src="/icon/record.svg">
                    </div>
                    <div class="control-buuton__text">
                        <span>开始录制</span>
                    </div>
                </div>
                <div class="control-button" v-else @click="stop">
                    <div class="control-buuton__img">
                        <img width="30" height="30" class="vertical-center" src="/icon/stop.svg">
                    </div>
                    <div class="control-buuton__text">
                        <span>结束</span>
                    </div>
                </div>
                <div class="send-button" @click="send">
                    发送
                </div>
            </div>

        </template>
    </el-dialog>
</template>
<style scoped>
.recordButton {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.control-button {
    position: relative;
    height: 40px;
    width: 90px;
    border-radius: 5px;
    top: 50%;
    background-color: rgba(102,102,102,0.2);
    transform: translate(0, -50%);
    display: flex;
    justify-content: center;
    cursor: pointer;
}
.control-button:hover{
    background-color: rgba(65,68,74);
}
.control-buuton__img{
    position: relative;
}
.control-buuton__text{
    position:relative;
    font-size: 12px;
    color: white;
    line-height: 40px;
}
.footer {
    position: relative;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
}
.send-button{
    position:relative;
    top: 50%;
    transform: translate(0,-50%);
    width: 80px;
    height: 40px;
    border-radius: 5px;
    font-size: 14px;
    color: white;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background-color: rgba(25,113,194);
}
.send-button:hover{
    background-color: rgba(24,100,171);
}
</style>