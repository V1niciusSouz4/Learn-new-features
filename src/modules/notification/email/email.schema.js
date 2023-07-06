import { object, string } from 'zod';

export const sendMailSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    to: string({
      required_error: 'To is required',
    }),
    subject: string({
      required_error: 'Subject is required',
    }),
  }),
});
