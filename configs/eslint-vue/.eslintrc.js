module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'plugin:vue/vue3-essential', 'prettier'],
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
  parserOptions: {
    ecmaVersion: 'latest',
    jsx: true,
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'no-debugger': 'off',
  },
};
