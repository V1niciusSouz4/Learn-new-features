import { Router } from 'express';
import usersRoutes from './modules/users/users.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import fileRoutes from './modules/files/files.routes.js';
import notificationRoutes from './modules/notification/notification.routes.js';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);
routes.use('/files', fileRoutes);
routes.use('/notifications', notificationRoutes);

export default routes;
