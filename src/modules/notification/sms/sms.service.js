import { twilioConfig } from '../../../config/index.js';

export const sendSms = async ({ message, phone }) => {
  try {
    return await twilioConfig({ message, phone });
  } catch (error) {
    throw new Error('Error send sms');
  }
};
