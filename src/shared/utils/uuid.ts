import { v4 as uuid } from 'uuid';

export class UUID {
  generate(): string {
    return uuid();
  }
}
