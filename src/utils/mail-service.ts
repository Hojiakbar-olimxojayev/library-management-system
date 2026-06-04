import * as nodemailer from 'nodemailer';
import { envConfig } from 'src/config/env.config';
export async function sendMail(user: string, message: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    host: envConfig.mail.host,
    port: envConfig.mail.port,
    auth: {
      user: envConfig.mail.user,
      pass: envConfig.mail.pass,
    },
  });
  const mailOptions = {
    from: envConfig.mail.user,
    to: user,
    subject: 'Library',
    text: message,
  };
  const res = await transporter.sendMail(mailOptions);
  return res;
}
