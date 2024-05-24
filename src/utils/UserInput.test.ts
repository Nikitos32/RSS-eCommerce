import { assert, describe, it } from 'vitest';
import { UserInput } from './UserInput';

describe('UserInput', () => {
  it('should return false for invalid required name', () => {
    assert.equal(UserInput.checkNameRequiredValid(''), false);
    assert.equal(UserInput.checkNameRequiredValid('3'), false);
    assert.equal(UserInput.checkNameRequiredValid(' '), false);
  });

  it('should return true for valid required name', () => {
    assert.equal(UserInput.checkNameRequiredValid('E'), true);
    assert.equal(UserInput.checkNameRequiredValid('Name'), true);
    assert.equal(UserInput.checkNameRequiredValid('name'), true);
  });
});
