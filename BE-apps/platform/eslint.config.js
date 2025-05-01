import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  // 基础配置
  {
    ignores: [
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.next/**',
      '**/static/**',
      '**/*.d.ts',
      '**/server/**',
      '**/webpack-runtime.js',
      '**/*manifest.js',
      '**/eslint.config.js',
    ],
  },
  // JavaScript/TypeScript文件配置
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        React: true,
        JSX: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // 基础规则
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'none',
          ignoreRestSiblings: true,
        },
      ],
      'react/react-in-jsx-scope': 'off',

      // ESLint 9特有的规则
      'no-fallthrough': 'error',
      'no-constant-binary-expression': 'error',
      'logical-assignment-operators': [
        'warn',
        'always',
        { enforceForIfStatements: true },
      ],
    },
  },
  // 前端应用文件的配置
  {
    files: ['**/FE-apps/*/**/*.{ts,tsx,js,jsx}'],
    rules: {
      // 前端应用特有的规则
    },
  },
  // 后端应用文件的配置
  {
    files: ['**/BE-apps/*/**/*.{ts,js}'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  // 共享包文件的配置
  {
    files: ['**/packages/*/**/*.{ts,tsx,js,jsx}'],
    rules: {
      // 共享包特有的规则
    },
  },
  // 测试文件特殊配置
  {
    files: ['**/__tests__/**/*', '**/*.{test,spec}.{ts,tsx,js,jsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
