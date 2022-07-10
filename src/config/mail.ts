import 'dotenv/config';
import nodemailer from 'nodemailer';

interface ISendMail {
  from: string;
  to: string;
  subject?: string;
  html: string;
}

class Mail {
  static async sendEmail(data: ISendMail): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail(data);
  }
}

export default Mail;
