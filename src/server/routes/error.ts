import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const error: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .type('text/plain')
    .send(err.message);
};

export default error;
