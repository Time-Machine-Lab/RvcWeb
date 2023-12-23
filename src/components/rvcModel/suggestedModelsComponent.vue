<script setup lang="ts">
</script>
<template>
    <div class="suggested-models">
        <div class="suggested-models__title">
            推荐模型
        </div>
        <div class="suggested-models__content">
            
        </div>
    </div>
</template>
<style scoped>
.suggested-models {
    width: 100%;
    height: 400px;
    background-color: rgba(37, 38, 43);
}

.suggested-models__title {
    position: relative;
    width: 75%;
    height: 70px;
    left: 50%;
    transform: translate(-50%);
    color: rgba(193, 194, 197);
    font-size: 30px;
    line-height: 70px;
    text-align: left;
}
.suggested-models__content{
    line-height: 330px;
    color: rgba(193, 194, 197);
    font-size: 50px;

}
</style>