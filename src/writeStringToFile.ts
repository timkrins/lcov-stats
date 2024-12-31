import { writeFileSync } from 'fs';
import { resolve } from 'path';

export function writeStringToFile(filename: string, content: string) {
  return writeFileSync(resolve(filename), content);
}
