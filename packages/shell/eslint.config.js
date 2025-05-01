export default [
  // 基础配置
  {
    ignores: [
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/coverage/**',
      '**/eslint.config.js',
    ],
  },
  // Flat ESLint config for Shell scripts
  {
    files: ['**/*.sh'],
    rules: {
      // Basic rules
      'no-unused-vars': 'warn',
    },
  },
];
