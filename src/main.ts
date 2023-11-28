import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
const pinia = createPinia()
import axios from 'axios'
// import myAxios from './axios.ts'

const app = createApp(App);
// 全局ctx(this) 上挂载 $axios
app.config.globalProperties.$api = axios
app.provide('axios', axios);
// app.provide('myAxios', myAxios);
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
