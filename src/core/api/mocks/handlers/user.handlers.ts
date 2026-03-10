/**
 * MSW handlers for the /users/* namespace.
 */
import { http, HttpResponse } from 'msw';

const BASE = process.env.API_BASE_URL ?? 'https://api.example.com';

export const userHandlers = [
  // ── GET /users/me ───────────────────────────────────────────────────────────
  http.get(`${BASE}/users/me`, () => {
    return HttpResponse.json({
      id: '1',
      email: 'user@example.com',
      name: 'Test User',
      createdAt: '2024-01-01T00:00:00.000Z',
    });
  }),
];
