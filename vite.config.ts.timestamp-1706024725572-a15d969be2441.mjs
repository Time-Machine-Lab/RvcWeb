// vite.config.ts
import { defineConfig } from "file:///C:/Users/admin/Desktop/rvc/RvcWeb/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/admin/Desktop/rvc/RvcWeb/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///C:/Users/admin/Desktop/rvc/RvcWeb/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/admin/Desktop/rvc/RvcWeb/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/Users/admin/Desktop/rvc/RvcWeb/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\Users\\admin\\Desktop\\rvc\\RvcWeb";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"]
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
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
      //   target: "http://1.94.28.8:10000/",
      //   changeOrigin: true,
      // },
      // '/communication':{
      //   target: "http://117.21.200.55:10000/",
      //   changeOrigin: true
      // },
      // '/model':{
      //   target: "http://117.21.200.55:10000/",
      //   changeOrigin: true
      // },
      // '/user':{
      //   target: "http://117.21.200.55:10000/",
      //   changeOrigin: true
      // },
      // '/captcha':{
      //   target: "http://117.21.200.55:10000/",
      //   changeOrigin: true
      // },
      "/rvcApi": {
        target: "http://117.21.200.55:10000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rvcApi/, "/")
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxEZXNrdG9wXFxcXHJ2Y1xcXFxSdmNXZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFkbWluXFxcXERlc2t0b3BcXFxccnZjXFxcXFJ2Y1dlYlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYWRtaW4vRGVza3RvcC9ydmMvUnZjV2ViL3ZpdGUuY29uZmlnLnRzXCI7LypcclxuICogQEF1dGhvcjogRGh4XHJcbiAqIEBEYXRlOiAyMDIzLTExLTMwIDE0OjUwOjUxXHJcbiAqIEBEZXNjcmlwdGlvbjpcclxuICogQEZpbGVQYXRoOiBcXFJ2Y1dlYlxcdml0ZS5jb25maWcudHNcclxuICovXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xyXG5pbXBvcnQgdnVldGlmeSBmcm9tIFwidml0ZS1wbHVnaW4tdnVldGlmeVwiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBpbXBvcnRzOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCIsIFwicGluaWFcIl0sXHJcbiAgICB9KSxcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcclxuICAgIHBvcnQ6IDgwOTAsXHJcbiAgICBwcm94eToge1xyXG4gICAgICAvLyBcIi9tMVwiOiB7XHJcbiAgICAgIC8vICAgdGFyZ2V0OiBcImh0dHBzOi8vbW9jay5hcGlmb3guY29tL1wiLFxyXG4gICAgICAvLyAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgLy8gfSxcclxuICAgICAgLy8gXCIvZmVlZGJhY2tcIjoge1xyXG4gICAgICAvLyAgIHRhcmdldDogXCJodHRwOi8vMS45NC4yOC44Ojk0MDAvXCIsXHJcbiAgICAgIC8vICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyBcIi93ZWJcIjoge1xyXG4gICAgICAvLyAgIHRhcmdldDogXCJodHRwOi8vMS45NC4yOC44OjEwMDAwL1wiLFxyXG4gICAgICAvLyAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgLy8gfSxcclxuICAgICAgLy8gJy9jb21tdW5pY2F0aW9uJzp7XHJcbiAgICAgIC8vICAgdGFyZ2V0OiBcImh0dHA6Ly8xMTcuMjEuMjAwLjU1OjEwMDAwL1wiLFxyXG4gICAgICAvLyAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyAnL21vZGVsJzp7XHJcbiAgICAgIC8vICAgdGFyZ2V0OiBcImh0dHA6Ly8xMTcuMjEuMjAwLjU1OjEwMDAwL1wiLFxyXG4gICAgICAvLyAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyAnL3VzZXInOntcclxuICAgICAgLy8gICB0YXJnZXQ6IFwiaHR0cDovLzExNy4yMS4yMDAuNTU6MTAwMDAvXCIsXHJcbiAgICAgIC8vICAgY2hhbmdlT3JpZ2luOiB0cnVlXHJcbiAgICAgIC8vIH0sXHJcbiAgICAgIC8vICcvY2FwdGNoYSc6e1xyXG4gICAgICAvLyAgIHRhcmdldDogXCJodHRwOi8vMTE3LjIxLjIwMC41NToxMDAwMC9cIixcclxuICAgICAgLy8gICBjaGFuZ2VPcmlnaW46IHRydWVcclxuICAgICAgLy8gfSxcclxuICAgICAgXCIvcnZjQXBpXCI6e1xyXG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vMTE3LjIxLjIwMC41NToxMDAwMC9cIixcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL3J2Y0FwaS8sIFwiL1wiKSxcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFNQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFFcEMsU0FBUyxlQUFlO0FBWnhCLElBQU0sbUNBQW1DO0FBY3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLGNBQWMsT0FBTztBQUFBLElBQ3hDLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQTZCTCxXQUFVO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsYUFBYSxHQUFHO0FBQUEsTUFDbEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
