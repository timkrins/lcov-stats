#!/usr/bin/env node

import { program } from 'commander';
import { fileFilter } from './fileFilter';
import { generateFileStats } from './generateFileStats';
import { generateTotalStat, TotalStat } from './generateTotalStat';
import { parse } from './parse';
import { readFileToString } from './readFileToString';
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
  .option('--pretty', 'use pretty output');

program.parse();

const options = program.opts();
// console.log({ options });

const ignoreFilter = fileFilter([/\.rake$/]);

const readAndParse = async (filename: string) => {
  const lcovInputContent = readFileToString(filename);
  const lcovParsed = await parse(lcovInputContent);
  if (lcovParsed) {
    const filteredLcov = lcovParsed.filter((p) => !ignoreFilter(p.file));
    const fileStats = generateFileStats(filteredLcov);
    const totalStat = generateTotalStat(fileStats);
    // console.log({ totalStat });
    return totalStat;
  }
};

const toJson = (content: any) => {
  if (options.pretty) {
    return JSON.stringify(content, null, 2);
  }

  return JSON.stringify(content);
};

const output = (content: any) => {
  const stringContent = toJson(content);

  if (options.output) {
    // write to file
    writeStringToFile(options.output, stringContent);
  } else {
    process.stdout.write(stringContent + '\n');
  }
};

(async () => {
  if (options.input) {
    const inputResult = await readAndParse(options.input);
    if (inputResult) {
      if (options.diffWith) {
        const a = inputResult;
        const b = await readAndParse(options.diffWith);
        if (b) {
          const diff: TotalStat = {
            total: b.total - a.total,
            hit: b.hit - a.hit,
            percent: b.percent - a.percent,
          };
          output({ diff });
        }
      } else {
        output(inputResult);
      }
    }
  }
})();
