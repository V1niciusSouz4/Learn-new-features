import { Router } from 'express';
import {
  profile,
  findAll,
  create,
  deleted,
  update,
} from './user.controller.js';
import {
  asyncWrapper,
  isAuthenticated,
  hasRole,
  handlePagination,
} from '../../middlewares/index.js';

const userRoutes = Router();

userRoutes.get('/profile', isAuthenticated, asyncWrapper(profile));
userRoutes.get('/', isAuthenticated, handlePagination, asyncWrapper(findAll));
userRoutes.post('/create', asyncWrapper(create));
userRoutes.delete(
  '/:id',
  isAuthenticated,
  hasRole(['ADMIN']),
  asyncWrapper(deleted)
);
userRoutes.put('/:id', isAuthenticated, asyncWrapper(update));

export default userRoutes;
