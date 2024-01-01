const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const commonjs = require('@rollup/plugin-commonjs');
// const sass =  require('node-sass);
const postcss = require('rollup-plugin-postcss');
const terser = require('rollup-plugin-minification').terser;
const replace = require('rollup-plugin-replace');

const { PRODUCTION } = process.env;

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
      resolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          !PRODUCTION ? 'production' : 'development'
        ),
      }),
      peerDepsExternal(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      postcss(),
      terser(),
    ],
  };
}

module.exports = getConfig;
