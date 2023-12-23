<template>
  <div>
    <div class="portfolio-component mini-spacer">
      <v-container>
        <v-row class="justify-center">
          <v-col cols="12" sm="10" md="9" lg="7">
            <div class="text-center">
              <h2 class="section-title font-medium white--text">社区功能</h2>
              <p class="white--text">
                在RVC社区，你不仅可以遇到与你志同道合的小伙伴，还能体验以下功能....
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row class="justify-center mt-13">
          <ToolTable :tools="props.tools" />
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script setup lang="ts">
import ToolTable from "@/view/home/intro/comps/ToolTable.vue";

const props = defineProps({
  tools: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/scss/intro/_portfolio.scss";
</style>
