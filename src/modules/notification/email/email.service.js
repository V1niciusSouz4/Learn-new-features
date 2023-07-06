import { createTransport, getTestMessageUrl } from 'nodemailer';

export const sendMail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });

    return {
      message: info.messageId,
      preview: getTestMessageUrl(info),
    };
  } catch (error) {
    console.log('====================================');
    console.log('error -->', error);
    console.log('====================================');
    throw new Error('Error send mail');
  }
};
