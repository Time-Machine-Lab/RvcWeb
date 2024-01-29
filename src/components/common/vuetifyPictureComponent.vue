<script lang="ts" setup>
const props = defineProps<{
    src:string;
    width:string;
}>()
</script>
<template>
    <v-img :src="props.src"
        :lazy-src="props.src" :width="props.width"
        class="bg-grey-lighten-2">
        <template v-slot:placeholder="">
            <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular color="grey-lighten-5"></v-progress-circular>
            </v-row>
        </template>
    </v-img>
</template>
<style scoped></style>