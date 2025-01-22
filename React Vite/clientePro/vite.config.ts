import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Dirección del backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'clienteproApp/www',
  },
});
