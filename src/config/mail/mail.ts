import 'dotenv/config';
import nodemailer from 'nodemailer';
import HandlebarsMailParse, { IMailVariables } from './handlebars-mail-parse';

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

class Mail {
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

    await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipeapivendas.com.br',
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

export default Mail;
