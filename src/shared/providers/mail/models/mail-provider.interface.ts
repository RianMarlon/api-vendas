import { ISendMail } from './send-mail.interface';

export interface IMailProvider {
  sendEmail({ to, from, subject, html }: ISendMail): Promise<void>;
}
