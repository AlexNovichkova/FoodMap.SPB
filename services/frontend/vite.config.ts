import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      src: '/src',
      '@': '/',
    },
  },
  build: {
    assetsDir: './',
    outDir: 'production',
  },
  base: './',
  server: {
    port: 4000,
  },
  preview: {
    host: true,
  },
});
