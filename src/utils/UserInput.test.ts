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

  it('should return true for valid birthday', () => {
    assert.equal(UserInput.checkBirthdayValid(''), true);
    assert.equal(UserInput.checkBirthdayValid('1991-03-30'), true);
  });

  it('should return false for invalid birthday', () => {
    assert.equal(UserInput.checkBirthdayValid('2009-03-30'), false);
    assert.equal(UserInput.checkBirthdayValid('wrong'), false);
  });

  it('should return false for invalid required birthday', () => {
    assert.equal(UserInput.checkBirthdayRequiredValid(''), false);
    assert.equal(UserInput.checkBirthdayRequiredValid('2009-03-30'), false);
    assert.equal(UserInput.checkBirthdayRequiredValid('wrong'), false);
  });

  it('should return true for valid postcode', () => {
    assert.equal(UserInput.checkPostcodeValid('GB', ''), true);
    assert.equal(UserInput.checkPostcodeValid('', 'W85TT'), true);
    assert.equal(
      UserInput.checkPostcodeValid('unknown country', 'W85TT'),
      true
    );
    assert.equal(UserInput.checkPostcodeValid('GB', 'W85TT'), true);
    assert.equal(UserInput.checkPostcodeValid('GB', 'w85tT'), true);
    assert.equal(UserInput.checkPostcodeValid('DE', '22769'), true);
  });

  it('should return false for invalid postcode', () => {
    assert.equal(UserInput.checkPostcodeValid('GB', 'W85TT1'), false);
    22769;
    assert.equal(UserInput.checkPostcodeValid('DE', '227D69'), false);
  });

  it('should return false for invalid required postcode', () => {
    assert.equal(UserInput.checkPostcodeRequiredValid('GB', ''), false);
    assert.equal(UserInput.checkPostcodeRequiredValid('GB', 'W85TT1'), false);
    22769;
    assert.equal(UserInput.checkPostcodeRequiredValid('DE', '227D69'), false);
  });
});
