<template>
  <div>
    <p @click="listen">
      test
    </p>
    {{ a }}
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { message, NotificationType } from '@/utils/message'
const a = ref(1)
function listen() {
  message.notify('title', '测试内容', NotificationType.SUCCESS)
}
</script>
  