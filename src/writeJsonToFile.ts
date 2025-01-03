import { generateJson } from './generateJson';
import { writeStringToFile } from './writeStringToFile';

export const writeJsonToFile = async (
  content: any,
  outputFile?: string,
  pretty?: boolean
) => {
  const stringContent = generateJson(content, pretty);
  if (outputFile) writeStringToFile(outputFile, stringContent);
};
