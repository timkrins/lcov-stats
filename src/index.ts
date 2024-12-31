#!/usr/bin/env node

import { program } from 'commander';

program
  .name('lcov-stats')
  .description('CLI to produce JSON stats from LCOV input')
  .version('1.0.0');

program
  .option('-i, --input <filename>', 'filename for input', 'lcov.info')
  .option(
    '-o, --output <filename>',
    'filename for output. stdout will be used if no output is defined.'
  )
  .option('--pretty', 'use pretty formatting for output');

program.parse();
