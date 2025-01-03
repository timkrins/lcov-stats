import { generateJson } from './generateJson';
import { writeStringToStdout } from './writeStringToStdout';

export const writeJsonToStdout = async (content: any, pretty?: boolean) => {
  const stringContent = generateJson(content, pretty);
  await writeStringToStdout(stringContent);
};
