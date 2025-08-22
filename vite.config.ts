import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import packageJson from './package.json'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'MadsbDkfdsVue3',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `dkfds-vue3.${format === 'es' ? 'mjs' : format === 'cjs' ? 'cjs' : 'umd.js'}`,
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
