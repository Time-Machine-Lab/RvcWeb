import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 8090,
    proxy: {
      '/api':{
        target:'http://127.0.0.1:4523',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  },
  resolve: {
    alias: {
        '@': resolve(__dirname, 'src'),
    }
  }
})
