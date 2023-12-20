import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 8090,
    proxy: {
      // "/m1": {
      //   target: "https://mock.apifox.com/",
      //   changeOrigin: true,
      // },
      // "/feedback": {
      //   target: "http://1.94.28.8:9400/",
      //   changeOrigin: true,
      // },
      // "/web": {
      //   target: "http://1.94.28.8:9300/",
      //   changeOrigin: true,
      // },
      // '/communication':{
      //   target: "http://1.94.28.8:9200/",
      //   changeOrigin: true
      // },
      // '/model':{
      //   target: "http://1.94.28.8:9100/",
      //   changeOrigin: true
      // },
      // '/user':{
      //   target: "http://1.94.28.8:9000/",
      //   changeOrigin: true
      // },
      // '/captcha':{
      //   target: "http://1.94.28.8:8080/",
      //   changeOrigin: true
      // },
      "/rvcApi":{
        target: "http://117.21.200.55:10010/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rvcApi/, "/"),
      }
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
