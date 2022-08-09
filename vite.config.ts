import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import printHttpServer from './vite-plugin/vite-plugin-printHttpServerAfterHMR'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), printHttpServer()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    open: true
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: 'import { h } from "vue";'
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'naive-ui': ['naive-ui'],
          three: ['three'],
          gojs: ['gojs']
        }
      }
    }
  }
})
