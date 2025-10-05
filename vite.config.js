import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/rivensite/',      // repo name for GitHub Pages
  build: { outDir: 'docs' } // Pages will serve /docs on main
})
