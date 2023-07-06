import { sendSms } from './sms.service.js';

export const create = async (req, res) => {
  const { message, phone } = req.body;

  const result = await sendSms({ message, phone });
  console.log(result);
  return res.status(201).json({
    data: result,
    message: 'SMS sent successfuly',
  });
};
