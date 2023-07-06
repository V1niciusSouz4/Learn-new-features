import { throwError } from '../../utils/customError.js';
import { findUserById, updateUser } from '../users/users.service.js';
import 'dotenv/config';

export const createUserFile = async ({ id, photo }) => {
  try {
    const getUser = await findUserById(id);

    if (!getUser) return throwError('User not found', 404);
    getUser.photo = `${process.env.URL_IMAGE}/${photo}`;
    return updateUser(id, getUser);
  } catch (error) {
    throwError('Error upload user image');
  }
};
