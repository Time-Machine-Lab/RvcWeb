<!--
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\pages\favoritePosts.vue
-->
<script lang="ts" setup>
import postCardComponent from '@/components/modelCommunication/postCardComponentA.vue'
import { getPosts } from '@/api/post/postApi'
import { PostVo } from '@/api/post/postType'
import { ref } from 'vue'
let scrollDisabled = ref<boolean>(false)
const posts = ref<PostVo[]>([])
const scroll = function () {
  scrollDisabled.value = true
  getPosts(posts.value.length, posts.value.length + 5).then((res: { data: string | any[]; }) => {
    for (let i = 0; i < res.data.length; i++) {
      posts.value.push(res.data[i])
    }
    scrollDisabled.value = false
  })
}

</script>
<template>
  <div class="post-list infinite-list" v-infinite-scroll="scroll" :infinite-scroll-disabled="scrollDisabled" infinite-scroll-immediate="ture"
    infinite-scroll-distance="30" style="overflow: auto;">
      <postCardComponent v-for="post in posts" :key="post.post_id" :post="post"></postCardComponent>
</div>
</template>


<style scoped>
.post-list{
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.posts-list__card{
  
}
</style>
@/api/post/postType