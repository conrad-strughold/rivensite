// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',        // <-- IMPORTANT for custom domain riven.finance
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
  },
})
