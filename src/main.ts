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

import { inject } from '@vercel/analytics';
inject();

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount("#app");
