import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [react(), eslint()],
  
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js',
  },

  server: {
    proxy: {
      '/api': { target: 'http://localhost:3000' },
      '/images': { target: 'http://localhost:3000' }
    }
  }
})