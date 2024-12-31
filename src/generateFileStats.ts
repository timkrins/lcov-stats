import { type LcovFile } from 'lcov-parse';

export interface FileStat {
  total: number;
  hit: number;
  percent: number;
}

export function generateFileStats(lcovInput: LcovFile[]) {
  const results: Record<string, FileStat> = {};
  for (let index = 0; index < lcovInput.length; index++) {
    const element = lcovInput[index];
    const total = element.lines.details.length;
    const hit = element.lines.details.filter((l) => l.hit > 0).length;
    const percent = total > 0 ? hit / total : 1.0;
    results[element.file] = { total, hit, percent };
  }
  return results;
}
