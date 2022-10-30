import handlebars from 'handlebars';
import fs from 'fs/promises';

export interface IMailVariables {
  [key: string]: string | number | boolean;
}

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
