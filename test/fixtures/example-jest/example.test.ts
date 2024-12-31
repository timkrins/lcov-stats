import { describe, expect, test } from '@jest/globals';
import { covered } from './example';

describe('covered', () => {
  test('returns covered', () => {
    expect(covered()).toBe('hello covered');
  });
});
