import { expect, test } from 'vitest';
import { makeIdFromLabel } from './MakeIdFromLabel';

const emptyLabel = '';
const withForbiddenChar = 'Name$';
test('id for empty label', () => {
  expect(makeIdFromLabel(emptyLabel)).not.empty.string;
});
test('id without special chars', () =>
  expect(makeIdFromLabel(withForbiddenChar)).not.toContain('$'));
