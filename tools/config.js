const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const globals = require('rollup-plugin-node-globals');
// const { uglify }  = require( 'rollup-plugin-uglify');
const packageJSON = require('../package.json');
const path = require('path');

const __basename = path.dirname(__dirname);

const options = {
  bundlePath: path.resolve(__basename, `dist/${packageJSON.name}.js`),
  minifiedBundlePath: path.resolve(__basename, `dist/${packageJSON.name}.min.js`)
};

const defaultPlugins = [
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs({
    include: '../node_modules/**'
  }),
  typescript({
    typescript: require('typescript')
  }),
  globals(),
  json()
];
const inputOptions = {
  input: path.resolve(__basename, 'src/yingyan.ts'),
  external: ['axios'],
  treeshake: true,
  plugins: defaultPlugins
};
const outputOptions = {
  format: 'umd',
  name: 'Y',
  exports: 'named',
  file: options.bundlePath,
  globals: {
    axios: 'axios'
  }
};

module.exports = {
  inputOptions,
  outputOptions
};
