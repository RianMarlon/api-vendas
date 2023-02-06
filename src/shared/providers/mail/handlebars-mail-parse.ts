import handlebars from 'handlebars';
import fs from 'fs/promises';

import { IMailVariables } from './models/mail-variables.interface';

export default class HandlebarsMailParse {
  static async execute(
    file: string,
    variables: IMailVariables,
  ): Promise<string> {
    const templateFileContent = await fs.readFile(file, { encoding: 'utf-8' });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
