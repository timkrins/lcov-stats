#!/usr/bin/env node

import { program } from 'commander';
import { z } from 'zod';
import { fileFilter } from './fileFilter';
import { TotalStat } from './generateTotalStat';
import { readerParser } from './readAndParse';
import { thresholdCheck } from './thresholdCheck';
import { writeJsonToFile } from './writeJsonToFile';
import { writeJsonToStdout } from './writeJsonToStdout';
import { writeMarkdownToFile } from './writeMarkdownToFile';
import { writeMarkdownToStdout } from './writeMarkdownToStdout';

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
  .option('--output-json-stdout', 'output JSON to stdout', true)
  .option(
    '--output-json-stdout-pretty',
    'use pretty JSON output for stdout',
    false
  )
  .option('--output-json-file <filename>', 'output JSON to file')
  .option('--output-json-file-pretty', 'use pretty JSON output for file', false)
  .option('--output-markdown-stdout', 'output Markdown to stdout', false)
  .option('--output-markdown-file <filename>', 'output Markdown to file', false)
  .option(
    '--compare-with <filename>',
    'filename for another lcov info input to produce a comparison calculation'
  )
  .option(
    '--compare-with-name <name>',
    'name to represent the compare-with input, ie. "develop" or "feature/add-todos"'
  )
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
  outputJsonStdout: z.boolean(),
  outputJsonStdoutPretty: z.boolean(),
  outputJsonFile: z.string().optional(),
  outputJsonFilePretty: z.boolean(),
  outputMarkdownStdout: z.boolean(),
  outputMarkdownFile: z.string().optional(),
  failPercent: z.coerce.number().optional(),
});

const options = optionsSchema.parse(program.opts());

const ignoreFilter = fileFilter([]);
const readAndParse = readerParser(ignoreFilter);

(async () => {
  var finalResult: TotalStat;

  if (options.input) {
    const primaryResult = await readAndParse(options.input, options.inputName);
    if (primaryResult) {
      finalResult = primaryResult;

      if (options.compareWith) {
        const secondaryResult = await readAndParse(
          options.compareWith,
          options.compareWithName
        );
        if (secondaryResult) {
          finalResult = {
            isComparison: true,
            name: 'comparison',
            total: secondaryResult.total - primaryResult.total,
            hit: secondaryResult.hit - primaryResult.hit,
            percent: secondaryResult.percent - primaryResult.percent,
          };
        }
      }

      if (options.outputJsonStdout) {
        await writeJsonToStdout(finalResult, options.outputJsonStdoutPretty);
      }
      if (options.outputJsonFile) {
        await writeJsonToFile(
          finalResult,
          options.outputJsonFile,
          options.outputJsonFilePretty
        );
      }
      if (options.outputMarkdownFile) {
        await writeMarkdownToFile(finalResult, options.outputMarkdownFile);
      }
      if (options.outputMarkdownStdout) {
        await writeMarkdownToStdout(finalResult);
      }
      thresholdCheck(options.failPercent, finalResult);
    }
  }
})();
