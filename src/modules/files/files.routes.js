import { Router } from 'express';
import multer from 'multer';
import {
  diskStorage,
  imageFilter,
  limits,
  asyncWrapper,
} from '../../middlewares/index.js';
import {
  fileUpload,
  viewImage,
  createUserImage,
  deleteUserImage,
} from './files.controller.js';

const fileRoutes = Router();

fileRoutes.post(
  '/upload',
  multer({
    storage: diskStorage,
    limits,
    fileFilter: imageFilter,
  }).single('file'),
  asyncWrapper(fileUpload)
);

fileRoutes.get('/view/:imageName', asyncWrapper(viewImage));

fileRoutes.post(
  '/image/:id',
  multer({
    storage: diskStorage,
    limits,
    fileFilter: imageFilter,
  }).single('file'),
  asyncWrapper(createUserImage)
);

fileRoutes.delete('/:imageName', deleteUserImage);

export default fileRoutes;
