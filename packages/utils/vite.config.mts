import { resolve } from 'path'
import { defineConfig } from 'vite'

import packageJson from './package.json'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'MadsbDkfdsVue3Utils',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `dkfds-vue3-utils.${format === 'es' ? 'mjs' : format === 'cjs' ? 'cjs' : 'umd.js'}`,
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
      treeshake: true,
    },
    chunkSizeWarningLimit: 50,
  },
  define: {
    VERSION: JSON.stringify(packageJson.version),
  },
})
