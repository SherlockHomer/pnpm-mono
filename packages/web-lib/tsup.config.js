import { defineConfig } from 'tsup';
import config from '@mono/tsconfig';

export default defineConfig({
  ...config,
  entry: ['index.mjs'],
  format: ['esm', 'cjs', 'iife'],
});
