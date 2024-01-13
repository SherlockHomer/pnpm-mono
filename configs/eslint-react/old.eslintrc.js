/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true, // 启用 Mocha 环境
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  plugins: ['react', 'prettier', 'mocha', 'cypress', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'no-debugger': 'off',
    // "react-hooks/exhaustive-deps": "off"
  },
  ignorePatterns: ['.*.js', '!.lintstagedrc.js', 'node_modules/', 'dist/'],
};
