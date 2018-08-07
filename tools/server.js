const express = require('express');
const rollup = require('express-middleware-rollup');
const path = require('path');
const proxy = require('http-proxy-middleware');

const __basename = path.dirname(__dirname);

const { inputOptions, outputOptions } = require('./config');
const port = 8000;

function startDevServer() {
  const app = express();
  app.use(
    rollup({
      src: 'src',
      dest: 'dist',
      bundleExtension: '.ts',
      root: __basename,
      rollupOpts: inputOptions,
      bundleOpts: outputOptions
      // ignore_prefix: '/lib'
    })
  );
  app.use(express.static(path.resolve(__basename, 'static')));
  app.use(express.static(path.resolve(__basename, 'dist')));
  app.use('/app-a', express.static(path.resolve(__basename, 'app-a')));
  app.use('/app-b', express.static(path.resolve(__basename, 'app-b')));

  /*=============proxy start==============*/
  (() => {
    const proxy_options_mock = {
      target: `http://127.0.0.1:${port}/`,
      secure: false,
      changeOrigin: true,
      ws: true,
      ignorePath: false,
      pathRewrite: {
        '^/api_mock': ''
      }
    };
    const webProxyMock = proxy(proxy_options_mock);
    app.use('/api_mock/*', webProxyMock);
  })();
  // =======

  app.listen(port, err => {
    if (err) {
      console.error(err);
    }
    console.log(`Dev server listening at http://localhost:${port}/`);
  });
}

startDevServer();
