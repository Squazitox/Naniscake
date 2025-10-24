import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configura base para GitHub Pages (reemplaza con tu repo exacto)
export default defineConfig({
  plugins: [react()],
  base: '/Naniscake/'
})
