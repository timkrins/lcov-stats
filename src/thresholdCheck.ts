import { FileStat } from './generateFileStats';
import { TotalStat } from './generateTotalStat';

export function thresholdCheck(
  failThreshold: number | undefined,
  stat: TotalStat | FileStat
) {
  if (typeof failThreshold != 'undefined') {
    const shouldFail = stat.percent < failThreshold;
    if (shouldFail) {
      process.exitCode = 1;
      console.error(`❌ Threshold check did not pass ${failThreshold}%`);
    }
  }
}
