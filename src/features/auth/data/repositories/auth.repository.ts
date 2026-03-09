import type {
  IAuthRepository,
  LoginCredentials,
  AuthTokens,
} from '../../domain/repositories/auth.repository.interface';
import type { User } from '../../domain/entities/user';
import { authApi } from '../datasources/auth.api';
import { authMapper } from '../mappers/auth.mapper';

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    const { data } = await authApi.login(credentials);
    return {
      user: authMapper.toUser(data.user),
      tokens: authMapper.toTokens(data),
    };
  }

  async logout(): Promise<void> {
    await authApi.logout();
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const { data } = await authApi.refreshToken(refreshToken);
    return authMapper.toTokens(data);
  }

  async getCurrentUser(): Promise<User | null> {
    return null;
  }
}
