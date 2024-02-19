<script lang="ts" setup>
import { UserInfoVO } from '@/api/user/userTypes';
import router from '@/router';
import "@/components/user/style/userCard.css"
const props = defineProps<{
    user: UserInfoVO
}>()
const routerGo = function () {
    if (props.user.uid) {
        router.push('/user?id=' + props.user.uid)
    }
}
</script>
<template>
    <div class="user-card horizontal-center">
        <div class="user-card__info vertical-center">
            <div @click="routerGo" class="user-card__info__avatar"
                :style="{ backgroundImage: 'url(\'' + props.user.avatar + '\')' }">

            </div>
            <div class="user-card__info__text">
                <div class="user-card__info__text__username" @click="routerGo">
                    {{ props.user.nickname }}
                </div>
                <div class="user-card__info__text__creatAt">
                    {{ props.user.description }}
                </div>
            </div>
        </div>
        <div class="user-card__button  vertical-center">
            <!-- <span class="user-card__button__item follow vertical-center" v-show="props.user.isfollow!=null">
                关注
            </span> -->
        </div>
    </div>
</template>
