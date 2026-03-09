import type { User } from '../../domain/entities/user';
import type { AuthTokens } from '../../domain/repositories/auth.repository.interface';
import type { LoginResponseDto } from '../dtos/auth.dto';

export const authMapper = {
  toUser(dto: LoginResponseDto['user']): User {
    return {
      id: dto.id,
      email: dto.email,
      displayName: dto.display_name,
      avatarUrl: dto.avatar_url,
      role: dto.role,
      createdAt: new Date(dto.created_at),
    };
  },

  toTokens(dto: Pick<LoginResponseDto, 'access_token' | 'refresh_token'>): AuthTokens {
    return {
      accessToken: dto.access_token,
      refreshToken: dto.refresh_token,
    };
  },
};
