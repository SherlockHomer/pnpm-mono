import { defineConfig } from 'tsup';
import config from '@repo/typescript-config/tsup.config.json' assert { type: 'json' };

export default defineConfig({
  ...config,
  // src/* 一层路径
  // src/** n 层路径
  // 该项目 src 第一层中每个文件一个模块
  entry: ['src/Index.js', 'src/*/Index.(js|ts)'],
  format: ['cjs'],
});
