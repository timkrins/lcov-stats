import { describe, expect, test } from '@jest/globals';
import { covered, uncoveredIfEnvSet } from './example';

describe('covered', () => {
  test('returns covered', () => {
    expect(covered()).toBe('hello covered');
  });

  test('returns uncoveredIfEnvSet', () => {
    if (!process.env.UNCOVERED_ENV_SET) {
      expect(uncoveredIfEnvSet()).toBe('hello uncoveredIfEnvSet');
    }
  });
});
