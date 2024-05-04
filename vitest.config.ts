import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      reporters: ['json', 'default'],
      outputFile: './test-output.json',
    },
  })
);
