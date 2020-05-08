import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import compression from 'compression';
import debugFactory from 'debug';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/components/App';
import HttpError from './HttpError';

const DEV = process.env.NODE_ENV !== 'production';
const publicPath = DEV ? 'http://localhost:3001/static/' : '/static/';
const debug = debugFactory('server:app');
const app = express();
const staticPath = path.resolve('dist', 'static');
const statsFile = path.resolve(staticPath, 'loadable-stats.json');
const attrs = DEV
  ? {
      crossorigin: '',
    }
  : {};

app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(
  '/static',
  express.static(staticPath, {
    fallthrough: false,
  })
);

app.get('/*', (req, res) => {
  const extractor = new ChunkExtractor({
    statsFile,
    entrypoints: ['client'],
    publicPath,
  });

  debug('start render content');
  const markup = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <App />
    </ChunkExtractorManager>
  );
  debug('end render content');

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Hello, World</title>
    ${extractor.getLinkTags(attrs)}
    ${extractor.getStyleTags(attrs)}
  </head>
  <body>
    <div id="root">${markup}</div>
    ${extractor.getScriptTags(attrs)}
  </body>
  </html>
  `);
});

app.use((req, res, next) => {
  next(new HttpError(404, `Not Found: ${req.url}`));
});

app.use(
  (
    err: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    req: express.Request,
    res: express.Response,
    next: express.NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
  ) => {
    res
      .status(err.status || 500)
      .type('text/plain')
      .send(err.message);
  }
);

export default app;
