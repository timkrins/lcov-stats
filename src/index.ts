#!/usr/bin/env node

import { program } from 'commander';
import { z } from 'zod';
import { fileFilter } from './fileFilter';
import { TotalStat } from './generateTotalStat';
import { output } from './output';
import { readerParser } from './readAndParse';
import { thresholdCheck } from './thresholdCheck';

program
  .name('lcov-stats')
  .description('CLI to produce JSON stats from LCOV input')
  .version('1.0.0');

if (!process.stdout.isTTY) {
  program.configureHelp({
    helpWidth: 120,
  });
}

program
  .requiredOption(
    '-i, --input <filename>',
    'filename for lcov info input',
    'lcov.info'
  )
  .option(
    '--input-name <name>',
    'name to represent the input, ie. "main" or "base"'
  )
  .option(
    '-o, --output <filename>',
    'filename for JSON output. stdout will be used if no output file is given.'
  )
  .option(
    '--compare-with <filename>',
    'filename for another lcov info input to produce a comparison calculation'
  )
  .option(
    '--compare-with-name <name>',
    'name to represent the compare-with input, ie. "develop" or "feature/add-todos"'
  )
  .option('--pretty', 'use pretty JSON output', false)
  .option(
    '--fail-percent <threshold>',
    'set failed exit code if a percentage threshold is exceeded'
  );

program.parse();

const optionsSchema = z.object({
  input: z.string(),
  inputName: z.string().optional(),
  output: z.string().optional(),
  compareWith: z.string().optional(),
  compareWithName: z.string().optional(),
  pretty: z.boolean(),
  failPercent: z.coerce.number().optional(),
});

const options = optionsSchema.parse(program.opts());

const ignoreFilter = fileFilter([]);
const readAndParse = readerParser(ignoreFilter);

(async () => {
  if (options.input) {
    const primaryResult = await readAndParse(options.input, options.inputName);
    if (primaryResult) {
      if (options.compareWith) {
        const secondaryResult = await readAndParse(
          options.compareWith,
          options.compareWithName
        );
        if (secondaryResult) {
          const comparison: TotalStat = {
            name: 'comparison',
            total: secondaryResult.total - primaryResult.total,
            hit: secondaryResult.hit - primaryResult.hit,
            percent: secondaryResult.percent - primaryResult.percent,
          };
          await output(comparison, options.output, options.pretty);
          thresholdCheck(options.failPercent, comparison);
        }
      } else {
        await output(primaryResult, options.output, options.pretty);
        thresholdCheck(options.failPercent, primaryResult);
      }
    }
  }
})();
