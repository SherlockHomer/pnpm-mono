// This configuration only applies to the package manager root & configs
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ['BE-apps/**', 'FE-apps/**', 'packages/**'],
  extends: ['@mono/eslint-config-react/library.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true, // 找最近目录的 tsconfig [https://typescript-eslint.io/blog/parser-options-project-true/]
  },
};
