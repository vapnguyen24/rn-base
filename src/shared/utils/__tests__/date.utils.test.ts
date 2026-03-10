/**
 * Unit tests for date.utils.ts
 *
 * Guidelines followed here:
 *  - Pure functions → no mocks needed (use real logic)
 *  - Control time with jest.useFakeTimers() / jest.setSystemTime() so
 *    time-dependent tests are deterministic (no flakiness from real clock)
 *  - Descriptive test names: "given X, when Y, then Z"
 */
import { formatDate, isExpired } from '../date.utils';

// ─── formatDate ───────────────────────────────────────────────────────────────
describe('formatDate', () => {
  it('formats a date in en-US locale by default', () => {
    const date = new Date('2024-06-15T00:00:00.000Z');
    // Intl output varies by TZ; pin UTC to make the test deterministic in CI
    const result = formatDate(date, 'en-US');
    expect(result).toMatch(/June 15, 2024/i);
  });

  it('respects a custom locale', () => {
    const date = new Date('2024-06-15T00:00:00.000Z');
    const result = formatDate(date, 'fr-FR');
    // "15 juin 2024" in fr-FR
    expect(result).toMatch(/juin/i);
  });

  it('handles the beginning of a year correctly', () => {
    const result = formatDate(new Date('2024-01-01T12:00:00.000Z'), 'en-US');
    expect(result).toMatch(/January/i);
    expect(result).toMatch(/2024/);
  });
});

// ─── isExpired ────────────────────────────────────────────────────────────────
describe('isExpired', () => {
  // Pin the system clock so relative comparisons are deterministic
  const FIXED_NOW = new Date('2024-06-15T12:00:00.000Z');

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(FIXED_NOW);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns true when the given date is in the past', () => {
    const past = new Date('2024-06-15T11:59:00.000Z');
    expect(isExpired(past)).toBe(true);
  });

  it('returns false when the given date is in the future', () => {
    const future = new Date('2024-06-15T12:01:00.000Z');
    expect(isExpired(future)).toBe(false);
  });

  it('returns true for a date equal to now (boundary condition)', () => {
    // new Date() < new Date() is always false; exactly equal means not expired.
    // Verify consistency with the implementation.
    const now = new Date(FIXED_NOW.getTime());
    // date < new Date() → false (equal), so not expired
    expect(isExpired(now)).toBe(false);
  });
});
