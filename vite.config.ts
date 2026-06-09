import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // When deploying to GitHub Pages under a repo named `portfolio`
  base: '/portfolio/',
  plugins: [tailwind(), react()],
})
