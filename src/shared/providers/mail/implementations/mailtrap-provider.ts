import 'dotenv/config';
import nodemailer from 'nodemailer';

import HandlebarsMailParse from '../handlebars-mail-parse';
import mailConfig from '@config/mail';
import config from '@config/index';

import { ISendMail } from '../models/send-mail.interface';
import { IMailProvider } from '../models/mail-provider.interface';

class MailtrapProvider implements IMailProvider {
  async sendEmail({ to, from, subject, html }: ISendMail): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: config.MAIL_HOST,
      port: Number(config.MAIL_PORT),
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASSWORD,
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

export default MailtrapProvider;
