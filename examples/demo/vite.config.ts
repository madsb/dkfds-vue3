import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['vue'],
  },
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        // Use modern Sass API
        api: 'modern-compiler',
        // Silence deprecation warnings
        silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
      },
    },
  },
});
