import 'dotenv/config';
import nodemailer from 'nodemailer';
import { SES, SendRawEmailCommand } from '@aws-sdk/client-ses';

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

class SESMail {
  static async sendEmail({
    to,
    from,
    subject,
    html,
  }: ISendMail): Promise<void> {
    const transporter = nodemailer.createTransport({
      SES: {
        ses: new SES({
          apiVersion: '2010-12-01',
        }),
        aws: { SendRawEmailCommand },
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

export default SESMail;
