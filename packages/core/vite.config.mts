import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import packageJson from './package.json'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'MadsbDkfdsVue3Core',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `dkfds-vue3-core.${format === 'es' ? 'mjs' : format === 'cjs' ? 'cjs' : 'umd.js'}`,
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue', 'dkfds', '@madsb/dkfds-vue3-utils'],
      output: {
        globals: {
          vue: 'Vue',
          dkfds: 'DKFDS',
          '@madsb/dkfds-vue3-utils': 'MadsbDkfdsVue3Utils',
        },
        assetFileNames: 'dkfds-vue3-core.[ext]',
      },
      treeshake: true,
    },
    chunkSizeWarningLimit: 200,
  },
  define: {
    VERSION: JSON.stringify(packageJson.version),
  },
})
