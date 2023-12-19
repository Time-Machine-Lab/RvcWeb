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
            <div class="rvc-home__link__item" :style="{
                backgroundColor: $router.currentRoute.value.path == '/rvc/posts' ? 'rgba(255,255,255,0.1)' : 'transparent',
                boxShadow: $router.currentRoute.value.path == '/rvc/posts' ? '2px 2px 1px 1px black' : ''
            }">
                <router-link to="/rvc/posts" style="display: block;height: 100%;width: 100%;">
                    <span class="img_back"
                        :style="{ backgroundColor: $router.currentRoute.value.path == '/rvc/posts' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
                        <img width="12" height="12" src="/icon/post.svg" class="vh-center">
                    </span>
                    <span>贴子</span>
                </router-link>
            </div>
            <div class="rvc-home__link__item" :style="{
                backgroundColor: $router.currentRoute.value.path == '/rvc/models' ? 'rgba(255,255,255,0.1)' : 'transparent',
                boxShadow: $router.currentRoute.value.path == '/rvc/models' ? '2px 2px 1px 1px black' : ''
            }">
                <router-link to="/rvc/models" style="display: block;height: 100%;width: 100%;">
                    <span class="img_back"
                        :style="{ backgroundColor: $router.currentRoute.value.path == '/rvc/models' ? 'rgba(0,0,0,0.6)' : 'transparent' }">
                        <img width="12" height="12" src="/icon/model.svg" class="vh-center">
                    </span>

                    <span>模型</span>
                </router-link>
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
    width: 90%;
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
    transform: translate(0, -50%);
    height: 40px;
    line-height: 40px;
    width: 80px;
    padding: 0 8px;
    margin-left: 5px;
    cursor: pointer;
    border-radius: 5px;
}

.rvc-home__link__item span {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    margin-left: 3px;
    line-height: 40px;
    text-align: center;
    text-decoration: none;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.1);
    font-family: '黑体';
}

.rvc-home__link__item span:hover {
    color: rgba(255, 255, 255, 1);
}

.rvc-home__view {
    width: 100%;
    height: calc(100% - 100px);
}

.img_back {
    position: relative;
    display: block;
    top: 50%;
    transform: translate(0, -50%);
    height: 30px;
    width: 30px;
    margin-left: 10px;
    border-radius: 5px;
}
</style>