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

  it('should return false for invalid name', () => {
    assert.equal(UserInput.checkNameValid('3'), false);
    assert.equal(UserInput.checkNameValid(' '), false);
  });

  it('should return true for valid name', () => {
    assert.equal(UserInput.checkNameValid(''), true);
    assert.equal(UserInput.checkNameValid('E'), true);
    assert.equal(UserInput.checkNameValid('Name'), true);
    assert.equal(UserInput.checkNameValid('name'), true);
  });

  it('should return false for invalid required email', () => {
    assert.equal(UserInput.checkEmailRequiredValid(''), false);
    assert.equal(UserInput.checkEmailRequiredValid('3'), false);
    assert.equal(UserInput.checkEmailRequiredValid(' '), false);
    assert.equal(UserInput.checkEmailRequiredValid('test@example'), false);
    assert.equal(UserInput.checkEmailRequiredValid('test@example.c'), false);
  });

  it('should return true for valid required email', () => {
    assert.equal(UserInput.checkEmailRequiredValid('test@example.com'), true);
    assert.equal(UserInput.checkEmailRequiredValid('te.st@example.co'), true);
  });
});
