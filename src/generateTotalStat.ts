import { FileStat } from './generateFileStats';

export interface TotalStat {
  name?: string;
  total: number;
  hit: number;
  percent: number;
}

export function generateTotalStat(
  fileStats: Record<string, FileStat>,
  name?: string
): TotalStat {
  const values = Object.values(fileStats);
  const total = values.reduce((prev, current) => prev + current.total, 0);
  const hit = values.reduce((prev, current) => prev + current.hit, 0);
  const percent = (total > 0 ? hit / total : 1.0) * 100.0;
  const result: TotalStat = { total, hit, percent };
  if (name) result.name = name;
  return result;
}
