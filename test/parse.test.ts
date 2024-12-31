import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { parse } from '../src/parse';

describe('parse', () => {
  test('parses lcov content from example-jest fixture', async () => {
    const lcovFixtureContent = readFileSync(
      resolve('test/fixtures/example-jest/lcov.info')
    ).toString();
    const parsed = await parse(lcovFixtureContent);
    const expected = [
      {
        branches: { details: [], found: 0, hit: 0 },
        file: 'example.ts',
        functions: {
          details: [
            { hit: 1, line: 1, name: 'covered' },
            { hit: 0, line: 6, name: 'uncovered' },
          ],
          found: 2,
          hit: 1,
        },
        lines: {
          details: [
            { hit: 1, line: 1 },
            { hit: 1, line: 3 },
            { hit: 1, line: 6 },
            { hit: 0, line: 8 },
          ],
          found: 4,
          hit: 3,
        },
        title: '',
      },
    ];

    expect(parsed).toEqual(expected);
  });
});
