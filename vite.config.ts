/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  console.log('mode', mode, 'VITE_BASE_PATH', env.VITE_BASE_PATH);
  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [
      react(),
      legacy(),
      VitePWA({ registerType: 'autoUpdate' })
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    }
  };
});