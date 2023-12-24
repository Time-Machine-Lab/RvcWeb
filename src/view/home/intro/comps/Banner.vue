<template>
  <div>
    <div class="banner1-component">
      <v-container>
        <v-row class="banner-content justify-center">
          <v-col cols="12" md="7" lg="6" class="flex items-center">
            <div class="text-left">
              <v-chip size="small" class="bg-dark font-white">
                <span style="color:white"> 版本信息 {{ webInfo?.rvcVersion }}</span>

              </v-chip>
              <h2
                class="banner1-title font-bold text-uppercase white--text"
              >
                {{ webInfo?.rvcVersion }}【RVC】已经到来！
              </h2>
              <p
                class="white--text op-8 font-normal banner-description"
                v-html="webInfo?.rvcDescription"
              ></p>
              <div class="mt-16 pt-2">
                <v-btn
                  nuxt
                  large
                  rounded
                  target="_blank"
                  href="https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI"
                  class="btn-custom-md"
                  depressed
                  color="white"
                  elevation="0"
                >
                  了解更多
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" lg="5"> </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  webInfo: {
    id: number;
    webName: string;
    webDescription: string;
    officialConcat: string;
    rvcVersion: string;
    rvcDescription: string;
  };
}>()
</script>

<style scoped>
@import "@/style/scss/intro/_banner.scss";
</style>
