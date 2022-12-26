import 'dotenv/config';
import nodemailer from 'nodemailer';

import HandlebarsMailParse, { IMailVariables } from './handlebars-mail-parse';
import mailConfig from '@config/mail/mail';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject?: string;
  html: {
    file: string;
    variables: IMailVariables;
  };
}

class Mailtrap {
  static async sendEmail({
    to,
    from,
    subject,
    html,
  }: ISendMail): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const { name, email } = mailConfig.defaults.from;

    await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to?.name,
        address: to?.email,
      },
      subject,
      html: await HandlebarsMailParse.execute(html.file, html.variables),
    });
  }
}

export default Mailtrap;
