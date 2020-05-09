import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import App from '../shared/components/App';
import renderToHTML from './renderToHTML';
import error from './routes/error';
import notFound from './routes/notFound';

const app = express();
const staticPath = path.resolve('dist', 'static');

app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(
  '/static',
  express.static(staticPath, {
    fallthrough: false,
  })
);

app.get('/*', (req, res, next) => {
  const { html } = renderToHTML({
    entrypoints: ['app'],
    Component: App,
    props: {},
    req,
    res,
    next,
  });
  res.send(html);
});

app.use(notFound);

app.use(error);

export default app;
