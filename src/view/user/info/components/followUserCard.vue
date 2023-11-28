<script lang="ts" setup>
import { otherUser } from '@/view/user/info/userTypes'
const props = defineProps<{
    followUser:otherUser
}>()
</script>
<template>
    <div class="UserCard">
        {{ props.followUser.avatar}}
    </div>
</template>
<style scoped>
.UserCard{
    width: 100%;
    
}
</style>