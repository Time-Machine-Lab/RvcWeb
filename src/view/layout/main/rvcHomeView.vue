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
        <div class="rvc-home__view">
            <RouterView v-slot="{ Component }">
                <KeepAlive :include="['post-list','model-list']">
                    <component :is="Component"></component>
                </KeepAlive>
            </RouterView>
            <!-- <RouterView v-if="!$route.meta.KeepAlive"></RouterView> -->
        </div>
    </div>
</template>
<style scoped>
.rvc-home {
    position: relative;
    width: 90%;
    height: calc(100%);
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
    height: 100%;
}
</style>