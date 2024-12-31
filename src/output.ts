import { toJson } from './toJson';
import { writeStringToFile } from './writeStringToFile';

export const output = async (
  content: any,
  outputFile?: string,
  pretty?: boolean
) => {
  const stringContent = toJson(content, pretty);

  if (outputFile) {
    writeStringToFile(outputFile, stringContent);
  } else {
    await new Promise<void>((resolve, reject) => {
      process.stdout.write(stringContent + '\n', (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  }
};
