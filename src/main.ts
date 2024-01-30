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
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件

import { inject } from '@vercel/analytics';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
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
app.use(VueLazyload, {
  preLoad: 1,
  error:'/logo/rvc.png',
  loading: '/icon/picture.svg',
  attempt: 2,
})
// app.use(vueCustomElement);
app.mount("#app");
