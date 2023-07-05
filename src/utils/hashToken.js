import { createHash } from 'crypto';

export const hashToken = token => {
  return createHash('sha512').update(token).digest('hex');
};
