import { AuthRepository } from '@features/auth/data/repositories/auth.repository';
import { LoginUseCase } from '@features/auth/domain/use-cases/login.use-case';

/**
 * Lazy singleton factory for auth use-cases.
 * Instances are created once on first access and reused for the app lifetime.
 * Swap the concrete classes here (e.g. MockAuthRepository) for testing.
 */
const authFactory = (() => {
  let loginUseCase: LoginUseCase | null = null;

  return {
    getLoginUseCase(): LoginUseCase {
      if (!loginUseCase) {
        loginUseCase = new LoginUseCase(new AuthRepository());
      }
      return loginUseCase;
    },

    /** Reset all instances — useful in tests between test cases. */
    reset(): void {
      loginUseCase = null;
    },
  };
})();

export { authFactory };
