import { CustomError } from '../utils/index.js';

export const errorHandler = (err, _, res, next) => {
  let statusCode;

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    delete err.stack;
  } else {
    statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  }
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? 'error' : err.stack,
  });

  return next();
};
