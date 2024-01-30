<script setup lang="ts">
</script>
<template>
    <div class="container">
        <div style="position: relative;height: 50px;width: 60px;">
            <img src="/icon/arrow-up.svg" width="30" height="30" style="position: absolute;top: 50%;left:50%;transform: translate(-50%,-50%);">
        </div>
        <div class="text">
            返回顶部
        </div>
    </div>
</template>
<style scoped>
.container {
    position: relative;
    width: 60px;
    height: 80px;
    border-radius: 5px;
    background-color: rgba(37, 38, 43);
    cursor: pointer;
    user-select: none;
}
.container:hover{
    background-color: rgba(65,68,74);
}
.text{
    height: 30px;
    position: relative;
    line-height: 30px;
    font-size: 12px;
    font-family: 'ZCool';
    color: white;
    text-align: center;
}
</style>