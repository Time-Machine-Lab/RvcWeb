import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";

import { createPinia } from "pinia";
const pinia = createPinia();
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style.css";
import "./style/scss/index.scss"
import '@mdi/font/css/materialdesignicons.css'
// import vueCustomElement from 'vue-custom-element';

import { inject } from '@vercel/analytics';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import vuetifyPictureComponentVue from "./components/common/vuetifyPictureComponent.vue";
const vuetify = createVuetify({
  components,
  directives,
})
inject();

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.use(vuetify);
// app.use(vueCustomElement);
app.component('vuetifyPictureComponent',vuetifyPictureComponentVue)
app.mount("#app");
