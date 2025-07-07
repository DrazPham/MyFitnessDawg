import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: '.',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5050',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend/src'),
      src: path.resolve(__dirname, 'frontend/src'),
      assets: path.resolve(__dirname, 'frontend/src/assets'),
      components: path.resolve(__dirname, 'frontend/src/components'),
      hooks: path.resolve(__dirname, 'frontend/src/hooks'),
      page: path.resolve(__dirname, 'frontend/src/page'),
      router: path.resolve(__dirname, 'frontend/src/router'),
      fbase: path.resolve(__dirname, 'frontend/src/firebase'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },

})
