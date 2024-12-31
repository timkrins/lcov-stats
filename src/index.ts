#!/usr/bin/env node

import { program } from 'commander';
import { z } from 'zod';
import { fileFilter } from './fileFilter';
import { generateFileStats } from './generateFileStats';
import { generateTotalStat, TotalStat } from './generateTotalStat';
import { parse } from './parse';
import { readFileToString } from './readFileToString';
import { thresholdCheck } from './thresholdCheck';
import { writeStringToFile } from './writeStringToFile';

program
  .name('lcov-stats')
  .description('CLI to produce JSON stats from LCOV input')
  .version('1.0.0');

program
  .requiredOption('-i, --input <filename>', 'filename for input', 'lcov.info')
  .option(
    '-o, --output <filename>',
    'filename for output. stdout will be used if no output is defined.'
  )
  .option(
    '--diff-with <filename>',
    'filename for input to produce a diff calculation'
  )
  .option('--pretty', 'use pretty output')
  .option(
    '--fail-percent <threshold>',
    'fail command at a percentage threshold'
  );

program.parse();

const optionsSchema = z.object({
  input: z.string(),
  output: z.string().optional(),
  diffWith: z.string().optional(),
  pretty: z.boolean().optional(),
  failPercent: z.coerce.number().optional(),
});

const options = optionsSchema.parse(program.opts());

const ignoreFilter = fileFilter([]);

const readAndParse = async (filename: string) => {
  const lcovInputContent = readFileToString(filename);
  const lcovParsed = await parse(lcovInputContent);
  if (lcovParsed) {
    const filteredLcov = lcovParsed.filter((p) => !ignoreFilter(p.file));
    const fileStats = generateFileStats(filteredLcov);
    const totalStat = generateTotalStat(fileStats);
    return totalStat;
  }
};

const toJson = (content: any) => {
  if (options.pretty) {
    return JSON.stringify(content, null, 2);
  }

  return JSON.stringify(content);
};

const output = async (content: any) => {
  const stringContent = toJson(content);

  if (options.output) {
    // write to file
    writeStringToFile(options.output, stringContent);
  } else {
    await new Promise<void>((resolve, reject) => {
      process.stdout.write(stringContent + '\n', (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  }
};

(async () => {
  if (options.input) {
    const primaryResult = await readAndParse(options.input);
    if (primaryResult) {
      if (options.diffWith) {
        const secondaryResult = await readAndParse(options.diffWith);
        if (secondaryResult) {
          const diff: TotalStat = {
            total: secondaryResult.total - primaryResult.total,
            hit: secondaryResult.hit - primaryResult.hit,
            percent: secondaryResult.percent - primaryResult.percent,
          };
          await output({ diff });
          thresholdCheck(options.failPercent, diff);
        }
      } else {
        await output(primaryResult);
        thresholdCheck(options.failPercent, primaryResult);
      }
    }
  }
})();
