import { object, string } from 'zod';
import { phoneRegex } from '../../../utils/index.js';

export const smsSchema = object({
  body: object({
    message: string({
      required_error: 'Message is required',
    }),
    phone: string({
      required_error: 'Phone is required',
    }).regex(phoneRegex, 'Invalid Number!'),
  }),
});
