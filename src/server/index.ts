import http from 'http';
import http2 from 'http2';
import debugFactory from 'debug';
import parsePort from '../shared/utils/parsePort';

const debug = debugFactory('server:index');
const port = parsePort(process.env.PORT);
let app = require('./app').default;

if (module.hot) {
  module.hot.accept('./app', () => {
    debug('HMR reloading `./app`...');
    try {
      app = require('./app').default;
    } catch (err) {
      debug(err);
    }
  });

  debug('Server-side HMR enabled!');
}

let server: http.Server | http2.Http2SecureServer;

if (process.env.NODE_ENV === 'production') {
  server = http2.createSecureServer((req, res) => app.handle(req, res));
} else {
  server = http.createServer((req, res) => app.handle(req, res));
}

server.on('error', (err) => {
  debug(err.message);
});

server.listen(port, () => {
  debug(`Launched at http://localhost:${port}`);
});

export default server;
