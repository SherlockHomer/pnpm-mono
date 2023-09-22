const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const commonjs = require('@rollup/plugin-commonjs');
// const sass =  require('node-sass);
const postcss = require('rollup-plugin-postcss');
const terser = require('rollup-plugin-terser').terser;

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
