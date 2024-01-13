import { defineConfig } from 'tsup';
import config from '@mono/typescript-config/tsup.config.json';

export default defineConfig({
  ...config,
  entry: ['src/Index.js', 'src/**/Index.(js|ts)'],
  format: ['esm', 'cjs'],
});
