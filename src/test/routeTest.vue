<template>
  <div>
    <p v-text="test">
    </p>
    {{ a }}
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'

const a = ref(1)
let test = ref('wdwdw')
</script>
  