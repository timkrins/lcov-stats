import { type LcovFile } from 'lcov-parse';

export interface FileStat {
  total: number;
  hit: number;
  percent: number;
}

export function generateFileStats(lcovInput: LcovFile[]) {
  const results: Record<string, FileStat> = {};
  for (let index = 0; index < lcovInput.length; index++) {
    const lcovFile = lcovInput[index];
    const total = lcovFile.lines.details.length;
    const hit = lcovFile.lines.details.filter((l) => l.hit > 0).length;
    const percent = (total > 0 ? hit / total : 1.0) * 100.0;
    results[lcovFile.file] = { total, hit, percent };
  }
  return results;
}
