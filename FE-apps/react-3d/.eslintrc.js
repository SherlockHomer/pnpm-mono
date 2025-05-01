/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config-react/library.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  ignorePatterns: ['__mocks__/styleMock.js', '__mocks__/fileMock.js'],
  env: {
    jest: true,
  },
  globals: {
    // 忽略 env browser window.screen
    screen: 'off',
  },
};
