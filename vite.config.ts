import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import packageJson from './package.json'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, './src/index.ts'),
        styles: resolve(__dirname, './src/styles.ts'),
      },
      name: 'MadsbDkfdsVue3',
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.mjs`,
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue', 'dkfds'],
      output: {
        globals: {
          vue: 'Vue',
          dkfds: 'DKFDS',
        },
        assetFileNames: 'dkfds-vue3.[ext]',
      },
      treeshake: true,
    },
    chunkSizeWarningLimit: 250,
  },
  define: {
    VERSION: JSON.stringify(packageJson.version),
  },
})
