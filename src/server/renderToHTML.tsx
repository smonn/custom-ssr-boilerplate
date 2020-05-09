import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import debugFactory from 'debug';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';

const DEV = process.env.NODE_ENV !== 'production';
const publicPath = DEV ? 'http://localhost:3001/static/' : '/static/';
const debug = debugFactory('server:renderHTML');
const staticPath = path.resolve('dist', 'static');
const statsFile = path.resolve(staticPath, 'loadable-stats.json');
const attrs = DEV
  ? {
      crossorigin: '',
    }
  : {};

export interface RenderOptions<P> {
  entrypoints: string[];
  Component: React.ComponentType<P>;
  props: P;
  req: Request;
  res: Response;
  next: NextFunction;
}

export interface RenderResult {
  html: string;
  status: number;
}

export default function renderToHTML<P>({
  entrypoints,
  Component,
  props,
}: RenderOptions<P>): RenderResult {
  const status = 200;
  const extractor = new ChunkExtractor({
    statsFile,
    entrypoints,
    publicPath,
  });

  debug('start renderToString');
  const markup = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <Component {...props} />
    </ChunkExtractorManager>
  );
  debug('end renderToString');
  const helmet = Helmet.renderStatic();

  const html = `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${extractor.getLinkTags(attrs)}
    ${extractor.getStyleTags(attrs)}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="app">${markup}</div>
    ${extractor.getScriptTags(attrs)}
  </body>
  </html>
  `;

  return { status, html };
}
