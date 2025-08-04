import { defineConfig, mergeConfig } from 'vitest/config';
import { resolve } from 'path';
import baseConfig from '../../vitest.config.base';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      setupFiles: [resolve(__dirname, '../../test-shared/setup-node.ts')],
      environment: 'node', // Utils package doesn't need jsdom
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  })
);