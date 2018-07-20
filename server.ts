'use strict';
const jspmHmrServer = require('jspm-hmr');

const options = {
  fallback: '/index.html'
};

// SERVER
const server = jspmHmrServer.createServer(options);

server
  .listen(8000, () => {
    console.log('[debug] %j', server.address());
    console.log('\n>>> hit CTRL-C twice to exit <<<\n');
  })
  .on('error', function(err: any) {
    if (err.code === 'EADDRINUSE') {
      console.log(`\n[WARNING] Selected address is in use: ${URL}`);
      console.log(`[WARNING] Please try again using different port or address...\n`);

      process.exit();
    }
  });
