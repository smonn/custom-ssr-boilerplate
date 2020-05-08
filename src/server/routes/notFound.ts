import { RequestHandler } from 'express';
import HttpError from '../HttpError';

const notFound: RequestHandler = (req, res, next) => {
  next(new HttpError(404, `Not Found: ${req.url}`));
};

export default notFound;
