import { Router } from 'express';
import { validate, asyncWrapper } from '../../middlewares/index.js';

import {
  create,
  login,
  refreshToken,
  revokeRefreshTokens,
  loginGithub,
  completeRegister,
} from './auth.controller.js';

import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  revokeTokenSchema,
  registerCompleteSchema,
} from './auth.schema.js';

const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), asyncWrapper(create));
authRoutes.post(
  '/register-complete',
  validate(registerCompleteSchema),
  asyncWrapper(completeRegister)
);
authRoutes.post('/login', validate(loginSchema), asyncWrapper(login));
authRoutes.post(
  '/refresh-token',
  validate(revokeTokenSchema),
  asyncWrapper(refreshToken)
);

authRoutes.post(
  '/logout',
  validate(refreshTokenSchema),
  asyncWrapper(revokeRefreshTokens)
);
authRoutes.get('/github/callback', asyncWrapper(loginGithub));

export default authRoutes;
