#!/usr/bin/env node

/**
 * 将根目录的ESLint配置复制到所有子项目
 * 这样每个子项目都可以独立使用ESLint，同时保持配置的一致性
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 源配置文件
const sourceConfigPath = path.join(rootDir, 'eslint.config.js');
const sourceConfig = fs.readFileSync(sourceConfigPath, 'utf8');

// 要忽略的目录
const ignoreDirs = [
  '.git',
  '.github',
  '.vscode',
  'node_modules',
  'coverage',
  'configs',
  'scripts',
  '.cursor',
  '.husky',
];

// 递归查找所有package.json文件
function findPackageJsonFiles(dir, files = []) {
  if (ignoreDirs.includes(path.basename(dir))) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // 检查当前目录是否有package.json
  if (
    entries.some((entry) => entry.isFile() && entry.name === 'package.json')
  ) {
    files.push(path.join(dir, 'package.json'));
  }

  // 递归检查子目录
  for (const entry of entries) {
    if (entry.isDirectory() && !ignoreDirs.includes(entry.name)) {
      findPackageJsonFiles(path.join(dir, entry.name), files);
    }
  }

  return files;
}

// 更新子项目的ESLint配置
function updateProjectESLintConfig(packageJsonPath) {
  const projectDir = path.dirname(packageJsonPath);
  const projectName = projectDir.split(path.sep).pop();

  // 更新eslint.config.js
  const targetConfigPath = path.join(projectDir, 'eslint.config.js');

  if (projectDir !== rootDir) {
    console.log(`更新 ${projectName} 的ESLint配置...`);
    fs.writeFileSync(targetConfigPath, sourceConfig);

    // 为项目添加type: module
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      // 更新lint脚本
      if (packageJson.scripts) {
        if (
          !packageJson.scripts.lint ||
          packageJson.scripts.lint.includes('--ext')
        ) {
          packageJson.scripts.lint = 'eslint src';
          fs.writeFileSync(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2)
          );
          console.log(`  更新 ${projectName}/package.json 中的 lint 脚本`);
        }
      }
    } catch (err) {
      console.error(`  无法更新 ${projectName}/package.json:`, err);
    }
  }
}

// 主执行函数
function main() {
  console.log('开始更新子项目的ESLint配置...');

  const packageJsonFiles = findPackageJsonFiles(rootDir);
  for (const packageJsonPath of packageJsonFiles) {
    updateProjectESLintConfig(packageJsonPath);
  }

  console.log('完成!');
}

main();
