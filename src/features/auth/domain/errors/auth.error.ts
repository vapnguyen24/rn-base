export class AuthError extends Error {
  constructor(
    public readonly code: 'INVALID_CREDENTIALS' | 'SESSION_EXPIRED' | 'UNAUTHORIZED',
    message: string,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}
