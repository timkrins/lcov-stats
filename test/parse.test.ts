import { describe, expect, test } from '@jest/globals';
import { parse } from '../src/parse';

describe('parse', () => {
  test('returns parse', () => {
    expect(parse()).toBe('parse');
  });
});
