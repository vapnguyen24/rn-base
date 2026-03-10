/**
 * MSW Node server — used in Jest (unit + component tests).
 *
 * Import this in jest.setup.ts to start/stop the interceptor.
 * The server uses the same handlers as the browser/native service worker
 * so API mocking is consistent across all test layers.
 */
import { setupServer } from 'msw/node';
import { authHandlers } from './handlers/auth.handlers';
import { userHandlers } from './handlers/user.handlers';

export const server = setupServer(
  ...authHandlers,
  ...userHandlers,
);
