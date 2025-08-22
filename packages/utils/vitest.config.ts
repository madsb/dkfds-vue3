import { defineConfig, mergeConfig } from 'vitest/config'
import { resolve } from 'path'
import baseConfig from '../../vitest.config.base'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      setupFiles: [resolve(__dirname, '../../test-shared/setup-node.ts')],
      environment: 'jsdom', // Changed to jsdom for navigation tests that need DOM
      coverage: {
        thresholds: {
          statements: 64,
          branches: 75,
          functions: 54,
          lines: 64,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }),
)
