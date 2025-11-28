import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Escuchar en todas las interfaces
    port: 3000,
    // Configuración para preview en producción
    allowedHosts: [
      'marketing-la-paz-frontend-production.up.railway.app',
      'marketing-la-paz-frontend.railway.app',
      'localhost',
      '127.0.0.1'
    ]
  },
  preview: {
    host: true,
    port: 3000,
    allowedHosts: [
      'marketing-la-paz-frontend-production.up.railway.app',
      'marketing-la-paz-frontend.railway.app',
      'localhost', 
      '127.0.0.1'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Deshabilitar sourcemaps para producción
    chunkSizeWarningLimit: 1000 // Aumentar límite de warnings
  }
})