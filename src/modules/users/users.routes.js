import { Router } from 'express';
import { profile, findAll, create, deleted } from './user.controller.js';
import { asyncWrapper } from '../../middlewares/index.js';

const userRoutes = Router();

userRoutes.get('/profile', asyncWrapper(profile));
userRoutes.get('/', asyncWrapper(findAll));
userRoutes.post('/create', asyncWrapper(create));
userRoutes.delete('/:id', asyncWrapper(deleted));

export default userRoutes;
