import { defineConfig, mergeConfig } from 'vitest/config';
import { resolve } from 'path';
import baseConfig from '../../vitest.config.base';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      setupFiles: [resolve(__dirname, '../../test-shared/setup-vue.ts')],
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        'dkfds-vue3-utils': resolve(__dirname, '../utils/src'),
      },
    },
  })
);