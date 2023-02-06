import { IMailVariables } from './mail-variables.interface';

interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject?: string;
  html: {
    file: string;
    variables: IMailVariables;
  };
}
