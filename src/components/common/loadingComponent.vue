<script setup lang="ts">
let props = defineProps<{
    diameter:number,
    loading:boolean
}>()
</script>
<template>
    <div class="loading" v-if="props.loading" :style="{width:props.diameter+'px',height:props.diameter+'px',borderRadius:props.diameter/2+'px'}"></div>
</template>
<style scoped>
.loading {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background-color: rgba(44, 46, 51);
    font-size: 20px;
    line-height: 60px;
    color: white;
    font-weight: 700;
    /* border: transparent 2px solid; */
    /* border-top: rgba(25, 113, 194) 1px solid; */
    border-left: rgba(25, 113, 194) 1px solid;
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
</style>