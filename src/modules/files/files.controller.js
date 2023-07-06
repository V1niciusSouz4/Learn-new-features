import { resolve } from 'path';
import fs, { existsSync } from 'fs';

import { throwError } from '../../utils/index.js';
import { createUserFile } from './files.service.js';
import { updateUserFile, findUserById } from '../users/users.service.js';

export const fileUpload = (req, res) => {
  if (!req.file) return throwError('Please select file', 422);

  return res.json({ data: req.file });
};

export const viewImage = (req, res) => {
  const { imageName } = req.params;
  const imagePath = resolve('uploads', imageName);

  if (!existsSync(imagePath)) return throwError('Image not found', 404);

  return res.sendFile(imagePath);
};

export const createUserImage = async (req, res) => {
  const { id } = req.params;

  const photo = req.file.filename;
  await createUserFile({ id, photo });
  return res.json(await findUserById(id));
};

export const deleteUserImage = async (req, res) => {
  const { imageName } = req.params;
  const imagePath = resolve('uploads', imageName);

  if (!existsSync(imagePath)) return throwError('Image not found', 404);

  updateUserFile(imageName);
  fs.unlinkSync(imagePath);
  return res.status(200).json({ message: 'delete succeful' });
};
