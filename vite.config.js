import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const react = require('vite-plugin-react');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  base: './',
  plugins: [react()]
});
