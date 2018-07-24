import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';
const packageJSON = require('./package.json');

const licenseText = `/**
 * Copyright (C) ${new Date().getFullYear()} nasawz <nasawz.com>
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 */`;

const options = {
  outputFolder: 'dist',
  bundlePath: `dist/${packageJSON.name}.js`,
  minifiedBundlePath: `dist/${packageJSON.name}.min.js`
  // htmlTemplate: 'src/template.html',
  // exportedEnvPrefix: 'WEBAPP_ENV_',
  // webapp: process.env.WEBAPP === 'true',
  // IS_WATCH_MODE: process.env.ROLLUP_WATCH === 'true'
};

const defaultPlugins = [
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs({
    include: 'node_modules/**'
  }),
  typescript({
    typescript: require('typescript')
  }),
  json()
];

function createBundleConfig(dest, { output, plugins }) {
  return {
    input: './src/index.tsx',
    output: {
      file: dest,
      format: 'umd',
      ...output
    },
    name: 'app-a',
    // external: ['axios'],
    exports: 'named',
    treeshake: true,
    plugins
    // globals: {
    //   axios: 'axios'
    // }
  };
}

let rollupConfig = [];

rollupConfig.push(
  createBundleConfig(options.bundlePath, {
    output: {
      banner: licenseText
    },
    plugins: defaultPlugins
  })
);

// rollupConfig.push(
//   createBundleConfig(options.minifiedBundlePath, {
//     output: {
//       banner: licenseText
//     },
//     plugins: [...defaultPlugins, uglify()]
//   })
// );

export default rollupConfig;
