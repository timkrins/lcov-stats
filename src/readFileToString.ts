import { readFileSync } from 'fs';
import { resolve } from 'path';

export function readFileToString(filename: string): string {
  return readFileSync(resolve(filename)).toString();
}
