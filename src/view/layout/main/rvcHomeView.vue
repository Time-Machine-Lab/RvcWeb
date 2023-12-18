<!--
 * @Author: Dhx
 * @Date: 2023-12-18 16:02:07
 * @Description: 
 * @FilePath: \RvcWeb\src\view\layout\main\rvcHomeView.vue
-->
<script lang="ts" setup>
</script>
<template>
    <div class="rvc-home">
        <div class="rvc-home__link">
            <div class="rvc-home__link__item" :style="{backgroundColor:$router.currentRoute.value.path == '/rvc/posts'?'rgba(255,255,255,0.1)':'transparent'}">
                <router-link to="/rvc/posts"><img width="14" height="14" src="/icon/post.svg" style="margin-right:10px"><span>贴子</span></router-link>
            </div>
            <div class="rvc-home__link__item">
                <router-link to="/rvc/models"><img width="14" height="14" src="/icon/model.svg" style="margin-right:10px"><span>模型</span></router-link>
            </div>

        </div>
        <div class="rvc-home__view">
            <RouterView></RouterView>
        </div>
    </div>
</template>
<style scoped>
.rvc-home {
    position: relative;
    width: 80%;
    height: 100%;
    left: 50%;
    transform: translate(-50%);
}

.rvc-home__link {
    width: 100%;
    height: 70px;
    display: flex;
}

.rvc-home__link__item {
    position: relative;
    top: 50%;
    transform: translate(0,-50%);
    height: 40px;
    line-height:40px;
    width: 80px;
    padding: 0 3px;
    margin-left:5px;
    cursor:pointer;
    border-radius:5px;
}
.rvc-home__link__item span{
    color: rgba(255,255,255,0.7);
    font-size: 14px;
    text-align: center;
    text-decoration:none;
    font-family: '黑体'
}
.rvc-home__link__item span:hover{
    color: rgba(255,255,255,0.9);
}

.rvc-home__view {
    width: 100%;
    height: calc(100% - 100px);
}
</style>