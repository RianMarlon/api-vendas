import { IMailProvider } from '../models/mail-provider.interface';
import { ISendMail } from '../models/send-mail.interface';

export default class FakeMailProvider implements IMailProvider {
  async sendEmail({ to, from, subject, html }: ISendMail): Promise<void> {
    return;
  }
}
