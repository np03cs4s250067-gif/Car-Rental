import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/auth': 'http://localhost:3001',
      '/cars': 'http://localhost:3001',
      '/bookings': 'http://localhost:3001',
      '/api': 'http://localhost:3001',
    },
  },
})
