const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const commonjs = require('@rollup/plugin-commonjs');
// const sass =  require('node-sass);
// const postcss =  require('rollup-plugin-postcss);
// const autoprefixer =  require('autoprefixer);

function getConfig(packageJson) {
  return {
    input: 'src/Index.jsx',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      commonjs({
        include: 'node_modules/**',
      }),
      resolve(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
    ],
  };
}

module.exports = getConfig;
