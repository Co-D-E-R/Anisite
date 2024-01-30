import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api1': {
        target: 'https://aniconsument-1.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, '')
      },
      '/api2': {
        target: 'https://api.anify.tv',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api2/, '')
      }
    }
  },
  plugins: [react()],
})
