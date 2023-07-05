import multer from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';

import { throwError, __dirname } from '../utils/index.js';

export const diskStorage = multer.diskStorage({
  destination: resolve(__dirname, '..', '..', './uploads'),
  filename: (_, file, cb) => {
    crypto.randomBytes(16, function (err, raw) {
      if (err) cb(err);

      cb(
        null,
        `${raw.toString('hex')}${Date.now()}.${file.originalname
          .split('.')
          .pop()
          .trim()}`
      );
    });
  },
});

export const limits = {
  fileSize: parseInt(process.env.FILE_UPLOAD_SIZE_IN_BYTE),
};

export const imageFilter = (_, file, cb) => {
  if (!['image?png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    return cb(throwError('Only jpg, jpeg, png format are allowed', 422));
  }
  cb(null, true);
};
