<template>
  <div class="tool-table">
    <div class="container">
      <div class="box" v-for="(tool, index) in tools" :key="index">
        <div class="img"><img :src="tool.img" alt="" /></div>
        <p>{{ tool.tool }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolTable.vue',
  props: {
    tools: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
@import "@/style/scss/intro/_tooltable.scss";
</style>
