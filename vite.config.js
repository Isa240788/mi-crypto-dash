// vite.config.js 🚀
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    proxy: {
      // Túnel para Alpha Vantage (Acciones) 📈
      '/api-acciones': {
        target: 'https://www.alphavantage.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-acciones/, ''),
      },
      // Túnel para Open-Meteo (Clima) 🌦️
      '/api-clima': {
        target: 'https://api.open-meteo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-clima/, ''),
      },
    },
  },
})
