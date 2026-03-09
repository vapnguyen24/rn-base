import type { IAuthRepository, LoginCredentials } from '../repositories/auth.repository.interface';
import type { User } from '../entities/user';
import type { AuthTokens } from '../repositories/auth.repository.interface';

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required.');
    }
    return this.authRepository.login(credentials);
  }
}
