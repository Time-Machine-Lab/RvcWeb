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
        progressBar() {
            return this.$refs.progress_bar as any;
        },
        progressBarFill() {
            return this.$refs.progress_bar_fill as any
        },
        progressBarDrag() {
            return this.$refs.progress_bar_drag as any
        }
    },
    props: {
        src: {
            type: String
        }
    },
    methods: {
        togglePlayPause() {
            if ((this.$refs.audioPlayer as any).src == 'http://localhost:8090/') return
            if (this.isPlaying) {
                this.audioPlayer.pause();
            } else {
                this.audioPlayer.play();
            }
            this.isPlaying = !this.isPlaying;
        },
        updateProgress(e: any) {
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
        formatTime(seconds: number) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        },
        init() {
            // var drag = false
            // this.progressBarDrag.addEventListener('mousedown', () => {
            //     drag = true
            // })
            this.progressBar.addEventListener('mousedown', (ev: any) => {
                // drag = true
                let x = ev.offsetX
                this.progressBarDrag.style.left = x + 'px'
                this.progressBarFill.style.width = x + 'px'
                var newTime = x / this.progressBar.getBoundingClientRect().width * this.duration
                this.currentTime = newTime
                this.seek()
            })
            // this.progressBarDrag.addEventListener('mousemove', (ev: any) => {
            //     if (drag) {
            //         var x = ev.clientX - this.progressBarFill.getBoundingClientRect().left
            //         if (x !== 0) {
            //             this.progressBarDrag.style.left = x + 'px'
            //             this.progressBarFill.style.width = x + 'px'
            //             var newTime = x / 300 * this.duration
            //             this.currentTime = newTime
            //             this.seek()
            //         }
            //     }
            // })
            // this.audioPlayer.addEventListener('mouseleave', () => {
            //     drag = false
            //     this.seek()
            // })
            // this.audioPlayer.addEventListener('mouseup', () => {
            //     drag = false
            //     this.seek()
            // })
        },
        updateProgressBar() {
            var percent = (this.currentTime / this.duration) * 100
            this.progressBarFill.style.width = percent + '%'
            this.progressBarDrag.style.left = percent + '%'
        }
    },
    mounted() {
        this.audioPlayer.addEventListener('timeupdate', this.updateProgressBar);
        this.audioPlayer.addEventListener('loadedmetadata', this.updateProgress);
        this.init()
    },
    beforeUnmount() {
        this.audioPlayer.removeEventListener('timeupdate', this.updateProgressBar);
    },
};
</script>
  
<template>
    <div class="audio-player">
        <audio ref="audioPlayer" :src="src" @timeupdate="updateProgress" @ended="audioEnded"></audio>
        <div class="controls">
            <div class="controls-button" @click="togglePlayPause">
                <img class="vertical-center" width="20" height="20"
                    :src="isPlaying ? '/icon/pause.svg' : '/icon/play-fill.svg'">
            </div>
            <div class="ProgressBar" ref="progress_bar" @click.stop>
                <div class="ProgressBar-fill" ref="progress_bar_fill"></div>
                <div class="ProgressBar-drag" ref="progress_bar_drag"></div>
            </div>
            <span style="line-height: 28px;font-size: 10px;width: 40%;">{{ formatTime(currentTime) + '/' + formatTime(duration)
            }}</span>
        </div>
    </div>
</template>
  

<style scoped>
.audio-player {
    position: relative;
    width: 200px;
    height: 100%;
}

.controls {
    position: relative;
    display: flex;
    justify-content: left;
    width: 100%;
    height: 100%;
    background-color: rgba(65,68,74);
    border-radius: 5px;
}

.controls-button {
    position: relative;
    cursor: pointer;
    width: 10%;
}

.ProgressBar {
    position: relative;
    top: 14px;
    transform: translate(0, -50%);
    width: 50%;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    margin-right: 5px;

}

.ProgressBar-fill {
    height: 100%;
    width: 0;
    background-color: rgba(255, 255, 255, 0.8);
    pointer-events: none;

}

.ProgressBar-drag {
    position: absolute;
    bottom: 50%;
    transform: translate(0, 50%);
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #fff;
}
</style>
  