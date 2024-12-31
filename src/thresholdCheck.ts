import { FileStat } from './generateFileStats';
import { TotalStat } from './generateTotalStat';

export function thresholdCheck(
  failThreshold: number | null,
  stat: TotalStat | FileStat
) {
  if (failThreshold != null) {
    const shouldFail = stat.percent < failThreshold;
    if (shouldFail) {
      process.exitCode = 1;
      console.error('thresholdCheck has failed');
    }
  }
}
