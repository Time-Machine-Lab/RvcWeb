<!--
 * @Author: Dhx
 * @Date: 2024-02-27 13:46:28
 * @Description: 
 * @FilePath: \RvcWeb\src\view\chatRoom\chatRoomView.vue
-->
<script setup lang="ts">
import roomView from '@/view/chatRoom/pages/roomView.vue';
import sideBar from '@/view/chatRoom/pages/sideBar.vue';
</script>
<template>
    <div class="chatRoomView"><div class="chatRoomView__sideBar">
            <sideBar></sideBar>
        </div>
        <div class="chatRoomView__room">
            <roomView></roomView>
        </div>
        
    </div>
</template>
<style scoped>
@import "@/view/chatRoom/style/chatRoomIndex.css";
</style>