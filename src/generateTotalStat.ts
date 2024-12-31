import { FileStat } from './generateFileStats';

export interface TotalStat {
  total: number;
  hit: number;
  percent: number;
}

export function generateTotalStat(
  fileStats: Record<string, FileStat>
): TotalStat {
  const values = Object.values(fileStats);
  const total = values.reduce((prev, current) => prev + current.total, 0);
  const hit = values.reduce((prev, current) => prev + current.hit, 0);
  const percent = total > 0 ? hit / total : 1.0;

  return { total, hit, percent };
}
