/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config-react/library.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  env: {
    jest: true,
  },
  globals: {
    // 忽略 env browser window.screen
    screen: 'off',
  },
};
