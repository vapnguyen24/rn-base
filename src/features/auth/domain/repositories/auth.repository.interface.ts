import type { User } from '../entities/user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthTokens>;
  getCurrentUser(): Promise<User | null>;
}
