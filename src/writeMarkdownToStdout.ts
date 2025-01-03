import { generateMarkdownFromStat } from './generateMarkdownFromStat';
import { type TotalStat } from './generateTotalStat';
import { writeStringToStdout } from './writeStringToStdout';

export const writeMarkdownToStdout = async (stat: TotalStat) => {
  const stringContent = generateMarkdownFromStat(stat);
  await writeStringToStdout(stringContent);
};
