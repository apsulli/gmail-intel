import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json' with { type: 'json' };

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    assetsInlineLimit: 1048576, // 1MB - inline all fonts to base64
  }
});
