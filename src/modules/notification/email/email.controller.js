import { sendMail } from './email.service.js';
import { welcomeMailTemplate } from '../../../templates/index.js';

export const sendMailWelcome = async (req, res) => {
  const { name, to, subject } = req.body;

  const html = welcomeMailTemplate({ name });
  const result = await sendMail({
    html,
    subject,
    to,
  });

  return res.json({ data: result });
};
