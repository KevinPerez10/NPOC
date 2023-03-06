import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
function defineConfig() {
  return {
    base: './',
    plugins: [react()]
  };
}

module.exports = { defineConfig };
