import { expect, test, describe } from 'vitest';
import clientPassValidator from '../utils/clientPassValidator';

describe('Password client side validity check', () => {
  test('Password is 6+ chars, with uppercase, lowercase, number and symbol', () => {
    expect(clientPassValidator('Test123@', 'Test123@')).toBe('');
  });

  test('Password is not equal', () => {
    expect(clientPassValidator('Test123@', 'Test123')).toBe(
      'Passwords did not match.',
    );
  });

  test('Wrong format password', () => {
    expect(clientPassValidator('test', 'test')).toBe(
      'Password must be 6+ chars, with at least one uppercase, lowercase, number and symbol.',
    );
  });
});
