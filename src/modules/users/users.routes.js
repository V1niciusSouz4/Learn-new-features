import { Router } from 'express';
import { profile, findAll, create, deleted } from './user.controller.js';
import {} from '../../middlewares/index.js';

const userRoutes = Router();

userRoutes.get('/profile', profile);
userRoutes.get('/', findAll);
userRoutes.post('/create', create);
userRoutes.delete('/:id', deleted);

export default userRoutes;
