const { inputOptions, outputOptions } = require('./config');
const packageJSON = require('../package.json');
const path = require('path');
// import { uglify } from 'rollup-plugin-uglify';

const licenseText = `/**
 * Copyright (C) ${new Date().getFullYear()} nasawz <nasawz.com>
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 */`;

const __basename = path.dirname(__dirname);

const options = {
  bundlePath: path.resolve(__basename, `dist/${packageJSON.name}.js`),
  minifiedBundlePath: path.resolve(__basename, `dist/${packageJSON.name}.min.js`)
};
// rollupConfig.push(
//   createBundleConfig(options.minifiedBundlePath, {
//     output: {
//       banner: licenseText
//     },
//     plugins: [...defaultPlugins, uglify()]
//   })
// );

let rollupConfig = {};
rollupConfig = Object.assign(rollupConfig, inputOptions);
rollupConfig = Object.assign(rollupConfig, outputOptions);
rollupConfig = Object.assign(rollupConfig, {
  banner: licenseText,
  output: {
    file: options.bundlePath,
    format: 'umd'
  }
});

export default [rollupConfig];
