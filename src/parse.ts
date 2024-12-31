import { source, type LcovFile } from 'lcov-parse';

export function parse(content: string) {
  return new Promise<LcovFile[] | undefined>((resolve, reject) => {
    source(content, (err, data) => {
      if (err) reject(err);

      resolve(data);
    });
  });
}
