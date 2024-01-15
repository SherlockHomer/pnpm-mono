/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@mono/eslint-config-react/react-internal.js'],
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
