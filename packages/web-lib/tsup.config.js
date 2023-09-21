import { defineConfig } from 'tsup';
import config from '@mono/tsconfig';

export default defineConfig({
  ...config,
  entry: ['src/Index.js'],
  format: ['esm', 'cjs', 'iife'],
});
