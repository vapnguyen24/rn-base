/**
 * jest.setup.ts — runs AFTER the Jest test framework is installed.
 *
 * Responsibilities:
 *  - Extend Jest matchers (@testing-library/jest-native)
 *  - Start / reset / stop the MSW server around each test
 *  - Silence expected console noise during tests
 */

// @testing-library/react-native v13+ ships matchers directly.
// Extend Jest's expect with them using the standard pattern.
import * as matchers from '@testing-library/react-native/matchers';
import { server } from './src/core/api/mocks/server';

expect.extend(matchers);

// ─── MSW lifecycle ────────────────────────────────────────────────────────────
// Start the MSW node server once before all tests in this suite
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset any runtime handlers added inside individual tests so they don't bleed
afterEach(() => server.resetHandlers());

// Clean up after the full suite
afterAll(() => server.close());

// ─── Console noise suppression ────────────────────────────────────────────────
// Suppress act() warnings and known React Native benign warnings in test output.
// Adjust this list as your project evolves — never suppress errors silently.
const SUPPRESSED_WARNINGS = [
  'Warning: An update to',      // act() wrapping warnings
  'Warning: ReactDOM.render',   // legacy render API warnings (RTL internals)
];

const originalWarn = console.warn.bind(console);
const originalError = console.error.bind(console);

beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    const msg = args[0]?.toString() ?? '';
    if (SUPPRESSED_WARNINGS.some(w => msg.includes(w))) return;
    originalWarn(...args);
  };
  console.error = (...args: unknown[]) => {
    const msg = args[0]?.toString() ?? '';
    if (SUPPRESSED_WARNINGS.some(w => msg.includes(w))) return;
    originalError(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
