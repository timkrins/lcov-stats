import { generateMarkdownFromStat } from './generateMarkdownFromStat';
import { type TotalStat } from './generateTotalStat';
import { writeStringToFile } from './writeStringToFile';

export const writeMarkdownToFile = async (
  stat: TotalStat,
  outputFile?: string
) => {
  if (outputFile) {
    const stringContent = generateMarkdownFromStat(stat);
    writeStringToFile(outputFile, stringContent);
  }
};
