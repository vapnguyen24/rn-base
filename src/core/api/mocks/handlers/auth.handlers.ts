/**
 * MSW handlers for the /auth/* namespace.
 *
 * Design decisions:
 *  - Happy-path responses are defined here (defaults).
 *  - Individual tests override handlers via server.use() for error/edge cases.
 *  - All paths must match the base URL used by your axios instance.
 *
 * Usage in a test:
 *   import { server } from '@core/api/mocks/server';
 *   import { authHandlers } from '@core/api/mocks/handlers/auth.handlers';
 *
 *   // Override for the duration of one test:
 *   server.use(
 *     http.post('/auth/login', () => HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })),
 *   );
 */
import { http, HttpResponse } from 'msw';

const BASE = process.env.API_BASE_URL ?? 'https://api.example.com';

export const authHandlers = [
  // ── POST /auth/login ────────────────────────────────────────────────────────
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    // Simulate credential validation
    if (body.email === 'wrong@example.com') {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: { id: '1', email: body.email, name: 'Test User' },
    });
  }),

  // ── POST /auth/logout ───────────────────────────────────────────────────────
  http.post(`${BASE}/auth/logout`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // ── POST /auth/refresh ──────────────────────────────────────────────────────
  http.post(`${BASE}/auth/refresh`, () => {
    return HttpResponse.json({ accessToken: 'mock-refreshed-token' });
  }),
];
