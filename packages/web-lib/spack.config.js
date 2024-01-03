const { config } = require('@swc/core/spack');
const path = require('path');
const swcrc = require('./.swcrc.json');

module.exports = config({
  entry: {
    web: path.resolve('./src/Index.js'),
  },
  output: {
    path: path.resolve('./distswc'),
    name: 'Index.js',
  },
  options: {
    ...swcrc,
  },
});
