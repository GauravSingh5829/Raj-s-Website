import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      '^/api/vibe': {
        target: 'https://api.counterapi.dev/v1/rajsinghportfolio/vibes',
        changeOrigin: true,
        rewrite: (path) => '/'
      }
    }
  }
})
