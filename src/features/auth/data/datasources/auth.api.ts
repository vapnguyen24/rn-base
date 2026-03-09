import { axiosInstance } from '@core/api/axios.instance';
import type { LoginResponseDto, RefreshTokenResponseDto } from '../dtos/auth.dto';
import type { LoginCredentials } from '../../domain/repositories/auth.repository.interface';

export const authApi = {
  login(credentials: LoginCredentials) {
    return axiosInstance.post<LoginResponseDto>('/auth/login', credentials);
  },

  logout() {
    return axiosInstance.post<void>('/auth/logout');
  },

  refreshToken(refreshToken: string) {
    return axiosInstance.post<RefreshTokenResponseDto>('/auth/refresh', {
      refresh_token: refreshToken,
    });
  },
};
