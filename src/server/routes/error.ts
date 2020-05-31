import { ErrorRequestHandler } from 'express';
import debugFactory from 'debug';

const debug = debugFactory('server:routes:error');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const error: ErrorRequestHandler = (err, req, res, next) => {
  debug(err.message);
  res
    .status(err.status || 500)
    .type('text/plain')
    .send(err.message);
};

export default error;
