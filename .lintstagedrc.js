module.exports = {
  '*.{json,vue}': ['prettier --write'],
  '*.ts?(x)': ['eslint --fix', 'prettier --parser=typescript --write'],
  '*.{js,jsx,cjs,mjs}': ['eslint --fix', 'prettier --write'],
  '*.{yml,yaml,css,scss,md}': ['prettier --write'],
};
