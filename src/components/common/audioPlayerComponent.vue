<!--
 * @Author: Dhx
 * @Date: 2024-01-09 23:24:04
 * @Description: 
 * @FilePath: \RvcWeb\src\components\common\audioPlayerComponent.vue
-->
<script lang="ts">
export default {
    data() {
        return {
            isPlaying: false,
            currentTime: 0,
            duration: 0,
        };
    },
    computed: {
        audioPlayer() {
            return this.$refs.audioPlayer as any;
        },
    },
    props: {
        src: {
            type: String
        }
    },
    methods: {
        togglePlayPause() {
            if (this.isPlaying) {
                this.audioPlayer.pause();
            } else {
                this.audioPlayer.play();
            }
            this.isPlaying = !this.isPlaying;
        },
        updateProgress(e:any) {
            var target = e.target
            if (!Number.isFinite(target.duration)) {
                target.currentTime = Number.MAX_SAFE_INTEGER;
                target.currentTime = 0;

            } else {
                this.currentTime = target.currentTime;
                this.duration = target.duration
            }
        },
        seek() {
            this.audioPlayer.currentTime = this.currentTime;
        },
        audioEnded() {
            this.isPlaying = false;
            this.currentTime = 0;
        },
        formatTime(seconds:number) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        },
    },
    mounted() {
        this.audioPlayer.addEventListener('timeupdate', this.updateProgress);
        this.audioPlayer.addEventListener('loadedmetadata', this.updateProgress);
    },
    beforeUnmount() {
        this.audioPlayer.removeEventListener('timeupdate', this.updateProgress);
    },
};
</script>
  
<template>
    <div class="audio-player">
        <audio ref="audioPlayer" :src="src" @timeupdate="updateProgress" @ended="audioEnded"></audio>
        <div class="controls">
            <div class="controls-button" @click="togglePlayPause">
                <img width="24" height="24" :src="isPlaying ? '/icon/pause.svg' : '/icon/play-fill.svg'">
            </div>
            <!-- <input type="range" v-model="currentTime" :max="duration" @input="seek"> -->
            <span style="line-height: 28px;">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        </div>
    </div>
</template>
  

<style scoped>
.audio-player {
    position: relative;
    width: 80%;
}

.controls {
    display: flex;
    justify-content: left;
    width: 100%;
}

button {
    margin-right: 10px;
}

.controls-button {
    position: relative;
    cursor: pointer;
}
</style>
  