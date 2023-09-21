const getConfig = require('@mono/rollup-react');
const packageJson = require('./package.json');

const config = getConfig(packageJson);

module.exports = {
  ...config,
};
