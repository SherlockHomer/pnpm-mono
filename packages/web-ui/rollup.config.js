const getConfig = require('@repo/rollup-react');
const packageJson = require('./package.json');

const config = getConfig(packageJson);

module.exports = {
  ...config,
};
