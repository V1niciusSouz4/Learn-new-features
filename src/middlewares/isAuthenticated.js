import jwt from 'jsonwebtoken';
import { throwError } from '../utils/customError.js';

export const isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throwError('Un-authorized', 401);
  }

  try {
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      res.status(401);
      throw new Error('Malformed token');
    }

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
    return next();
  } catch (error) {
    res.status(401);
    if (error.name === 'TokenExpiredError') {
      throw new Error(error.name);
    }

    throw new Error('Un-Authorized');
  }
};
