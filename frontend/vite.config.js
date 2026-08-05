import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  server:{
    proxy:{
      '/api': 'http://localhost:8000'
    }
  },
  plugins: [react() , tailwindcss()],
})
