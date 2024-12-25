import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    open: true
  },
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  optimizeDeps: {
    exclude: []
  },
  base: '/',
  css: {
    devSourcemap: true
  }
}) 