import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    outDir: 'dist',
    minify: false,
    sourcemap: true,
    rollupOptions: {
      output: {
        format: 'cjs',
      },
    },
  },
})