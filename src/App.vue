<script setup lang="ts">
import { getUserInfoById } from '@/api/user/userApi.js'
import { useUserStore } from '@/view/user/info/userStore.js'
import { Profile } from '@/view/user/info/userTypes'

const userStore = useUserStore()

if(userStore.getProfile.id == undefined){
  getUserInfoById('1').then((res: { data: Profile; }) => {
  userStore.setProfile(<Profile>res.data)  
})
}

</script>

<template>
    <RouterView :key="($router.currentRoute.value.query.id as string)"/>
</template>
<style scoped>

</style>
