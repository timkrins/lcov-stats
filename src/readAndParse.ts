import { generateFileStats } from './generateFileStats';
import { generateTotalStat } from './generateTotalStat';
import { parse } from './parse';
import { readFileToString } from './readFileToString';

export function readerParser(ignoreFilter?: (filename: string) => boolean) {
  return async function (filename: string, name?: string) {
    const lcovInputContent = readFileToString(filename);
    let lcovParsed = await parse(lcovInputContent);
    if (lcovParsed) {
      if (ignoreFilter) {
        lcovParsed = lcovParsed.filter((p) => !ignoreFilter(p.file));
      }
      const fileStats = generateFileStats(lcovParsed);
      const totalStat = generateTotalStat(fileStats, name);
      return totalStat;
    }
  };
}
